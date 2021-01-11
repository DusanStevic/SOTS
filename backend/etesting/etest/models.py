from django.db import models
from accounts.models import Student, Teacher
from django.utils.html import strip_tags


class Domain(models.Model):
    title = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f'{self.title}'

class KnowledgeSpace(models.Model):
    domain = models.OneToOneField(Domain, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return 'Knowledge space'+f'{self.id}'

class Node(models.Model):
    knowledge_space = models.ForeignKey(KnowledgeSpace, on_delete=models.CASCADE, related_name='nodes', null=True, blank=True)
    node_id = models.CharField(max_length=255, null=True)
    node_label = models.CharField(max_length=255, null=True)
    def __str__(self):
        return f'{self.node_label}'
        
class Link(models.Model):
    knowledge_space = models.ForeignKey(KnowledgeSpace, on_delete=models.CASCADE, related_name='links', null=True, blank=True)
    link_id = models.CharField(max_length=255, null=True)
    link_label = models.CharField(max_length=255, null=True)
    source = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='source_node', null=True, blank=True)
    target = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='target_node', null=True, blank=True)
    def __str__(self):
        return f'{self.link_label}'

class Course(models.Model):
    title = models.CharField(max_length=255, null=True)
    teachers = models.ManyToManyField(Teacher)
    students = models.ManyToManyField(Student)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'course'
        verbose_name_plural = 'courses'

class Answer(models.Model):
    title = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f'{strip_tags(self.title)}'

    class Meta:
        verbose_name = 'answer'
        verbose_name_plural = 'answers'


class Question(models.Model):
    title = models.TextField(blank=True, null=True)
    answers = models.ManyToManyField(Answer)

    def __str__(self):
        return f'{strip_tags(self.title)}'

    class Meta:
        verbose_name = 'question'
        verbose_name_plural = 'questions'

class Test(models.Model):
    title = models.CharField(max_length=255, null=True)
    image = models.ImageField(blank=True, default='')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)
    questions = models.ManyToManyField(Question)

    def __str__(self):
        return f'{strip_tags(self.title)}'

    class Meta:
        verbose_name = 'test'
        verbose_name_plural = 'tests'