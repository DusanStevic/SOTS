from django.contrib import admin
from etest.models import Course, Domain, KnowledgeSpace,Node,Link

# Register your models here.
admin.site.register(Course)
admin.site.register(Domain)
admin.site.register(KnowledgeSpace)
admin.site.register(Node)
admin.site.register(Link)
