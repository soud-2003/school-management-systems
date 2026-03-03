"""Create ONE demo user"""
import os, sys, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'school_management.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from myapp.models import User, Class, Student

# Create class
class_obj, _ = Class.objects.get_or_create(class_name='Class 1')

# Create ONE demo student
if not User.objects.filter(username='demo').exists():
    user = User.objects.create_user(
        username='demo',
        password='demo123',
        email='demo@school.com',
        first_name='Demo',
        last_name='Student',
        role='student'
    )
    Student.objects.create(user=user, student_class=class_obj, parent=None)
    print("Demo user created: demo / demo123")
else:
    print("Demo user already exists")
