import React from 'react';
import { useColors } from '../../../hooks/useColor';
import { Edit, Delete, Category } from '@mui/icons-material';

function CategoriesGrid({ categories = [], onEditCategory, onDeleteCategory, pagination }) {
  const colors = useColors();

  const getCategoryStatus = (productCount) => {
    if (productCount === 0) return { label: 'Vacía', color: '#6b7280' };
    if (productCount <= 5) return { label: 'Pocos productos', color: '#f59e0b' };
    return { label: 'Activa', color: '#10b981' };
  };

  return (
    <div className="flex flex-col">
      {/* CONTENIDO GRID */}
      <div 
        className="flex-1 rounded-lg mb-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        {categories.length === 0 ? (
          <div 
            className="flex items-center justify-center p-8"
            style={{ color: colors.textSecondary }}
          >
            No se encontraron categorías
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => {
              if (!category) return null;
              
              const status = getCategoryStatus(category.productCount || 0);
              const createdAt = category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A';

              return (
                <div
                  key={category.id}
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
                      <Category style={{ color: colors.primary }} />
                    </div>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${status.color}20`,
                        color: status.color
                      }}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* CONTENIDO */}
                  <div className="mb-3">
                    <h3 
                      className="font-semibold mb-1 text-sm truncate"
                      style={{ color: colors.textPrimary }}
                      title={category.categoryName}
                    >
                      {category.categoryName}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>
                      {category.slug || category.categoryName?.toLowerCase().replace(/\s+/g, '-')}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm" style={{ color: colors.textPrimary }}>
                        {category.productCount || 0} productos
                      </span>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        Creada: {createdAt}
                      </span>
                    </div>
                  </div>

                  {/* DESCRIPCIÓN Y ACCIONES */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs line-clamp-2" style={{ color: colors.textSecondary }}>
                      {category.description || 'Sin descripción'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        ID: <span className="font-mono">{category.id?.slice(-6)}</span>
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onEditCategory && onEditCategory(category)}
                          className="p-1 rounded transition-colors hover:bg-blue-100"
                          style={{ color: colors.primary }}
                          title="Editar categoría"
                        >
                          <Edit fontSize="small" />
                        </button>
                        <button
                          onClick={() => onDeleteCategory && onDeleteCategory(category.id)}
                          className="p-1 rounded transition-colors hover:bg-red-100"
                          style={{ color: '#ef4444' }}
                          title="Eliminar categoría"
                        >
                          <Delete fontSize="small" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PAGINACIÓN */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{backgroundColor: 'transparent', borderColor: colors.border}} className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-lg border">
          <span style={{ color: colors.textPrimary, fontSize: '14px' }} className="text-center sm:text-left">
            Página {pagination.currentPage} de {pagination.totalPages} • 
            {pagination.totalItems} categorías
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

export default CategoriesGrid;