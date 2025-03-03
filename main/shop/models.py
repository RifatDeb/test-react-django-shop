from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class profile (models.Model):
    prouser = models.OneToOneField(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile", blank=True,null=True)
    def __str__(self):
        return self.prouser.username


class category(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.title
    

class product(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)   
    category = models.ForeignKey(category,on_delete=models.SET_NULL,blank=True, null=True)
    image = models.ImageField(upload_to="product")
    marketprice = models.PositiveBigIntegerField()
    sellingprice = models.PositiveBigIntegerField()
    description = models.TextField()
    def __str__(self):
        return self.title
    

class cart(models.Model):
    customer = models.ForeignKey(profile,on_delete=models.CASCADE)
    total= models.PositiveBigIntegerField()
    complite = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"cart id=={self.id}==complite=={self.complite}"



class cartProduct(models.Model):
    cart = models.ForeignKey(cart,on_delete=models.CASCADE)
    product = models.ManyToManyField(product)
    price = models.PositiveBigIntegerField()
    quantity = models.PositiveBigIntegerField()
    Subtotal = models.PositiveBigIntegerField()
    def __str__(self):
        return f"cart=={self.cart.id}==cartProduct=={self.id}==quantity=={self.quantity}" 


ORDET_STATUS={
    ("Order Reseived", "Order Reseived"),
    ("Order prosesing", "Order prosesing"),
    ("Order On theway", "Order On theway"),
    ("Order Complite", "Order Complite"),
     ("Order Canceled", "Order Canceled"),

}  

class order(models.Model):
    cart = models.OneToOneField(cart, on_delete=models.CASCADE)
    address = models.CharField(max_length=250)
    mobile = models.CharField(max_length=16)
    email = models.CharField(max_length=100)
    total = models.PositiveBigIntegerField()
    order_status = models.CharField(choices=ORDET_STATUS, max_length=130, default="Order Reseived")
    date = models.DateField(auto_now_add=True)
    prement = models.BooleanField(default=False)





