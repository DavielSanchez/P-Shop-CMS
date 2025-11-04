import React from 'react'
import { useColors } from '../../../hooks/useColor'
import { Comment, Favorite, Category } from '@mui/icons-material';

function CategoryAside({category}) {
    const colors = useColors();
    
    const getCategoryStatus = (productCount) => {
        if (productCount === 0) return { label: 'Vacía', color: '#6b7280' };
        if (productCount <= 5) return { label: 'Pocos productos', color: '#f59e0b' };
        return { label: 'Activa', color: '#10b981' };
    };

    const status = getCategoryStatus(category.productCount || 0);

  return (
    <>
    <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-80 flex-shrink-0">
            <div className="rounded-xl space-y-4 p-4" style={{ 
                backgroundColor: colors.surface, 
                border: `1px solid ${colors.border}`
            }}>

                <div className="w-full aspect-square mb-3 rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ 
                        backgroundColor: colors.primary + '20',
                        color: colors.primary,
                        border: `1px solid ${colors.border}`
                    }}
                >
                    {category.categoryImage ? (
                        <img 
                            src={category.categoryImage} 
                            alt={category.categoryName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Category style={{ fontSize: 60 }} />
                    )}
                </div>

                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Estado
                    </div>
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: status.color }}
                        ></div>
                        <span style={{ color: colors.textPrimary }}>{status.label}</span>
                    </div>
                </div>

                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Productos
                    </div>
                    <div className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                        {category.productCount || 0}
                    </div>
                </div>

                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Tag
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm inline-block"
                        style={{ 
                            backgroundColor: colors.primary + '20',
                            color: colors.primary
                        }}
                    >
                        {category.categoryTag}
                    </div>
                </div>

                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Adjuntos
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full transition-colors hover:bg-opacity-10"
                        style={{ 
                            borderColor: colors.border,
                            color: colors.textPrimary,
                        }}
                    >
                        <span>@</span>
                        <span>Adjuntar Archivo +</span>
                    </button>
                </div>

                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Compartido con
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full transition-colors hover:bg-opacity-10"
                        style={{ 
                            borderColor: colors.border,
                            color: colors.textPrimary,
                        }}
                    >
                        <span>+</span>
                        <span>Compartir</span>
                    </button>
                </div>

                <div>
                    <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        ☉ Etiquetas
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {(category.tags || []).map((tag, index) => (
                            <span 
                                key={index}
                                className="px-2 py-1 rounded text-xs"
                                style={{ 
                                    backgroundColor: colors.border,
                                    color: colors.textSecondary
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full transition-colors hover:bg-opacity-10"
                        style={{ 
                            borderColor: colors.border,
                            color: colors.textPrimary,
                        }}
                    >
                        <span>Añadir una Etiqueta ...</span>
                    </button>
                </div>

                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-3" style={{ color: colors.textSecondary }}>
                        <span><Comment/>  0 </span>
                        <span><Favorite/>  0 </span>
                    </div>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
                    <div className="space-y-3">
                        <div>
                            <div className="text-sm" style={{ color: colors.textPrimary }}>
                                {category.updatedAt ? 'Modificado' : 'Creado'} por Sistema
                            </div>
                            <div className="text-xs" style={{ color: colors.textSecondary }}>
                                {category.updatedAt ? 
                                    new Date(category.updatedAt).toLocaleDateString() : 
                                    new Date(category.createdAt).toLocaleDateString()
                                }
                            </div>
                        </div>
                        <div>
                            <div className="text-sm" style={{ color: colors.textPrimary }}>
                                Categoría creada
                            </div>
                            <div className="text-xs" style={{ color: colors.textSecondary }}>
                                {new Date(category.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CategoryAside;