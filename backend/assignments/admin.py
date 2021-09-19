from django.contrib import admin
from .models import Assignment, Question, ConstructedResponseQuestion, GradedAssignment, Choice


admin.site.register(Assignment)
admin.site.register(Question)
admin.site.register(ConstructedResponseQuestion)
admin.site.register(GradedAssignment)
admin.site.register(Choice)
