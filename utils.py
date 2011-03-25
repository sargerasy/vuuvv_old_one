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

