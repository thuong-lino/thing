from django.urls import path

from . import views

app_name = 'assignments'
urlpatterns = [
    path('', views.IndexView.as_view(), name='assignments'),
    path('<int:id>/', views.IndexView.as_view(), name='assignment_detail'),
    path('create/', views.IndexView.as_view(), name='assignment_create'),
]
