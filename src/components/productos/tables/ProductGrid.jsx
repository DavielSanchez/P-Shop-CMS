import React from 'react';
import { useColors } from '../../../hooks/useColor';
import { Edit, Delete, Inventory } from '@mui/icons-material';

function ProductsGrid({ products = [], onEditProduct, onDeleteProduct, pagination }) {
  const colors = useColors();

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: 'Sin stock', color: '#ef4444' };
    if (stock <= minStock) return { label: 'Stock bajo', color: '#f59e0b' };
    return { label: 'En stock', color: '#10b981' };
  };

  return (
    <div className="flex flex-col">
      {/* CONTENIDO GRID - SIN SCROLL INTERNO */}
      <div 
        className="flex-1 rounded-lg  mb-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        {products.length === 0 ? (
          <div 
            className="flex items-center justify-center p-8"
            style={{ color: colors.textSecondary }}
          >
            No se encontraron productos
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => {
              if (!product) return null;
              
              const stockStatus = getStockStatus(product.stock || 0, product.minStock || 0);
              const profit = (product.price || 0) - (product.cost || 0);
              const margin = product.cost ? ((profit / product.cost) * 100).toFixed(1) : '0';

              return (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 transition-all hover:shadow-md"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  }}
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-start mb-3">
                    <div 
                      className="w-12 h-12 rounded flex items-center justify-center"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <Inventory style={{ color: colors.primary }} />
                    </div>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${stockStatus.color}20`,
                        color: stockStatus.color
                      }}
                    >
                      {stockStatus.label}
                    </span>
                  </div>

                  {/* CONTENIDO */}
                  <div className="mb-3">
                    <h3 
                      className="font-semibold mb-1 text-sm truncate"
                      style={{ color: colors.textPrimary }}
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>
                      {product.sku} • {product.category}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm" style={{ color: colors.textPrimary }}>
                        ${product.price}
                      </span>
                      <span className="text-xs" style={{ color: margin > 0 ? '#10b981' : '#ef4444' }}>
                        {margin}% margen
                      </span>
                    </div>
                  </div>

                  {/* STOCK Y ACCIONES */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      Stock: <strong>{product.stock}</strong>
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onEditProduct && onEditProduct(product)}
                        className="p-1 rounded transition-colors hover:bg-blue-100"
                        style={{ color: colors.primary }}
                        title="Editar producto"
                      >
                        <Edit fontSize="small" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct && onDeleteProduct(product.id)}
                        className="p-1 rounded transition-colors hover:bg-red-100"
                        style={{ color: '#ef4444' }}
                        title="Eliminar producto"
                      >
                        <Delete fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PAGINACIÓN - SIEMPRE VISIBLE EN LA PARTE INFERIOR */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{backgroundColor: 'transparent', borderColor: colors.border}} className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-lg border">
          <span style={{ color: colors.textPrimary, fontSize: '14px' }} className="text-center sm:text-left">
            Página {pagination.currentPage} de {pagination.totalPages} • 
            {pagination.totalItems} productos
          </span>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={pagination.prevPage}
              disabled={!pagination.hasPrevPage}
              className="px-3 py-2 border rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-50"
              style={{ 
                borderColor: colors.border,
                color: colors.textPrimary,
                backgroundColor: 'transparent',
              }}
            >
              ‹ Anterior
            </button>
            
            {/* NÚMEROS DE PÁGINA - RESPONSIVE */}
            <div className="flex gap-1">
              {(() => {
                const pages = [];
                const totalPages = pagination.totalPages;
                const currentPage = pagination.currentPage;
                
                // Mostrar máximo 3 páginas en móvil, 5 en desktop
                let startPage = Math.max(1, currentPage - 1);
                let endPage = Math.min(totalPages, currentPage + 1);
                
                if (window.innerWidth >= 768) {
                  startPage = Math.max(1, currentPage - 2);
                  endPage = Math.min(totalPages, currentPage + 2);
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => pagination.goToPage(i)}
                      className={`px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm border rounded-lg font-medium transition-all ${
                        pagination.currentPage === i 
                          ? 'text-white shadow-sm' 
                          : 'hover:bg-gray-50'
                      }`}
                      style={{
                        borderColor: colors.border,
                        backgroundColor: pagination.currentPage === i ? colors.primary : 'transparent',
                        color: pagination.currentPage === i ? '#ffffff' : colors.textPrimary,
                      }}
                    >
                      {i}
                    </button>
                  );
                }
                return pages;
              })()}
            </div>
            
            <button
              onClick={pagination.nextPage}
              disabled={!pagination.hasNextPage}
              className="px-3 py-2 border rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-50"
              style={{ 
                borderColor: colors.border,
                color: colors.textPrimary,
                backgroundColor: 'transparent',
              }}
            >
              Siguiente ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsGrid;