from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from etest.views import *

app_name = 'etest'

urlpatterns = [

    # courses
    path('courses/GetAllCoursesByUser', GetAllCoursesByUser.as_view()),
    path('courses/GetCourseById/<int:pk>', GetCourseById.as_view()),
    # tests
    path('tests/GetAllTestsInCourseByCreator/<int:pk>', GetAllTestsInCourseByCreator.as_view()),
    path('tests/GetTestByCreator/<int:pk>', GetTestByCreator.as_view()),
    path('tests/GetAllCompletedTestsInCourseByExecutor/<int:pk>', GetAllCompletedTestsInCourseByExecutor.as_view()),
    path('tests/GetCompletedTestByExecutor/<int:pk>', GetCompletedTestByExecutor.as_view()),
    path('tests/GetAllUncompletedTestsInCourseByExecutor/<int:pk>', GetAllUncompletedTestsInCourseByExecutor.as_view()),
    path('tests/GetUncompletedTestByExecutor/<int:pk>', GetUncompletedTestByExecutor.as_view()),
    path('tests/GetTestXmlById/<int:pk>', GetTestXmlById.as_view()),
    path('tests/CreateCompletedTest', CreateCompletedTest.as_view()),
    path('tests/CreateTest', CreateTest.as_view()),
    #kst 
    path('destroy-node/<int:pk>', DestroyNode.as_view()),
    path('create-node', CreateNode.as_view()),
    path('create-link', CreateLink.as_view()),
    path('create-dag', CreateDag.as_view()),
    path('kst/GetAllKnowledgeSpacesForCourse/<int:pk>', GetAllKnowledgeSpacesForCourse.as_view()),
    path('kst/GetKnowledgeSpaceById/<int:pk>', GetKnowledgeSpaceById.as_view()),

]