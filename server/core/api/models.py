from django.db import models
from django.conf import settings
from PIL import Image

# Create your models here.
class Product(models.Model):
    title = models.CharField(verbose_name="Название", max_length=100, null=False)
    price = models.IntegerField(verbose_name="Цена", null=False)
    description = models.TextField(verbose_name="Описание", null=True)
    image = models.ImageField(verbose_name="Изображение", upload_to='./images/',null=True)
