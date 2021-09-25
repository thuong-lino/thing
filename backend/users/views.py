from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .serializers import UserSerializer, StudentSerializer

from .models import User

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class StudentListView(ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = User.objects.filter(is_teacher=False)
        return queryset
