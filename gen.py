import json

id = 1

collection = []

def insert_to_collection(item):
	global collection
	myobj = { }
	myobj["model"] = "main.Menu"
	myobj["pk"] = item["id"]
	myobj["fields"] = {}
	for i in ["name", "url", "order", "level", "parent"]:
		myobj["fields"][i] = item[i]
	collection.append(myobj)
	
def gen_id():
	global id
	ret = id
	id += 1
	return ret

def trans(item):
	for k, v in item["children"].items():
		v["url"] = item["url"] + "/" + k
		v["id"] = gen_id()
		v["level"] = item["level"] + 1
		v["parent"] = item["id"]
		print v["url"], v["id"], v["level"]
		insert_to_collection(v)
		trans(v)

f = open("sitemap.json")
js = f.read()
f.close()
obj = json.loads(js)

for k, v in obj["sitemap"].items():
	v["url"] = k
	v["id"] = gen_id()
	v["level"] = 1
	v["parent"] = None
	print k, v["id"]
	insert_to_collection(v)
	trans(v)

f = open("sitemap-bak-1.json", "w")
f.write(json.dumps(obj))
f.close()

f = open("sitemap-bak-3.json", "w")
f.write(json.dumps(collection))
f.close()
