import React from 'react';

function SalesTab({ colors, formData, handleInputChange, handleCheckboxChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
        Información de Ventas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Categoría
          </label>
          <select
            value={formData.productCategory}
            onChange={(e) => handleInputChange("productCategory", e.target.value)}
            className="w-full p-3 rounded border"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          >
            <option value="">Seleccionar categoría</option>
            <option value="Camisetas">Camisetas</option>
            <option value="Tazas">Tazas</option>
            <option value="Termos">Termos</option>
            <option value="Vasos">Vasos</option>
            <option value="Llaveros">Llaveros</option>
            <option value="MousePad">MousePad</option>
            <option value="Rompecabezas">Rompecabezas</option>
            <option value="Lapiceros">Lapiceros</option>
            <option value="Relojes">Relojes</option>
            <option value="Cristalería">Cristalería</option>
            <option value="Bolsas">Bolsas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            SKU
          </label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) => handleInputChange("sku", e.target.value)}
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
            Código de barras
          </label>
          <input
            type="text"
            value={formData.barcode}
            onChange={(e) => handleInputChange("barcode", e.target.value)}
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
            Estado
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full p-3 rounded border"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="draft">Borrador</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
          Comentarios internos
        </label>
        <textarea
          value={formData.productComment}
          onChange={(e) => handleInputChange("productComment", e.target.value)}
          rows={4}
          className="w-full p-3 rounded border resize-none"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.textPrimary,
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.isPublished}
          onChange={(e) => handleCheckboxChange("isPublished", e.target.checked)}
          className="w-4 h-4 rounded border"
          style={{
            borderColor: colors.border,
            backgroundColor: formData.isPublished ? colors.primary : colors.background,
          }}
        />
        <span style={{ color: colors.textPrimary }}>Producto publicado</span>
      </div>
    </div>
  );
}

export default SalesTab;