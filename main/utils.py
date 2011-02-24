from StringIO import StringIO

def generate_nav_menu(sitemap, klass=""):
	html = StringIO()
	html.write('<ul class="%s">' % klass)
	for item in sitemap:
		html.write('<li><a href="#">%s</a>%s</li>' % (
			item["name"],
			_recursion_menu(item),
		))
	html.write('</ul>')
	value = html.getvalue()
	html.close()
	return value

def _recursion_menu(parent):
	output = StringIO()
	children = parent["children"]
	if children:
		output.write('<ul>')
		for child in children:
			output.write('<li><a href="#">%s</a>%s</li>' % (
				child["name"],
				_recursion_menu(child),
			))
		output.write('</ul>')
	html = output.getvalue()
	output.close()
	return html

