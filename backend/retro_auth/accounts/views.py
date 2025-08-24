from django.shortcuts import render
import os
# Create your views here.
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import RegisterSerializer
from rest_framework.views import APIView

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

# Customizing JWT Auth
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)  # calls the original post function to generate the tokens

        if response.status_code == 200:
            refresh = response.data.get("refresh")
            access = response.data.get("access")

            # Move refresh token to HttpOnly cookie (browser stores it, js cannot readd it)
            res = Response({"access": access})
            res.set_cookie(
                key="refresh_token",
                value=refresh,
                httponly=True, # JS cannot access the cookie; protection from XSS attacks
                secure=not os.environ.get("DEBUG", True),  # False in dev, True in prod
                samesite="Strict", # CSRF protection
                max_age=7*24*60*60, # 7 days
            )
            return res # return response with only access token in body
        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token") or request.data.get("refresh") # get refresh token from HttpOnly cookie
        if refresh_token is None:
            return Response({"error": "No refresh token"}, status=400)

        try:
            refresh = RefreshToken(refresh_token) # validate the refresh token
            access_token = str(refresh.access_token) # get new access token
            return Response({"access": access_token})
        except Exception as e:
            return Response({"error": "Invalid refresh token"}, status=400)

from rest_framework.permissions import IsAuthenticated
class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"authenticated": True})
    
class VerifySequenceView(APIView):
    permission_classes = [IsAuthenticated]

    correct_sequence = [3, 1, 5, 2]  # keep here, or load from DB later

    def post(self, request, *args, **kwargs):
        user_sequence = request.data.get("sequence", [])

        if user_sequence == self.correct_sequence:
            return Response({"key": "SHADOW-2025"}, status=status.HTTP_200_OK)
        return Response({"error": "Wrong sequence"}, status=status.HTTP_400_BAD_REQUEST)