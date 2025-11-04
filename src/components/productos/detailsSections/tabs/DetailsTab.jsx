import React from 'react';
import TabHeader from '../../common/TabHeader';
import ProductSizesField from '../fields/ProductSizesField';

function DetailsTab({ isEditing, setIsEditing, colors, formData, handleInputChange, product }) {
    return (
        <div className="space-y-6">
            <TabHeader 
                title="Información General"
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                colors={colors}
            />

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
                    <div className={`flex flex-wrap gap-2 ${isEditing ? 'mt-2' : 'mt-4' }`}>
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
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Colores disponibles
                    </label>
                    
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
                    <div className="flex flex-wrap gap-2 mt-2">
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
                </div>

                <ProductSizesField 
                    isEditing={isEditing}
                    colors={colors}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    product={product}
                />
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
}

export default DetailsTab;