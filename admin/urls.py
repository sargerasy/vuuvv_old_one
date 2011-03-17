# These URLs are normally mapped to /admin/urls.py. This URLs file is
# provided as a convenience to those who want to deploy these URLs elsewhere.
# This file is also used to provide a reliable view deployment for test purposes.

from django.conf.urls.defaults import *
import views


urlpatterns = patterns('',
	(r'^appdata$', views.appdata),
	(r'^nav$', views.nav),
	(r'^nav/save', views.save_nav),
	(r'^nav/remove', views.remove_nav),
	(r'^menu/save$', views.save_menu),
	(r'^menu/remove$', views.remove_menu),
	(r'^page$', views.page),
	(r'^page/save$', views.save_page),
	(r'^page/remove$', views.remove_page),
)

