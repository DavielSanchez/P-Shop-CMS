import { API_BASE } from '../config/api';

class ProductService {

    async getAllProducts(filters = {}) {
        try {
            const queryParams = new URLSearchParams();

            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== '') {
                    queryParams.append(key, filters[key]);
                }
            });

            const response = await fetch(`${API_BASE}/admin/products?${queryParams}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json(); 
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/${id}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }

    async searchProducts(searchParams) {
        try {
            const queryParams = new URLSearchParams(searchParams);
            const response = await fetch(`${API_BASE}/admin/products/search?${queryParams}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            const response = await fetch(`${API_BASE}/admin/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async updateProduct(id, productData) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    async updateStock(id, stockData) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/${id}/stock`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(stockData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating stock:', error);
            throw error;
        }
    }

    async updateStatus(id, status) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating status:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    async getProductAnalytics(id) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/${id}/analytics`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching product analytics:', error);
            throw error;
        }
    }

    async getTopSellingProducts(filters = {limit : 10, period: "all" }) {
        try {
            const queryParams = new URLSearchParams();

            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== '') {
                    queryParams.append(key, filters[key]);
                }
            });

            const response = await fetch(`${API_BASE}/admin/products/analytics/top-selling?${queryParams}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json(); 
            console.log('Top selling products:', data); 
            return data;
        } catch (error) {
            console.error('Error fetching top selling products:', error);
            throw error;
        }
    }

    async bulkUpdate(ids, updateData) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/bulk/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ids,
                    updateData
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in bulk update:', error);
            throw error;
        }
    }

    async bulkDelete(ids) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/bulk/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ ids })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in bulk delete:', error);
            throw error;
        }
    }

    async exportProducts(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters);
            const response = await fetch(`${API_BASE}/admin/products/export?${queryParams}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.blob();
        } catch (error) {
            console.error('Error exporting products:', error);
            throw error;
        }
    }

    async getProductStats() {
        try {
            const response = await fetch(`${API_BASE}/admin/products/stats/summary`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching product stats:', error);
            throw error;
        }
    }

    async uploadImages(productId, formData) {
        try {
            const response = await fetch(`${API_BASE}/admin/products/${productId}/images`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading images:', error);
            throw error;
        }
    }

    async validateSku(sku, productId = null) {
        try {
            const params = new URLSearchParams({ sku });
            if (productId) params.append('productId', productId);

            const response = await fetch(`${API_BASE}/admin/products/validate/sku?${params}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error validating SKU:', error);
            throw error;
        }
    }
}

export const productService = new ProductService();

export const useProducts = () => {
    return productService;
};

export const productUtils = {

    calculateProfitMargin: (costPrice, sellingPrice) => {
        if (!costPrice || !sellingPrice) return 0;
        return ((sellingPrice - costPrice) / costPrice * 100).toFixed(2);
    },

    formatPrice: (price) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(price);
    },

    getStatusColor: (status) => {
        const colors = {
            draft: '#6B7280',
            active: '#10B981',
            inactive: '#EF4444',
            archived: '#9CA3AF'
        };
        return colors[status] || '#6B7280';
    },

    getStatusText: (status) => {
        const texts = {
            draft: 'Borrador',
            active: 'Activo',
            inactive: 'Inactivo',
            archived: 'Archivado'
        };
        return texts[status] || 'Desconocido';
    },

    isLowStock: (stock, minStock) => {
        return stock <= minStock;
    },

    getStatusOptions: () => [
        { value: 'draft', label: 'Borrador' },
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' },
        { value: 'archived', label: 'Archivado' }
    ],

    validateProduct: (productData) => {
        const errors = {};

        if (!productData.productName?.trim()) {
            errors.productName = 'El nombre del producto es requerido';
        }

        if (!productData.sku?.trim()) {
            errors.sku = 'El SKU es requerido';
        }

        if (productData.productPrice <= 0) {
            errors.productPrice = 'El precio debe ser mayor a 0';
        }

        if (productData.costPrice && productData.costPrice > productData.productPrice) {
            errors.costPrice = 'El costo no puede ser mayor al precio de venta';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};

export default productService;