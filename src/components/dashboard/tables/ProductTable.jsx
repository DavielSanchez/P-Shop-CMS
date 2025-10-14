import React, { useState } from 'react'
import { useColors } from '../../../hooks/useColor'
import {topProductsData} from '../../../data/Products'
import { Close, HighlightOff } from '@mui/icons-material'

function ProductTable() {
  const colors = useColors()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const filteredProducts = topProductsData.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1))
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages))
  const handlePageClick = (p) => setPage(p)

  const emptyRows = itemsPerPage - paginatedProducts.length

  return (
    <>
      <div className=' mb-4  md:flex md:justify-between  items-center'>
        <h1 className='mb-4 md:mb-0' style={{ color: colors.textPrimary, fontSize: 16, fontWeight: 500 }}>
          Top de productos por unidades vendidas
        </h1>
        <div className='flex items-center gap-2'>
            
            <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-current"
            style={{
                color: colors.textPrimary,
                backgroundColor: colors.border,
            }}
            />
            <HighlightOff className='cursor-pointer' style={{ color: colors.primary, fontSize: 20 }} onClick={() => setSearch('') } />
        </div>
      </div>

      <div className="w-full flex justify-center py-2" style={{ backgroundColor: colors.background }}>
  <div className="w-full max-w-6xl rounded-lg p-2">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr style={{color: colors.textPrimary}} className="border-b-4 border-gray-200 dark:border-gray-200">
          <th className="py-2 px-3">Producto</th>
          <th className="py-2 px-3">Precio</th>
          <th className="py-2 px-3">Unidades vendidas</th>
          <th className="py-2 px-3">Stock</th>
        </tr>
      </thead>
      <tbody>
        {paginatedProducts.map((product) => (
          <tr
            key={product.id}
            className="transition-colors cursor-pointer"
            style={{
              borderBottom: `1px solid ${colors.textDisabled}`,
              backgroundColor: 'transparent',
              color: colors.textPrimary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = colors.textPrimary
            }}
          >
            <td className="py-2 px-3 flex items-center gap-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
              />
              <span>{product.name}</span>
            </td>
            <td className="py-2 px-3">${product.price}</td>
            <td className="py-2 px-3">{product.unitsSold}</td>
            <td className="py-2 px-3">{product.stock}</td>
          </tr>
        ))}

        {emptyRows > 0 &&
          Array.from({ length: emptyRows }).map((_, i) => (
            <tr key={`empty-${i}`}>
              <td colSpan={4} className="text-center text-gray-500 dark:text-gray-400 h-16">
                {paginatedProducts.length === 0 &&
                  i === Math.floor(emptyRows / 2) && (
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="/src/assets/img/no-connection-gray.png"
                        alt="No data"
                        className="w-12 h-12 mb-2 opacity-70"
                      />
                      <span className="text-sm font-semibold">NO DATA FOUND</span>
                    </div>
                  )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>
            Showing {filteredProducts.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} data
          </span>
          <div className="flex items-center gap-1">
            {/* Botón Previous */}
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="border rounded-md px-3 py-1 text-sm transition"
                style={{
                backgroundColor: page === 1 ? colors.muted : 'transparent',
                color: page === 1 ? colors.tertiary : colors.textPrimary,
                borderColor: colors.textDisabled,
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                }}
            >
                Previous
            </button>

            {/* Botones numéricos */}
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                key={i + 1}
                onClick={() => handlePageClick(i + 1)}
                className="px-2 py-1 rounded-md border transition"
                style={{
                    backgroundColor: page === i + 1 ? colors.primary : 'transparent',
                    color: page === i + 1 ? '#ffffff' : colors.textPrimary,
                    borderColor: colors.textDisabled,
                    cursor: 'pointer',
                }}
                >
                {i + 1}
                </button>
            ))}

            {/* Botón Next */}
            <button
                onClick={handleNext}
                disabled={page === totalPages || totalPages === 0}
                className="border rounded-md px-3 py-1 text-sm transition"
                style={{
                backgroundColor:
                    page === totalPages || totalPages === 0
                    ? colors.muted
                    : 'transparent',
                color:
                    page === totalPages || totalPages === 0
                    ? colors.tertiary
                    : colors.textPrimary,
                borderColor: colors.textDisabled,
                cursor:
                    page === totalPages || totalPages === 0
                    ? 'not-allowed'
                    : 'pointer',
                }}
            >
                Next
            </button>
            </div>


        </div>
  </div>
</div>
    </>
  )
}

export default ProductTable
