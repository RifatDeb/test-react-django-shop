from rest_framework import generics , mixins, viewsets,views
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django .contrib.auth.models import User

# Create your views here.

class productView(generics.GenericAPIView,mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = product.objects.all().order_by("-id")
    serializer_class = productserializer
    lookup_field = "id"

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

class categoryView(viewsets.ViewSet):
    def list(self,request):
        query = category.objects.all().order_by("-id")
        serializers = categorySerializer(query,many=True)
        return Response(serializers.data)

    def retrieve(self,request, pk=None):
        query = category.objects.get(id=pk)
        serializers = categorySerializer(query)
        serializer_data = serializers.data
        all_data = []
        category_product = product.objects.filter(category_id=serializer_data['id'])
        category_product_serializer = productserializer(category_product, many=True)
        serializer_data["category_product"] = category_product_serializer.data
        all_data.append(serializer_data)
        return Response(all_data)
    
class profileView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ] 
    def get(self,request):
        try:
            query =profile.objects.get(prouser=request.user)
            serializers = profileSerializer(query)
            Response_msg = {"error":False, "data":serializers.data}
        except:
            Response_msg = {'error':True, 'message':"Somthin is worng!! try agin"}  

        return Response(Response_msg)


class UserDataUpdate(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ] 
    def post(self, request):
        try:    
            user = request.user
            data = request.data
            # print(user, "$$$$ user data")
            # print(data["first_name"])
            # print(data["last_name"])
            # print(data["email"])
            user_obj = User.objects.get(username=user)
            # print(user_obj)
            user_obj.first_name = data["first_name"]
            user_obj.last_name = data["last_name"]
            user_obj.email = data["email"]
            user_obj.save()
            response_msg = {"error":False, "message": "user data get"}
        except:
            response_msg = {"error":True, "message": "Somthing is Worng try agin"}
        return Response(response_msg)


