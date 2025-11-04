import React from 'react';
import { useColors } from '../../../hooks/useColor';
import { Edit, Delete, Category, Description, CalendarToday } from '@mui/icons-material';

function CategoriesCards({ categories = [], onEditCategory, onDeleteCategory, pagination }) {
  const colors = useColors();

  const getCategoryStatus = (productCount) => {
    if (productCount === 0) return { label: 'Vacía', color: '#6b7280' };
    if (productCount <= 5) return { label: 'Pocos productos', color: '#f59e0b' };
    return { label: 'Activa', color: '#10b981' };
  };

  return (
    <div className="flex flex-col">
      <div 
        className="rounded-lg flex-1 mb-4 py-6"
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {categories.map((category) => {
              if (!category) return null;
              
              const status = getCategoryStatus(category.productCount || 0);
              const createdAt = category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A';
              const updatedAt = category.updatedAt ? new Date(category.updatedAt).toLocaleDateString() : 'N/A';

              return (
                <div
                  key={category.id}
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
                        <Category style={{ color: colors.primary, fontSize: 32 }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1" style={{ color: colors.textPrimary }}>
                          {category.categoryName}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                          {category.description || 'Sin descripción'}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <span 
                            className="px-2 py-1 rounded text-xs"
                            style={{ 
                              backgroundColor: colors.border,
                              color: colors.textSecondary
                            }}
                          >
                            {category.slug || category.categoryName?.toLowerCase().replace(/\s+/g, '-')}
                          </span>
                          {category.tags && category.tags.slice(0, 2).map(tag => (
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
                        backgroundColor: `${status.color}20`,
                        color: status.color
                      }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Category style={{ color: colors.primary }} />
                      <div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>Productos</div>
                        <div className="font-bold" style={{ color: colors.textPrimary }}>{category.productCount || 0}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Description style={{ color: colors.primary }} />
                      <div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>Estado</div>
                        <div className="font-bold capitalize" style={{ color: status.color }}>{status.label}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarToday style={{ color: colors.primary }} />
                      <div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>Creada</div>
                        <div className="font-bold text-xs" style={{ color: colors.textPrimary }}>{createdAt}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarToday style={{ color: colors.primary }} />
                      <div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>Actualizada</div>
                        <div className="font-bold text-xs" style={{ color: colors.textPrimary }}>{updatedAt}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm" style={{ color: colors.textSecondary }}>
                      ID: <span className="font-mono">{category.id}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditCategory && onEditCategory(category)}
                        className="px-4 py-2 rounded-lg font-medium transition-colors hover:scale-105"
                        style={{
                          backgroundColor: colors.primary,
                          color: '#ffffff',
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDeleteCategory && onDeleteCategory(category.id)}
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

export default CategoriesCards;