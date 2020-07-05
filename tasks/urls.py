"""Определяет схемы URL для tasks."""

from django.urls import path

from .views import *

urlpatterns = [
    path('', TasksView.as_view(), name='tasks'),
    path('checked_task_ajax/<int:pk>/', checked_task_ajax, name='checked_task_ajax'),
    path('add_task/', add_task, name='add_task'),
    path('get_tasks_by_date/', get_tasks_by_date, name='get_tasks_by_date'),
]
