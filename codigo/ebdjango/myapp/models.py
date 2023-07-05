from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Drug(models.Model):
    name = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10000, decimal_places=2)
    

    alternative = models.CharField(max_length=120, blank=True)

    def _str_(self):
        return self.title