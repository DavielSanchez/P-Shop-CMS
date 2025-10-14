import React from "react";
import { useColors } from "../../../hooks/useColor";
import { ResponsivePie } from "@nivo/pie";

const data = [
  { id: "camisetas", label: "Camisetas", value: 156 },
  { id: "sudaderas", label: "Sudaderas", value: 89 },
  { id: "pantalones", label: "Pantalones", value: 74 },
  { id: "accesorios", label: "Accesorios", value: 63 },
  { id: "zapatos", label: "Zapatos", value: 45 },
  { id: "chaquetas", label: "Chaquetas", value: 38 },
  { id: "ropa-interior", label: "Ropa Interior", value: 52 },
  { id: "deportiva", label: "Ropa Deportiva", value: 41 },
  { id: "zapatos-2", label: "Zapatos", value: 45 },
  { id: "chaquetas-2", label: "Chaquetas", value: 38 },
  { id: "ropa-interior-2", label: "Ropa Interior", value: 52 },
  { id: "deportiv", label: "Ropa Deportiva", value: 41 },
];

// ESQUEMA DE 50 COLORES ÚNICOS
const customColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", 
  "#FF9FF3", "#54A0FF", "#5F27CD", "#00D2D3", "#FF9F43",
  "#10AC84", "#EE5A24", "#0984E3", "#A29BFE", "#FD79A8",
  "#E17055", "#00B894", "#00CEC9", "#6C5CE7", "#FDCB6E",
  "#E84393", "#636E72", "#DFE6E9", "#B2BEC3", "#74B9FF",
  "#55EFC4", "#81ECEC", "#FAB1A0", "#FFEAA7", "#D63031",
  "#E66767", "#546DE5", "#63CDDA", "#CF6A87", "#F7D794",
  "#786FA6", "#F8A5C2", "#FDA7DF", "#ED4C67", "#B53471",
  "#FFC312", "#C4E538", "#12CBC4", "#FDA7DF", "#9980FA",
  "#5758BB", "#1B1464", "#006266", "#1289A7", "#A3CB38"
];

function TopCategoriasChart() {
  const colors = useColors();

  const totalCategorias = data.length;

  return (
    <div className="w-full flex flex-col items-center">
      <h1
        className="mb-3 text-center lg:text-left w-full"
        style={{ color: colors.textPrimary, fontSize: 16, fontWeight: 500 }}
      >
        Top de categorías más vendidas
      </h1>

      <div
        className="w-full max-w-[500px] h-[260px] sm:h-[320px] md:h-[360px] lg:h-[380px]"
        style={{ minHeight: 220 }}
      >
        <ResponsivePie
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          innerRadius={0.45}
          padAngle={0.6}
          cornerRadius={2}
          activeOuterRadiusOffset={10}
          enableArcLabels={true}
          enableArcLinkLabels={false}
          arcLabelsSkipAngle={15}
          arcLabelsTextColor="#ffffff"
          arcLabel={(item) => `${item.value}`}
          colors={customColors} 
          borderWidth={0}
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
                fontSize: 11,
                fontWeight: 600,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              },
            },
          }}
          motionConfig="gentle"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 px-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: customColors[index % customColors.length], // 🔥 MISMO ESQUEMA
              }}
            ></span>
            <span
              style={{
                fontSize: 12,
                color: colors.textPrimary,
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 w-full border-t text-center" style={{ borderColor: colors.border }}>
        <span 
          style={{ 
            fontSize: 13,
            color: colors.textSecondary,
            fontWeight: 600 
          }}
        >
          Total: {totalCategorias} categorias en el catálogo
        </span>
      </div>
    </div>
  );
}

export default TopCategoriasChart;