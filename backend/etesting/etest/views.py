from django.shortcuts import render
from rest_framework import permissions, generics, status, viewsets
from accounts.permissions import IsStudentUser, IsTeacherUser
from etest.models import KnowledgeSpace, Node, Question, Answer, Test
from etest.serializers import KnowledgeSpaceSerializer, NodeSerializer
from django.http import HttpResponse
from django.core import serializers
from django.contrib.admin.utils import flatten



# Create your views here.
class Dag(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = KnowledgeSpaceSerializer
    queryset = KnowledgeSpace.objects.all()

class CreateNode(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = NodeSerializer
    queryset = Node.objects.all()
    
    
def Questions(request, pk):
    request.session['pk'] = pk
    queryset = Question.objects.filter(id=pk)

    odgovor_lista = []

    for answer in queryset.values('answers'):
        odgovor = Answer.objects.filter(id=list(answer.values())[0])
        odgovor_lista.append(odgovor)


    result_list = queryset
    for i in range(len(odgovor_lista)):
        result_list = [*result_list, *odgovor_lista[i]] #[*queryset, *odgovor_lista[i]]
    result_list = flatten(result_list)
    result_list =  serializers.serialize('xml', result_list)


    return HttpResponse(result_list, content_type="aplication/xml")

def Questions_For_Test(pk):
    print(pk)

    queryset = Question.objects.filter(id=pk)

    odgovor_lista = []

    for answer in queryset.values('answers'):
        odgovor = Answer.objects.filter(id=list(answer.values())[0])
        odgovor_lista.append(odgovor)


    result_list = queryset
    for i in range(len(odgovor_lista)):
        result_list = [*result_list, *odgovor_lista[i]] #[*queryset, *odgovor_lista[i]]
    result_list = flatten(result_list)

    return result_list

def Tests(request, pk):
    request.session['pk'] = pk
    queryset = Test.objects.filter(id=pk)

    pitanja_lista = []

    for question in queryset.values('questions'):
        pitanja_lista.append( Questions_For_Test(list(question.values())[0]))

    result_list = queryset
    for i in range(len(pitanja_lista)):
        result_list = [*result_list, *pitanja_lista[i]]
    result_list = flatten(result_list)
    result_list = serializers.serialize('xml', result_list)

    return HttpResponse(result_list, content_type="aplication/xml")




"""""
def Tests(request, pk):
    print("CAO")
    request.session['pk'] = pk
    queryset = Test.objects.filter(id=pk)

    pitanja_lista = []

    for question in queryset.values('questions'):
        pitanje = Question.objects.filter(id=list(question.values())[0])
        print("cao")
        print(pitanje.values('id'))
        #pitanje_queryset = serializers.serialize('xml', pitanje)
        pitanja_lista.append(queryset)

    result_list = queryset
    for i in range(len(pitanja_lista)):
        result_list = [*result_list, *pitanja_lista[i]]
    result_list = flatten(result_list)
    result_list = serializers.serialize('xml', result_list)


    return HttpResponse(result_list, content_type="aplication/xml")
"""""