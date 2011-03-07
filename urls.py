from django.conf.urls.defaults import *
import main.urls
import main.views
import admin.urls

# Uncomment the next two lines to enable the admin:
from django.contrib import admin as _admin
_admin.autodiscover()

urlpatterns = patterns('',
		(r'^media/(.*)$', main.views.media),

		(r'^_admin/doc/', include('django.contrib.admindocs.urls')),
		(r'^_admin/', include(_admin.site.urls)),
		(r'^admin/', include(admin.urls)),
		(r'', include(main.urls)),
)

