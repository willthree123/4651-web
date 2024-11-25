// src/api/apiClient.ts

interface FetchOptions {
  method: "GET" | "POST";
  queryParams?: Record<string, string>;
  body?: any;
  headers?: Record<string, string>;
}

export async function fetchClient(baseUrl: string, endpoint: string, options: FetchOptions) {
  const { method, queryParams = {}, body, headers = {} } = options;

  // Construct query string
  const queryString = new URLSearchParams(queryParams).toString();

  // Construct full URL
  const url = queryString ? `${baseUrl}${endpoint}?${queryString}` : `${baseUrl}${endpoint}`;

  // Fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: method === "POST" && body ? JSON.stringify(body) : undefined,
  };

  // Perform fetch
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }

  return response.json();
}
