import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'g=fvt8m5bumyv*!y13p$+0q5*3505__fet#xr9+!sk)($ih$0c'

DEBUG = True

ALLOWED_HOSTS = ['*']

EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend' # TOODO Надо посмотреть как отправлять письма

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'cm89591_todo',
        'USER': 'cm89591_todo',
        'PASSWORD': 'K11Sk3EL',
        'HOST': 'localhost',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/todoList/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
