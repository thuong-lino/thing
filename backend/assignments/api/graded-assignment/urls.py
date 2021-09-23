from ..views import SubmitAssignmentView, GradedAssignmentListView
from django.urls import path


urlpatterns = [
    path('', GradedAssignmentListView.as_view()),
    path('submit/', SubmitAssignmentView.as_view())
]
