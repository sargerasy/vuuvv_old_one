# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
import django.views.static
import logging
import utils
import json

__obj = None

def sort_items(d):
	""" d should be a dict """
	ret = d.items()
	s = sorted(ret, key=lambda x: x[1]["order"])
	return s;

def index(request):
	obj = get_obj()
	menus = _parse_menus("home", obj)
	nav_menu, sub_menu, tabs, last_menu = [ [x[0], sort_items(x[1])] for x in menus ][:4]

	return render_to_response("main/index.html", {
		"subs": generate_all_subs(obj["sitemap"]),
		"root": "/",
		"title": get_title_from_menus(menus),
		"menus": [ [x[0], sort_items(x[1])] for x in menus ],
	})

def find_in_array(a, name):
	for i in a:
		if name == i["name"]:
			return i
	return None

def get_obj():
	global __obj
	if(__obj):
		return __obj

	f = open("sitemap-bak.json")
	js = f.read()
	f.close()
	__obj = json.loads(js)
	return __obj

def parse_menus(path, obj):
	parts = [ i for i in path.split("/") if i]
	x = obj["sitemap"]
	selects = [(0, sort_items(x))]

	length = min(3, len(parts))
	i = -1 
	for i in range(length):
		item = x.get(parts[i], None)
		if item:
			selects.append((parts[i], sort_items(item["children"])))
			x = item["children"]
		else:
			selects.append((parts[i], ()))
			break; #should raise error for 404 page not found

	selects.extend([('', {}) for j in range(3 - i - 1)])
	return selects

def get_title_from_menus(menus):
	p = menus[1]
	i = 0
	for k, v in menus:
		if not v or i > 2:
			break
		p = v
		i += 1
	
	return p[k]["name"]

def _parse_menus(path, obj):
	parts = [ i for i in path.split("/") if i]
	x = obj["sitemap"]
	selects = []
	selects.append([0, x]) # nav_menu

	length = len(parts)
	for i in range(5):
		if i < length:
			item = x.get(parts[i], None)
			if item:
				selects.append([parts[i], item["children"]])
				x = item["children"]
			else:
				selects.append([parts[i], {}])
				x = {}
		else:
			if x:
				k, v = sort_items(x)[0]
				selects.append([k, v["children"]])
				x = v["children"]
			else:
				selects.append(["", {}])
				x = {}
	return selects

def generate_all_subs(sitemap):
	ret = []
	items = sort_items(sitemap)
	for k, v in items:
		ret.append((k, sort_items(v["children"])))
	
	return ret

def joyou(request, path):
	obj = get_obj()
	menus = _parse_menus(path, obj)
	nav_menu, sub_menu, tabs, last_menu = [ [x[0], sort_items(x[1])] for x in menus ][:4]

	return render_to_response("main/ir.html", {
		"subs": generate_all_subs(obj["sitemap"]),
		"root": "/",
		"title": get_title_from_menus(menus),
		"menus": [ [x[0], sort_items(x[1])] for x in menus ],
	})

def media(request, path):
	root = getattr(settings, 'MEDIA_ROOT', None)
	return django.views.static.serve(request, path, root)

