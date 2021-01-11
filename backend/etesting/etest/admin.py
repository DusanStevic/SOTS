from django.contrib import admin
from etest.models import Course, Domain, KnowledgeSpace,Node,Link, Answer, Question, Test

# Register your models here.
admin.site.register(Course)
admin.site.register(Domain)
admin.site.register(KnowledgeSpace)
admin.site.register(Node)
admin.site.register(Link)
admin.site.register(Answer)
admin.site.register(Question)
admin.site.register(Test)