import React from 'react';

function TabHeader({ title, isEditing, setIsEditing, colors }) {
    return (
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                {title}
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
    );
}

export default TabHeader;