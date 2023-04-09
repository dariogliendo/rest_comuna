from rest_framework import serializers
from .models import Roomie
class RoomieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roomie
        fields = ['id', 'name']
