import React from 'react'
import { useColors } from '../../../hooks/useColor'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function KPIs() {
  const colors = useColors()

  const kpis = [
    {
      icon: <TrendingUpIcon style={{ fontSize: 32, color: colors.primary }} />,
      value: "$1,250,000",
      label: "Ventas del mes",
      bg: colors.background,
    },
    {
      icon: <ShoppingBagIcon style={{ fontSize: 32, color: colors.primary }} />,
      value: "82",
      label: "Categorias",
      bg: colors.background,
    },
    {
      icon: <ShoppingCartIcon style={{ fontSize: 32, color: colors.primary }} />,
      value: "320",
      label: "Productos",
      bg: colors.background,
    },
    {
      icon: <PeopleIcon style={{ fontSize: 32, color: colors.primary }} />,
      value: "900",
      label: "Clientes registrados",
      bg: colors.background,
    },
  ]

  return (
    <div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
>
  {kpis.map((kpi, idx) => (
    <div
      key={idx}
      style={{
        background: kpi.bg,
        borderRadius: 12,
        padding: '1.5rem',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {kpi.icon}
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: colors.primary }}>
          {kpi.value}
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, color: colors.textPrimary }}>
          {kpi.label}
        </div>
      </div>
    </div>
  ))}
</div>

  )
}

export default KPIs