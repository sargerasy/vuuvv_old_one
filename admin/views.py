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

def save_menu(request):
	label = request.REQUEST["label"]
	icon = request.REQUEST["icon"]
	tooltip = request.REQUEST["tooltip"]
	command = request.REQUEST["command"]
	parent = request.REQUEST["parent"]
	id = request.REQUEST["id"]
	if id == "-1":
		logging.info("new")
		menu = models.Menu(
				label = label,
				icon = icon,
				tooltip = tooltip,
				command = command,
				parent = models.Menu.objects.get(pk=int(parent))
				)
		menu.save()
		logging.info(menu.pk);
	else:
		logging.info("update")
	return HttpResponse(json.dumps("{id: 1}"));


