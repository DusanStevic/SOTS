from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from etest.views import *

app_name = 'etest'

urlpatterns = [
    path('<int:pk>/', Dag.as_view()),
    path('create-node', CreateNode.as_view()),
    path('question_xml/<int:pk>/', Questions),
    path('test_xml/<int:pk>/', Tests),

]