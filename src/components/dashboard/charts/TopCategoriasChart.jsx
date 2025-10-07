import React from 'react'
import { useColors } from '../../../hooks/useColor';
import { ResponsivePie } from '@nivo/pie'


const data = [
  {
    "id": "python",
    "label": "python",
    "value": 415,
    "color": "hsl(197, 70%, 50%)"
  },
  {
    "id": "hack",
    "label": "hack",
    "value": 542,
    "color": "hsl(149, 70%, 50%)"
  },
  {
    "id": "php",
    "label": "php",
    "value": 480,
    "color": "hsl(77, 70%, 50%)"
  },
  {
    "id": "rust",
    "label": "rust",
    "value": 302,
    "color": "hsl(34, 70%, 50%)"
  },
  {
    "id": "ruby",
    "label": "ruby",
    "value": 430,
    "color": "hsl(259, 70%, 50%)"
  }
]

function TopCategoriasChart() {
    const colors = useColors()
  return (
    <>
    <div className=''>
        <h1 style={{ color: colors.textPrimary, fontSize: 16, fontWeight: 500 }}>
          Top de categorias mas vendidas
        </h1>
    <div className='mt-5 h-[400px] justify-center'>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.6}
                cornerRadius={2}
                activeOuterRadiusOffset={20}
                borderColor="#ffffff"
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                enableArcLabels={false}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                motionConfig={{ mass: 3, tension: 259, friction: 26, clamp: false, precision: 0.01, velocity: 0 }}
                animate={true} 
                legends={[
                    {
                        anchor: 'bottom',       
                        direction: 'row',   
                        translateX: 15,         
                        translateY: 50,          
                        itemsSpacing: 17,
                        itemWidth: 80,
                        itemHeight: 20,
                        symbolShape: 'circle',
                        itemTextColor: colors.textPrimary,
                    },
                    ]}
                theme={{
                    tooltip: {
                    container: {
                        background: colors.background,
                        color: colors.textPrimary,    
                        fontSize: 12,
                        borderRadius: 6,
                        padding: '6px 9px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                    },
                    },
                }}
            />

    </div>
    </div>
    </>
  );
}

export default TopCategoriasChart