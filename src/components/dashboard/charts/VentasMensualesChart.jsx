import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, // 🔥 FALTABA ESTE
  LineElement,  // 🔥 FALTABA ESTE
  Title,
  Tooltip,
  Legend,
  Filler // 🔥 Para el fill del área
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useColors } from '../../../hooks/useColor';

// 🔥 REGISTRAR TODOS LOS ELEMENTOS NECESARIOS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const VentasMensualesChart = () => {
  const colors = useColors();

  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ventas 2024',
        data: [45000, 52000, 48000, 61000, 75000, 82000, 78000, 85000, 92000, 88000, 95000, 125000],
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}20`,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 IMPORTANTE para que respete el contenedor
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.background,
        titleColor: colors.textPrimary,
        bodyColor: colors.textPrimary,
        borderColor: colors.border,
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Ventas: $${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: `${colors.border}40`,
          drawBorder: false,
        },
        ticks: {
          color: colors.textPrimary,
          font: {
            size: 11,
          }
        }
      },
      y: {
        grid: {
          color: `${colors.border}40`,
          drawBorder: false,
        },
        ticks: {
          color: colors.textPrimary,
          font: {
            size: 11,
          },
          callback: (value) => `$${(value / 1000).toFixed(0)}K`
        },
        beginAtZero: true
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h3 
        className="mb-3"
        style={{ color: colors.textPrimary, fontSize: 16, fontWeight: 500 }}
      >
        Ventas Mensuales 2024
      </h3>
      <div className="flex-1 min-h-0">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default VentasMensualesChart;