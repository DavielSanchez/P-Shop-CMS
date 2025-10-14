import { useState, useMemo, useEffect } from 'react';
import { mockProducts } from '../data/products';

export const useProducts = () => {
    const [products] = useState(mockProducts);
    const [filters, setFilters] = useState({
        search: '',
        category: 'todos',
        status: 'todos',
        minPrice: '',
        maxPrice: ''
    });
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('table');

    // Filtrar y ordenar productos
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            // Filtro de búsqueda
            const matchesSearch = filters.search === '' ||
                product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.sku.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));

            // Filtro de categoría
            const matchesCategory = filters.category === 'todos' || product.category === filters.category;

            // Filtro de estado de stock
            const getStockStatus = (stock, minStock) => {
                if (stock === 0) return 'out-of-stock';
                if (stock <= minStock) return 'low-stock';
                return 'active';
            };

            const productStatus = getStockStatus(product.stock, product.minStock);
            const matchesStatus = filters.status === 'todos' || productStatus === filters.status;

            // Filtro de precio
            const matchesMinPrice = !filters.minPrice || product.price >= parseFloat(filters.minPrice);
            const matchesMaxPrice = !filters.maxPrice || product.price <= parseFloat(filters.maxPrice);

            return matchesSearch && matchesCategory && matchesStatus && matchesMinPrice && matchesMaxPrice;
        });

        // Ordenar
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'price' || sortBy === 'stock' || sortBy === 'cost') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [products, filters, sortBy, sortOrder]);

    // Items por página según la vista
    const getItemsPerPage = () => {
        switch (viewMode) {
            case 'grid':
                return 12;
            case 'cards':
                return 8;
            default: // table
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

    // Resetear a página 1 cuando cambia la vista
    useEffect(() => {
        setCurrentPage(1);
    }, [viewMode]);

    // Resetear a página 1 cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return {
        products: filteredAndSortedProducts,
        pagination,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        viewMode,
        setViewMode,
        itemsPerPage
    };
};