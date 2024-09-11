from django.urls import path
from .views import candlestick_data, line_chart_data, bar_chart_data, pie_chart_data
from . import views

urlpatterns = [
    path('candlestick-data/', views.candlestick_data, name='candlestick-data'),
    path('line-chart-data/', views.line_chart_data, name='line-chart-data'),
    path('bar-chart-data/', views.bar_chart_data, name='bar-chart-data'),
    path('pie-chart-data/', views.pie_chart_data, name='pie-chart-data'),
]