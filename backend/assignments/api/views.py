from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from ..models import Assignment, GradedAssignment
from users.models import User
from .serializers import AssignmentSerializer, SRQs_GradedSerializer
from ..utils import highest_SRQs_grade
from rest_framework.permissions import IsAuthenticated


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    #queryset = Assignment.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = Assignment.objects.all()
        userID = self.request.query_params.get("userID", None)
        if userID != None:
            user = User.objects.get(pk=userID)
            if user.is_teacher:
                queryset = Assignment.objects.filter(
                    teacher__pk=userID)
            else:
                queryset = Assignment.objects.filter(
                    student__pk=userID)
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
    serializer_class = SRQs_GradedSerializer

    def get_queryset(self):
        queryset = GradedAssignment.objects.all()
        # userid pk
        print(queryset)
        userID = self.request.query_params.get('userID', None)
        assignmentID = self.request.query_params.get('assignmentID', None)
        if userID is not None:
            queryset = queryset.filter(
                student_id=userID, assignment_id=assignmentID)
            queryset = highest_SRQs_grade(queryset)
        return queryset


class SubmitAssignmentView(CreateAPIView):
    serializer_class = SRQs_GradedSerializer

    def post(self, request):
        serializer = SRQs_GradedSerializer(data=request.data)
        assignment = serializer.create(request)
        if serializer.is_valid():
            if assignment:
                return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
