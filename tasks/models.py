from django.db import models
import datetime


class Task(models.Model):
    """Задачи"""
    user_id = models.IntegerField("Автор", 0)
    title = models.CharField("Заголовок", max_length=255)
    description = models.TextField("Описание", blank=True)
    date_create = models.DateField("Дата создания", auto_now_add=True)
    date = models.DateField("Дата выполнения")
    done = models.BooleanField("Выполнено", default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"

    def tomorrow(self):
        tomorrowDate = datetime.date.today() + datetime.timedelta(days=1)
        return tomorrowDate
