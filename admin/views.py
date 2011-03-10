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
	pid = request.REQUEST["parent"]
	id = request.REQUEST["id"]
	if pid == "-1":
		parent = None
	else:
		parent = models.Menu.objects.get(pk=int(pid))
	if id == "-1":
		menu = models.Menu()
		create = True
	else:
		menu = models.Menu.objects.get(pk=int(id))
		create = False

	menu.label = label
	menu.icon = icon
	menu.tooltip = tooltip
	menu.command = command
	menu.parent = parent
	menu.save()
	obj = {"id": menu.pk, "create": create}
	return HttpResponse(json.dumps(obj));

def remove_menu(request):
	ids = [int(i) for i in request.REQUEST.getlist("ids")]
	logging.info(ids)
	for id in ids:
		model = models.Menu.objects.get(pk=id)
		model.delete()

	obj = {"ids": ids}
	return HttpResponse(json.dumps(obj));

