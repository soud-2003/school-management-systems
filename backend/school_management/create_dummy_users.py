"""
Script to create dummy users for testing
Run this after migrations are applied
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'school_management.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from myapp.models import User, Class, Student

def create_dummy_data():
    print("Creating dummy data...")
    
    # Create default class if not exists
    class_obj, created = Class.objects.get_or_create(
        class_name='Class 1',
        defaults={'class_name': 'Class 1'}
    )
    if created:
        print("Created Class 1")
    
    # Create admin user
    if not User.objects.filter(username='admin').exists():
        admin = User.objects.create_user(
            username='admin',
            password='admin123',
            email='admin@school.com',
            first_name='Admin',
            last_name='User',
            role='admin'
        )
        print("Created admin user (username: admin, password: admin123)")
    
    # Create teacher user
    if not User.objects.filter(username='teacher').exists():
        teacher = User.objects.create_user(
            username='teacher',
            password='teacher123',
            email='teacher@school.com',
            first_name='John',
            last_name='Teacher',
            role='teacher'
        )
        print("Created teacher user (username: teacher, password: teacher123)")
    
    # Create student user
    if not User.objects.filter(username='student').exists():
        student_user = User.objects.create_user(
            username='student',
            password='student123',
            email='student@school.com',
            first_name='Jane',
            last_name='Student',
            role='student'
        )
        # Create Student record
        Student.objects.create(
            user=student_user,
            student_class=class_obj,
            parent=None
        )
        print("Created student user (username: student, password: student123)")
    
    # Create parent user
    if not User.objects.filter(username='parent').exists():
        parent = User.objects.create_user(
            username='parent',
            password='parent123',
            email='parent@school.com',
            first_name='John',
            last_name='Parent',
            role='parent'
        )
        print("Created parent user (username: parent, password: parent123)")
    
    print("\nDummy data created successfully!")
    print("\nTest accounts:")
    print("  Admin: username=admin, password=admin123")
    print("  Teacher: username=teacher, password=teacher123")
    print("  Student: username=student, password=student123")
    print("  Parent: username=parent, password=parent123")

if __name__ == '__main__':
    create_dummy_data()
