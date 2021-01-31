from django.shortcuts import render
from rest_framework import permissions, generics, status, viewsets
from accounts.permissions import IsStudentUser, IsTeacherUser
from etest.models import *
from etest.serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from django.http import HttpResponse
from django.core import serializers
from django.contrib.admin.utils import flatten
from itertools import chain
from etest.pagination import LargeResultsSetPagination
from django.core.files import File
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import api_view

# You can create your views here.
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



# courses
class GetAllCoursesByUser(generics.ListAPIView):
    # Allowed for students and teachers.
    permission_classes = [permissions.IsAuthenticated]
    # pagination_class allows backend pagination
    # http://localhost:8000/api/courses/GetAllCoursesByUser?page=1&page_size=5
    # For this project, an angular material table is taking care of pagination.
    # pagination_class = LargeResultsSetPagination
    serializer_class = CourseSerializer 
    # This view should return a list of all the courses for the currently authenticated user.
    def get_queryset(self):
        if self.request.user.role == 'TEACHER':
            return Course.objects.filter(teachers=self.request.user)
        elif self.request.user.role == 'STUDENT':
            return Course.objects.filter(students=self.request.user)
        else:
            return Course.objects.none()

class GetCourseById(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser|IsStudentUser]
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

# tests
class GetAllTestsInCourseByCreator(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = TestSerializer 
    # This view should return a list of all the tests in a chosen course 
    # that were created by the currently authenticated teacher.
    def get_queryset(self):
        return Test.objects.filter(course__id=self.kwargs['pk']).filter(creator=self.request.user)

class GetTestByCreator(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = TestSerializer
    # This view should return a chosen test 
    # that was created by the currently authenticated teacher.
    # Of all teachers, only the creator can see a test.
    def get_queryset(self):
        return Test.objects.filter(id=self.kwargs['pk']).filter(creator=self.request.user)

class GetAllCompletedTestsInCourseByExecutor(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = CompletedTestSerializer 
    # This view should return a list of all the completed tests in a chosen course 
    # that were executed by the currently authenticated student.
    def get_queryset(self):
        return CompletedTest.objects.filter(test__course__id=self.kwargs['pk']).filter(student=self.request.user)

class GetCompletedTestByExecutor(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = CompletedTestSerializer
    # This view should return a completed test 
    # that was executed by the currently authenticated student.
    def get_queryset(self):
        return CompletedTest.objects.filter(id=self.kwargs['pk']).filter(student=self.request.user)


def GetAnswerForQuestion(pk):

    return Answer.objects.filter(question=pk)

def GetQuestionForTest(pk):

    questions = Question.objects.filter(test=pk)

    answers = []

    for answer in questions.values('id'):
        answers.append(GetAnswerForQuestion(answer['id']))

    return questions, answers


class GetTestXmlById(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = TestSerializer

    def get_queryset(self):
        test = Test.objects.filter(id=self.kwargs['pk'])

        XMLSerializer = serializers.get_serializer("xml")
        xml_serializer = XMLSerializer()
        questions, answers = GetQuestionForTest(self.kwargs['pk'])

        answerss = []
        for i in range(len(answers)):
            answerss = [*answerss, *answers[i]]

        result_list = chain(test, questions, answerss)

        with open("xml/Test" + str(self.kwargs['pk']) + ".xml", "w") as out:
            xml_serializer.serialize(result_list, stream=out)

        return test

class CreateTest(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = CreateTestSerializer
    queryset = Test.objects.all()

@api_view(['GET'])
def GetXML(request, pk):

    file = File(open(f'./xml/{pk}.xml', 'r'))
    data = file.read()

    return Response(data)

class CreateAnswer(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

class CreateQuestion(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = CreateQuestionSerializer
    queryset = Question.objects.all()

class CreateChosenAnswer(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = CreateChosenAnswerSerializer
    queryset = ChosenAnswer.objects.all()


class CreateCompletedTest(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = CompletedTestSerializer
    queryset = CompletedTest.objects.all()


class GetAllNoCompletedTestsInCourseByExecutor(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = TestSerializer 
    # This view should return a list of all the no completed tests in a chosen course 
    # that were executed by the currently authenticated student.
    def get_queryset(self):
        completedTest = CompletedTest.objects.filter(test__course__id=self.kwargs['pk']).filter(student=self.request.user).values_list("test_id", flat="True")
        return Test.objects.exclude(id=completedTest[0]).filter(course_id=self.kwargs['pk'])


class GetTestById(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser|IsStudentUser]
    serializer_class = TestSerializer
    queryset = Test.objects.all() 

class GetAllTestWithSameDomain(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser|IsTeacherUser]
    serializer_class = TestSerializer 
    def get_queryset(self):

        if self.request.user.role == 'TEACHER':
            test = Test.objects.filter(id=self.kwargs['pk'])
            return Test.objects.filter(course=test[0].course_id).filter(creator=test[0].creator).exclude(id=test[0].id)
        elif self.request.user.role == 'STUDENT':
            test = Test.objects.filter(id=self.kwargs['pk'])
            return Test.objects.filter(course=test[0].course_id).exclude(id=test[0].id)

class GetFirstQuestionForTest(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = QuestionSerializer

    def get_queryset(self):
        questions = Question.objects.filter(test_id=self.kwargs['pk'])
        min = questions.order_by('problem_id').first()
        return questions.filter(problem_id = min.problem_id)

class GetAnswerById(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser|IsStudentUser]
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()
