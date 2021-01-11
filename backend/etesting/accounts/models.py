from django.db import models
from django.contrib.auth.models import AbstractUser
from accounts.constants import ROLES


class User(AbstractUser):
    role = models.CharField(max_length=255, choices=ROLES)
    def __str__(self):
        return self.username
