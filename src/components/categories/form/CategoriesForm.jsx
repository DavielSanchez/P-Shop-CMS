// components/categories/form/CategoriesForm.jsx
import React, { useState, useEffect } from 'react';
import { useColors } from '../../../hooks/useColor';
import { Close, Save, Category } from '@mui/icons-material';

function CategoriesForm({ category, onClose, onSave }) {
  const colors = useColors();
  
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
    slug: '',
    tags: [],
    isActive: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.categoryName || '',
        description: category.description || '',
        slug: category.slug || '',
        tags: category.tags || [],
        isActive: category.isActive !== undefined ? category.isActive : true
      });
    }
  }, [category]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    if (field === 'categoryName' && !category) {
      const generatedSlug = value.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({
        ...prev,
        slug: generatedSlug
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.categoryName.trim()) {
      newErrors.categoryName = 'El nombre de la categoría es requerido';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'El slug es requerido';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'El slug solo puede contener letras minúsculas, números y guiones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        id: category?.id,
        productCount: category?.productCount || 0,
        createdAt: category?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  };

  return (
    <div 
      className="border rounded-lg p-6"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: colors.primary + '20' }}
          >
            <Category style={{ color: colors.primary }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              {category ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {category ? 'Modifica los datos de la categoría' : 'Completa los datos para crear una nueva categoría'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ color: colors.textSecondary }}
        >
          <Close />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>
              Nombre de la Categoría *
            </label>
            <input
              type="text"
              value={formData.categoryName}
              onChange={(e) => handleChange('categoryName', e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                errors.categoryName ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: errors.categoryName ? '#ef4444' : colors.border,
                color: colors.textPrimary,
                backgroundColor: colors.background,
              }}
              placeholder="Ej: Ropa Deportiva, Electrónicos, Hogar..."
            />
            {errors.categoryName && (
              <p className="text-red-500 text-xs mt-1">{errors.categoryName}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                errors.slug ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: errors.slug ? '#ef4444' : colors.border,
                color: colors.textPrimary,
                backgroundColor: colors.background,
              }}
              placeholder="Ej: ropa-deportiva, electronicos, hogar..."
            />
            {errors.slug && (
              <p className="text-red-500 text-xs mt-1">{errors.slug}</p>
            )}
            <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
              Identificador único para URLs. Usa solo letras minúsculas, números y guiones.
            </p>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all resize-none"
              style={{
                borderColor: colors.border,
                color: colors.textPrimary,
                backgroundColor: colors.background,
              }}
              placeholder="Describe brevemente esta categoría..."
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>
              Etiquetas
            </label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => handleChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: colors.border,
                color: colors.textPrimary,
                backgroundColor: colors.background,
              }}
              placeholder="Ej: deporte, ejercicio, fitness (separadas por comas)"
            />
            <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
              Separa las etiquetas con comas
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
                className="w-4 h-4 rounded focus:ring-2"
                style={{
                  backgroundColor: formData.isActive ? colors.primary : colors.background,
                  borderColor: colors.border,
                }}
              />
              <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                Categoría activa
              </span>
            </label>
            <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
              Las categorías inactivas no estarán disponibles para nuevos productos
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: colors.border }}>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border rounded-lg font-medium transition-all hover:bg-gray-50"
            style={{
              borderColor: colors.border,
              color: colors.textPrimary,
              backgroundColor: 'transparent',
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-md flex items-center gap-2"
            style={{ 
              backgroundColor: colors.primary, 
              color: '#ffffff' 
            }}
          >
            <Save fontSize="small" />
            {category ? 'Actualizar Categoría' : 'Crear Categoría'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoriesForm;