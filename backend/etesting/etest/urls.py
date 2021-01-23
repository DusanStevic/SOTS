from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from etest.views import *

app_name = 'etest'

urlpatterns = [
    path('get-dag/<int:pk>', Dag.as_view()),
    path('destroy-node/<int:pk>', DestroyNode.as_view()),
    path('create-node', CreateNode.as_view()),
    path('create-link', CreateLink.as_view()),
    path('create-dag', CreateDag.as_view()),
    # courses
    path('courses/GetAllCoursesByUser', GetAllCoursesByUser.as_view()),
    # tests
    path('tests/create-test', CreateTest.as_view()),
    path('tests/GetAllTestsInCourseByCreator/<int:pk>', GetAllTestsInCourseByCreator.as_view()),
    path('tests/GetTestById/<int:pk>', GetTestById.as_view()),
    path('tests/GetTestXmlById/<int:pk>', GetTestXmlById.as_view()),
    path('tests/GetTestXML/<int:pk>', getXML),
    #answer
    path('create-answer', CreateAnswer.as_view()),
    path('create-question', CreateQuestion.as_view()),

]