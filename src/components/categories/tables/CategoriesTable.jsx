import React from 'react';
import { useColors } from '../../../hooks/useColor';
import { Edit, Delete, RemoveRedEye, Category, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function CategoriesTable({ 
  categories = [], 
  onEditCategory, 
  onDeleteCategory,
  sortBy = 'categoryName',
  setSortBy,
  sortOrder = 'asc',
  setSortOrder,
  pagination
}) {
  const colors = useColors();
  const navigate = useNavigate();

  const handleSort = (column) => {
    if (!setSortBy || !setSortOrder) return;
    
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />;
  };

  return (
    <div className="flex flex-col">
      {/* TABLA COMPACT Y RESPONSIVE */}
      <div 
        className="rounded-lg border mb-4 overflow-hidden"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: colors.background }}>
                {[
                  { key: 'categoryName', label: 'Categoría', className: 'text-left' },
                  { key: 'categoryTag', label: 'Etiqueta', className: 'text-center' },
                  { key: 'categoryComment', label: 'Descripción', className: 'text-center' },
                  { key: 'productsCount', label: 'Productos', className: 'text-center' },
                  { key: 'actions', label: '', className: 'text-center' }
                ].map(({ key, label, className }) => (
                  <th 
                    key={key}
                    className={`p-2 font-semibold cursor-pointer select-none text-xs ${className}`}
                    style={{ 
                      color: colors.textPrimary,
                      backgroundColor: colors.background,
                      whiteSpace: 'nowrap'
                    }}
                    onClick={() => key !== 'actions' && handleSort(key)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {label}
                      {key !== 'actions' && <SortIcon column={key} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center" style={{ color: colors.textSecondary }}>
                    No se encontraron categorías
                  </td>
                </tr>
              ) : (
                categories.map((category) => {
                  if (!category) return null;
                  
                  return (
                    <tr 
                      key={category._id} 
                      className="border-b transition-colors hover:bg-opacity-50"
                      style={{ 
                        borderColor: colors.border,
                        backgroundColor: 'transparent',
                      }}
                    >
                      {/* CATEGORÍA */}
                      <td className="p-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div 
                            className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: colors.primary + '20' }}
                          >
                            <Category style={{ color: colors.primary, fontSize: 16 }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-xs truncate" style={{ color: colors.textPrimary }}>
                              {category.categoryName}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* ETIQUETA */}
                      <td className="p-2 text-center">
                        <div className="font-mono text-xs" style={{ color: colors.textPrimary }}>
                          {category.categoryTag}
                        </div>
                      </td>
                      
                      {/* DESCRIPCIÓN */}
                      <td className="p-2 flex justify-center text-center">
                        <div className="text-xs truncate max-w-xs" style={{ color: colors.textSecondary }}>
                          {category.categoryComment || 'Sin descripción'}
                        </div>
                      </td>
                      
                      {/* CONTADOR DE PRODUCTOS */}
                      <td className="p-2 text-center">
                        <div className="font-medium text-xs" style={{ color: colors.textPrimary }}>
                          {category.productCount || 'Sin productos'}
                        </div>
                      </td>
                      
                      {/* ACCIONES */}
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => navigate(`/categories/${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`)}
                            className="p-1 rounded transition-colors hover:bg-blue-100"
                            style={{ color: '#10b981' }}
                            title="Ver detalle de categoría"
                          >
                            <RemoveRedEye fontSize="small" />
                          </button>
                          <button
                            onClick={() => onEditCategory && onEditCategory(category)}
                            className="p-1 rounded transition-colors hover:bg-blue-100"
                            style={{ color: colors.primary }}
                            title="Editar categoría"
                          >
                            <Edit fontSize="small" />
                          </button>
                          <button
                            onClick={() => onDeleteCategory && onDeleteCategory(category._id)}
                            className="p-1 rounded transition-colors hover:bg-red-100"
                            style={{ color: '#ef4444' }}
                            title="Eliminar categoría"
                          >
                            <Delete fontSize="small" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINACIÓN COMPACTA */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{backgroundColor: 'transparent', borderColor: colors.border}} 
             className="flex flex-col sm:flex-row justify-between items-center gap-3 p-3 rounded-lg border">
          <span style={{ color: colors.textPrimary, fontSize: '13px' }} className="text-center sm:text-left">
            Pág. {pagination.currentPage} de {pagination.totalPages} • 
            {pagination.totalItems} categorías
          </span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={pagination.prevPage}
              disabled={!pagination.hasPrevPage}
              className="px-3 py-1 border rounded text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-50"
              style={{ 
                borderColor: colors.border,
                color: colors.textPrimary,
                backgroundColor: 'transparent',
              }}
            >
              ‹ Anterior
            </button>
            
            {/* PÁGINAS COMPACTAS */}
            <div className="flex gap-1">
              {(() => {
                const pages = [];
                const totalPages = pagination.totalPages;
                const currentPage = pagination.currentPage;
                
                let startPage = Math.max(1, currentPage - 1);
                let endPage = Math.min(totalPages, currentPage + 1);
                
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    startPage = 1;
                    endPage = 4;
                  } else if (currentPage >= totalPages - 2) {
                    startPage = totalPages - 3;
                    endPage = totalPages;
                  }
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => pagination.goToPage(i)}
                      className={`px-2 py-1 text-xs border rounded font-medium transition-all min-w-[32px] ${
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
              className="px-3 py-1 border rounded text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-gray-50"
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

export default CategoriesTable;