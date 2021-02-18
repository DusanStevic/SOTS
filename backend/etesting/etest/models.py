from django.db import models
from accounts.models import User

class Domain(models.Model):
    title = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f'{self.title}'

class KnowledgeSpace(models.Model):
    # Graph Edit Distance (GED) metric for graph comparison
    ged = models.IntegerField(default=0)
    title = models.CharField(max_length=255, null=True)
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name='knowledge_spaces', null=True)
    def __str__(self):
        return f'{self.title}'

class Node(models.Model):
    knowledge_space = models.ForeignKey(KnowledgeSpace, on_delete=models.CASCADE, related_name='nodes', null=True, blank=True)
    node_id = models.CharField(max_length=255, null=True)
    node_label = models.CharField(max_length=255, null=True)
    def __str__(self):
        return f'{self.node_label}'
        
class Link(models.Model):
    # flag for real knowledge space
    real = models.BooleanField(default=False)
    knowledge_space = models.ForeignKey(KnowledgeSpace, on_delete=models.CASCADE, related_name='links', null=True, blank=True)
    link_id = models.CharField(max_length=255, null=True)
    link_label = models.CharField(max_length=255, null=True)
    source = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='source_node', null=True, blank=True)
    target = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='target_node', null=True, blank=True)
    def __str__(self):
        return f'{self.link_label}'

class Course(models.Model):
    domain = models.OneToOneField(Domain, on_delete=models.SET_NULL, related_name='course', null=True)
    title = models.CharField(max_length=255, null=True)
    teachers = models.ManyToManyField(User, related_name='teacher_courses', blank=True)
    students = models.ManyToManyField(User, related_name='student_courses', blank=True)

    def __str__(self):
        return f'{self.title}'


class Test(models.Model):
    title = models.CharField(max_length=255, null=True)
    creator = models.ForeignKey(User, on_delete=models.SET_NULL,related_name='creator', null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='tests', null=True)
    

    def __str__(self):
        return f'{self.title}'

class Question(models.Model):
    question_text = models.TextField(blank=True, null=True)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='questions', null=True)
    problem = models.OneToOneField(Node, on_delete=models.SET_NULL, related_name='question', null=True)

    def __str__(self):
        return f'{self.question_text}'


class Answer(models.Model):
    answer_text = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.SET_NULL, related_name='answers', null=True)
    correct_answer = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.answer_text}'

class CompletedTest(models.Model):
    score = models.IntegerField(default=0)
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='completed_test', null=True)
    student = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='completed_test', null=True)

    def __str__(self):
        return 'Completed test '+f'{self.id}'+' (Course:'+ f'{self.test.course.title}|Test:{self.test.title}|Student\'s full Name:{self.student.first_name} {self.student.last_name}|Score on test:{self.score}' +')'


class ChosenAnswer(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='answer_chosen_answers', null=True)
    completed_test = models.ForeignKey(CompletedTest, on_delete=models.CASCADE, related_name='completed_test_chosen_answers', null=True)
    

    def __str__(self):
        return f'{self.answer.answer_text}'