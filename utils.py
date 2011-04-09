import logging

def models_to_dict(qs):
	ret = {}
	for i in qs:
		#attrs = [a.attname for a in i._meta.fields]
		ret[i.id] = model_to_obj(i)
		#ret[i.id] = {}
		#for attr in attrs:
		#	ret[i.id][attr] = getattr(i, attr)
	
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
	logging.info(qs)
	logging.info(fields)
	for item in qs:
		value = {}
		for f in fields:
			v = getattr(item, f)
			logging.info(f)
			logging.info(maps)
			if f in maps:
				logging.info("here")
				v = getattr(v, maps[f]) if v else None
			value[f] = v
		ret.append(value)
	return ret
