// hooks/useCategories.js
import { useState, useMemo, useEffect } from 'react';
import { mockCategories } from '../data/Products'

export const getCategoryUrl = (category) => {
    return `/category/${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`;
};

export const useCategories = () => {
    const [categories] = useState(mockCategories);
    const [filters, setFilters] = useState({
        search: '',
        status: 'todos'
    });
    const [sortBy, setSortBy] = useState('categoryName');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('table');

    // Filtrar y ordenar categorías
    const filteredAndSortedCategories = useMemo(() => {
        let filtered = categories.filter(category => {
            // Filtro de búsqueda
            const matchesSearch = filters.search === '' ||
                category.categoryName.toLowerCase().includes(filters.search.toLowerCase()) ||
                category.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                category.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));

            // Filtro de estado
            const getCategoryStatus = (productCount) => {
                if (productCount === 0) return 'empty';
                if (productCount <= 5) return 'low';
                return 'active';
            };

            const categoryStatus = getCategoryStatus(category.productCount);
            const matchesStatus = filters.status === 'todos' || categoryStatus === filters.status;

            return matchesSearch && matchesStatus;
        });

        // Ordenar
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'productCount') {
                aValue = parseInt(aValue);
                bValue = parseInt(bValue);
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [categories, filters, sortBy, sortOrder]);

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
        const paginatedItems = filteredAndSortedCategories.slice(startIndex, endIndex);
        const totalPages = Math.ceil(filteredAndSortedCategories.length / itemsPerPage);

        return {
            currentPage,
            totalPages,
            totalItems: filteredAndSortedCategories.length,
            paginatedItems,
            itemsPerPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
            nextPage: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
            prevPage: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
            goToPage: (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))
        };
    }, [filteredAndSortedCategories, currentPage, itemsPerPage]);

    // Resetear a página 1 cuando cambia la vista
    useEffect(() => {
        setCurrentPage(1);
    }, [viewMode]);

    // Resetear a página 1 cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return {
        categories: filteredAndSortedCategories,
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