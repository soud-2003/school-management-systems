from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    student_class = ClassSerializer(read_only=True)
    parent = UserSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = ['id', 'user', 'student_class', 'parent']

class SubjectSerializer(serializers.ModelSerializer):
    class_assigned = ClassSerializer(read_only=True)
    teacher = UserSerializer(read_only=True)
    
    class Meta:
        model = Subject
        fields = ['id', 'subject_name', 'class_assigned', 'teacher']

class ResultSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)
    teacher = UserSerializer(read_only=True)
    
    class Meta:
        model = Result
        fields = ['id', 'student', 'subject', 'teacher', 'marks', 'comment']
