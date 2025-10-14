import React from 'react';
import { useColors } from '../../../hooks/useColor';
import { ArrowBack } from '@mui/icons-material';

function ProductForm({ product, onClose, onSave }) {
  const colors = useColors();
  const isEditing = !!product;

  return (
    <div 
      className="rounded-lg border p-6 flex-1 min-h-0 flex flex-col"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
          style={{ color: colors.textPrimary }}
        >
          <ArrowBack />
        </button>
        <h2 style={{ color: colors.textPrimary }}>
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-2xl">
          <div style={{ color: colors.textSecondary }}>
            Formulario de producto {isEditing ? 'en edición' : 'para crear nuevo'}
          </div>
          
          <div className="mt-6 flex gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border rounded-lg"
              style={{
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() => onSave(product || {})}
              className="px-6 py-2 rounded-lg text-white"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;