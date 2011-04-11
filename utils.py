import os
import re
import logging

def models_to_dict(qs):
	ret = {}
	for i in qs:
		ret[i.id] = model_to_obj(i)

	return ret

def model_to_obj(model):
	ret = {}
	attrs = [a.attname for a in model._meta.fields]
	for attr in attrs:
		ret[attr] = getattr(model, attr)
	return ret

def qs_replace(qs, maps={}, fields=[]):
	ret = []
	field_names = qs.model._meta.get_all_field_names()
	if fields == []:
		fields = field_names
	else:
		fields = [f for f in field_names if f in fields]
	for item in qs:
		value = {}
		for f in fields:
			v = getattr(item, f)
			if f in maps:
				v = getattr(v, maps[f]) if v else None
			value[f] = v
		ret.append(value)
	return ret

def get_fields_names(cls):
	from django.db.models.related import RelatedObject
	opt = cls._meta
	try:
		cache = opt._name_map
	except AttributeError:
		cache = opt.init_name_map()
	return [f for f, v in cache.items() if not isinstance(v[0], RelatedObject)]

def collide_repl(m):
	return m.group(1) + str(int(m.group(2)) + 1) + m.group(3)

def uncollided_name(path):
	dirname, basename = os.path.split(path)
	parts = None
	while os.path.exists(path):
		parts = basename.split(".")
		name, suffix = ".".join(parts[0:-1]), parts[-1]
		m = re.match("^.*\((\d+)\)$", name)
		if m:
			name = re.sub("^(.*\()(\d+)(\))$", collide_repl, name)
		else:
			name += "(1)"
		basename = ".".join([name, suffix])
		path = os.path.join(dirname, basename)

	return dirname, basename