class UpdateProfileImage(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
         try:
            user = request.user
            query = profile.objects.get(prouser=user)
            data = request.data
            serializers = profileSerializer(query,data=data,context={'request':request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            Response_msg = {"error":False, "message":"Profile is Updated"}
         except:
            Response_msg = {"error":True, "message":"profile not Uptade"}       
         return Response(Response_msg)
        

class MyCart(viewsets.ViewSet):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ] 
    def list(self, request):
        query = cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializers(query,many=True)
        all_data=[]
        for Cart in serializers.data:
            cart_product = cartProduct.objects.filter(cart=Cart['id'])
            cart_product_serializer = CartproductSerializers(cart_product,many=True)
            Cart["cartproduct"] = cart_product_serializer.data
            all_data.append(Cart)
        
        return Response( all_data)

class OldOrders(viewsets.ViewSet):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def list(self,request):
        query = order.objects.filter(cart__customer=request.user.profile)
        serializers = OrderSerializers(query,many=True)
        all_data= []

        for orders in serializers.data:
            cart_product = cartProduct.objects.filter(cart_id = orders['cart']['id'])
            cart_product_Serializer = CartproductSerializers(cart_product, many=True)
            orders['cartproduct'] = cart_product_Serializer.data
            all_data.append(orders)

        return Response(all_data)

    def retrieve(self,request,pk=None):
        try:
            query = order.objects.get(id=pk)
            serializers = OrderSerializers(query)
            data = serializers.data
            all_data = []
            CartProduct = cartProduct.objects.filter(cart_id=data['cart']['id'])
            CartProduct_serializers = CartproductSerializers(CartProduct,many=True)
            data['CartProduct'] = CartProduct_serializers.data
            all_data.append(data)
            Response_msg = {"error":False, "data":all_data}
       
        except:
              Response_msg = {"error":True, "data":"No data Found"}
    
        return Response(Response_msg)
    def create(self,request):
        try:
     
            cart_id =request.data['id']
            address = request.data['address']
            mobile = request.data['mobile']
            email = request.data['email']
            cart_obj = cart.objects.get(id=cart_id)
            cart_obj.complite =True
            cart_obj.save()
            order.objects.create(
                cart=cart_obj,
                address=address,
                mobile=mobile,
                email=email,
                total=cart_obj.total,
            )
            Response_msg= {'error':False, 'message': 'Submite Your Order'}
        except:
            Response_msg= {'error':True, 'message': 'Something is Worng'}

        return Response(Response_msg)       

            


class AddtoCartView(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        product_id = request.data['id']
        product_obj = product.objects.get(id=product_id)
        cart_cart = cart.objects.filter(customer=request.user.profile).filter(complite=False).first()
        cart_product_obj = cartProduct.objects.filter(product__id = product_id).first()

        try:
            if cart_cart:
                # print("OLD CART")
                this_product_in_cart = cart_cart.cartproduct_set.filter(product = product_obj)
                if this_product_in_cart.exists():
                    cartProduct_utc = cartProduct.objects.filter(product = product_obj).filter(cart__complite=False).first()
                    cartProduct_utc.quantity +=1
                    cartProduct_utc.Subtotal +=product_obj.sellingprice
                    cartProduct_utc.save()
                    cart_cart.total += product_obj.sellingprice
                    cart_cart.save()
                else:
                    cart_product_new = cartProduct.objects.create(
                        cart = cart_cart,
                        price = product_obj.sellingprice,
                        quantity  = 1,
                        Subtotal = product_obj.sellingprice
                    )
                    cart_product_new.product.add(product_obj)
                    cart_cart.total +=product_obj.sellingprice
                    cart_cart.save()


            else:
                print("NEW CART") 
                cart.objects.create(customer=request.user.profile,total=0,complite=False) 
                new_cart = cart.objects.filter( customer=request.user.profile).filter(complite=False).first()
                cart_product_new = cartProduct.objects.create(
                    cart = new_cart,
                    price = product_obj.sellingprice,
                    Subtotal = product_obj.sellingprice,
                    quantity = 1,
                )  
                cart_product_new.product.add(product_obj)
                new_cart.total += product_obj.sellingprice
                new_cart.save()
            Response_msg = {"error":False, "message": "product is adedd"}
        except:    
            Response_msg = {"error":True, "message": "product is adedd"}

        return Response(Response_msg)

class UpdateCartView(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post (self, request):
        cart_product_id = request.data["id"]
        cart_product = cartProduct.objects.get(id = cart_product_id)
        cart_obj = cart_product.cart

        cart_product.quantity +=1
        cart_product.Subtotal += cart_product.price
        cart_product.save()

        cart_obj.total +=cart_product.price
        cart_obj.save()
        return Response({"message":"cart Product is addetd"})




class EditCartView(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]

    def post (self, request):
        cart_product_id = request.data["id"]
        cart_product = cartProduct.objects.get(id = cart_product_id)
        cart_obj = cart_product.cart

        cart_product.quantity -=1
        cart_product.Subtotal -= cart_product.price
        cart_product.save()

        cart_obj.total -=cart_product.price
        cart_obj.save()
        if(cart_product.quantity==0):
            cart_product.delete()

        return Response({"message":"cart Product is Edited"})
    

class DeleteCartView(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]

    def post(self, request):
        cart_product = cartProduct.objects.get(id =request.data["id"])
        cart_product.delete()
        cart_obj = cart_product.cart
        cart_obj.total -=cart_product.price
        cart_obj.save()
       
        
        

        return Response({"message":"cart is deleted"})
    
class FullCartDelete(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self, request):
        try:
            cart_id = request.data["id"]
            cart_obj = cart.objects.get(id=cart_id)
            cart_obj.delete()
            Response_msg = {"error":False, "message":"cart is deleted"}
        except:
            Response_msg = {"error":True, "message":"cart is not deleted"}
        return Response(Response_msg)
    
class RegisterView(views.APIView):
    def post(self,request):
        serializers = Useserializers(data=request.data)   
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":f"User is Creact '{serializers.data['username']}' "})
        return Response({"error":True,"message":"Somthing is Worng"}) 
