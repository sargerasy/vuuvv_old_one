# These URLs are normally mapped to /admin/urls.py. This URLs file is
# provided as a convenience to those who want to deploy these URLs elsewhere.
# This file is also used to provide a reliable view deployment for test purposes.

from django.conf.urls.defaults import *
import views


urlpatterns = patterns('',
	(r'^appdata$', views.appdata),
	(r'^count/(.+)', views.count),
	(r'^save/(.+)', views.save),
	(r'^articlecount$', views.articlecount),
	(r'^article/(\d+)/(\d+)', views.article),
	(r'^articledetail/(.+)$', views.articledetail),
	(r'^publicationcount$', views.publicationcount),
	(r'^publication/(\d+)/(\d+)', views.publication),
	(r'^publicationdetail/(.+)$', views.publicationdetail),
	(r'^nav$', views.nav),
	(r'^nav/save', views.save_nav),
	(r'^nav/remove', views.remove_nav),
	(r'^menu/save$', views.save_menu),
	(r'^menu/remove$', views.remove_menu),
	(r'^pages$', views.pages),
	(r'^page/save$', views.save_page),
	(r'^page/remove$', views.remove_page),
	(r'^page/id/(\d+)', views.page_id),
	(r'^page/(.+)$', views.page),
	(r'^file/(.*)$', views.file),
	(r'^upload$', views.upload),
)

