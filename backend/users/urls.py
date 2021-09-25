from .views import UserViewSet, StudentListView
from django.urls import path
from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'user', UserViewSet, basename='User')
urlpatterns = [
    path('students/', StudentListView.as_view(),)
]
urlpatterns += router.urls
