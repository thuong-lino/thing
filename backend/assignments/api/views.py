from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
from ..models import Assignment, GradedAssignment
from users.models import User
from ..serializers import AssignmentSerializer, GradedSerializer
from ..utils import highest_grade


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    #queryset = Assignment.objects.all()

    def get_queryset(self):
        queryset = Assignment.objects.all()
        userID = self.request.query_params.get("userID", None)
        if userID != None:
            user = User.objects.get(pk=userID)
            if user.is_teacher:
                queryset = Assignment.objects.filter(
                    teacher__username=userID)
            else:
                queryset = Assignment.objects.filter(
                    student__username=userID)
        return queryset

    def create(self, request):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            assignment = serializer.create(request)
            if assignment:
                return Response(status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdateAssignment(APIView):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()


class GradedAssignmentListView (ListAPIView):
    serializer_class = GradedSerializer

    def get_queryset(self):
        queryset = GradedAssignment.objects.all()
        pk = self.request.query_params.get('pk', None)
        if pk is not None:
            queryset = queryset.filter(student_id=pk)
            queryset = highest_grade(queryset)
        return queryset


class CreateAssignmentView(CreateAPIView):
    serializer_class = GradedSerializer

    def post(self, request):
        serializer = GradedSerializer(data=request.data)
        assignment = serializer.create(request)
        serializer.is_valid
        if assignment:
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
