from .views import UserViewSet

routes = [
    {'regex': r'user', 'viewset': UserViewSet, 'basename': 'User'},
]
