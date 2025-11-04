export const API_BASE =
    import.meta.env.REACT_APP_API_BASE || 'http://localhost:3001';

export const ENDPOINTS = {
    ADMIN: {
        PRODUCTS: `${API_BASE}/admin/products`,
        CATEGORIES: `${API_BASE}/admin/categories`,
        ORDERS: `${API_BASE}/admin/orders`,
        DASHBOARD: `${API_BASE}/admin/dashboard`,
        INVENTORY: `${API_BASE}/admin/inventory`,
        REPORTS: `${API_BASE}/admin/reports`
    },
    STORE: {
        PRODUCTS: `${API_BASE}/products`,
        CATEGORIES: `${API_BASE}/categories`
    }
};

export const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
});