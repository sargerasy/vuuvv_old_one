from main.models import Article, Publication

def ad_hoc(request):
	value = Article.objects.filter(category__exact=2).order_by("-creation_date")
	return {"ad_hoc": value}

def press(request):
	value = Article.objects.filter(category__exact=4).order_by("-creation_date")
	return {"press": value}

def news(request):
	value = Article.objects.filter(category__exact=3).order_by("-creation_date")
	return {"company": value}

def news_current(request):
	company = Article.objects.filter(category__exact=2).order_by("-creation_date")
	ad_hoc = Article.objects.filter(category__exact=3).order_by("-creation_date")
	press = Article.objects.filter(category__exact=4).order_by("-creation_date")
	return {"company": company[0:5], "ad_hoc": ad_hoc[0:5], "press": press[0:5]}

def ir_current(request):
	news = Article.objects.select_related().filter(category__in=[2,3,4]).order_by("-creation_date")
	pub = Publication.objects.select_related().filter(category__in=[5,6,7,8,9,10]).order_by("-creation_date")
	return {"news": news[0:5], "publication": pub[0:5]}
