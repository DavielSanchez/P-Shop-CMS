// components/categories/filtros/CategoriesFilters.jsx
import React, { useState } from 'react';
import { useColors } from '../../../hooks/useColor';
import { ViewList, ViewModule, Dashboard, Sort, FilterList, Close } from '@mui/icons-material';

function CategoriesFilters({ 
  viewMode, 
  onViewModeChange, 
  filters = {}, 
  onFiltersChange,
  sortBy = 'categoryName',
  onSortChange,
  sortOrder = 'asc',
  onSortOrderChange 
}) {
  const colors = useColors();
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const safeFilters = {
    search: '',
    status: 'todos',
    ...filters
  };

  const viewModes = [
    { key: 'table', icon: ViewList, label: 'Tabla' },
    { key: 'grid', icon: ViewModule, label: 'Grid' },
    { key: 'cards', icon: Dashboard, label: 'Tarjetas' }
  ];

  const sortOptions = [
    { value: 'categoryName', label: 'Nombre' },
    { value: 'productCount', label: 'Productos' },
    { value: 'createdAt', label: 'Fecha creación' }
  ];

  const statusOptions = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'active', label: 'Activas' },
    { value: 'low', label: 'Pocos productos' },
    { value: 'empty', label: 'Vacías' }
  ];

  const handleFilterChange = (key, value) => {
    if (onFiltersChange) {
      onFiltersChange({
        ...safeFilters,
        [key]: value
      });
    }
  };

  const handleSortChange = (newSortBy) => {
    if (!onSortChange || !onSortOrderChange) return;
    
    if (sortBy === newSortBy) {
      onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(newSortBy);
      onSortOrderChange('asc');
    }
  };

  const FiltersModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 lg:hidden">
      <div 
        className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: colors.border }}>
          <h3 className="font-semibold" style={{ color: colors.textPrimary }}>Filtros</h3>
          <button
            onClick={() => setShowFiltersModal(false)}
            className="p-1 rounded hover:bg-gray-100"
            style={{ color: colors.textSecondary }}
          >
            <Close fontSize="small" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.textPrimary }}>
              Estado
            </label>
            <div className="relative">
              <select
                value={safeFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full border rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 appearance-none"
                style={{
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.background,
                }}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4" fill="none" stroke={colors.textPrimary} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowFiltersModal(false)}
            className="w-full py-2 rounded-lg font-medium transition-all"
            style={{ 
              backgroundColor: colors.primary, 
              color: '#ffffff' 
            }}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div 
        className="rounded-lg py-4 mb-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="w-full lg:flex-1 min-w-0">
            <input
              type="text"
              placeholder="Buscar por nombre de categoría o descripción..."
              value={safeFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: colors.border,
                color: colors.textPrimary,
                backgroundColor: colors.background,
              }}
            />
          </div>

          <div className="hidden lg:flex flex-wrap gap-2">
            <div className="relative">
              <select
                value={safeFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="border rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 appearance-none"
                style={{
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  backgroundColor: colors.background,
                }}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4" fill="none" stroke={colors.textPrimary} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => setShowFiltersModal(true)}
              className="lg:hidden p-2 border rounded-lg transition-all hover:bg-gray-50"
              style={{
                borderColor: colors.border,
                color: colors.textPrimary,
                backgroundColor: colors.background,
              }}
              title="Filtros"
            >
              <FilterList fontSize="small" />
            </button>

            <div className="flex items-center gap-1">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 appearance-none"
                  style={{
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    backgroundColor: colors.background,
                  }}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <Sort style={{ color: colors.textSecondary, fontSize: 16 }} />
                </div>
              </div>

              <button
                onClick={() => handleSortChange(sortBy)}
                className="p-2 rounded-lg border transition-all hover:bg-gray-50 hover:shadow-sm"
                style={{
                  borderColor: colors.border,
                  color: colors.primary,
                  backgroundColor: colors.background,
                }}
                title={`Orden ${sortOrder === 'asc' ? 'ascendente' : 'descendente'}`}
              >
                {sortOrder === 'asc' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </button>
            </div>

            <div 
              className="flex border rounded-lg overflow-hidden"
              style={{ borderColor: colors.border }}
            >
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                const isActive = viewMode === mode.key;
                return (
                  <button
                    key={mode.key}
                    onClick={() => onViewModeChange && onViewModeChange(mode.key)}
                    className={`p-1 transition-all ${
                      isActive ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: isActive ? colors.primary : 'transparent',
                    }}
                    title={mode.label}
                  >
                    <Icon fontSize="small" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showFiltersModal && <FiltersModal />}
    </>
  );
}

export default CategoriesFilters;