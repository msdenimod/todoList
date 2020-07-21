"""Определяет схемы URL для tasks."""

from django.urls import path

from .views import *

urlpatterns = [
    path('', TasksView.as_view(), name='tasks'),
    path('checked_task_ajax/<int:pk>/', checked_task_ajax, name='checked_task_ajax'),
    path('add_task/', add_task, name='add_task'),
    path('get_tasks_by_date/', get_tasks_by_date, name='get_tasks_by_date'),
    path('for_tomorrow/', for_tomorrow, name='for_tomorrow'),
    path('for_today/', for_today, name='for_today'),
    path('get_task_by_id/', get_task_by_id, name='get_task_by_id'),
    path('edit_task/', edit_task, name='edit_task'),
    path('delete_task/', delete_task, name='delete_task'),
]
