from re import T
from rest_framework import serializers
from .models import Assignment, ConstructedResponseQuestion, GradedAssignment, Question, Choice
from users.models import User


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
    CRQs = CRQuestionSerializer(many=True)
    teacher = StringSerializer(many=False)
    student = StringSerializer(many=True)

    class Meta:
        model = Assignment
        fields = ['id', 'title', 'teacher', 'student', 'questions', 'CRQs']

    def create(self, request):
        data = request.data

        assignment = Assignment()
        teacher = User.objects.get(username=data['teacher'])
        assignment.teacher = teacher
        assignment.title = data['title']
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


class GradedSerializer(serializers.ModelSerializer):
    student = StringSerializer()
    assignment = StringSerializer()

    class Meta:
        model = GradedAssignment
        fields = ('student', 'assignment', 'grade')

    def create(self, request):
        data = request.data
        userAns = data['usersAnswers']
        student = User.objects.get(username=data["student"])
        assignment = Assignment.objects.get(pk=data["asntId"])
        questions = Question.objects.filter(assignment=data["asntId"])
        count = 0
        for qn in questions:
            order = str(qn.order)
            # print(qn.answer)
            if str(qn.answer) == userAns[order]:
                count += 1
        grade = count / len(questions) * 100
        graded = GradedAssignment.objects.create(
            student=student, assignment=assignment, grade=grade)
        graded.save()
        return graded
