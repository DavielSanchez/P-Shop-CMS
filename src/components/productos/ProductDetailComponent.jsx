import React, { useEffect, useState } from 'react';
import { useColors } from '../../hooks/useColor';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useProducts } from '../../hooks/useProducts';
import Aside from './detailsSections/aside';
import Tabs from './detailsSections/Tabs';

function ProductDetail() {
  const colors = useColors();
  const navigate = useNavigate();
  const { name } = useParams();
  const { products } = useProducts();
  
  const product = products.find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === name?.toLowerCase()
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!product) {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-3" style={{ color: colors.textPrimary }}>
            Producto no encontrado
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="px-3 py-2 rounded-lg flex items-center gap-1 text-sm"
            style={{ backgroundColor: colors.primary, color: '#fff' }}
          >
            <ArrowBack fontSize="small" />
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-full">
        <div className="flex items-center justify-between gap-2 mb-6 py-4 rounded-xl" style={{ 
          backgroundColor: colors.surface, 
          borderColor: colors.border 
        }}>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => navigate('/products')}
              className="flex-shrink-0 p-1 rounded-lg transition-colors hover:bg-opacity-10"
              style={{ color: colors.textPrimary }}
            >
              <ArrowBack fontSize="small" />
            </button>
            
            <div className="min-w-0 flex flex-1">
              <h1 className="text-lg md:text-2xl font-bold truncate" style={{ color: colors.textPrimary }}>
                {product.name}
              </h1>
              <span 
                className="flex-shrink-0 self-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ml-3"
                style={{ 
                    backgroundColor: '#10b98115',
                    color: '#10b981'
                }}
                >
                Habilitado
                </span>
            </div>
            
            
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border transition-colors hover:bg-opacity-10 text-xs"
                style={{ 
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
              >
                <span>Imprimir</span>
              </button>

              <button
                onClick={() => {}}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border transition-colors hover:bg-opacity-10 text-xs"
                style={{ 
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
              >
                <span>Guardar</span>
              </button>
            </div>

            <div className="relative dropdown-container">
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg border transition-colors hover:bg-opacity-10 text-xs"
                style={{ 
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
                onClick={handleDropdownToggle}
              >
                <span>•••</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 py-2 rounded-lg border shadow-lg z-10"
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    minWidth: '140px'
                  }}
                >
                  <div className="sm:hidden">
                    <button
                      onClick={() => window.print()}
                      className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-opacity-10 flex items-center gap-2"
                      style={{ color: colors.textPrimary }}
                    >
                      <span>Imprimir</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-opacity-10 flex items-center gap-2"
                      style={{ color: colors.textPrimary }}
                    >
                      <span>Guardar</span>
                    </button>
                    <div className="border-t my-1" style={{ borderColor: colors.border }}></div>
                  </div>
                  
                  <button
                    onClick={() => {}}
                    className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-opacity-10 flex items-center gap-2"
                    style={{ color: colors.textPrimary }}
                  >
                    <span>Impresión</span>
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-opacity-10 flex items-center gap-2"
                    style={{ color: colors.textPrimary }}
                  >
                    <span>Recargar</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-opacity-10 text-red-500 flex items-center gap-2"
                  >
                    <span>Eliminar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
            <Aside product={product}/>
            <Tabs product={product}/>
        </div>


        {/* <div className="p-4 rounded-xl" style={{ backgroundColor: colors.surface, color: colors.textPrimary }}>
          <p><strong>Producto:</strong> {product.name}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock} unidades</p>
          <p><strong>Categoría:</strong> {product.category}</p>
        </div> */}
      </div>
    </div>
  );
}

export default ProductDetail;