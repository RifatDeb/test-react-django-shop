from rest_framework import routers
from django .urls import path,include
from .views import *

router = routers.DefaultRouter()
router.register("category", categoryView, basename="categoryView"),
router.register("cart",MyCart, basename="MyCart"),
router.register("oldorders",OldOrders, basename="oldorders"),

urlpatterns = [
    path("", include(router.urls)),
    path('product/',productView.as_view(),name="product"),
    path('product/<int:id>/',productView.as_view(),name="product"),
    path ('profile/',profileView.as_view(),name="profile"),
    path('userdataupdate/',UserDataUpdate.as_view(),name="userdataupdate"),
    path('updateprofileimage/',UpdateProfileImage.as_view(),name="updateprofileimage"),
    path('addtocart/',AddtoCartView.as_view(),name="addtocart"),
    path('updatecart/',UpdateCartView.as_view(),name="updatecart"),
    path('editcart/',EditCartView.as_view(),name="editcart"),
    path('deletecart/',DeleteCartView.as_view(),name="deletecart"),
    path('fullcartdelete/',FullCartDelete.as_view(),name="fullcartdelete"),
    path('register/',RegisterView.as_view(),name="register"),
   
    
]