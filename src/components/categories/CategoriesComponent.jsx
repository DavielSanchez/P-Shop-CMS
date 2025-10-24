// components/categories/CategoryComponent.jsx
import React, { useState } from 'react';
import { useColors } from '../../hooks/useColor.js';
import { useCategories } from '../../hooks/useCategories';
import CategoriesFilters from './filtros/CategoriesFilters.jsx';
import CategoriesTable from './tables/CategoriesTable.jsx';
import CategoriesGrid from './tables/CategoriesGrid.jsx';
import CategoriesCards from './card/CategoriesCards.jsx';
import CategoryForm from './form/CategoriesForm.jsx';

function CategoryComponent() {
  const colors = useColors();
  
  const {
    categories,
    pagination,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    viewMode,
    setViewMode
  } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleSaveCategory = (categoryData) => {
    console.log('Categoría guardada:', categoryData);
    handleCloseForm();
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = (categoryId) => {
    console.log('Eliminar categoría:', categoryId);
  };

  // Renderizar vista según el modo con paginación integrada
  const renderView = () => {
    const viewProps = {
      categories: pagination.paginatedItems,
      onEditCategory: handleEditCategory,
      onDeleteCategory: handleDeleteCategory,
      sortBy: sortBy || 'categoryName',
      setSortBy: setSortBy,
      sortOrder: sortOrder || 'asc',
      setSortOrder: setSortOrder,
      pagination: pagination
    };

    switch (viewMode) {
      case 'grid':
        return <CategoriesGrid {...viewProps} />;
      case 'cards':
        return <CategoriesCards {...viewProps} />;
      default:
        return <CategoriesTable {...viewProps} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col pY-6">
      {/* Header del módulo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            Gestión de Categorías
          </h1>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {pagination?.totalItems || 0} categorías encontradas
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-md"
          style={{ backgroundColor: colors.primary, color: '#ffffff' }}
        >
          + Nueva Categoría
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-1 min-h-0 flex flex-col">
        {showForm ? (
          <CategoryForm 
            category={editingCategory}
            onClose={handleCloseForm}
            onSave={handleSaveCategory}
          />
        ) : (
          <>
            <CategoriesFilters 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              filters={filters}
              onFiltersChange={setFilters}
              sortBy={sortBy || 'categoryName'}
              onSortChange={setSortBy}
              sortOrder={sortOrder || 'asc'}
              onSortOrderChange={setSortOrder}
            />
            
            {renderView()}
          </>
        )}
      </div>
    </div>
  );
}

export default CategoryComponent;