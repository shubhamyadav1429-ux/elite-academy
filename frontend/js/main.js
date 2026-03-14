// Helper for auth
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const API_URL = '/api';

// Check if logged in
function checkAuth() {
    if (!token) {
        window.location.href = '/login.html';
    }
}

// Check admin role
function checkAdminAuth() {
    if (!token || role !== 'admin') {
        window.location.href = '/login.html';
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    window.location.href = '/';
}

async function fetchWithAuth(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    // If FormData, remove Content-Type so browser sets boundary
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const response = await fetch(url, { ...options, headers });
    if (response.status === 401 || response.status === 403) {
        logout();
    }
    return response.json();
}
