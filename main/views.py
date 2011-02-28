# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
import django.views.static
import logging
import utils
import json

def index(request):
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

def ir(request, sub):
	name = " ".join([i.capitalize() for i in sub.split("_")])
	f = open("sitemap.json")
	js = f.read()
	f.close()
	obj = json.loads(js)
	ir = find_in_array(obj["sitemap"], "Investor Relations")
	tabs = find_in_array(ir["children"], name)["children"]
	return render_to_response("main/ir.html", {
		"tabs": tabs,
		"selected": "Investor Relations",
		"sitemap": obj["sitemap"],
	})

def media(request, path):
	root = getattr(settings, 'MEDIA_ROOT', None)
	return django.views.static.serve(request, path, root)

