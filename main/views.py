# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
import logging
import utils
import json

def index(request):
	f = open("sitemap.json")
	js = f.read()
	f.close()
	obj = json.loads(js)
	return render_to_response("main/index.html", {
		"sitemap": obj["sitemap"],
		"nav_menu": utils.generate_nav_menu(obj["sitemap"], "sf-menu"),
	})

