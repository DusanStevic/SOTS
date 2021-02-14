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
from django.shortcuts import get_object_or_404

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

class GetAllUncompletedTestsInCourseByExecutor(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = TestSerializer 
    # This view should return a list of all the uncompleted tests in a chosen course 
    # that are going to be executed by the currently authenticated student.
    def get_queryset(self):
        all_tests = Test.objects.filter(course__id=self.kwargs['pk'])
        completed_tests = CompletedTest.objects.filter(test__course__id=self.kwargs['pk']).filter(student=self.request.user)
        uncompleted_tests = []
        for test in all_tests:
            for completed_test in completed_tests:
                if(test!=completed_test.test):
                    uncompleted_tests.append(test)
 
        return uncompleted_tests

class GetUncompletedTestByExecutor(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = UncompletedTestSerializer
    # This view should return a chosen test 
    # that is going to be executed by the currently authenticated student.
    def get_queryset(self):
        return Test.objects.filter(id=self.kwargs['pk'])

class CreateCompletedTest(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStudentUser]
    serializer_class = CreateCompletedTestSerializer
    queryset = CompletedTest.objects.all()
    def perform_create(self, serializer):
        # student field
        serializer.save(student=self.request.user)
        # test field
        questions = self.request.data.get('questions')
        test_id = questions[0]['test']
        test = get_object_or_404(Test, id=test_id)
        serializer.save(test=test)
        # score field
        score = 0
        for question in questions:
            for  answer in question['answers']:
                if answer['chosen'] == True:
                    answer_id = answer['id']
                    answer_db = get_object_or_404(Answer, id=answer_id)
                    # creating chosen answer
                    chosen_answer = ChosenAnswer()
                    chosen_answer.answer = answer_db
                    # serializer.save() returns the instance that is just being created or updated.
                    # serializer.save() is equal to the currently generated completed test.
                    # adding completed test to chosen answer
                    chosen_answer.completed_test = serializer.save()
                    chosen_answer.save()
                    # completed_test_chosen_answers field
                    # adding chosen answers to completed test
                    serializer.save().completed_test_chosen_answers.add(chosen_answer)
                    if answer_db.correct_answer == True:
                        score = score + 1
        serializer.save(score=score)            
        

class CreateTest(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = CreateTestSerializer
    queryset = Test.objects.all()
    def perform_create(self, serializer):
        # creator field
        serializer.save(creator=self.request.user)
        # course field
        course_id = self.request.data.get('course_id')
        course = get_object_or_404(Course, id=course_id)
        serializer.save(course=course)
        sections = self.request.data.get('sections')
        for section in sections:
            # questions field
            questions = section['questions']
            for question in questions:
                print(question)
                print(question['questionTitle'])
                question_text = question['questionTitle']
                problem_id = question['questionType']
                problem = get_object_or_404(Node, id=problem_id)
                # creating question
                question_db = Question()
                question_db.question_text = question_text
                question_db.problem = problem
                # serializer.save() returns the instance that is just being created or updated.
                # serializer.save() is equal to the currently generated test.
                # adding test to question
                question_db.test = serializer.save()
                question_db.save()
                for answer in question['options']:
                    answer_text = answer['optionTitle']
                    correct_answer = answer['correct_answer']
                    # creating answer
                    answer_db = Answer()
                    answer_db.answer_text = answer_text
                    answer_db.correct_answer = correct_answer
                    # adding question to answer
                    answer_db.question_db = question_db
                    answer_db.save()
                    # adding answers to question
                    question_db.answers.add(answer_db)
                # adding questions to test
                serializer.save().questions.add(question_db)
            


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

# kst
class GetKnowledgeSpaceById(generics.RetrieveAPIView):
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

class GetAllKnowledgeSpacesForCourse(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = KnowledgeSpaceSerializer 
    # This view should return a list of all the knowledge spaces for a chosen course 
    def get_queryset(self):
        domain = Domain.objects.get(course__id=self.kwargs['pk'])
        return KnowledgeSpace.objects.filter(domain__id=domain.id)