# Generated by Django 4.1.1 on 2022-11-06 14:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_alter_curriculumfiles_excelfile'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CurriculumFiles',
        ),
    ]