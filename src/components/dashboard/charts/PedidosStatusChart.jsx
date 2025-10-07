import * as React from 'react';
import { useAnimate } from '@mui/x-charts/hooks';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { styled } from '@mui/material/styles';
import { interpolateObject } from '@mui/x-charts-vendor/d3-interpolate';
import { useColors } from '../../../hooks/useColor';

const Text = styled('text')(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: 'none',
  fill: (theme.vars || theme)?.palette?.text?.primary,
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  pointerEvents: 'none',
}));

function BarLabel(props) {
  const {
    color,
    yOrigin,
    x,
    y,
    width,
    skipAnimation,
    ...otherProps
  } = props;

  const animatedProps = useAnimate(
    { x: x + width / 2, y: y - 8 },
    {
      initialProps: { x: x + width / 2, y: yOrigin },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element, p) => {
        element.setAttribute('x', p.x.toString());
        element.setAttribute('y', p.y.toString());
      },
      skip: skipAnimation,
    },
  );

  return (
    <Text {...otherProps} fill={color} textAnchor="middle" {...animatedProps} />
  );
}

function PedidosStatusChart() {

    const colors = useColors()

  return (
    <>
    <ChartContainer
      xAxis={[{ scaleType: 'band', data: ['Cancelados', 'Pendientes', 'Completados'] }]}
      series={[
        {
          type: 'bar',
          id: 'base',
          data: [50, 170, 200],
          color: colors.primary,
        },
      ]}
      height={400}
      yAxis={[{ width: 30 }]}
      margin={{ left: 10, right: 10 }}
      sx={{
        '& .MuiChartsAxis-tickLabel': {
          fill: colors.textPrimary,
        },
        '& .MuiChartsAxis-label': {
          fill: colors.textPrimary, 
        },
        '& .MuiChartsLegend-label': {
          fill: colors.textPrimary, 
        },
        '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
          stroke: colors.textPrimary,
        },
      }}
    >
      <BarPlot
        barLabel="value"
        slots={{ barLabel: BarLabel }}
        barLabelStyle={{
          fill: colors.textPrimary,
          fontSize: 13,
          fontWeight: 500,
        }}
      />
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
    </>
  )
}

export default PedidosStatusChart