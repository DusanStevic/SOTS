from django.db import models
from accounts.models import User

class Domain(models.Model):
    title = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f'{self.title}'

class KnowledgeSpace(models.Model):
    domain = models.OneToOneField(Domain, on_delete=models.SET_NULL, related_name='knowledge_space', null=True)
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
    # dodaj referencu na domen
    title = models.CharField(max_length=255, null=True)
    teachers = models.ManyToManyField(User, related_name='teacher_courses', blank=True)
    students = models.ManyToManyField(User, related_name='student_courses', blank=True)

    def __str__(self):
        return f'{self.title}'


class Test(models.Model):
    # dodaj kreatora, kom kursu pripada
    title = models.CharField(max_length=255, null=True)

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
        return 'Completed test'+f'{self.id}'

class ChosenAnswer(models.Model):
    answer = models.OneToOneField(Answer, on_delete=models.SET_NULL, related_name='chosen_answer', null=True)
    completed_test = models.ForeignKey(CompletedTest, on_delete=models.CASCADE, related_name='chosen_answers', null=True)
    

    def __str__(self):
        return f'{self.answer.answer_text}'