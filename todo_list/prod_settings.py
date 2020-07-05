import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'fdghj=1!rpotuueijtklmqewtu9*!9+0q5*349021#xr9+!sk)($$huejf'

DEBUG = False

ALLOWED_HOSTS = ['todolistday.ru']

EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'

DATABASES = {
    'default': {
        'NAME': 'todohi',
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'hz',
        'PASSWORD': 'hz',
        'OPTIONS': {
            'autocommit': True,
            'HOST': 'localhost',
            'PORT': ' ',
        }
    }
}

STATIC_DIR = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [STATIC_DIR]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
