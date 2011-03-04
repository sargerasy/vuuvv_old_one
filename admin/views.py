from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder, Serializer
import json
import models
import logging

def model_to_dict(qs):
	ret = {}
	for i in qs:
		attrs = [a.attname for a in i._meta.fields]
		ret[i.id] = {}
		for attr in attrs:
			ret[i.id][attr] = getattr(i, attr)
	
	return ret

def appdata(request):
	data = {"appdata": {
		"menus": model_to_dict(models.Menu.objects.all()),
	}}

	return HttpResponse(json.dumps(data))


