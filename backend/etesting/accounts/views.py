from django.shortcuts import render
from rest_framework import permissions
from rest_framework import permissions, generics, status, viewsets

from accounts.models import User
from accounts.serializers import UserSerializer,CreateNewUserSerializer
from accounts.permissions import IsStudentUser,IsTeacherUser


class SignUp(generics.CreateAPIView):
    serializer_class = CreateNewUserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()