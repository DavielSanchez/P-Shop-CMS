import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useColors } from '../../../hooks/useColor';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const VentasSemanalesChart = () => {
  const colors = useColors();

  const data = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        data: [12500, 14200, 16100, 13800, 19500, 21200, 18500],
        borderColor: colors.primary,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors.background,
        titleColor: colors.textPrimary,
        bodyColor: colors.textPrimary,
        callbacks: {
          label: (ctx) => `Ventas: RD$${ctx.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: colors.textPrimary, font: { size: 10 } }
      },
      y: {
        grid: { color: `${colors.border}40` },
        ticks: { 
          color: colors.textPrimary, 
          font: { size: 9 },
          callback: (value) => `$${(value / 1000).toFixed(0)}K`
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-3">
      <h1
        className="mb-3 text-center lg:text-left w-full"
        style={{ color: colors.textPrimary, fontSize: 16, fontWeight: 500 }}
      >
        Ventas Semanales
      </h1>
      <div className="flex-1 min-h-0">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: colors.border }}>
        <span 
          style={{ 
            fontSize: 13, // 🔥 TEXTO MÁS GRANDE
            color: colors.textSecondary,
            fontWeight: 600 
          }}
        >
          Total: RD$ 85,000.00 en ventas esta semana
        </span>
      </div>
    </div>
  );
};

export default VentasSemanalesChart;