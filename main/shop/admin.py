from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(product)
admin.site.register(category)
admin.site.register(profile)
admin.site.register(cart)
admin.site.register(cartProduct)
admin.site.register(order)