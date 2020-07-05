"""Определяет схемы URL для main."""

from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='index')
]
