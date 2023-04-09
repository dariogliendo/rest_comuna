from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from django.http import Http404
from .models import Roomie
from .serializers import RoomieSerializer 

class RoomieListApiView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, *args, **kwargs):
        roomies = Roomie.objects
        serializer = RoomieSerializer(roomies, many=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name')        
        }

        serializer = RoomieSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RoomieDetailApiView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        try:
            return Roomie.objects.get(pk=pk)
        except Roomie.DoesNotExist:
            raise Http404


    def get(self, request, pk, **kwargs):
        roomie = self.get_object(pk)
        serializer = RoomieSerializer(roomie)  
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
