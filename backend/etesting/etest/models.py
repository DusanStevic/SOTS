from django.db import models
from django.conf import settings

# Create your models here.

class Etest(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(blank=True, default='')
    # potrebno je dodati listu profesora koji su kreirali taj test ili kurs
    # na predthodnom terminu su pricali kako vise prof moze da se doda na jedan test
    # a neki su samo test vezali za kurs 
    # mozemo napraviti da prof vezemo za kurs, a onda test za kurs
    # tako da svaki novi test koji kreiramo i dodamo testu bice automatski dodat i prof koji drze taj kurs tako da 
    # ce ih oni videti

class Question(models.Model):
    etest = models.ForeignKey(Etest, on_delete=models.CASCADE)
    label = models.CharField(max_length=100)

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)

class TestTaker(models.Model):
    # ovde treba dodati da je to student
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    test = models.ForeignKey(Etest, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)

class UsersAnswer(models.Model):
    test_taker = models.ForeignKey(TestTaker, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, null=True)

class Course(models.Model):
    name = models.CharField(max_length=100)