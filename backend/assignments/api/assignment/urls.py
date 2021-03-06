from rest_framework.routers import DefaultRouter
from ..views import AssignmentViewSet

router = DefaultRouter()
router.register(r'', AssignmentViewSet, basename='assignment')
urlpatterns = router.urls
