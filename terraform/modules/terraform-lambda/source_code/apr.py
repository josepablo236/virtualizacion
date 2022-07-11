import json
import os
import sys
import base64
import boto3

#------------------------------------------------------
# Code by:  Mauricio Lopez
#           Edgar Paredes
#           Jose Pablo Orellana
#           Luis
# Description:  Guarda la foto obtenida en el bucked
#               y despues la analiza con los recursos
#               de AWS Rekognition y devuelve el
#               analis de las emociones
#------------------------------------------------------

BUCKET_NAME = os.environ['BUCKET_NAME'] #Name of the Bucket

def lambda_handler(event, context):
    #Variables
    photo_content = base64.b64decode(event['content']) #Content binary of the photo
    photo_name = event['name'] #file name of photo send in API Request
    
    point = photo_name.find(".") #Variable used to Know where finish the name
    
    json_name = "Json" + photo_name[4:point] + ".json" #Name of .json file
    
    rekognition = boto3.client("rekognition")
    
    bucket = boto3.client('s3')
    
    try:
        s3_response = bucket.put_object(Bucket=BUCKET_NAME, Key=photo_name, Body=photo_content)
        #save file in the bucket
        
        Emotions = rekognition.detect_faces(Image = {"S3Object":{"Bucket":BUCKET_NAME, "Name":photo_name}},Attributes = ["ALL"])
        #photo analysis option
        
        Emotions_content = Emotions["FaceDetails"][0]["Emotions"]
        #option of the analysis of the emotions of the photo
        
        bucket.put_object(Bucket=BUCKET_NAME, Key=json_name, Body=json.dumps(Emotions_content))
    except Exception as e:
        raise IOError(e)
        
    return {
        'statusCode': 200,
        'body': "Hello Word from lambda Api",
        'file_path':  Emotions_content
    }
