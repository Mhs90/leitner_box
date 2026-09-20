const BASE_URL = 'http://127.0.0.1:8000';
export const customFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (response.status === 401) {
    console.warn("Session expired. Redirecting to login...");
    localStorage.removeItem('accessToken');
    window.location.href = '/login'; 
    throw new Error("Unauthorized");
  }
  if (!response.ok) {
  const errorData = await response.json().catch(() => ({}));
  console.log('Backend error:', errorData);
  throw new Error(JSON.stringify(errorData));
}
  return response.json();
};