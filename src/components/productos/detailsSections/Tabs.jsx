import React, { useState } from 'react';
import { useColors } from '../../../hooks/useColor';

function Tabs({ product }) {
    const colors = useColors();
    const [activeTab, setActiveTab] = useState('Detalles');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        // Detalles
        productName: product.name || '',
        productTag: product.tags || [],
        productColors: product.productColors || [],
        productSizes: product.productSizes || [],
        productSummary: product.productSummary || '',
        productDescription: product.productDescription || '',
        
        // Inventario
        productStock: product.productStock || 0,
        
        // Contabilidad
        productPrice: product.productPrice || 0,
        productCost: product.cost || 0, // Agregar este campo si existe
        productOffer: product.productOffer || false,
        productDiscount: product.productDiscount || 0,
        isPriceDisabled: product.isPriceDisabled || false,
        
        // Ventas
        productCategory: product.productCategory || '',
        productComment: product.productComment || ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field, checked) => {
        setFormData(prev => ({
            ...prev,
            [field]: checked
        }));
    };

    const tabs = ['Detalles', 'Inventario', 'Contabilidad', 'Ventas'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Detalles':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                                Información General
                            </h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 rounded-lg border text-sm"
                                style={{ 
                                    borderColor: colors.border,
                                    color: isEditing ? '#fff' : colors.textPrimary,
                                    backgroundColor: isEditing ? colors.primary : 'transparent'
                                }}
                            >
                                {isEditing ? 'Guardar' : 'Editar'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Nombre del producto *
                                </label>
                                <input
                                    type="text"
                                    value={formData.productName}
                                    onChange={(e) => handleInputChange('productName', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Etiqueta del producto
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.productTag.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                                            style={{ 
                                                backgroundColor: colors.primary + '20',
                                                color: colors.primary
                                            }}
                                        >
                                            {tag}
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newTags = formData.productTag.filter((_, i) => i !== index);
                                                        handleInputChange('productTag', newTags);
                                                    }}
                                                    className="ml-1 text-xs"
                                                    style={{ color: colors.primary }}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {isEditing && (
                                    <input
                                        type="text"
                                        placeholder="Escribe y presiona Enter para agregar etiquetas"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.target.value.trim()) {
                                                e.preventDefault();
                                                const newTag = e.target.value.trim();
                                                if (!formData.productTag.includes(newTag)) {
                                                    handleInputChange('productTag', [...formData.productTag, newTag]);
                                                }
                                                e.target.value = '';
                                            }
                                        }}
                                        className="w-full p-3 rounded border"
                                        style={{ 
                                            backgroundColor: colors.background, 
                                            borderColor: colors.border,
                                            color: colors.textPrimary
                                        }}
                                    />
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Colores disponibles
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.productColors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                                            style={{ 
                                                backgroundColor: colors.primary + '20',
                                                color: colors.primary
                                            }}
                                        >
                                            {color}
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newColors = formData.productColors.filter((_, i) => i !== index);
                                                        handleInputChange('productColors', newColors);
                                                    }}
                                                    className="ml-1 text-xs"
                                                    style={{ color: colors.primary }}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {isEditing && (
                                    <input
                                        type="text"
                                        placeholder="Escribe colores y presiona Enter (separar con comas)"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.target.value.trim()) {
                                                e.preventDefault();
                                                const newColors = e.target.value.split(',')
                                                    .map(c => c.trim())
                                                    .filter(c => c && !formData.productColors.includes(c));
                                                if (newColors.length > 0) {
                                                    handleInputChange('productColors', [...formData.productColors, ...newColors]);
                                                }
                                                e.target.value = '';
                                            }
                                        }}
                                        className="w-full p-3 rounded border"
                                        style={{ 
                                            backgroundColor: colors.background, 
                                            borderColor: colors.border,
                                            color: colors.textPrimary
                                        }}
                                    />
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Tallas disponibles
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.productSizes.map((size, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                                            style={{ 
                                                backgroundColor: colors.primary + '20',
                                                color: colors.primary
                                            }}
                                        >
                                            {size}
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newSizes = formData.productSizes.filter((_, i) => i !== index);
                                                        handleInputChange('productSizes', newSizes);
                                                    }}
                                                    className="ml-1 text-xs"
                                                    style={{ color: colors.primary }}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {isEditing && (
                                    <input
                                        type="text"
                                        placeholder="Escribe tallas y presiona Enter (separar con comas)"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.target.value.trim()) {
                                                e.preventDefault();
                                                const newSizes = e.target.value.split(',')
                                                    .map(s => s.trim())
                                                    .filter(s => s && !formData.productSizes.includes(s));
                                                if (newSizes.length > 0) {
                                                    handleInputChange('productSizes', [...formData.productSizes, ...newSizes]);
                                                }
                                                e.target.value = '';
                                            }
                                        }}
                                        className="w-full p-3 rounded border"
                                        style={{ 
                                            backgroundColor: colors.background, 
                                            borderColor: colors.border,
                                            color: colors.textPrimary
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Resumen */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                                Resumen
                            </h3>
                            <textarea
                                value={formData.productSummary}
                                onChange={(e) => handleInputChange('productSummary', e.target.value)}
                                disabled={!isEditing}
                                className="w-full p-4 rounded border resize-y min-h-[150px] max-h-[200px]"
                                style={{ 
                                    backgroundColor: colors.background, 
                                    borderColor: colors.border,
                                    color: colors.textPrimary
                                }}
                                placeholder="Breve descripción del producto"
                                rows={4}
                            />
                        </div>

                        {/* Descripción completa */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                                Descripción Completa
                            </h3>
                            <textarea
                                value={formData.productDescription}
                                onChange={(e) => handleInputChange('productDescription', e.target.value)}
                                disabled={!isEditing}
                                className="w-full p-4 rounded border resize-y min-h-[300px] max-h-[1200px]"
                                style={{ 
                                    backgroundColor: colors.background, 
                                    borderColor: colors.border,
                                    color: colors.textPrimary
                                }}
                                placeholder="Descripción detallada del producto"
                                rows={6}
                            />
                        </div>
                    </div>
                );

            case 'Inventario':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                                Gestión de Inventario
                            </h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 rounded-lg border text-sm"
                                style={{ 
                                    borderColor: colors.border,
                                    color: isEditing ? '#fff' : colors.textPrimary,
                                    backgroundColor: isEditing ? colors.primary : 'transparent'
                                }}
                            >
                                {isEditing ? 'Guardar' : 'Editar'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Stock disponible
                                </label>
                                <input
                                    type="number"
                                    value={formData.productStock}
                                    onChange={(e) => handleInputChange('productStock', parseInt(e.target.value))}
                                    disabled={!isEditing}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Stock mínimo
                                </label>
                                <input
                                    type="number"
                                    value={formData.minStock || 0}
                                    onChange={(e) => handleInputChange('minStock', parseInt(e.target.value))}
                                    disabled={!isEditing}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.maintainStock || true}
                                    onChange={(e) => handleCheckboxChange('maintainStock', e.target.checked)}
                                    disabled={!isEditing}
                                    className="w-4 h-4 rounded border"
                                    style={{ 
                                        borderColor: colors.border,
                                        backgroundColor: formData.maintainStock ? colors.primary : colors.background
                                    }}
                                />
                                <span style={{ color: colors.textPrimary }}>Mantener control de stock</span>
                            </div>
                        </div>
                    </div>
                );

            case 'Contabilidad':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                                Información Contable
                            </h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 rounded-lg border text-sm"
                                style={{ 
                                    borderColor: colors.border,
                                    color: isEditing ? '#fff' : colors.textPrimary,
                                    backgroundColor: isEditing ? colors.primary : 'transparent'
                                }}
                            >
                                {isEditing ? 'Guardar' : 'Editar'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Precio de venta *
                                </label>
                                <input
                                    type="number"
                                    value={formData.productPrice}
                                    onChange={(e) => handleInputChange('productPrice', parseFloat(e.target.value))}
                                    disabled={!isEditing || formData.isPriceDisabled}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: formData.isPriceDisabled ? colors.border : colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Costo del producto
                                </label>
                                <input
                                    type="number"
                                    value={formData.productCost}
                                    onChange={(e) => handleInputChange('productCost', parseFloat(e.target.value))}
                                    disabled={!isEditing}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Precio con descuento
                                </label>
                                <input
                                    type="number"
                                    value={formData.productDiscount}
                                    onChange={(e) => handleInputChange('productDiscount', parseFloat(e.target.value))}
                                    disabled={!isEditing}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Margen de ganancia
                                </label>
                                <div className="p-3 rounded border" style={{ 
                                    backgroundColor: colors.background, 
                                    borderColor: colors.border,
                                    color: formData.productCost > 0 ? 
                                        ((formData.productPrice - formData.productCost) / formData.productCost * 100 > 0 ? '#10b981' : '#ef4444') : 
                                        colors.textPrimary
                                }}>
                                    {formData.productCost > 0 ? 
                                        `${((formData.productPrice - formData.productCost) / formData.productCost * 100).toFixed(1)}%` : 
                                        '0%'
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.productOffer}
                                    onChange={(e) => handleCheckboxChange('productOffer', e.target.checked)}
                                    disabled={!isEditing}
                                    className="w-4 h-4 rounded border"
                                    style={{ 
                                        borderColor: colors.border,
                                        backgroundColor: formData.productOffer ? colors.primary : colors.background
                                    }}
                                />
                                <span style={{ color: colors.textPrimary }}>Producto en oferta</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.isPriceDisabled}
                                    onChange={(e) => handleCheckboxChange('isPriceDisabled', e.target.checked)}
                                    disabled={!isEditing}
                                    className="w-4 h-4 rounded border"
                                    style={{ 
                                        borderColor: colors.border,
                                        backgroundColor: formData.isPriceDisabled ? colors.primary : colors.background
                                    }}
                                />
                                <span style={{ color: colors.textPrimary }}>Deshabilitar precio</span>
                            </div>
                        </div>
                    </div>
                );

            case 'Ventas':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                                Información de Ventas
                            </h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 rounded-lg border text-sm"
                                style={{ 
                                    borderColor: colors.border,
                                    color: isEditing ? '#fff' : colors.textPrimary,
                                    backgroundColor: isEditing ? colors.primary : 'transparent'
                                }}
                            >
                                {isEditing ? 'Guardar' : 'Editar'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Categoría
                                </label>
                                <input
                                    type="text"
                                    value={formData.productCategory}
                                    onChange={(e) => handleInputChange('productCategory', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    SKU
                                </label>
                                <input
                                    type="text"
                                    value={product._id || ''}
                                    disabled
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.border, 
                                        borderColor: colors.border,
                                        color: colors.textSecondary
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                Comentarios internos
                            </label>
                            <textarea
                                value={formData.productComment}
                                onChange={(e) => handleInputChange('productComment', e.target.value)}
                                disabled={!isEditing}
                                className="w-full p-4 rounded border min-h-24 resize-none"
                                style={{ 
                                    backgroundColor: colors.background, 
                                    borderColor: colors.border,
                                    color: colors.textPrimary
                                }}
                                placeholder="Comentarios internos sobre el producto"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full border rounded-lg" style={{ borderColor: colors.border }}>
            <div className="flex border-b" style={{ borderColor: colors.border }}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === tab ? 'font-semibold' : ''
                        }`}
                        style={{ 
                            borderColor: activeTab === tab ? colors.primary : 'transparent',
                            color: activeTab === tab ? colors.primary : colors.textSecondary,
                            backgroundColor: activeTab === tab ? colors.primary + '08' : 'transparent'
                        }}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="p-5" style={{ color: colors.textPrimary }}>
                {renderTabContent()}
            </div>
        </div>
    );
}

export default Tabs;