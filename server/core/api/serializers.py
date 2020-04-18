from rest_framework import serializers
from api.models import Product


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Product
        fields = "__all__"

class MenuPostSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    price = serializers.IntegerField()
    description = serializers.CharField()
    image = serializers.ImageField()
