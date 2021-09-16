from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from .models import User

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(
        detail=False,
        methods=['post', 'get'],
        permission_classes=[AllowAny],
        url_path='register',
    )
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            if serializer.create(serializer.data):
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
