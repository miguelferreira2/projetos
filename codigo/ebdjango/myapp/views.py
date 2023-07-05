from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DrugSerializer
from .models import Drug
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
import boto3
import os
import base64

# Create your views here.

class DrugView(viewsets.ModelViewSet):
    serializer_class = DrugSerializer
    queryset = Drug.objects.all()
    
class HomeView(APIView):
   permission_classes = (IsAuthenticated, )
   
   def get(self, request):
        content = {'message': 'welcome to the Pharmacy!'}
        return Response(content)
    
class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     
     def post(self, request):
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          
class faceRekognition(APIView):
     permission_classes = (IsAuthenticated,)

     def post(self, request):
          rekognition = boto3.client('rekognition', 
                         aws_access_key_id='ASIASEYKBVZGTXGXMYM7',
                         aws_secret_access_key='OwB49XcthHE4EBEp37lFv4Z5oyy+Egqtl6uORjoI',
                         aws_session_token='FwoGZXIvYXdzEFAaDG2MBKEcuWarHGtfryLLAaXLNqNnYFI4Q4IQ+1q3OWOZNO4z5xYpiyGLCM67fIXSdtH7GUzKIfqLcLrNfPbt9bVmcoKeDTv2mgIuLUu8hE4wH7TlAYfGpGjdGCfi9uvyIn+x/m2bgMGldhuEvdtcwpYiZUNH50nc0h/Jsy7E7KkfLmn67R5rkzh+7qzv1sADSohQxzYq4RWZintV5l6wMrH1MmvF7jOhG5verJLwOLvbV4hi44nG+UCdl3nZn/rpj8K0FQWKFiXbdGKfHHsocpkUPNBZIOb0w2ugKILs0qMGMi0WK9o6v+ioexGi/rIg7lrx16zQ2TlSVurBoKiAEQgRMIptrb7x2o7XQAqdaPc=',
                         region_name='us-east-1')
          
          s3 = boto3.resource('s3', 
                         aws_access_key_id='ASIASEYKBVZGTXGXMYM7',
                         aws_secret_access_key='OwB49XcthHE4EBEp37lFv4Z5oyy+Egqtl6uORjoI',
                         aws_session_token='FwoGZXIvYXdzEFAaDG2MBKEcuWarHGtfryLLAaXLNqNnYFI4Q4IQ+1q3OWOZNO4z5xYpiyGLCM67fIXSdtH7GUzKIfqLcLrNfPbt9bVmcoKeDTv2mgIuLUu8hE4wH7TlAYfGpGjdGCfi9uvyIn+x/m2bgMGldhuEvdtcwpYiZUNH50nc0h/Jsy7E7KkfLmn67R5rkzh+7qzv1sADSohQxzYq4RWZintV5l6wMrH1MmvF7jOhG5verJLwOLvbV4hi44nG+UCdl3nZn/rpj8K0FQWKFiXbdGKfHHsocpkUPNBZIOb0w2ugKILs0qMGMi0WK9o6v+ioexGi/rIg7lrx16zQ2TlSVurBoKiAEQgRMIptrb7x2o7XQAqdaPc=',
                         region_name='us-east-1')
          
          bucket = s3.Bucket('es2023fotos')
          
          target = request.POST['image'].split(',')[1]

          x = {}
          
          for i in bucket.objects.all():
               path, filename = os.path.split(i.key)
               img = bucket.Object(filename)
               
               resp = rekognition.compare_faces(SimilarityThreshold=75,
                                           SourceImage={'Bytes': img.get()['Body'].read()},
                                           TargetImage={'Bytes': base64.b64decode(target)})
               
               for match in resp['FaceMatches']:
                    pos = match['Face']['BoundingBox']
                    similarity = str(match['Similarity'])
                    x = {'CONFIRM': True}
                    
          if(len(x) == 0):
               x = {'CONFIRM': False}
          
          return Response(x)