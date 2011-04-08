from django.db import models
from datetime import datetime

class Menu(models.Model):
	label = models.CharField(max_length=128)
	url = models.CharField(max_length=128)
	order = models.IntegerField()
	level = models.IntegerField()
	parent = models.ForeignKey('self', null=True, blank=True, related_name="children")

class Page(models.Model):
	title = models.CharField(max_length=128)
	url = models.CharField(max_length=255, unique=True)
	keywords = models.CharField(max_length=255, null=True)
	desc = models.CharField(max_length=255, null=True)
	content = models.TextField()
	template = models.CharField(max_length=100)
	created_by = models.CharField(max_length=70, default=1)
	changed_by = models.CharField(max_length=70, default=1)
	creation_date = models.DateTimeField(default=datetime.now)

class Category(models.Model):
	name = models.CharField(max_length=128)
	category = models.ForeignKey('self', blank=True, null=True, related_name="children")

class Article(models.Model):
	title = models.CharField(max_length=255)
	summary = models.CharField(max_length=400)
	thumbnail = models.CharField(max_length=128)
	content = models.TextField()
	created_by = models.CharField(max_length=70, default=1)
	changed_by = models.CharField(max_length=70, default=1)
	creation_date = models.DateTimeField(default=datetime.now)
	category = models.ForeignKey(Category)

class Product(models.Model):
	name = models.CharField(max_length=128)
	decorator = models.CharField(max_length=255, null=True)
	thumbnail = models.CharField(max_length=128, null=True)
	image = models.CharField(max_length=128, null=True)
	order = models.IntegerField()
	level = models.IntegerField()
	parent = models.ForeignKey('self', null=True, blank=True, related_name="children")

class FinancialCalendar(models.Model):
	title = models.TextField()
	link = models.CharField(max_length=255)
	date = models.DateTimeField(default=datetime.now)

class Publication(models.Model):
	title = models.TextField()
	link = models.CharField(max_length=255)
	created_by = models.CharField(max_length=70, default=1)
	changed_by = models.CharField(max_length=70, default=1)
	creation_date = models.DateTimeField(default=datetime.now)
	category = models.ForeignKey(Category)

class Award(models.Model):
	name = models.CharField(max_length=128)
	year = models.IntegerField()
	thumbnail = models.CharField(max_length=128)
	image = models.CharField(max_length=128)
