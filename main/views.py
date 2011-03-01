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
	ret = d.items()
	s = sorted(ret, key=lambda x: x[1]["order"])
	return s;

def index(request):
	obj = get_obj()
	nav_menu, sub_menu, tabs, last_menu = parse_menus("", obj)

	return render_to_response("main/index.html", {
		"nav_menu": nav_menu,
		"sub_menu": sub_menu,
		"tabs": tabs,
		"last_menu": last_menu,
		"sitemap": obj["sitemap"],
		"subs": generate_all_subs(obj["sitemap"]),
		"root": "/",
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

	logging.info("not cache")
	f = open("sitemap-bak.json")
	js = f.read()
	f.close()
	__obj = json.loads(js)
	return __obj

def parse_menus(path, obj):
	parts = [ i for i in path.split("/") if i]
	logging.info(str(parts))
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
			i -= 1
			break; #should raise error for 404 page not found

	logging.info(i)
	selects.extend([('', {}) for j in range(3 - i - 1)])
	return selects

def generate_all_subs(sitemap):
	ret = []
	items = sort_items(sitemap)
	for k, v in items:
		ret.append(sort_items(v["children"]))
	
	return ret

def joyou(request, path):
	obj = get_obj()
	nav_menu, sub_menu, tabs, last_menu = parse_menus(path, obj)

	return render_to_response("main/ir.html", {
		"nav_menu": nav_menu,
		"sub_menu": sub_menu,
		"tabs": tabs,
		"last_menu": last_menu,
		"sitemap": obj["sitemap"],
		"subs": generate_all_subs(obj["sitemap"]),
		"root": "/",
	})

def media(request, path):
	root = getattr(settings, 'MEDIA_ROOT', None)
	return django.views.static.serve(request, path, root)

