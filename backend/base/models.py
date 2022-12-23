from django.db import models

# Create your models here.
from django.db import models

# Create your models here.

class Discipline(models.Model):
    discipline_code = models.CharField(max_length=250,unique=True)
    discipline_name = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)

class Course(models.Model):
    course_code = models.CharField(max_length=250,unique=True)
    course_name = models.CharField(max_length=250)
    discipline_id = models.ForeignKey("Discipline",on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    
class Learning_Units(models.Model):
    title = models.TextField()
    level = models.CharField(max_length = 250)
    course_id = models.ForeignKey("Course", on_delete=models.CASCADE)

class Learning_Outcomes(models.Model):
    title = models.TextField()
    state = models.CharField(max_length = 250)

class Study_Materials(models.Model):
    title = models.TextField()
    material_type = models.CharField(max_length=250)

class CurriculumFiles(models.Model):
    filename = models.TextField()
    excelFile = models.BinaryField()

