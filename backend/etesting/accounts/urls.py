from django.urls import include, path
from rest_framework import routers
from accounts import views

from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from .views import SignUp

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)


app_name = 'accounts'
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('register', SignUp.as_view()),

]