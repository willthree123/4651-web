 
#  getImageUrlsFromS3.py

# environment: Python 3.10

import json
import boto3
import urllib.request  # Use urllib instead of requests
from botocore.exceptions import ClientError

# Initialize S3 client
s3 = boto3.client('s3')
bucket_name = 'genai-image-storage'  # Replace with your bucket name

def lambda_handler(event, context):
    http_method = event.get('httpMethod', '')

    if http_method == 'GET':  # List all objects in the S3 bucket
        try:
            response = s3.list_objects_v2(Bucket=bucket_name)
            image_urls = [
                s3.generate_presigned_url(
                    'get_object',
                    Params={'Bucket': bucket_name, 'Key': obj['Key']},
                    ExpiresIn=300  # URL expiration time in seconds
                )
                for obj in response.get('Contents', [])
            ]
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'status': 'success',
                    'message': 'Fetched image URLs successfully',
                    'data': {
                        'imageUrls': image_urls
                    }
                }),
                'headers': {'Access-Control-Allow-Origin': '*'}  # CORS header
            }
        except ClientError as e:
            if e.response['Error']['Code'] == 'AccessDenied':
                return {
                    'statusCode': 403,
                    'body': json.dumps({'message': 'Access Denied to the S3 bucket'})
                }
            return {
                'statusCode': 500,
                'body': json.dumps({'message': str(e)})
            }

    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'message': 'Method Not Allowed'})
        }