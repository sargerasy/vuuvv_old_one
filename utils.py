import json

def trans(items, path):
	for k, v in items.items():
		print path+"/"+k
		v["url"] = path+"/"+k
		trans(v["children"], path+"/"+k)

f = open("sitemap.json")
js = f.read()
f.close()
obj = json.loads(js)

for k, v in obj["sitemap"].items():
	print k
	v["url"] = k
	trans(v["children"], k)

f = open("sitemap-bak.json", "w")
f.write(json.dumps(obj))
f.close()
