from django.shortcuts import render
from rest_framework import permissions, generics, status, viewsets
from accounts.permissions import IsStudentUser, IsTeacherUser
from etest.models import *
from etest.serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

# Create your views here.
class Dag(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = KnowledgeSpaceSerializer
    queryset = KnowledgeSpace.objects.all()
class CreateDag(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = CreateKnowledgeSpaceSerializer
    queryset = KnowledgeSpace.objects.all()

class CreateNode(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = NodeSerializer
    queryset = Node.objects.all()
    
class DestroyNode(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = NodeSerializer
    queryset = Node.objects.all()

class CreateLink(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = LinkSerializer
    queryset = Link.objects.all()

class GetTestById(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = TestSerializer
    queryset = Test.objects.all()


class GetAllCoursesByUser(generics.ListAPIView):
    # Allowed for students and teachers.
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CourseSerializer 
    # This view should return a list of all the courses for the currently authenticated user.
    def get_queryset(self):
        if self.request.user.role == 'TEACHER':
            return Course.objects.filter(teachers=self.request.user)
        elif self.request.user.role == 'STUDENT':
            return Course.objects.filter(students=self.request.user)
        else:
            return Course.objects.none()

class GetAllTestsInCourseByCreator(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = TestSerializer 
    # This view should return a list of all the tests in a chosen course 
    # that were created by the currently authenticated teacher.
    def get_queryset(self):
        return Test.objects.filter(course__id=self.kwargs['pk']).filter(creator=self.request.user)
        

# ovde ce ici neke nove izmene 