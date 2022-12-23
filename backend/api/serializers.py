from rest_framework import serializers
from base.models import Course,Discipline, Learning_Outcomes, Learning_Units, Study_Materials,CurriculumFiles


class CurriculumFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurriculumFiles
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = '__all__'

class Learning_OutcomesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learning_Outcomes
        fields = '__all__'

class Learning_UnitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learning_Units
        fields = '__all__'

class Study_MaterialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Study_Materials
        fields = '__all__'