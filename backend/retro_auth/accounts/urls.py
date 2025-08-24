from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, CustomTokenRefreshView, CheckAuthView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path('api/check-auth/', CheckAuthView.as_view(), name='check-auth'),
]