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

import pandas as pd
import numpy as np
import sys
sys.path.append('kst_lib/learning_spaces/')
from kst_lib.learning_spaces.kst import iita

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

class GetRealKnowledgeSpaceById(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTeacherUser]
    serializer_class = KnowledgeSpaceSerializer
    
    # NAPISI BOLJI KOMENTAR STA SE STVARNO DOGADJA
    # This view should return a chosen test 
    # that is going to be executed by the currently authenticated student.
    def get_queryset(self):
        matrix_iita = {}
        chosen_answer_counter = 0
        knowledge_space = KnowledgeSpace.objects.filter(id=self.kwargs['pk'])
        # initializing matrix iita
        for node in knowledge_space[0].nodes.all():
            matrix_iita[node.id] = []

        print(matrix_iita)
        # one problem one question (one question one problem)
        # problem (node) -> question -> test -> completed tests -> chosen answers
        # from lazy fetch to eager fetch
        print(knowledge_space[0].nodes.all()[0].id)
        # node = problem
        
        for node in knowledge_space[0].nodes.all():
            print(node)
            node_id = node.id
            problem = get_object_or_404(Node, id=node_id)
            print(problem.id)
            question = Question.objects.get(problem__id=problem.id)
            print(question.test_id)
            test_id = question.test_id
            completed_tests = CompletedTest.objects.filter(test_id=test_id)
            print(completed_tests)
            for completed_test in completed_tests: 
                print(completed_test)
                chosen_answers = ChosenAnswer.objects.filter(completed_test_id=completed_test.id)
                print(chosen_answers)
        
                while chosen_answer_counter < len(chosen_answers):
                #for chosen_answer in chosen_answers:
                    if chosen_answers[chosen_answer_counter].answer.correct_answer == True:
                        matrix_iita[node_id].append(1)
                        break
                    else:
                        matrix_iita[node_id].append(0)
                        break
            chosen_answer_counter = chosen_answer_counter + 1        
                    


        print(matrix_iita)
        # activate iita algorithm from kst-lib
        # db data
        db_data_frame = pd.DataFrame(matrix_iita)
        # pisa data
        #pisa_data_frame = pd.read_csv("kst_lib/pisa.txt", sep='\s+')
        #print(pisa_data_frame)
        #pisa_data_frame.columns = db_data_frame.columns
        #print(pisa_data_frame.columns)
        #print(db_data_frame.columns)
        
        #db_data_frame = db_data_frame.append(pisa_data_frame)
        #print(db_data_frame)
        response = iita(db_data_frame, v=1)
        print(response)

        # mapping iita implications nodes to existing nodes
        existing_nodes_ids = list(dict.fromkeys(matrix_iita))
        print(existing_nodes_ids)
        # initializing mapped matrix
        matrix_mapped = {}
        for implication in range(len(response["implications"])):
            matrix_mapped[implication] = (0,0)
        
        


        # implications = links between nodes
        implications_nodes_ids = []
        for source,target  in response["implications"]:
            implications_nodes_ids.append(source)
            implications_nodes_ids.append(target)
        implications_nodes_ids = list(dict.fromkeys(implications_nodes_ids))
        implications_nodes_ids.sort()
        print(implications_nodes_ids)

        for implication_node_id in range(len(implications_nodes_ids)):
            for implication in range(len(response["implications"])):
                if response["implications"][implication][0]==implication_node_id:
                    matrix_mapped[implication] = (existing_nodes_ids[implication_node_id], matrix_mapped[implication][1])
                elif response["implications"][implication][1]==implication_node_id:
                    matrix_mapped[implication] = (matrix_mapped[implication][0],existing_nodes_ids[implication_node_id])
        
        # add implications from mapped matrix to knowledge space
         
       
				
			
		

        


        
          
        print(matrix_mapped) 
        return knowledge_space
        