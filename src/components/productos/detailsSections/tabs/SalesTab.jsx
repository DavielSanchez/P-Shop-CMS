import React from 'react';
import TabHeader from '../../common/TabHeader';

function SalesTab({ isEditing, setIsEditing, colors, formData, handleInputChange, product }) {
    return (
        <div className="space-y-6">
            <TabHeader 
                title="Información de Ventas"
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                colors={colors}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Categoría
                    </label>
                    <input
                        type="text"
                        value={formData.category}
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
}

export default SalesTab;