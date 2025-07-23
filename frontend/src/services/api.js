const API_BASE_URL = 'http://localhost:3001/api';

// Auth API functions
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
    
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    return response.json();
  }
};

// Vault API functions (separate object)
export const vaultAPI = {
  createVault: async (vaultData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await fetch(`${API_BASE_URL}/vaults`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(vaultData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create vault');
    }
    
    return response.json();
  },

  getVaults: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await fetch(`${API_BASE_URL}/vaults`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch vaults');
    }
    
    return response.json();
  },

  getVaultById: async (id) => { 
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/vaults/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch vault');
    return response.json();
  },

  updateVault: async (id, vaultData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await fetch(`${API_BASE_URL}/vaults/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(vaultData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update vault');
    }
    
    return response.json();
  },

  deleteVault: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await fetch(`${API_BASE_URL}/vaults/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete vault');
    }
    
    return response.json();
  }
};
