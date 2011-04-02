from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder, Serializer
from utils import models_to_dict, model_to_obj
from django.db import models
from models import Menu as Nav
from main.models import Article, Menu, Publication, Category, Page, Product
import settings
import os
import json
import logging

def appdata(request):
	data = {"appdata": {
		"menus": models_to_dict(Nav.objects.all()),
	}}

	return HttpResponse(json.dumps(data))

def modelop(attachable=False):
	return ModelOp(attachable)

class ModelOp(object):
	attach = {
		"Article": {"Category": {"category": 1}},
		"Publication": {"Category": {"category": 5}},
		"Menu": {"Menu": {}},
	}

	def __init__(self, attachable=False):
		self.attachable  = attachable

	def get_attach(self, name):
		obj = {}
		attach = self.attach.get(name, {})
		for k, v in attach.items():
			try:
				cls = globals()[k]
				if (issubclass(cls, models.Model)):
					kwargs = {}
					for k1, v1 in v.items():
						kwargs[k1 + "__exact"] = v1
					obj[k] = list(cls.objects.filter(**kwargs).values())
			except KeyError:
				pass
		return obj

	def __call__(self, func):
		def _func(request, name, *args):
			obj = self.get_attach(name) if self.attachable else {}
			try:
				cls = globals()[name]
				if (issubclass(cls, models.Model)):
					obj["value"] = func(request, cls, *args)
			except KeyError:
				pass
			return HttpResponse(json.dumps(obj, cls=DjangoJSONEncoder))
		return _func

@modelop()
def count(request, cls):
	obj = doquery(request, cls)
	return obj.count()

@modelop()
def save(request, cls):
	ret = {"create": False, "id": None}
	post = request.POST
	fields = dict([(a.attname, post.get(a.attname)) for a in cls._meta.fields if a.attname in post])
	id = int(fields["id"])
	if id == -1:
		ret["create"] = True
		fields.pop("id")
	model = cls(**fields)
	model.save()
	ret["id"] = model.id
	return ret

@modelop(True)
def query(request, cls):
	obj = doquery(request, cls)
	return list(obj)

def doquery(request, cls):
	fields = request.POST.get("fields", [])
	conditions = request.POST.get("conditions", [])
	orderby = request.POST.get("orderby", [])

	if fields:
		fields = json.loads(fields)
		if fields and "id" not in fields:
			fields.append("id")
	if conditions:
		conditions = json.loads(conditions)
	if orderby:
		orderby = json.loads(orderby)

	kwargs = {}
	for item in conditions:
		key = "__".join(item[0:2])
		kwargs[key] = item[2]

	obj = cls.objects.filter(**kwargs).order_by(*orderby).values(*fields)
	return obj

def delete(request, cls):
	pass

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

def product(request):
	data = {"product": models_to_dict(Menu.objects.all())}

	return HttpResponse(json.dumps(data))

def nav(request):
	data = {"nav": models_to_dict(Menu.objects.all())}

	return HttpResponse(json.dumps(data))

def save_nav(request):
	label = request.REQUEST["label"]
	url = request.REQUEST["url"]
	order = request.REQUEST["order"]
	level = request.REQUEST["level"]
	pid = request.REQUEST["parent"]
	id = request.REQUEST["id"]

	parent = Menu.objects.get(pk=int(pid)) if pid != "-1" else None
	menu = Menu() if id == "-1" else Menu.objects.get(pk=int(id))
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
		model = Menu.objects.get(pk=id)
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
		parent = Nav.objects.get(pk=int(pid))
	if id == "-1":
		menu = Nav()
		create = True
	else:
		menu = Nav.objects.get(pk=int(id))
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
		model = Nav.objects.get(pk=id)
		model.delete()

	obj = {"ids": ids}
	return HttpResponse(json.dumps(obj))

def pages(request):
	model = Page.objects.order_by("url").values("id", "url")
	return HttpResponse(json.dumps(list(model)))

def page_id(request, id):
	obj = {"create": False, "page": None}
	model = Page.objects.filter(id__exact=id).values("id", "title", "url", "keywords", "desc", "content", "template")
	if len(model) > 0:
		obj["page"] = model[0]
	return HttpResponse(json.dumps(obj))

def page(request, url):
	obj = {"create": False, "page": None}
	model = Page.objects.filter(url__exact=url).values("id", "title", "url", "keywords", "desc", "content", "template")
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

	page = Page() if id == "-1" else Page.objects.get(pk=int(id))

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
