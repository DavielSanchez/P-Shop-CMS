import React from 'react';
import TabHeader from '../../common/TabHeader';

function AccountingTab({ isEditing, setIsEditing, colors, formData, handleInputChange, handleCheckboxChange }) {
    return (
        <div className="space-y-6">
            <TabHeader 
                title="Información Contable"
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                colors={colors}
            />

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
}

export default AccountingTab;