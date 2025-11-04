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

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="flex flex-col">
      <div 
        className="flex-1 rounded-lg mb-4"
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
              
              const stockStatus = getStockStatus(product.productStock || 0, product.minStock || 0);
              const profit = (product.productPrice || 0) - (product.costPrice || 0);
              const margin = product.costPrice ? ((profit / product.costPrice) * 100).toFixed(1) : '0';

              return (
                <div
                  key={product._id || product.id}
                  className="border rounded-lg p-4 transition-all hover:shadow-md"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div 
                      className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      {/* <Inventory style={{ color: colors.primary }} /> */}
                      <img src={product.productMainImage} alt={`Imagen del producto ${product.productName}`} />
                    </div>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2"
                      style={{ 
                        backgroundColor: `${stockStatus.color}20`,
                        color: stockStatus.color
                      }}
                    >
                      {stockStatus.label}
                    </span>
                  </div>

                  <div className="mb-3 min-w-0">
                    <h3 
                      className="font-semibold mb-1 text-sm truncate"
                      style={{ color: colors.textPrimary }}
                      title={product.productName}
                    >
                      {truncateText(product.productName, 30)}
                    </h3>
                    <p className="text-xs mb-2 truncate" style={{ color: colors.textSecondary }}>
                      <span className="font-mono">{product.sku}</span> • {truncateText(product.productCategory?.categoryName || 'Sin categoría', 20)}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm truncate" style={{ color: colors.textPrimary }}>
                        ${product.productPrice}
                      </span>
                      <span className="text-xs truncate" style={{ color: margin > 0 ? '#10b981' : '#ef4444' }}>
                        {margin}% margen
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs truncate" style={{ color: colors.textSecondary }}>
                      Stock: <strong>{product.productStock}</strong>
                    </span>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => onEditProduct && onEditProduct(product)}
                        className="p-1 rounded transition-colors hover:bg-blue-100"
                        style={{ color: colors.primary }}
                        title="Editar producto"
                      >
                        <Edit fontSize="small" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct && onDeleteProduct(product._id || product.id)}
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
            
            <div className="flex gap-1">
              {(() => {
                const pages = [];
                const totalPages = pagination.totalPages;
                const currentPage = pagination.currentPage;
                
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