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

