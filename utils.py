import json

id = 1

collection = []

def insert_to_collection(item):
	global collection
	myobj = { }
	myobj["model"] = "main.Menu"
	myobj["pk"] = item["id"]
	myobj["fields"] = {}
	for i in ["name", "url", "order", "parent_id"]:
		myobj["fields"][i] = item[i]
	collection.append(myobj)
	
def gen_id():
	global id
	ret = id
	id += 1
	return ret

def trans(items, path, pid):
	for k, v in items.items():
		v["url"] = path+"/"+k
		v["id"] = gen_id()
		v["parent_id"] = pid
		print path+"/"+k, v["id"], v["parent_id"]
		insert_to_collection(v)
		trans(v["children"], path+"/"+k, v["id"])

f = open("sitemap.json")
js = f.read()
f.close()
obj = json.loads(js)

for k, v in obj["sitemap"].items():
	v["url"] = k
	v["id"] = gen_id()
	v["parent_id"] = None
	print k, v["id"]
	insert_to_collection(v)
	trans(v["children"], k, v["id"])

f = open("sitemap-bak-1.json", "w")
f.write(json.dumps(obj))
f.close()

f = open("sitemap-bak-2.json", "w")
f.write(json.dumps(collection))
f.close()
