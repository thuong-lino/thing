from ..views import CreateAssignmentView, GradedAssignmentListView
from django.urls import path


urlpatterns = [
    path('', GradedAssignmentListView.as_view()),
    path('create/', CreateAssignmentView.as_view())
]
