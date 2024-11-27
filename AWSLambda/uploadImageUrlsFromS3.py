 
 
#  uploadImageUrlsFromS3.py

# environment: Python 3.10

import json
import base64
import boto3
import string
import random

# Initialize S3 client
s3 = boto3.client('s3')
bucket_name = 'genai-image-storage'  # Replace with your bucket name

def lambda_handler(event, context):
    try:
        # Log the event object to inspect its structure
        print("Event: ", json.dumps(event))
        
        # Check if the request method is POST
        if event.get('httpMethod') != 'POST':
            return {
                'statusCode': 405,  # Method Not Allowed
                'body': json.dumps({'message': 'Only POST method is allowed'})
            }

        # Parse the request body (assumes JSON payload)
        request_body = json.loads(event['body'])
        base64_image = request_body.get('image')  # Full Base64 string with prefix
        
        if not base64_image:
            raise ValueError("Missing 'image' in request body")

        # Strip the prefix if it exists (e.g., "data:image/png;base64,")
        if ',' in base64_image:
            base64_image = base64_image.split(',')[1]

        # Decode the Base64 content
        decode_content = base64.b64decode(base64_image)
        
        # Generate a random filename for the image
        pic_filename = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10)) + ".png"
        
        # Upload the image to the S3 bucket
        s3_upload = s3.put_object(
            Bucket=bucket_name,
            Key=pic_filename,  # Use the random filename
            Body=decode_content,
            ContentType='image/png'  # Specify the content type
        )

        # Return success response
        return {
            'statusCode': 200,
            'body': json.dumps({
                "status":"success",
                'message': 'The object is uploaded successfully!',
                'filename': pic_filename
            })
        }
    except Exception as e:
        # Catch and log the exception
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                "status":"error",
                'message': 'Error uploading object',
                'error': str(e)
            })
        }
