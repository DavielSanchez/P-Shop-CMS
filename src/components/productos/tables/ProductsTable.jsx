// components/products/tables/ProductsTable.jsx
import React from 'react';
import { useColors } from '../../../hooks/useColor';
import { Edit, Delete, RemoveRedEye, Inventory, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ProductsTable({ 
  products = [], 
  onEditProduct, 
  onDeleteProduct,
  sortBy = 'name',
  setSortBy,
  sortOrder = 'asc',
  setSortOrder,
  pagination
}) {
  const colors = useColors();
  const navigate = useNavigate();

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { status: 'out-of-stock', label: 'Sin stock', color: '#ef4444' };
    if (stock <= minStock) return { status: 'low-stock', label: 'Stock bajo', color: '#f59e0b' };
    return { status: 'in-stock', label: 'En stock', color: '#10b981' };
  };

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
                  { key: 'name', label: 'Producto', className: 'text-left' },
                  { key: 'sku', label: 'SKU', className: 'text-center' },
                  { key: 'category', label: 'Categoría', className: 'text-center' },
                  { key: 'price', label: 'Precio', className: 'text-right' },
                  { key: 'cost', label: 'Costo', className: 'text-right' },
                  { key: 'stock', label: 'Stock', className: 'text-center' },
                  { key: 'status', label: 'Estado', className: 'text-center' },
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
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-6 text-center" style={{ color: colors.textSecondary }}>
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  if (!product) return null;
                  
                  const stockStatus = getStockStatus(product.stock || 0, product.minStock || 0);
                  const profit = (product.price || 0) - (product.cost || 0);
                  const margin = product.cost ? ((profit / product.cost) * 100).toFixed(1) : '0';
                  
                  return (
                    <tr 
                      key={product.id} 
                      className="border-b transition-colors hover:bg-opacity-50"
                      style={{ 
                        borderColor: colors.border,
                        backgroundColor: 'transparent',
                      }}
                    >
                      {/* PRODUCTO */}
                      <td className="p-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div 
                            className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: colors.primary + '20' }}
                          >
                            <Inventory style={{ color: colors.primary, fontSize: 16 }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-xs truncate" style={{ color: colors.textPrimary }}>
                              {product.name}
                            </div>
                            <div className="text-xs truncate" style={{ color: colors.textSecondary }}>
                              {(product.tags || []).slice(0, 1).join(', ')}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* SKU */}
                      <td className="p-2 text-center">
                        <div className="font-mono text-xs" style={{ color: colors.textPrimary }}>
                          {product.sku}
                        </div>
                      </td>
                      
                      {/* CATEGORÍA */}
                      <td className="p-2 text-center">
                        <div className="text-xs capitalize" style={{ color: colors.textPrimary }}>
                          {product.category}
                        </div>
                      </td>
                      
                      {/* PRECIO */}
                      <td className="p-2 text-right">
                        <div className="font-medium text-xs" style={{ color: colors.textPrimary }}>
                          ${product.price}
                        </div>
                      </td>
                      
                      {/* COSTO Y MARGEN */}
                      <td className="p-2 text-right">
                        <div className="text-xs" style={{ color: colors.textPrimary }}>${product.cost}</div>
                        <div className="text-xs" style={{ color: margin > 0 ? '#10b981' : '#ef4444' }}>
                          {margin}%
                        </div>
                      </td>
                      
                      {/* STOCK */}
                      <td className="p-2 text-center">
                        <div className="font-medium text-xs" style={{ color: colors.textPrimary }}>
                          {product.stock}
                        </div>
                      </td>
                      
                      {/* ESTADO */}
                      <td className="p-2 text-center">
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                          style={{ 
                            backgroundColor: `${stockStatus.color}15`,
                            color: stockStatus.color
                          }}
                        >
                          {stockStatus.label}
                        </span>
                      </td>
                      
                      {/* ACCIONES */}
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => navigate(`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`)}
                            className="p-1 rounded transition-colors hover:bg-blue-100"
                            style={{ color: '#10b981' }}
                            title="Ver detalle del producto"
                          >
                            <RemoveRedEye fontSize="small" />
                          </button>
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
            {pagination.totalItems} productos
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
                
                // Mostrar páginas alrededor de la actual
                let startPage = Math.max(1, currentPage - 1);
                let endPage = Math.min(totalPages, currentPage + 1);
                
                // Si hay muchas páginas, mostrar primera y última
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

export default ProductsTable;