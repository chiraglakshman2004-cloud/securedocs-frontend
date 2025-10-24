const API_BASE_URL = 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get headers with auth token
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Helper method to get headers for file uploads
  getFileUploadHeaders() {
    const headers = {};
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  // Auth endpoints
  async login(username, password) {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  }

  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  // File upload
  async uploadFile(file, { category = 'documents', title = '', description = '' } = {}) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);

    const response = await fetch(`${this.baseURL}/upload`, {
      method: 'POST',
      headers: this.getFileUploadHeaders(),
      body: formData,
    });
    return response.json();
  }

  // File management
  async getFiles(params = {}) {
    const qs = new URLSearchParams();
    if (params.category) qs.set('category', params.category);
    const url = `${this.baseURL}/files${qs.toString() ? `?${qs.toString()}` : ''}`;
    console.log('API: Fetching files from', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    console.log('API: Files response status:', response.status);
    const data = await response.json();
    console.log('API: Files response data:', data);
    return data;
  }

  async downloadFile(filename) {
    const response = await fetch(`${this.baseURL}/uploads/${filename}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return response;
  }

  // Activity logs
  async getActivityLogs() {
    const response = await fetch(`${this.baseURL}/activity`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return response.json();
  }

  // Admin endpoints
  async getUsers() {
    const response = await fetch(`${this.baseURL}/admin/users`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async deleteUser(userId) {
    const response = await fetch(`${this.baseURL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return response.json();
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/ping`);
    return response.text();
  }
}

export default new ApiService();
