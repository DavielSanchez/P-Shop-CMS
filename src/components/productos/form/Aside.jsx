import React, { useRef, useState } from 'react'
import { useColors } from '../../../hooks/useColor'
import { Comment, Favorite, Add, CloudUpload, Delete } from '@mui/icons-material';

function Aside({ product, isEditing, onMainImageChange, onMainImageRemove }) {
    const colors = useColors();
    const mainImageInputRef = useRef(null);
    const additionalImagesInputRef = useRef(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [showDeleteHover, setShowDeleteHover] = useState(false);

    const handleMainImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Actualiza la imagen principal en el formData
                onMainImageChange(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdditionalImagesUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const newImages = files.map(file => {
                return {
                    id: Math.random().toString(36).substr(2, 9),
                    url: URL.createObjectURL(file),
                    file: file
                };
            });
            setAdditionalImages(prev => [...prev, ...newImages]);
        }
    };

    const removeMainImage = () => {
        // Elimina la imagen principal del formData
        onMainImageRemove();
        setShowDeleteHover(false);
    };

    const removeAdditionalImage = (id) => {
        setAdditionalImages(prev => prev.filter(img => img.id !== id));
    };

    const triggerMainImageUpload = () => {
        mainImageInputRef.current?.click();
    };

    const triggerAdditionalImagesUpload = () => {
        additionalImagesInputRef.current?.click();
    };

    return (
        <div className="w-full">
            <div
                className="rounded-xl space-y-4 p-4"
                style={{
                    backgroundColor: colors.surface,
                }}
            >
                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Imagen Principal
                    </div>
                    <div
                        className="w-full aspect-square mb-2 rounded-lg flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all hover:opacity-90 relative"
                        style={{
                            backgroundColor: colors.primary + "10",
                            border: `2px dashed ${colors.border}`,
                            color: colors.primary,
                        }}
                        onClick={triggerMainImageUpload}
                        onMouseEnter={() => product.productMainImage && setShowDeleteHover(true)}
                        onMouseLeave={() => setShowDeleteHover(false)}
                    >
                        {product.productMainImage ? (
                            <>
                                <img
                                    src={product.productMainImage}
                                    alt="Imagen principal del producto"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                {showDeleteHover && (
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
                        ) : (
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                                <CloudUpload style={{ fontSize: 48, marginBottom: 8 }} />
                                <span className="text-sm font-medium">Subir imagen principal</span>
                                <span className="text-xs opacity-70 mt-1">Haz clic para seleccionar</span>
                            </div>
                        )}
                    </div>
                    
                    <input
                        type="file"
                        ref={mainImageInputRef}
                        onChange={handleMainImageUpload}
                        accept="image/*"
                        className="hidden"
                    />

                    <p className="text-xs text-center" style={{ color: colors.textSecondary }}>
                        {product.productMainImage ? 'Haz clic para cambiar la imagen' : 'Formatos: JPG, PNG, WEBP'}
                    </p>
                </div>

                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Imágenes Adicionales
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {additionalImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="aspect-square rounded-lg overflow-hidden relative group"
                                style={{
                                    border: `1px solid ${colors.border}`,
                                }}
                            >
                                <img
                                    src={image.url}
                                    alt={`Imagen adicional ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeAdditionalImage(image.id)}
                                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        {additionalImages.length < 6 && (
                            <button
                                type="button"
                                onClick={triggerAdditionalImagesUpload}
                                className="aspect-square rounded-lg flex flex-col items-center justify-center transition-all hover:bg-opacity-20"
                                style={{
                                    backgroundColor: colors.primary + "10",
                                    border: `2px dashed ${colors.border}`,
                                    color: colors.primary,
                                }}
                            >
                                <Add style={{ fontSize: 24 }} />
                                <span className="text-xs mt-1">Agregar</span>
                            </button>
                        )}
                    </div>

                    <input
                        type="file"
                        ref={additionalImagesInputRef}
                        onChange={handleAdditionalImagesUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />

                    <p className="text-xs mt-2 text-center" style={{ color: colors.textSecondary }}>
                        {additionalImages.length}/6 imágenes adicionales
                    </p>
                </div>

                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Estado
                    </div>
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: product.status === 'active' ? '#10b981' : 
                                              product.status === 'inactive' ? '#ef4444' : '#6b7280'
                            }}
                        ></div>
                        <span style={{ color: colors.textPrimary }}>
                            {product.status === 'active' ? 'Activo' : 
                             product.status === 'inactive' ? 'Inactivo' : 'Borrador'}
                        </span>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-3" style={{ color: colors.textSecondary }}>
                            <span><Comment /> 0</span>
                            <span><Favorite /> 0</span>
                        </div>
                    </div>
                )}

                {isEditing && (
                    <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
                        <div className="space-y-3">
                            <div>
                                <div className="text-sm" style={{ color: colors.textPrimary }}>
                                    Última edición
                                </div>
                                <div className="text-xs" style={{ color: colors.textSecondary }}>
                                    {new Date().toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Aside;