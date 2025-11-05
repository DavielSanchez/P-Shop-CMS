import React from 'react';

function DetailsTab({ 
  isEditing, 
  colors, 
  formData, 
  handleInputChange, 
  handleAddTag, 
  handleRemoveTag, 
  handleAddColor, 
  handleRemoveColor, 
  handleAddSize, 
  handleRemoveSize,
  currentTag,
  setCurrentTag,
  currentColor,
  setCurrentColor,
  currentSize,
  setCurrentSize
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
        Información General
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Nombre del producto *
          </label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => handleInputChange("productName", e.target.value)}
            required
            className="w-full p-3 rounded border"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          />
        </div>

        {/* Etiquetas */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Etiquetas del producto
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              className="flex-1 p-3 rounded border"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
              placeholder="Escribe y presiona Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: colors.primary }}
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.productTag.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: colors.primary + "20",
                  color: colors.primary,
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="ml-1 text-xs hover:bg-red-500 hover:text-white rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Colores */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Colores disponibles
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddColor())}
              className="flex-1 p-3 rounded border"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
              placeholder="Escribe colores separados por comas"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: colors.primary }}
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.productColors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: colors.primary + "20",
                  color: colors.primary,
                }}
              >
                {color}
                <button
                  type="button"
                  onClick={() => handleRemoveColor(index)}
                  className="ml-1 text-xs hover:bg-red-500 hover:text-white rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tallas */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Tallas/Medidas disponibles
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentSize}
              onChange={(e) => setCurrentSize(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSize())}
              className="flex-1 p-3 rounded border"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
              placeholder="Ej: S, M, L, XL o 11OZ, 300ml"
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: colors.primary }}
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.productSizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: colors.primary + "20",
                  color: colors.primary,
                }}
              >
                {size}
                <button
                  type="button"
                  onClick={() => handleRemoveSize(index)}
                  className="ml-1 text-xs hover:bg-red-500 hover:text-white rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Resumen
          </label>
          <textarea
            value={formData.productSummary}
            onChange={(e) => handleInputChange("productSummary", e.target.value)}
            rows={3}
            className="w-full p-3 rounded border resize-none"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          />
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
            Descripción Completa
          </label>
          <textarea
            value={formData.productDescription}
            onChange={(e) => handleInputChange("productDescription", e.target.value)}
            rows={6}
            className="w-full p-3 rounded border resize-none"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsTab;