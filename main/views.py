from django.shortcuts import render, redirect


def index(request):
    """Главная страница"""
    if request.user.is_authenticated:
        return redirect("tasks")

    return render(request, 'main/index.html')


def main(request):
    """Главная страница"""
    return render(request, 'main/index.html')