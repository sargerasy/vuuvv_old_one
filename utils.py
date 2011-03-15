def model_to_dict(qs):
	ret = {}
	for i in qs:
		attrs = [a.attname for a in i._meta.fields]
		ret[i.id] = {}
		for attr in attrs:
			ret[i.id][attr] = getattr(i, attr)
	
	return ret

