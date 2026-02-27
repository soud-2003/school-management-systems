from django.urls import path
from .views import *

urlpatterns = [
    # Auth endpoints
    path('auth/login/', login_view),
    path('auth/register/', register_view),
    
    # Generic CRUD endpoints
    path('students/', manage_student),
    path('students/<int:id>/', manage_student),
    path('users/', manage_user),
    path('users/<int:id>/', manage_user),
    path('classes/', manage_class),
    path('classes/<int:id>/', manage_class),
    path('results/', manage_result),
    path('results/<int:id>/', manage_result),
    path('subjects/', manage_subject),
    path('subjects/<int:id>/', manage_subject),
    
    # Student endpoints
    path('users/<int:user_id>/student/', get_student_by_user),
    path('students/<int:student_id>/results/', get_student_results),
    
    # Teacher endpoints
    path('teachers/<int:teacher_id>/subjects/', get_teacher_subjects),
    path('classes/<int:class_id>/students/', get_students_by_class),
    
    # Parent endpoints
    path('parents/<int:parent_id>/children/', get_parent_children),
    
    # Dashboard endpoints
    path('dashboard/stats/', get_dashboard_stats),
    
    # Admin User Management endpoints
    path('admin/users/', get_all_users),
    path('admin/users/<int:user_id>/', manage_single_user),
]
