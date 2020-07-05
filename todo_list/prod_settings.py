import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'fdghj=1!rpotuueijtklmqewtu9*!9+0q5*349021#xr9+!sk)($$huejf'

DEBUG = True

ALLOWED_HOSTS = ['todolistday.ru']

EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'cm89591_todo',
        'USER': 'cm89591_todo',
        'PASSWORD': 'K11Sk3EL',
        'HOST': 'localhost',
    }
}

STATIC_DIR = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [STATIC_DIR]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
