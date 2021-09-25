from rest_framework import serializers
from ..models import Assignment, ConstructedResponseQuestion, GradedAssignment, Question, Choice
from users.models import User
from django.db import transaction


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'choices', 'question', 'order')


class CRQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ConstructedResponseQuestion
        fields = ('id', 'question', 'order')


class AssignmentSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    CRQs = CRQuestionSerializer(many=True, read_only=True)
    teacher = StringSerializer(many=False)
    student = StringSerializer(many=True)

    class Meta:
        model = Assignment
        fields = ['id', 'title', 'teacher', 'student',
                  'questions', 'CRQs']

    @transaction.atomic
    def create(self, request):
        data = request.data
        print('##############################')
        print(data)
        assignment = Assignment()
        teacher = User.objects.get(pk=data['teacher'])
        assignment.teacher = teacher
        assignment.title = data['title']
        assignment.save()

        students = data['student']
        for each in students:
            student = User.objects.get(email=each)
            assignment.student.add(student)
        assignment.save()

        order = 1
        for q in data['questions']:
            newQ = Question()
            newQ.question = q['question']
            newQ.order = order
            newQ.save()

            for c in q['choices']:
                newC = Choice()
                newC.title = c
                newC.save()
                newQ.choices.add(newC)

            answer = Choice.objects.filter(title=q['answer'])
            newQ.answer = answer[0]
            newQ.assignment = assignment
            newQ.save()
            order += 1
        return assignment


class SRQs_GradedSerializer(serializers.ModelSerializer):
    student = StringSerializer()
    assignment = StringSerializer()

    class Meta:
        model = GradedAssignment
        fields = ('student', 'assignment', 'SRQs_grade', 'CRQs_grade')
        read_only_fields = ['SRQs_grade', 'CRQs_grade']

    def create(self, request):
        data = request.data
        userAns = data['userAnswers']
        student = User.objects.get(pk=data["userID"])
        assignment = Assignment.objects.get(pk=data["asntId"])
        questions = Question.objects.filter(assignment=data["asntId"])
        print(questions)
        count = 0
        for qn in questions:
            order = str(qn.order)
            print(order)
            if str(qn.answer) == userAns[order]:
                count += 1
        SRQs_grade = count / len(questions) * 100
        SRQs_grade = GradedAssignment.objects.create(
            student=student, assignment=assignment, SRQs_grade=SRQs_grade)
        SRQs_grade.save()
        return SRQs_grade
