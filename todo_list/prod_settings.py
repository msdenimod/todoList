import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'g=fvt8m5bumyv*!y13p$+0q5*3505__fet#xr9+!sk)($ih$0c'

DEBUG = True

ALLOWED_HOSTS = ['todolistday.ru', '127.0.0.1']

EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend' # TOODO Надо посмотреть как отправлять письма

DATABASES = {
    'default': {
       'ENGINE': 'django.db.backends.postgresql',
       'NAME': 'todo_db',
       'USER': 'todo',
       'PASSWORD': 'jYBpKUGL66nvDB',
       'HOST': '127.0.0.1',
       'PORT': '5432',
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
