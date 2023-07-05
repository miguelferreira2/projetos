from django.contrib import admin
from .models import Drug

class DrugAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'alternative')
    
# Register your models here.

admin.site.register(Drug, DrugAdmin)   