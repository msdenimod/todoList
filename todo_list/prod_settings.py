import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'g=fvt8m5bumyv*!y13p$+0q5*3505__fet#xr9+!sk)($ih$0c'

DEBUG = True

ALLOWED_HOSTS = ['todolistday.ru']

EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'cm89591_todo',
#         'USER': 'cm89591_todo',
#         'PASSWORD': 'K11Sk3EL',
#         'HOST': 'localhost',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

STATIC_DIR = os.path.join(BASE_DIR, 'static')
# STATICFILES_DIRS = [STATIC_DIR]
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
