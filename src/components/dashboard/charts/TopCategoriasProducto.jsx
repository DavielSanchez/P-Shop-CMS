import React from "react";
import { useColors } from "../../../hooks/useColor";
import { ResponsivePie } from "@nivo/pie";

// Datos basados en la cantidad de productos por categoría
const data = [
  { 
    id: "camisetas", 
    label: "Camisetas", 
    value: 45
  },
  { 
    id: "sudaderas", 
    label: "Sudaderas", 
    value: 28
  },
  { 
    id: "pantalones", 
    label: "Pantalones", 
    value: 22
  },
  { 
    id: "accesorios", 
    label: "Accesorios", 
    value: 35
  },
  { 
    id: "zapatos", 
    label: "Zapatos", 
    value: 18
  },
  { 
    id: "chaquetas", 
    label: "Chaquetas", 
    value: 12
  }
];

// NUEVO ESQUEMA DE 50 COLORES DIFERENTES AL ANTERIOR
const customColors2 = [
  "#FF6B95", "#6BFFB8", "#B86BFF", "#FFB86B", "#6B95FF",
  "#95FF6B", "#FF956B", "#6BFF95", "#956BFF", "#FF6BB8",
  "#6BB8FF", "#B8FF6B", "#FF6B6B", "#6BFF6B", "#6B6BFF",
  "#FFFF6B", "#FF6BFF", "#6BFFFF", "#FF956B", "#6B95FF",
  "#95FF6B", "#FF6B95", "#6BFFB8", "#B86BFF", "#FFB86B",
  "#6BFF6B", "#6B6BFF", "#FFFF6B", "#FF6BFF", "#6BFFFF",
  "#FF5733", "#33FF57", "#5733FF", "#FF3357", "#33FFBD",
  "#FF33A1", "#33A1FF", "#A1FF33", "#FF8C33", "#33FF8C",
  "#8C33FF", "#FF338C", "#338CFF", "#8CFF33", "#FF3333",
  "#33FF33", "#3333FF", "#FFFF33", "#FF33FF", "#33FFFF"
];

function TopCategoriasProductosChart() {
  const colors = useColors();

  const totalProductos = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-full flex flex-col">
      <h1 
        className='mb-4 px-2 text-center lg:text-left'
        style={{ color: colors.textPrimary, fontSize: 16, fontWeight: 500 }}
      >
        Distribución de Productos por Categoría
      </h1>

      <div className="flex-1 min-h-0" style={{ height: '400px' }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={0}
          activeOuterRadiusOffset={12}
          enableArcLabels={true}
          enableArcLinkLabels={false}
          arcLabelsSkipAngle={20}
          arcLabelsTextColor="#ffffff"
          arcLabel={(item) => {
            const percentage = ((item.value / totalProductos) * 100).toFixed(1);
            return `${percentage}%`;
          }}
          colors={customColors2} // 🔥 USA EL NUEVO ESQUEMA PERSONALIZADO
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          theme={{
            tooltip: {
              container: {
                background: colors.surface,
                color: colors.textPrimary,
                fontSize: 12,
                borderRadius: 6,
                padding: "8px 12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              },
            },
            arcLabels: {
              text: {
                fontSize: 12,
                fontWeight: 700,
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              },
            },
          }}
          motionConfig="gentle"
        />
      </div>

      {/* Leyendas con los mismos colores del nuevo esquema */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6 px-2">
        {data.map((item, index) => {
          const percentage = ((item.value / totalProductos) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: customColors2[index % customColors2.length], // 🔥 MISMO ESQUEMA NUEVO
                }}
              ></span>
              <span
                style={{
                  fontSize: 12,
                  color: colors.textPrimary,
                  whiteSpace: "nowrap",
                  fontWeight: 500
                }}
              >
                {item.label} <strong>({item.value})</strong>
              </span>
            </div>
          );
        })}
      </div>

      {/* Resumen total */}
      <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: colors.border }}>
        <span 
          style={{ 
            fontSize: 13,
            color: colors.textSecondary,
            fontWeight: 600 
          }}
        >
          Total: {totalProductos} productos en el catálogo
        </span>
      </div>
    </div>
  );
}

export default TopCategoriasProductosChart;