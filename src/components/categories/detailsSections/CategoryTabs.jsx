import React, { useState } from 'react';
import { useColors } from '../../../hooks/useColor';

function CategoryTabs({ category }) {
    const colors = useColors();
    const [activeTab, setActiveTab] = useState('Detalles');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        categoryName: category.categoryName || '',
        categoryTag: category.categoryTag || '',
        categoryComment: category.categoryComment || '',
        description: category.description || '',
        slug: category.slug || '',
        tags: category.tags || [],
        isActive: category.isActive !== undefined ? category.isActive : true,
        productCount: category.productCount || 0
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

    const tabs = ['Detalles', 'Configuración', 'Productos'];

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
                                    Nombre de la categoría *
                                </label>
                                <input
                                    type="text"
                                    value={formData.categoryName}
                                    onChange={(e) => handleInputChange('categoryName', e.target.value)}
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
                                    Tag de categoría
                                </label>
                                <input
                                    type="text"
                                    value={formData.categoryTag}
                                    onChange={(e) => handleInputChange('categoryTag', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleInputChange('slug', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                />
                                <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                                    Identificador único para URLs. Usa solo letras minúsculas, números y guiones.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                Etiquetas
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags.map((tag, index) => (
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
                                                    const newTags = formData.tags.filter((_, i) => i !== index);
                                                    handleInputChange('tags', newTags);
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
                                            if (!formData.tags.includes(newTag)) {
                                                handleInputChange('tags', [...formData.tags, newTag]);
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

                        <div>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                                Descripción
                            </h3>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                disabled={!isEditing}
                                className="w-full p-4 rounded border resize-y min-h-[150px] max-h-[400px]"
                                style={{ 
                                    backgroundColor: colors.background, 
                                    borderColor: colors.border,
                                    color: colors.textPrimary
                                }}
                                placeholder="Descripción de la categoría"
                                rows={4}
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                                Comentario Interno
                            </h3>
                            <textarea
                                value={formData.categoryComment}
                                onChange={(e) => handleInputChange('categoryComment', e.target.value)}
                                disabled={!isEditing}
                                className="w-full p-4 rounded border resize-y min-h-[100px] max-h-[200px]"
                                style={{ 
                                    backgroundColor: colors.background, 
                                    borderColor: colors.border,
                                    color: colors.textPrimary
                                }}
                                placeholder="Comentarios internos sobre la categoría"
                                rows={3}
                            />
                        </div>
                    </div>
                );

            case 'Configuración':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                                Configuración de la Categoría
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
                                    Productos en categoría
                                </label>
                                <div className="p-3 rounded border text-lg font-bold"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                >
                                    {formData.productCount}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    ID de categoría
                                </label>
                                <input
                                    type="text"
                                    value={category._id}
                                    disabled
                                    className="w-full p-3 rounded border font-mono text-sm"
                                    style={{ 
                                        backgroundColor: colors.border, 
                                        borderColor: colors.border,
                                        color: colors.textSecondary
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => handleCheckboxChange('isActive', e.target.checked)}
                                    disabled={!isEditing}
                                    className="w-4 h-4 rounded border"
                                    style={{ 
                                        borderColor: colors.border,
                                        backgroundColor: formData.isActive ? colors.primary : colors.background
                                    }}
                                />
                                <span style={{ color: colors.textPrimary }}>Categoría activa</span>
                            </div>
                            <p className="text-sm" style={{ color: colors.textSecondary }}>
                                Las categorías inactivas no estarán disponibles para nuevos productos.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Fecha de creación
                                </label>
                                <div className="p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                >
                                    {new Date(category.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                                    Última actualización
                                </label>
                                <div className="p-3 rounded border"
                                    style={{ 
                                        backgroundColor: colors.background, 
                                        borderColor: colors.border,
                                        color: colors.textPrimary
                                    }}
                                >
                                    {category.updatedAt ? 
                                        new Date(category.updatedAt).toLocaleDateString() : 
                                        'No actualizada'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'Productos':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                                Productos en esta Categoría
                            </h3>
                            <button
                                onClick={() => {}}
                                className="px-4 py-2 rounded-lg text-sm"
                                style={{ 
                                    backgroundColor: colors.primary,
                                    color: '#ffffff'
                                }}
                            >
                                + Agregar Producto
                            </button>
                        </div>

                        <div className="rounded-lg border" style={{ borderColor: colors.border }}>
                            {formData.productCount === 0 ? (
                                <div className="text-center p-8" style={{ color: colors.textSecondary }}>
                                    <div className="text-lg mb-2">No hay productos en esta categoría</div>
                                    <div className="text-sm">Agrega productos para verlos listados aquí</div>
                                </div>
                            ) : (
                                <div className="p-4">
                                    <div className="text-sm" style={{ color: colors.textSecondary }}>
                                        Mostrando {formData.productCount} productos en esta categoría
                                    </div>
                                    <div className="mt-4 p-4 rounded border text-center"
                                        style={{ 
                                            backgroundColor: colors.background,
                                            borderColor: colors.border,
                                            color: colors.textSecondary
                                        }}
                                    >
                                        Lista de productos vendría aquí
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg border text-center"
                                style={{ 
                                    backgroundColor: colors.surface,
                                    borderColor: colors.border
                                }}
                            >
                                <div className="text-2xl font-bold mb-1" style={{ color: colors.textPrimary }}>
                                    {formData.productCount}
                                </div>
                                <div className="text-sm" style={{ color: colors.textSecondary }}>
                                    Total Productos
                                </div>
                            </div>
                            <div className="p-4 rounded-lg border text-center"
                                style={{ 
                                    backgroundColor: colors.surface,
                                    borderColor: colors.border
                                }}
                            >
                                <div className="text-2xl font-bold mb-1" style={{ color: colors.textPrimary }}>
                                    {Math.round(formData.productCount * 0.6)}
                                </div>
                                <div className="text-sm" style={{ color: colors.textSecondary }}>
                                    Productos Activos
                                </div>
                            </div>
                            <div className="p-4 rounded-lg border text-center"
                                style={{ 
                                    backgroundColor: colors.surface,
                                    borderColor: colors.border
                                }}
                            >
                                <div className="text-2xl font-bold mb-1" style={{ color: colors.textPrimary }}>
                                    {Math.round(formData.productCount * 0.4)}
                                </div>
                                <div className="text-sm" style={{ color: colors.textSecondary }}>
                                    En Stock
                                </div>
                            </div>
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

export default CategoryTabs;