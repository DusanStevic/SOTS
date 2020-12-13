from django.db import models
from django.contrib.auth.models import AbstractUser
from accounts.constants import ROLES


class User(AbstractUser):
    #is_student = models.BooleanField()
    #is_teacher = models.BooleanField()
    role = models.CharField(max_length=255, choices=ROLES)
    

    def __str__(self):
        return self.username


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
        
class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username