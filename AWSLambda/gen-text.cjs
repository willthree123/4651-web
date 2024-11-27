// gen-text.cjs

// environment: Node.js 22.x
import https from 'https';

export const handler = async (event) => {
  // Extract query parameters from the event object
  const queryParams = event.queryStringParameters || {};
  const { apiVersion, apiKey } = queryParams;

  // Parse the incoming body from the event
  let incomingBody;
  try {
    // Safely parse the body
    incomingBody = JSON.parse(event.body);
  } catch (error) {
    console.error('Invalid JSON in request body:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body' }),
    };
  }
  const userMessageContent = typeof incomingBody === 'object' ? JSON.stringify(incomingBody) : incomingBody;
  if (!incomingBody) {
    incomingBody = "apple";
  }
  // Construct the API URL
  const url = `https://hkust.azure-api.net/openai/deployments/gpt-4o-mini/chat/completions?api-version=${apiVersion}`;

  // Define the request body
  const requestBody = JSON.stringify({
    messages: [
      {
        role: 'system',
        content: 'no content for system.'
      },
      {
        role: 'user',
        content: userMessageContent 
      }
    ]
  });

  // Return a promise for the API call
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      },
      (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          console.log('API Response:', data); // Log the API response
          resolve({
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            body: data,
          });
        });
      }
    );

    req.on('error', (error) => {
      console.error('Error:', error); // Log any errors
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      });
    });

    req.write(requestBody);
    req.end();
  });
};
