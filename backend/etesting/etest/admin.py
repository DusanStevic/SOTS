from django.contrib import admin
from .models import Etest, Question, Answer, UsersAnswer, TestTaker, Course
import nested_admin


class AnswerInline(nested_admin.NestedTabularInline):
	model = Answer 


class QuestionInline(nested_admin.NestedTabularInline):
	model = Question
	inlines = [AnswerInline,]


class EtestAdmin(nested_admin.NestedModelAdmin):
	inlines = [QuestionInline,]


class UsersAnswerInline(admin.TabularInline):
	model = UsersAnswer


class TestTakerAdmin(admin.ModelAdmin):
	inlines = [UsersAnswerInline,]


admin.site.register(Etest, EtestAdmin)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(TestTaker, TestTakerAdmin)
admin.site.register(UsersAnswer)
admin.site.register(Course)
