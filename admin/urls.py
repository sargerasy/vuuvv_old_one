# These URLs are normally mapped to /admin/urls.py. This URLs file is
# provided as a convenience to those who want to deploy these URLs elsewhere.
# This file is also used to provide a reliable view deployment for test purposes.

from django.conf.urls.defaults import *
import views


urlpatterns = patterns('',
	(r'^appdata$', views.appdata),
	(r'^menu/save$', views.save_menu),
)

