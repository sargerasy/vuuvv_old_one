from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder, Serializer
from utils import models_to_dict, model_to_obj
import json
import models
import main.models
import settings
import os
import logging

def appdata(request):
	data = {"appdata": {
		"menus": models_to_dict(models.Menu.objects.all()),
	}}

	return HttpResponse(json.dumps(data))

def upload(request):
	logging.info("upload")
	if request.method == 'POST':
		file = request.FILES['Filedata']
		path = settings.PROJECT_DIR + request.POST['path']
		logging.info(path)
		logging.info(file.name)
		path = "/".join([path, file.name])
		fd = open(path, "wb+")
		for chunk in file.chunks():
			fd.write(chunk);
		fd.close()

	return HttpResponse(json.dumps({}))

def nav(request):
	data = {"nav": models_to_dict(main.models.Menu.objects.all())}

	return HttpResponse(json.dumps(data))

def save_nav(request):
	label = request.REQUEST["label"]
	url = request.REQUEST["url"]
	order = request.REQUEST["order"]
	level = request.REQUEST["level"]
	pid = request.REQUEST["parent"]
	id = request.REQUEST["id"]

	parent = main.models.Menu.objects.get(pk=int(pid)) if pid != "-1" else None
	menu = main.models.Menu() if id == "-1" else main.models.Menu.objects.get(pk=int(id))
	create = True if id == "-1" else False

	menu.label = label
	menu.url = url
	menu.order = order
	menu.level = 1 if parent is None else parent.level + 1
	menu.parent = parent
	menu.save()
	obj = {"id": menu.pk, "create": create}
	return HttpResponse(json.dumps(obj))

def remove_nav(request):
	ids = [int(i) for i in request.REQUEST.getlist("ids")]
	logging.info(ids)
	for id in ids:
		model = main.models.Menu.objects.get(pk=id)
		model.delete()

	obj = {"ids": ids}
	return HttpResponse(json.dumps(obj))

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
	return HttpResponse(json.dumps(obj))

def remove_menu(request):
	ids = [int(i) for i in request.REQUEST.getlist("ids")]
	logging.info(ids)
	for id in ids:
		model = models.Menu.objects.get(pk=id)
		model.delete()

	obj = {"ids": ids}
	return HttpResponse(json.dumps(obj))

def pages(request):
	model = main.models.Page.objects.order_by("url").values("id", "url")
	return HttpResponse(json.dumps(list(model)))

def page(request, url):
	obj = {"create": False, "url": url, "page": None}
	model = main.models.Page.objects.filter(url__exact=url).values("id", "title", "url", "keywords", "desc", "content", "template")
	if len(model) < 1:
		obj["create"] = True
	else:
		obj["page"] = model[0]

	return HttpResponse(json.dumps(obj))

def save_page(request):
	title = request.REQUEST["title"]
	url = request.REQUEST["url"]
	keywords = request.REQUEST["keywords"]
	desc = request.REQUEST["desc"]
	content = request.REQUEST["content"]
	template = request.REQUEST["template"]
	id = request.REQUEST["id"]

	page = main.models.Page() if id == "-1" else main.models.Page.objects.get(pk=int(id))

	logging.info("save")
	if page:
		page.title = title
		page.url = url
		page.keywords = keywords
		page.desc = desc
		page.content = content
		page.template = template
		page.save()

	return HttpResponse("{}")

def remove_page(request):
	return HttpResponse("{}")
	
def file(request, dir):
	import time
	path = os.path.join(settings.PROJECT_DIR, dir)
	logging.info(path)
	resp = [{"File Name": "..", "Size": 0, "Last Modified": "-", "dir": True}] 
	for root, dirs, files in os.walk(path):
		for dir in dirs:
			abpath = os.path.join(root, dir)
			resp.append({
				"File Name": dir, 
				"Size": 0, 
				"Last Modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getmtime(abpath))),
				"dir": True,
			})
		for file in files:
			abpath = os.path.join(root, file)
			resp.append({
				"File Name": file, 
				"Size": os.path.getsize(abpath), 
				"Last Modified": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getmtime(abpath))),
				"dir": False,
			})
		for i in range(len(dirs)): dirs.pop()
	return HttpResponse(json.dumps(resp))
