import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useColors } from '../../../hooks/useColor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PedidosStatusChart() {
  const colors = useColors();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.surface,
        titleColor: colors.textPrimary,
        bodyColor: colors.textPrimary,
        borderColor: colors.border,
        borderWidth: 1,
        displayColors: false,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `Pedidos: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.textPrimary,
          font: {
            size: 12,
            weight: '500'
          }
        },
        border: {
          color: colors.border,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: `${colors.border}40`,
          drawBorder: false,
        },
        ticks: {
          color: colors.textPrimary,
          stepSize: 50,
          font: {
            size: 11,
          }
        },
        border: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: ['Cancelados', 'Pendientes', 'Completados'],
    datasets: [
      {
        label: 'Pedidos',
        data: [50, 170, 200],
        backgroundColor: [
          '#ef4444', // Rojo para cancelados
          colors.primary, // Color primario para pendientes
          '#10b981', // Verde para completados
        ],
        borderColor: [
          '#dc2626',
          colors.primary,
          '#059669',
        ],
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: [
          '#f87171',
          colors.secondary,
          '#34d399',
        ],
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  const totalPedidos = data.datasets[0].data.reduce((acc, num) => acc + num, 0);

  return (
    <div className="w-full h-full flex flex-col">
      <h1 
        className="mb-4 text-center lg:text-left" 
        style={{ color: colors.textPrimary, fontSize: 16, fontWeight: 500 }}
      >
        Estado de pedidos
      </h1>
      <div className="flex-1 min-h-0">
        <Bar options={options} data={data} />
      </div>
      <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: colors.border }}>
        <span 
          style={{ 
            fontSize: 13,
            color: colors.textSecondary,
            fontWeight: 600 
          }}
        >
          Total: {totalPedidos} pedidos realizados 
        </span>
      </div>
    </div>
  );
}

export default PedidosStatusChart;