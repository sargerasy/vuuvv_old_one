# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
import django.views.static
import logging
import utils
import json

class ExDict(dict):
	def sort_items(self):
		logging.info("abc")
		ret = self.items()
		s = sorted(ret, key=lambda x: x["order"])
		logging.info(s)
		return s

def index(request, path):
	logging.info(path)
	f = open("sitemap.json")
	js = f.read()
	f.close()
	obj = json.loads(js)
	return render_to_response("main/index.html", {
		"selected": "Home",
		"sitemap": obj["sitemap"],
		#"nav_menu": utils.generate_nav_menu(obj["sitemap"], "nav-menu"),
	})

def find_in_array(a, name):
	for i in a:
		if name == i["name"]:
			return i
	return None

def get_obj():
	f = open("sitemap.json")
	js = f.read()
	f.close()
	return json.loads(js)

def parse_menus(path, obj):
	parts = [ i for i in path.split("/") if i]
	x = obj["sitemap"]
	selects = [(0, x)]
	length = min(3, len(parts))
	for i in range(length):
		item = x.get(parts[i], None)
		if item:
			selects.append((parts[i], ExDict(item)))
			x = item["children"]
		else:
			break; #should raise error for 404 page not found

	selects.extend([('', {}) for j in range(3 - i - 1)])
	return selects


def ir(request, sub):
	name = " ".join([i.capitalize() for i in sub.split("_")])
	obj = get_obj()
	ir = find_in_array(obj["sitemap"], "Investor Relations")
	tabs = find_in_array(ir["children"], name)["children"]
	return render_to_response("main/ir.html", {
		"tabs": tabs,
		"selected": "Investor Relations",
		"sitemap": obj["sitemap"],
	})

def test(request, path):
	obj = get_obj()
	nav_menu, sub_menu, tabs, last_menu = parse_menus(path, obj)

	return render_to_response("main/test.html", {
		"nav_menu": nav_menu,
		"sub_menu": sub_menu,
		"tabs": tabs,
		"last_menu": last_menu,
		"sitemap": obj["sitemap"],
	})

def media(request, path):
	root = getattr(settings, 'MEDIA_ROOT', None)
	return django.views.static.serve(request, path, root)

