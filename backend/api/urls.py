from urllib.parse import urlparse
from django.urls import path 
from . import views 

urlpatterns = [
    # File
    path('',views.getData),
    path('create/',views.createData),
    path('save/',views.save),
    path('files/',views.getAllFiles),
    path('file/',views.getFileAndData),
    path('delete_files/',views.deleteFiles),
    path('download/',views.download),
    path('remove/',views.remove),
    # Discipline
    path('disciplines/',views.getDisciplines),
    path('discipline/',views.getDisciplineByID),
    path('add_discipline/',views.addDiscipline),
    path('update_discipline/',views.updateDiscipline),
    path('delete_discipline/',views.deleteDiscipline),

    # Courses
    path('courses/',views.getCourses),
    path('course/',views.getCourseByID),
    path('add_course/',views.addCourse),
    path('update_course/',views.updateCourse),
    path('delete_course/',views.deleteCourse),

    # Learning Units
    path('learning_units/',views.getLearningUnits),
    path('learning_unit/',views.getLearningUnitByID),
    path('add_learning_unit/',views.addLearningUnits),
    path('update_learning_unit/',views.updateLearningUnits),
    path('delete_learning_unit/',views.deleteLearningUnits),

    # Learning Outcomes
    path('learning_outcomes/',views.getLearningOutcomes),
    path('learning_outcome/',views.getLearningOutcomeByID),
    path('add_learning_outcome/',views.addLearningOutcomes),
    path('update_learning_outcome/',views.updateLearningOutcomes),
    path('delete_learning_outcome/',views.deleteLearningOutcomes),



    # Study Materials
    path('study_materials/',views.getStudyMaterials),
    path('study_material/',views.getStudyMaterialByID),
    path('add_study_material/',views.addStudyMaterials),
    path('update_study_material/',views.updateStudyMaterials),
    path('delete_study_material/',views.deleteStudyMaterials),
]