from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from users.views import FacebookLogin

import django_js_reverse.views
from rest_framework.routers import DefaultRouter
from common.routes import routes as common_routes
router = DefaultRouter()

routes = common_routes

for route in routes:
    router.register(route['regex'], route['viewset'],
                    basename=route['basename'])

urlpatterns = [
    path("", include("common.urls"), name="common"),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),

    path("api/", include(router.urls), name="api"),
    path("api/assignments/", include("assignments.api.assignment.urls"), name="api"),
    path("api/", include("users.urls"), name="user"),

]
