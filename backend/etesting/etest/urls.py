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
    path('GetAllCoursesByUser', GetAllCoursesByUser.as_view()),
    # tests
    path('get-test/<int:pk>', Test.as_view()),
    
]