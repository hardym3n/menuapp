from django.urls import path, include
# from api.views import MenuCreateView, MenuListView, MenuDetail, MenuViewSet
from api.views import MenuViewSet, MenuCreateView, MenuAllView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'menu', MenuViewSet)

urlpatterns = [
    # path('menu/add', MenuCreateView.as_view()),
    path("", include(router.urls)),
    path("menu/add", MenuCreateView.as_view()),
    path("menu/all", MenuAllView.as_view())
    # path('menu/detail/<int:pk>/', MenuDetail.as_view()),
] 
