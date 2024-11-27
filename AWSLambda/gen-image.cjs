// gen-image.cjs

// environment: Node.js 22.x
import https from 'https';

export const handler = async (event) => {
  const queryParams = event.queryStringParameters || {};
  const { apiVersion, apiKey } = queryParams;

  // Validate query parameters
  if (!apiVersion || !apiKey) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Missing required query parameters: apiVersion or apiKey.',
      }),
    };
  }

  // Parse the incoming body
  let incomingBody;
  try {
    incomingBody = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Invalid JSON in request body' }),
    };
  }

  const userPrompt = incomingBody?.userPrompt;
  if (!userPrompt) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Missing required parameter: userPrompt' }),
    };
  }

  // POST request to generate image
  const postUrl = `https://hkust.azure-api.net/openai/images/generations:submit?api-version=${apiVersion}`;
  const postRequestBody = JSON.stringify({
    prompt: userPrompt,
    n: 1,
    size: '1024x1024',
  });

  try {
    const postResponse = await makeHttpRequest(postUrl, 'POST', apiKey, postRequestBody);
    const postResponseBody = JSON.parse(postResponse);
    const imageId = postResponseBody.id;

    if (!imageId) {
      throw new Error('imageId not found in POST response.');
    }
    await new Promise(resolve => setTimeout(resolve, 5000));

    // GET request to fetch the image URL
    const getUrl = `https://hkust.azure-api.net/openai/operations/images/${imageId}?api-version=${apiVersion}`;
    const getResponse = await makeHttpRequest(getUrl, 'GET', apiKey);
    const getResponseBody = JSON.parse(getResponse);

    const imageUrl = getResponseBody.result?.data?.[0]?.url;

    // if (!imageUrl) {
    //   throw new Error('Image URL not found in GET response.');
    // }

    // Return the image URL
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({imageUrl }),
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// Utility function to handle HTTP requests
const makeHttpRequest = (url, method, apiKey, body = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => reject(error));

    if (body) {
      req.write(body);
    }
    req.end();
  });
};
