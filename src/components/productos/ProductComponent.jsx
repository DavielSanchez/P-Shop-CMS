import React, { useState } from 'react';
import { useColors } from '../../hooks/useColor.js';
import { useProducts } from '../../hooks/useProducts';
import ProductsFilters from './filtros/ProductsFilters.jsx';
import ProductsTable from './tables/ProductsTable.jsx';
import ProductsGrid from './tables/ProductGrid.jsx';
import ProductsCards from './cards/ProductCards.jsx';
import ProductForm from './form/ProductForm.jsx';

function ProductComponent() {
  const colors = useColors();
  
  // Usar el hook sin pasar parámetros - el viewMode se maneja internamente
  const {
    products,
    pagination,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    viewMode,
    setViewMode
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (productData) => {
    console.log('Producto guardado:', productData);
    handleCloseForm();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (productId) => {
    console.log('Eliminar producto:', productId);
  };

  // Renderizar vista según el modo con paginación integrada
  const renderView = () => {
    const viewProps = {
      products: pagination.paginatedItems,
      onEditProduct: handleEditProduct,
      onDeleteProduct: handleDeleteProduct,
      sortBy: sortBy || 'name',
      setSortBy: setSortBy,
      sortOrder: sortOrder || 'asc',
      setSortOrder: setSortOrder,
      pagination: pagination
    };

    switch (viewMode) {
      case 'grid':
        return <ProductsGrid {...viewProps} />;
      case 'cards':
        return <ProductsCards {...viewProps} />;
      default:
        return <ProductsTable {...viewProps} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col pY-6">
      {/* Header del módulo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            Gestión de Productos
          </h1>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {pagination?.totalItems || 0} productos encontrados
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-md"
          style={{ backgroundColor: colors.primary, color: '#ffffff' }}
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-1 min-h-0 flex flex-col">
        {showForm ? (
          <ProductForm 
            product={editingProduct}
            onClose={handleCloseForm}
            onSave={handleSaveProduct}
          />
        ) : (
          <>
            <ProductsFilters 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              filters={filters}
              onFiltersChange={setFilters}
              sortBy={sortBy || 'name'}
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

export default ProductComponent;