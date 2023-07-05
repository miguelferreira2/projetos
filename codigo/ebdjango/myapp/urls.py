from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.HomeView.as_view(), name ='home'),
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('camera/', views.faceRekognition.as_view(), name='camera')
]