# Generated by Django 3.2.7 on 2021-09-19 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_is_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='firstname',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AddField(
            model_name='user',
            name='lastname',
            field=models.CharField(default='', max_length=20),
        ),
    ]
