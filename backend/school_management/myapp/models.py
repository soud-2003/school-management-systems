from django.db import models
from django.contrib.auth.models import AbstractUser


# =========================
# Custom User Model
# =========================
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('parent', 'Parent'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.username} ({self.role})"


# =========================
# Class Model
# =========================
class Class(models.Model):
    class_name = models.CharField(max_length=100)

    def __str__(self):
        return self.class_name


# =========================
# Subject Model
# =========================
class Subject(models.Model):
    subject_name = models.CharField(max_length=100)
    class_assigned = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name='subjects'
    )
    teacher = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'Teacher'},
        related_name='teaching_subjects'
    )

    def __str__(self):
        return self.subject_name


# =========================
# Student Model
# =========================
class Student(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'Student'}
    )
    student_class = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name='Students'
    )
    parent = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'role': 'Parent'},
        related_name='Children'
    )

    def __str__(self):
        return self.user.username


# =========================
# Result Model
# =========================
class Result(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='Results'
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name='Results'
    )
    teacher = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'Teacher'}
    )
    marks = models.DecimalField(max_digits=5, decimal_places=2)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.student} - {self.subject}"
