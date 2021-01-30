from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from etest.views import *
from django.urls import include, path


app_name = 'etest'

urlpatterns = [
    path('get-dag/<int:pk>', Dag.as_view()),
    path('destroy-node/<int:pk>', DestroyNode.as_view()),
    path('create-node', CreateNode.as_view()),
    path('create-link', CreateLink.as_view()),
    path('create-dag', CreateDag.as_view()),
    # courses
    path('courses/GetAllCoursesByUser', GetAllCoursesByUser.as_view()),
    path('courses/GetCourseById/<int:pk>', GetCourseById.as_view()),
    # tests
    path('tests/GetAllTestsInCourseByCreator/<int:pk>', GetAllTestsInCourseByCreator.as_view()),
    path('tests/GetTestByCreator/<int:pk>', GetTestByCreator.as_view()),
    path('tests/GetAllCompletedTestsInCourseByExecutor/<int:pk>', GetAllCompletedTestsInCourseByExecutor.as_view()),
    path('tests/GetTestXmlById/<int:pk>', GetTestXmlById.as_view()),
    path('tests/GetAllNoCompletedTestsInCourseByExecutor/<int:pk>', GetAllNoCompletedTestsInCourseByExecutor.as_view()),
    path('tests/GetTestById/<int:pk>', GetTestById.as_view()),
    path('tests/GetAllTestWithSameDomain/<int:pk>', GetAllTestWithSameDomain.as_view()),
    path('tests/GetFirstQuestionForTest/<int:pk>', GetFirstQuestionForTest.as_view()),

    path('milica', CreateChosenAnswer.as_view()),
    path('luka', CreateCompletedTest.as_view()),

    path('answers/GetAnswerById/<int:pk>', GetAnswerById.as_view()),


]