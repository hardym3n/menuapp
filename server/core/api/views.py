from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets, views
from rest_framework.response import Response
# from api.serializers import ProductSerializer, ProductDetailSerializer, MenuSerializer
from api.serializers import MenuSerializer, ProductSerializer, MenuPostSerializer
from api.models import Product
# Create your views here.


class MenuCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    
# class MenuListView(generics.ListAPIView):
#     serializer_class = ProductDetailSerializer
#     queryset = Product.objects.all()
    
# class MenuDetail(generics.RetrieveAPIViewi):
#     serializer_class = ProductDetailSerializer
#     queryset = Product.objects.all()

class MenuViewSet(viewsets.ModelViewSet):
    serializer_class = MenuSerializer
    queryset = Product.objects.all()


class MenuAllView(views.APIView):
    def post(self, request):
        # title = request.get()
        serializer = MenuPostSerializer(data=request, files=request.FILES)
        if serializer.is_valid():
            save_data = serializer.save()
        return Response(data=save_data, status=400)
