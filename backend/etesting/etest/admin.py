from django.contrib import admin
from etest.models import *

# Register your models here.

admin.site.register(Domain)
admin.site.register(KnowledgeSpace)
admin.site.register(Node)
admin.site.register(Link)
admin.site.register(Course)
admin.site.register(Test)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(CompletedTest)
admin.site.register(ChosenAnswer)

