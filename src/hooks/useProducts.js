// hooks/useProducts.js
import { useState, useMemo, useEffect } from 'react';
import { productService, productUtils } from '../services/products';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        category: 'todos',
        status: 'todos',
        minPrice: '',
        maxPrice: ''
    });
    const [sortBy, setSortBy] = useState('productName');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('table');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await productService.getAllProducts();
                const productsArray = response.products || [];
                
                setProducts(productsArray);
            } catch (err) {
                console.error('Error loading products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const filteredAndSortedProducts = useMemo(() => {
        if (!Array.isArray(products) || products.length === 0) {
            return [];
        }


        let filtered = products.filter(product => {
            if (!product) return false;

            const matchesSearch = !filters.search || 
                (product.productName && product.productName.toLowerCase().includes(filters.search.toLowerCase())) ||
                (product.sku && product.sku.toLowerCase().includes(filters.search.toLowerCase()));

            const matchesCategory = filters.category === 'todos' || 
                product.category === filters.category;

            const matchesStatus = filters.status === 'todos' || 
                product.status === filters.status;

            const productPrice = parseFloat(product.productPrice) || 0;
            const minPrice = parseFloat(filters.minPrice) || 0;
            const maxPrice = parseFloat(filters.maxPrice) || Infinity;
            
            const matchesMinPrice = !filters.minPrice || productPrice >= minPrice;
            const matchesMaxPrice = !filters.maxPrice || productPrice <= maxPrice;

            return matchesSearch && matchesCategory && matchesStatus && matchesMinPrice && matchesMaxPrice;
        });

        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (aValue === undefined || aValue === null) aValue = '';
            if (bValue === undefined || bValue === null) bValue = '';

            if (sortBy === 'productPrice' || sortBy === 'stock' || sortBy === 'costPrice') {
                aValue = parseFloat(aValue) || 0;
                bValue = parseFloat(bValue) || 0;
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [products, filters, sortBy, sortOrder]);

    const getItemsPerPage = () => {
        switch (viewMode) {
            case 'grid':
                return 12;
            case 'cards':
                return 8;
            default:
                return 10;
        }
    };

    const itemsPerPage = getItemsPerPage();

    const pagination = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = filteredAndSortedProducts.slice(startIndex, endIndex);
        const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);


        return {
            currentPage,
            totalPages,
            totalItems: filteredAndSortedProducts.length,
            paginatedItems,
            itemsPerPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            nextPage: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
            prevPage: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
            goToPage: (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))
        };
    }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

    // Función para recargar productos
    const refetchProducts = async (customFilters = {}) => {
        try {
            setLoading(true);
            setError(null);
            const allFilters = { ...filters, ...customFilters };
            const response = await productService.getAllProducts(allFilters);
            const productsArray = response.products || [];
            setProducts(productsArray);
            return productsArray;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        products: filteredAndSortedProducts,
        allProducts: products,
        loading,
        error,
        pagination,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        viewMode,
        setViewMode,
        itemsPerPage,
        refetchProducts,
        productUtils
    };
};