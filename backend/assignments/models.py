from django.db import models
from users.models import User
# Create your models here.


class Assignment(models.Model):
    title = models.CharField(max_length=30)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    student = models.ManyToManyField(
        User, blank=True, related_name="students")

    def __str__(self):
        return self.title


class GradedAssignment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.SET_NULL, blank=True, null=True)

    SRQs_grade = models.FloatField()
    CRQs_grade = models.FloatField()

    def __str__(self):
        return f"{self.student.username} - {self.assignment} : {self.grade}"

    def get_total_grade(self):
        return self.SRQs_grade + self.CRQs_grade


class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


# Selected Response Questions
class Question(models.Model):
    question = models.CharField(max_length=300)
    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(
        Choice, on_delete=models.CASCADE, related_name="answer", null=True)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.CASCADE, related_name="questions", null=True)
    order = models.SmallIntegerField()

    def __str__(self):
        return self.question


class AnswerSRQuestion(models.Model):
    sr_question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user_answer = models.ForeignKey(
        Choice, on_delete=models.CASCADE, related_name="user_answer", null=True)

    def __str__(self):
        return f" {self.question} - {self.user_answer}"


# constructed-response TEST
class ConstructedResponseQuestion(models.Model):
    question = models.CharField(max_length=255, null=True, blank=True)
    order = models.SmallIntegerField()
    answer = models.CharField(max_length=255, blank=True, null=True)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.CASCADE, related_name='CRQs')

    def __str__(self):
        return self.question


class AnswerCRQuestion(models.Model):
    cr_question = models.ForeignKey(
        ConstructedResponseQuestion, on_delete=models.CASCADE)
    user_answer = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self) -> str:
        return f" {self.cr_question} - {self.user_answer[:15]}"
