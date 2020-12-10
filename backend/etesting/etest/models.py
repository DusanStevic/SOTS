from django.db import models
from accounts.models import Student, Teacher

class Course(models.Model):
    title = models.CharField(max_length=255, null=True)
    teachers = models.ManyToManyField(Teacher)
    students = models.ManyToManyField(Student)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'course'
        verbose_name_plural = 'courses'

