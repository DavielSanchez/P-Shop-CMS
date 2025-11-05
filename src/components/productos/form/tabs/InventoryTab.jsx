import React from 'react';

function InventoryTab({ colors, formData, handleInputChange, handleCheckboxChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
        Gestión de Inventario
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Stock disponible
          </label>
          <input
            type="number"
            value={formData.productStock}
            onChange={(e) => handleInputChange("productStock", parseInt(e.target.value) || 0)}
            className="w-full p-3 rounded border"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Stock mínimo
          </label>
          <input
            type="number"
            value={formData.minStock}
            onChange={(e) => handleInputChange("minStock", parseInt(e.target.value) || 0)}
            className="w-full p-3 rounded border"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Stock máximo
          </label>
          <input
            type="number"
            value={formData.maxStock}
            onChange={(e) => handleInputChange("maxStock", parseInt(e.target.value) || 0)}
            className="w-full p-3 rounded border"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.maintainStock}
          onChange={(e) => handleCheckboxChange("maintainStock", e.target.checked)}
          className="w-4 h-4 rounded border"
          style={{
            borderColor: colors.border,
            backgroundColor: formData.maintainStock ? colors.primary : colors.background,
          }}
        />
        <span style={{ color: colors.textPrimary }}>Mantener control de stock</span>
      </div>
    </div>
  );
}

export default InventoryTab;