from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Student)
admin.site.register(Class)
admin.site.register(Result)
admin.site.register(Subject)
admin.site.register(User)