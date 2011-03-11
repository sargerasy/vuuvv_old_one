from django.db import models

class Menu(models.Model):
	label = models.CharField(max_length=128)
	url = models.CharField(max_length=128)
	order = models.IntegerField(max_length=128)
	parent = models.ForeignKey('self', null=True, blank=True, related_name="children")
	page = models.ForeignKey('self', null=True, blank=True)
# Create your models here.
