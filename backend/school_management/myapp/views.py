from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import *
from .serializer import *

# Create your views here.

def generic_api(model_class, serializer_class):
    @api_view(['GET','POST', 'DELETE', 'PUT'])
    # @permission_classes([IsAuthenticated])


    def api(request, id = None):
        if request.method == 'GET':
            if id:
                try:
                    instance = model_class.objects.get(id = id)
                    serializer = serializer_class(instance)
                    return Response(serializer.data)
                except model_class.DoesNotExist:
                    return Response({'message':'Object Not Found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                instance = model_class.objects.all()
                serializer = serializer_class(instance, many = True)
                return Response(serializer.data)

        elif request.method == 'POST':
            serializer = serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)  # Success
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # If serializer is invalid


        elif request.method == 'DELETE':
            if id:
                try:
                    instance = model_class.objects.get(id = id)
                    instance.delete()
                    return Response({'message':'Delete Successfully'})
                except model_class.DoesNotExist:
                    return Response({'message':'Object Not Found'}, status=status.HTTP_404_NOT_FOUND)
                

        elif request.method == 'PUT':
            if id:
                try:
                    instance = model_class.objects.get(id=id)
                    serializer = serializer_class(instance, data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                    return Response(serializer.data)
                
                        
                except model_class.DoesNotExist:
                    return Response({'message': 'Object not found'}, status=status.HTTP_404_NOT_FOUND)

    return api



manage_student = generic_api(Student, StudentSerializer)
manage_user = generic_api(User, UserSerializer)
manage_class = generic_api(Class, ClassSerializer)
manage_result = generic_api(Result, ResultSerializer)
manage_subject = generic_api(Subject, SubjectSerializer)


# =========================
# Authentication Views
# =========================

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Login endpoint - authenticates user and returns user info with role
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Please provide both username and password'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    # Check password
    if not user.check_password(password):
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    # Return user data
    serializer = UserSerializer(user)
    return Response({
        'user': serializer.data,
        'message': 'Login successful'
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    Register a new user (Student, Teacher, Parent, or Admin)
    """
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    role = request.data.get('role', 'student')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    
    if not username or not password:
        return Response(
            {'error': 'Please provide both username and password'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Create user with create_user (handles password hashing)
    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
        first_name=first_name,
        last_name=last_name
    )
    
    # Set the role separately (create_user doesn't handle custom fields)
    user.role = role
    user.save()
    
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# =========================
# Student Views
# =========================

@api_view(['GET'])
@permission_classes([AllowAny])
def get_student_results(request, student_id):
    """
    Get results for a specific student
    """
    try:
        results = Result.objects.filter(student_id=student_id).select_related('subject')
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_student_by_user(request, user_id):
    """
    Get student profile by user ID
    """
    try:
        student = Student.objects.get(user_id=user_id)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)


# =========================
# Teacher Views
# =========================

@api_view(['GET'])
@permission_classes([AllowAny])
def get_teacher_subjects(request, teacher_id):
    """
    Get subjects taught by a specific teacher
    """
    try:
        subjects = Subject.objects.filter(teacher_id=teacher_id).select_related('class_assigned')
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_students_by_class(request, class_id):
    """
    Get all students in a specific class
    """
    try:
        students = Student.objects.filter(student_class_id=class_id).select_related('user')
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# =========================
# Parent Views
# =========================

@api_view(['GET'])
@permission_classes([AllowAny])
def get_parent_children(request, parent_id):
    """
    Get children of a specific parent
    """
    try:
        students = Student.objects.filter(parent_id=parent_id).select_related('user', 'student_class')
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# =========================
# Dashboard Views
# =========================

@api_view(['GET'])
@permission_classes([AllowAny])
def get_dashboard_stats(request):
    """
    Get dashboard statistics for management
    """
    total_students = Student.objects.count()
    total_teachers = User.objects.filter(role='Teacher').count()
    total_classes = Class.objects.count()
    total_subjects = Subject.objects.count()
    
    return Response({
        'total_students': total_students,
        'total_teachers': total_teachers,
        'total_classes': total_classes,
        'total_subjects': total_subjects
    })


# =========================
# Admin User Management Views
# =========================

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def manage_single_user(request, user_id):
    """
    Admin can get, update or delete a specific user
    """
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        # Admin can update username and password
        username = request.data.get('username')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        
        if username:
            # Check if username already exists for another user
            if User.objects.exclude(id=user_id).filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user.username = username
        
        if password:
            user.set_password(password)
        
        if first_name is not None:
            user.first_name = first_name
        
        if last_name is not None:
            user.last_name = last_name
        
        if email is not None:
            user.email = email
        
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response({'message': 'User deleted successfully'})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_users(request):
    """
    Get all users (for admin management)
    """
    users = User.objects.all().order_by('-date_joined')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
