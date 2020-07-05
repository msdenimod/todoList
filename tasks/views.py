from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic.base import View

from .models import Task
import datetime


class TasksView(View):
    """Список задач"""
    def get(self, request):

        if not request.user.is_authenticated:
            return redirect("account_login")

        date = datetime.datetime.today()
        tasks = Task.objects.filter(date=date, user_id=request.user.id)
        return render(request, 'tasks/index.html', {'tasks_list': tasks, 'date': date.strftime("%Y-%m-%d"), 'date_format': date.strftime("%d.%m.%Y")})


def checked_task_ajax(request, pk):
    """меняем статус на обратный"""
    if not request.user.is_authenticated:
        return 'not_access'

    task = Task.objects.get(id=pk)

    task.done = not task.done

    task.save()

    return HttpResponse(task.done)


def get_tasks_by_date(request):
    """достаем задачи по дате ajax"""
    if not request.user.is_authenticated:
        return False

    tasks = ''
    date = datetime.datetime.now()
    if request.method == 'POST':
        date = request.POST['date']
        tasks = Task.objects.filter(date=date, user_id=request.user.id)

    return render(request, 'tasks/tasks.html', {'tasks_list': tasks, 'date': date})


def add_task(request):
    """Добавляем задачу ajax"""
    if not request.user.is_authenticated:
        return HttpResponse('not_access')

    if request.method == 'POST' and request.POST['title'] != '':
        title = request.POST['title']
        description = request.POST['description']
        date = request.POST['date']

        task = Task(title=title, description=description, date=date, user_id=request.user.id)
        task.save()

        tasks = Task.objects.filter(date=date, user_id=request.user.id)

        return render(request, 'tasks/tasks.html', {'tasks_list': tasks, 'date': date})

    if request.POST['title'] == '':
        return HttpResponse('empty_title')

    return HttpResponse(False)
