import React from 'react';
import { useColors } from '../../../hooks/useColor';
import { Edit, Delete, Inventory, AttachMoney, Storage, Category } from '@mui/icons-material';

function ProductsCards({ products = [], onEditProduct, onDeleteProduct, pagination }) {
  const colors = useColors();

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: 'Sin stock', color: '#ef4444' };
    if (stock <= minStock) return { label: 'Stock bajo', color: '#f59e0b' };
    return { label: 'En stock', color: '#10b981' };
  };

  return (
    <div className="flex flex-col">
      {/* CONTENIDO CARDS - 2 POR LÍNEA */}
      <div 
        className="rounded-lg flex-1 mb-4 py-6"
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {products.map((product) => {
              if (!product) return null;
              
              const stockStatus = getStockStatus(product.stock || 0, product.minStock || 0);
              const profit = (product.price || 0) - (product.cost || 0);
              const margin = product.cost ? ((profit / product.cost) * 100).toFixed(1) : '0';

              return (
                <div
                  key={product.id}
                  className="border rounded-lg p-6 transition-all hover:shadow-lg h-fit"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: colors.primary + '20' }}
                      >
                        <Inventory style={{ color: colors.primary, fontSize: 32 }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1" style={{ color: colors.textPrimary }}>
                          {product.name}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                          {product.description || 'Sin descripción'}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {(product.tags || []).slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-1 rounded text-xs"
                              style={{ 
                                backgroundColor: colors.border,
                                color: colors.textSecondary
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `${stockStatus.color}20`,
                        color: stockStatus.color
                      }}
                    >
                      {stockStatus.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <AttachMoney style={{ color: colors.primary }} />
                      <div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>Precio</div>
                        <div className="font-bold" style={{ color: colors.textPrimary }}>${product.price}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Storage style={{ color: colors.primary }} />
                      <div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>Stock</div>
                        <div className="font-bold" style={{ color: colors.textPrimary }}>{product.stock} units</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Category style={{ color: colors.primary }} />
                      <div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>Categoría</div>
                        <div className="font-bold capitalize" style={{ color: colors.textPrimary }}>{product.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Inventory style={{ color: colors.primary }} />
                      <div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>Margen</div>
                        <div 
                          className="font-bold" 
                          style={{ color: margin > 0 ? '#10b981' : '#ef4444' }}
                        >
                          {margin}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm" style={{ color: colors.textSecondary }}>
                      SKU: <span className="font-mono">{product.sku}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditProduct && onEditProduct(product)}
                        className="px-4 py-2 rounded-lg font-medium transition-colors hover:scale-105"
                        style={{
                          backgroundColor: colors.primary,
                          color: '#ffffff',
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDeleteProduct && onDeleteProduct(product.id)}
                        className="px-4 py-2 border rounded-lg font-medium transition-colors hover:scale-105"
                        style={{
                          borderColor: '#ef4444',
                          color: '#ef4444',
                          backgroundColor: 'transparent',
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PAGINACIÓN - MISMA QUE EN GRID Y TABLE */}
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

export default ProductsCards;