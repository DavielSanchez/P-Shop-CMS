// components/products/tables/ProductsTable.jsx
import React from 'react';
import { useColors } from '../../../hooks/useColor';
import { Edit, Delete, RemoveRedEye, Inventory, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ProductsTable({ 
  products = [], 
  onEditProduct, 
  onDeleteProduct,
  sortBy = 'productName',
  setSortBy,
  sortOrder = 'asc',
  setSortOrder,
  pagination
}) {
  const colors = useColors();
  const navigate = useNavigate();

  // Función para manejar productTag (puede ser string o array)
  const getProductTags = (productTag) => {
    if (!productTag) return 'Sin etiqueta';
    
    if (Array.isArray(productTag)) {
      return productTag.slice(0, 2).join(', ');
    }
    
    return productTag;
  };

  // Función para manejar productColors (puede ser string o array)
  const getProductColors = (productColors) => {
    if (!productColors) return '';
    
    if (Array.isArray(productColors)) {
      return productColors.slice(0, 2).join(', ');
    }
    
    return productColors;
  };

  // Función para calcular el precio con descuento
  const getDiscountedPrice = (productPrice, productDiscount) => {
    if (!productPrice) return 0;
    
    // Si productDiscount es un monto fijo de descuento
    if (productDiscount && productDiscount > 0) {
      return Math.max(0, productPrice - productDiscount);
    }
    
    return productPrice;
  };

  // Función para calcular el porcentaje de descuento
  const getDiscountPercentage = (productPrice, productDiscount) => {
    if (!productPrice || !productDiscount || productDiscount <= 0) return 0;
    
    const percentage = (productDiscount / productPrice) * 100;
    return Math.round(percentage);
  };

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

  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  return (
    <div className="flex flex-col">
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
                  { key: 'productName', label: 'Producto', className: 'text-left' },
                  { key: 'sku', label: 'SKU', className: 'text-center' },
                  { key: 'category', label: 'Categoría', className: 'text-center' },
                  { key: 'productPrice', label: 'Precio', className: 'text-right' },
                  { key: 'costPrice', label: 'Costo', className: 'text-right' },
                  { key: 'productStock', label: 'Stock', className: 'text-center' },
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
                  
                  const stockStatus = getStockStatus(product.productStock || 0, product.minStock || 0);
                  const costPrice = product.costPrice || 0;
                  const sellingPrice = product.productPrice || 0;
                  const profit = sellingPrice - costPrice;
                  const margin = costPrice > 0 ? ((profit / costPrice) * 100).toFixed(1) : '0';
                  
                  // Calcular precios con descuento
                  const discountedPrice = getDiscountedPrice(product.productPrice, product.productDiscount);
                  const discountPercentage = getDiscountPercentage(product.productPrice, product.productDiscount);
                  
                  return (
                    <tr 
                      key={product._id || product.id} 
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
                            className="w-10 h-10 rounded flex-shrink-0 bg-cover bg-center border"
                            style={{ 
                              backgroundImage: `url(${product.productMainImage})`,
                              backgroundColor: colors.primary + '20',
                              borderColor: colors.border
                            }}
                          >
                            {!product.productMainImage && (
                              <div className="w-full h-full flex items-center justify-center">
                                <Inventory style={{ color: colors.primary, fontSize: 16 }} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-xs truncate" style={{ color: colors.textPrimary }}>
                              {product.productName || 'Sin nombre'}
                            </div>
                            <div className="text-xs truncate" style={{ color: colors.textSecondary }}>
                              {getProductTags(product.productTag)}
                            </div>
                            {/* {product.productColors && product.productColors.length > 0 && (
                              <div className="text-xs truncate" style={{ color: colors.textSecondary }}>
                                Colores: {getProductColors(product.productColors)}
                              </div>
                            )} */}
                          </div>
                        </div>
                      </td>
                      
                      {/* SKU */}
                      <td className="p-2 text-center">
                        <div className="font-mono text-xs" style={{ color: colors.textPrimary }}>
                          {product.sku || 'N/A'}
                        </div>
                      </td>
                      
                      {/* CATEGORÍA */}
                      <td className="p-2 text-center">
                        <div className="text-xs capitalize" style={{ color: colors.textPrimary }}>
                          {product.productCategory?.categoryName || 'Sin categoría'}
                        </div>
                      </td>
                      
                      {/* PRECIO */}
                      <td className="p-2 text-right">
                        {product.productOffer && product.productDiscount ? (
                          <>
                            {/* Precio con descuento */}
                            <div className="font-medium text-xs" style={{ color: '#10b981' }}>
                              {formatPrice(discountedPrice)}
                            </div>
                            {/* Precio original tachado */}
                            <div className="text-xs line-through" style={{ color: colors.textSecondary }}>
                              {formatPrice(product.productPrice)}
                            </div>
                            {/* Porcentaje de descuento */}
                            <div className="text-xs font-medium" style={{ color: '#ef4444' }}>
                              -{discountPercentage}%
                            </div>
                          </>
                        ) : (
                          /* Precio normal sin descuento */
                          <div className="font-medium text-xs" style={{ color: colors.textPrimary }}>
                            {formatPrice(product.productPrice || 0)}
                          </div>
                        )}
                      </td>
                      
                      {/* COSTO */}
                      <td className="p-2 text-right">
                        <div className="text-xs" style={{ color: colors.textPrimary }}>
                          {costPrice > 0 ? formatPrice(costPrice) : 'N/A'}
                        </div>
                        {costPrice > 0 && (
                          <div 
                            className="text-xs" 
                            style={{ color: margin > 0 ? '#10b981' : '#ef4444' }}
                          >
                            {margin}%
                          </div>
                        )}
                      </td>
                      
                      {/* STOCK */}
                      <td className="p-2 text-center">
                        <div className="font-medium text-xs" style={{ color: colors.textPrimary }}>
                          {product.productStock || 0}
                        </div>
                        {product.minStock > 0 && (
                          <div className="text-xs" style={{ color: colors.textSecondary }}>
                            Mín: {product.minStock}
                          </div>
                        )}
                      </td>
                      
                      {/* ESTADO */}
                      <td className="p-2 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          {/* Estado de stock */}
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                            style={{ 
                              backgroundColor: `${stockStatus.color}15`,
                              color: stockStatus.color
                            }}
                          >
                            {stockStatus.label}
                          </span>
                          {/* Estado del producto */}
                          <span 
                            className="px-2 py-0.5 rounded text-xs whitespace-nowrap"
                            style={{ 
                              backgroundColor: product.status === 'active' ? '#10b98115' : 
                                            product.status === 'draft' ? '#6b728015' : 
                                            product.status === 'inactive' ? '#ef444415' : '#9ca3af15',
                              color: product.status === 'active' ? '#10b981' : 
                                    product.status === 'draft' ? '#6b7280' : 
                                    product.status === 'inactive' ? '#ef4444' : '#9ca3af'
                            }}
                          >
                            {product.status === 'active' ? 'Activo' : 
                             product.status === 'draft' ? 'Borrador' : 
                             product.status === 'inactive' ? 'Inactivo' : 
                             product.status || 'Desconocido'}
                          </span>
                        </div>
                      </td>
                      
                      {/* ACCIONES */}
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => {
                              navigate(`/product/${product._id}`, { 
                                state: { product }
                              })
                            }}
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
                            onClick={() => onDeleteProduct && onDeleteProduct(product._id || product.id)}
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

export default ProductsTable;