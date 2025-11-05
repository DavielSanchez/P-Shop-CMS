import React, { useRef, useState } from "react";
import { useColors } from "../../../hooks/useColor";
import {
  Comment,
  Favorite,
  Add,
  CloudUpload,
  Delete,
} from "@mui/icons-material";

function Aside({
  product,
  isEditing = false,
  onMainImageChange,
  onMainImageRemove,
  onAdditionalImagesChange,
}) {
  const colors = useColors();
  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);
  const [showDeleteHover, setShowDeleteHover] = useState(false);

  // Usar las imágenes reales del producto
  const additionalImages = product.productImages || [];

  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (onMainImageChange) {
          onMainImageChange(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0 && onAdditionalImagesChange) {
      const newImages = files.map((file) => {
        return URL.createObjectURL(file);
      });
      // Actualizar las imágenes adicionales en el estado del padre
      onAdditionalImagesChange([...additionalImages, ...newImages]);
    }
  };

  const removeMainImage = () => {
    if (onMainImageRemove) {
      onMainImageRemove();
    }
    setShowDeleteHover(false);
  };

  const removeAdditionalImage = (index) => {
    if (onAdditionalImagesChange) {
      const newImages = additionalImages.filter((_, i) => i !== index);
      onAdditionalImagesChange(newImages);
    }
  };

  const triggerMainImageUpload = () => {
    if (isEditing) {
      mainImageInputRef.current?.click();
    }
  };

  const triggerAdditionalImagesUpload = () => {
    if (isEditing) {
      additionalImagesInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-80 flex-shrink-0">
        <div
          className="rounded-xl space-y-4"
          style={{
            backgroundColor: colors.surface,
          }}
        >
          {/* Imagen Principal */}
          <div
            className="w-full aspect-square mb-3 rounded-lg flex items-center justify-center overflow-hidden relative"
            style={{
              backgroundColor: colors.primary + "20",
              color: colors.primary,
              fontSize: "60px",
              fontWeight: "bold",
              border: `1px solid ${colors.border}`,
              cursor: isEditing ? "pointer" : "default",
            }}
            onClick={triggerMainImageUpload}
            onMouseEnter={() =>
              isEditing && product.productMainImage && setShowDeleteHover(true)
            }
            onMouseLeave={() => setShowDeleteHover(false)}
          >
            {product.productMainImage ? (
              <>
                <img
                  src={product.productMainImage}
                  alt={product.productName}
                  className="w-full h-full object-cover rounded-lg"
                />
                {isEditing && showDeleteHover && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMainImage();
                      }}
                      className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm transition-colors hover:bg-red-600"
                    >
                      <Delete fontSize="small" />
                      Eliminar
                    </button>
                  </div>
                )}
              </>
            ) : product.productName ? (
              <div className="rounded-lg flex items-center justify-center">
                {product.productName.substring(0, 2).toUpperCase()}
              </div>
            ) : (
              <div className="rounded-lg flex items-center justify-center">
                PR
              </div>
            )}
          </div>

          {/* Input oculto para imagen principal (solo en edición) */}
          {isEditing && (
            <input
              type="file"
              ref={mainImageInputRef}
              onChange={handleMainImageUpload}
              accept="image/*"
              className="hidden"
            />
          )}

          {/* Imágenes Adicionales - Solo mostrar si hay imágenes o estamos en modo edición */}
          {(additionalImages.length > 0 || isEditing) && (
            <div>
              <div
                className="text-sm font-medium mb-2"
                style={{ color: colors.textSecondary }}
              >
                Imágenes Adicionales {isEditing && "(Editable)"}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {/* Mostrar las imágenes reales del producto */}
                {additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden relative group"
                    style={{
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <img
                      src={image}
                      alt={`Imagen adicional ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}

                {/* Botón para agregar más imágenes (solo en edición) */}
                {isEditing && additionalImages.length < 6 && (
                  <button
                    type="button"
                    onClick={triggerAdditionalImagesUpload}
                    className="aspect-square rounded-lg flex flex-col items-center justify-center transition-all hover:bg-opacity-20"
                    style={{
                      backgroundColor: colors.primary + "10",
                      border: `1px solid ${colors.border}`,
                      color: colors.primary,
                    }}
                  >
                    <Add style={{ fontSize: 20 }} />
                    <span className="text-xs mt-1">Agregar</span>
                  </button>
                )}
              </div>

              {/* Input oculto para imágenes adicionales (solo en edición) */}
              {isEditing && (
                <input
                  type="file"
                  ref={additionalImagesInputRef}
                  onChange={handleAdditionalImagesUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              )}

              <p
                className="text-xs mt-2 text-center"
                style={{ color: colors.textSecondary }}
              >
                {isEditing
                  ? `${additionalImages.length}/6 imágenes adicionales`
                  : `${additionalImages.length} imagen(es) adicional(es)`}
              </p>
            </div>
          )}

          {/* 1. Estado */}
          <div>
            <div
              className="text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Estado
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span style={{ color: colors.textPrimary }}>
                {product.status}
              </span>
            </div>
          </div>

          {/* Adjuntos */}
          <div>
            <div
              className="text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Adjuntos
            </div>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full transition-colors hover:bg-opacity-10"
              style={{
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
            >
              <span>@</span>
              <span>Adjuntar Archivo +</span>
            </button>
          </div>

          {/* Compartido con */}
          <div>
            <div
              className="text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Compartido con
            </div>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full transition-colors hover:bg-opacity-10"
              style={{
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
            >
              <span>+</span>
              <span>Compartir</span>
            </button>
          </div>

          {/* Etiquetas */}
          <div>
            <div
              className="text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              ☉ Etiquetas
            </div>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full transition-colors hover:bg-opacity-10"
              style={{
                borderColor: colors.border,
                color: colors.textPrimary,
              }}
            >
              <span>Añadir una Etiqueta ...</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div
              className="flex items-center gap-3"
              style={{ color: colors.textSecondary }}
            >
              <span>
                <Comment /> 0{" "}
              </span>
              <span>
                <Favorite /> 0{" "}
              </span>
            </div>
          </div>

          {/* Historial */}
          <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
            <div className="space-y-3">
              <div>
                <div className="text-sm" style={{ color: colors.textPrimary }}>
                  Daviel Sanchez edito esto
                </div>
                <div
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Hace 1 mes
                </div>
              </div>
              <div>
                <div className="text-sm" style={{ color: colors.textPrimary }}>
                  Daviel Sanchez creo esto
                </div>
                <div
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Hace 4 meses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aside;
