from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
from main.tree import Node
from main.models import Menu, Page
import django.views.static
import logging
import utils
import json
import getdata

def index(request):
	return joyou(request, "home")

def joyou(request, path):
	tree = MenuTree(Menu.objects.all())
	url = "/".join([ i for i in path.split("/") if i])
	page = Page.objects.filter(url__exact=url)
	if page:
		template = page[0].template
		content = page[0].content
	else:
		template = "index"
		content = None
	
	func = getattr(getdata, template, None)
	value = func(request) if func is not None else None
	logging.info(value)

	menus = tree.create_menus(url)
	
	return render_to_response("main/%s.html" % template, {
		"root": "/",
		"menus": menus[0],
		"title": menus[1],
		"subs": tree.generate_all_subs(),
		"content": content,
		"value": value,
	})

def media(request, path):
	root = getattr(settings, 'MEDIA_ROOT', None)
	return django.views.static.serve(request, path, root)

class MenuTree(object):
	def __init__(self, models, parent_path="parent_id", label_path="label"):
		self.obj = models
		self._id_lookup = {None: Node({"label": "root"})}
		self._url_lookup = {}
		self._lv_lookup = {}
		self.root = self._id_lookup[None]
		for item in models:
			attrs = [a.attname for a in item._meta.fields]
			raw = dict([(attr, getattr(item, attr)) for attr in attrs])
			node = Node(raw)
			self._id_lookup[item.id] = node
			self._url_lookup[item.url] = node
			if item.level not in self._lv_lookup:
				self._lv_lookup[item.level] = []
			self._lv_lookup[item.level].append(node)

		for key, val in self._id_lookup.items():
			if key is not None:
				pid = val.data[parent_path]
				parent = self._id_lookup[pid]
				parent.add(val)

	def find_by_url(self, url):
		return self._url_lookup[url]

	def find_by_level(self, level):
		return MenuTree.sort(self._lv_lookup[level])

	@staticmethod
	def sort(array):
		s = sorted(array, key=lambda x: x.data["order"])
		return s

	def create_menus(self, url):
		curr = self.find_by_url(url)
		select = curr.pwd()[1:]
		title = select[-1].data["label"]
		length = min(4, len(select))
		menus = []

		menu1 = {"values": self.find_by_level(1), "select": select[0] if len(select) > 0 else None} 
		menu2 = {"values": self.find_by_level(2), "select": select[1] if len(select) > 1 else None}
		menu3 = None
		menu4 = None
		if length == 2:
			menu3 = {"values": MenuTree.sort(curr.children), "select": None}
		if length == 3:
			menu3 = {"values": MenuTree.sort(curr.siblings()), "select": select[2]}
			menu4 = {"values": MenuTree.sort(curr.children), "select": None}
		if length >= 4:
			menu3 = {"values": MenuTree.sort(curr.parent.siblings()), "select": select[2]}
			menu4 = {"values": MenuTree.sort(curr.siblings()), "select": select[3] if len(select) > 3 else None}

		return [menu1, menu2, menu3, menu4], title

	def generate_all_subs(self):
		ret = []
		items = self.find_by_level(1)
		for i in items:
			ret.append((i, MenuTree.sort(i.children)))
		
		return ret

