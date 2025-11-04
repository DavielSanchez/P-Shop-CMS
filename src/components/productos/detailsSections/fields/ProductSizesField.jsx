import React from 'react';
import { useProductSizes } from '../../../../hooks/useProductSizes';

function ProductSizesField({ isEditing, colors, formData, handleInputChange, product }) {
    const { 
        sizeType, 
        useMeasures, 
        setUseMeasures, 
        options, 
        label, 
        placeholder, 
        emptyMessage 
    } = useProductSizes(product?.productCategory?.categoryName || product?.category);

    // Solo mostrar el switch si la categoría no está claramente definida
    const showSwitch = !product?.productCategory?.categoryName && !product?.category;

    return (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                {label}
            </label>
            
            {isEditing ? (
                <div className="space-y-3">
                    {/* Switch solo para casos donde la categoría no está definida */}
                    {showSwitch && (
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm" style={{ color: colors.textSecondary }}>Tallas</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={useMeasures}
                                    onChange={(e) => setUseMeasures(e.target.checked)}
                                />
                                <div 
                                    className="w-11 h-6 rounded-full peer"
                                    style={{ 
                                        backgroundColor: useMeasures ? colors.primary : colors.border
                                    }}
                                >
                                    <div 
                                        className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-all ${
                                            useMeasures ? 'transform translate-x-5' : ''
                                        }`}
                                        style={{ borderColor: colors.border }}
                                    ></div>
                                </div>
                            </label>
                            <span className="text-sm" style={{ color: colors.textSecondary }}>Medidas</span>
                        </div>
                    )}

                    {/* Select según el tipo detectado */}
                    <select
                        onChange={(e) => {
                            if (e.target.value && !formData.productSizes.includes(e.target.value)) {
                                handleInputChange('productSizes', [...formData.productSizes, e.target.value]);
                            }
                            e.target.value = ''; 
                        }}
                        className="w-full p-3 rounded border"
                        style={{ 
                            backgroundColor: colors.background, 
                            borderColor: colors.border,
                            color: colors.textPrimary
                        }}
                    >
                        <option value="">{placeholder}</option>
                        
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Elementos seleccionados */}
                    <div className="flex flex-wrap gap-2">
                        {formData.productSizes.map((size, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                                style={{ 
                                    backgroundColor: colors.primary + '20',
                                    color: colors.primary
                                }}
                            >
                                {size.includes('x') ? size.replace('x', ' × ') : 
                                 size.includes('oz') ? size.toUpperCase() : 
                                 size.includes('ml') ? size : size}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newSizes = formData.productSizes.filter((_, i) => i !== index);
                                        handleInputChange('productSizes', newSizes);
                                    }}
                                    className="ml-1 text-xs hover:bg-red-500 hover:text-white rounded-full w-4 h-4 flex items-center justify-center"
                                    style={{ color: colors.primary }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        
                        {formData.productSizes.length === 0 && (
                            <span className="text-sm italic" style={{ color: colors.textSecondary }}>
                                {emptyMessage}
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                /* Modo visualización */
                <div className="flex flex-wrap gap-2">
                    {formData.productSizes.map((size, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                            style={{ 
                                backgroundColor: colors.primary + '20',
                                color: colors.primary
                            }}
                        >
                            {size.includes('x') ? size.replace('x', ' × ') : 
                             size.includes('oz') ? size.toUpperCase() : 
                             size.includes('ml') ? size : size}
                        </div>
                    ))}
                    
                    {formData.productSizes.length === 0 && (
                        <span className="text-sm italic" style={{ color: colors.textSecondary }}>
                            No hay {sizeType === 'tallas' ? 'tallas' : 
                                   sizeType === 'medidas' ? 'medidas' : 
                                   'tamaños'} disponibles
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductSizesField;