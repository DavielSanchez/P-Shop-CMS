import React from 'react'
import KPIs from './KPI\'s/KPIs'
import ProductTable from './tables/ProductTable'
import { useColors } from '../../hooks/useColor'
import TopCategoriasChart from './charts/TopCategoriasChart'
import PedidosStatusChart from './charts/PedidosStatusChart'
import TopCategoriasProductosChart from './charts/TopCategoriasProducto'
import VentasSemanalesChart from './charts/VentasSemanalesChart'

function DashboardComponent() {
  const colors = useColors()
  return (
    <>
    <main className=" flex-1">
      <KPIs/>
      <div className="w-full py-4 grid grid-cols-12 gap-4">
        <div
          className="shadow-md p-4 rounded-xl col-span-12 lg:col-span-7"
          style={{ backgroundColor: colors.background }}
        >
          <ProductTable />
        </div>
        <div
          className="shadow-md p-4 rounded-xl col-span-12 lg:col-span-5"
          style={{ backgroundColor: colors.background, color: colors.textPrimary }}
        >
          <TopCategoriasChart />
        </div>
      </div>
      <div className="w-full py-4 grid grid-cols-12 gap-4">
        <div
          className="shadow-md p-4 rounded-xl col-span-12 lg:col-span-4 min-h-0 flex flex-col"
          style={{ backgroundColor: colors.background }}
        >
          <PedidosStatusChart />
        </div>
        <div
          className="shadow-md p-4 rounded-xl col-span-12 lg:col-span-4 h-[500px]"
          style={{ backgroundColor: colors.background, color: colors.textPrimary }}
        >
          <TopCategoriasProductosChart/>
        </div>

        <div
          className="shadow-md p-4 rounded-xl col-span-12 lg:col-span-4 h-[500px]"
          style={{ backgroundColor: colors.background, color: colors.textPrimary }}
        >
          <VentasSemanalesChart/>
        </div>
        
      </div>
    </main> 
    </>
  )
}

export default DashboardComponent