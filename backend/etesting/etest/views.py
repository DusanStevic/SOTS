from django.shortcuts import render
from rest_framework import permissions, generics, status, viewsets
from accounts.permissions import IsStudentUser, IsTeacherUser
from etest.models import KnowledgeSpace, Node
from etest.serializers import KnowledgeSpaceSerializer, NodeSerializer
# Create your views here.
class Dag(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = KnowledgeSpaceSerializer
    queryset = KnowledgeSpace.objects.all()

class CreateNode(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = NodeSerializer
    queryset = Node.objects.all()
    
    
