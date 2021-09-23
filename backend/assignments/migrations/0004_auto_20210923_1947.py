# Generated by Django 3.2.7 on 2021-09-23 12:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('assignments', '0003_auto_20210923_1909'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gradedassignment',
            name='assignment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='graded_assignment', to='assignments.assignment'),
        ),
        migrations.AlterField(
            model_name='gradedassignment',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='graded_student', to=settings.AUTH_USER_MODEL),
        ),
    ]