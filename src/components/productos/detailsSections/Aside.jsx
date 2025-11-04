import React from 'react'
import { useColors } from '../../../hooks/useColor'
import { Comment, Favorite } from '@mui/icons-material';

function Aside({product}) {
    const colors = useColors();
  return (
    <>
    <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-80 flex-shrink-0">
            <div className="rounded-xl space-y-4" style={{ 
            backgroundColor: colors.surface, 
            //   border: `1px solid ${colors.border}`
            }}>

                <div className="w-full aspect-square mb-3 rounded-lg flex items-center justify-center"
                    style={{ 
                    backgroundColor: colors.primary + '20',
                    color: colors.primary,
                    fontSize: '60px',
                    fontWeight: 'bold',
                    border: `1px solid ${colors.border}`
                    }}
                >
                    {product.productMainImage ? <img src={product.productMainImage} alt="" /> : product.productName ? product.productName.substring(0, 2).toUpperCase() : 'PR'  }
                    <img src={product} alt="" />
                </div>
            {/* 1. Estado */}
            <div>
                <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                Estado
                </div>
                <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span style={{ color: colors.textPrimary }}>{product.status}</span>
                </div>
            </div>

            {/* 2. Asignado a */}
            {/* <div>
                <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                Asignado a
                </div>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full transition-colors hover:bg-opacity-10"
                style={{ 
                    borderColor: colors.border,
                    color: colors.textPrimary,
                }}
                >
                <span>+</span>
                <span>Asignar</span>
                </button>
            </div> */}

            {/* Adjuntos */}
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

            {/* 3. Compartido con */}
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

            {/* Etiquetas */}
            <div>
                <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                ☉ Etiquetas
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

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-3" style={{ color: colors.textSecondary }}>
                <span><Comment/>  0 </span>
                <span><Favorite/>  0 </span>
                </div>
            </div>

            {/* Historial */}
            <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
                <div className="space-y-3">
                <div>
                    <div className="text-sm" style={{ color: colors.textPrimary }}>
                        Daviel Sanchez edito esto
                    </div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                    Hace 1 mes
                    </div>
                </div>
                <div>
                    <div className="text-sm" style={{ color: colors.textPrimary }}>
                    Daviel Sanchez creo esto
                    </div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                    Hace 4 meses
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

export default Aside