import React from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { useNodeMouseHandlers } from '@nivo/circle-packing';
import { animated } from '@react-spring/web';

// Пример данных
const data = {
  name: 'nivo',
  children: [
    {
      name: 'Aromas',
      children: [
        { name: 'Fruits', loc: 10 },
        { name: 'Berries', loc: 20 },
        { name: 'Citrus', loc: 30 }
      ]
    },
    {
      name: 'Scents',
      children: [
        { name: 'Floral', loc: 15 },
        { name: 'Woody', loc: 25 }
      ]
    }
  ]
};

// Компонент для круга с иконками
const CircleWithIcon = ({
  node,
  style,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onClick
}) => {
  const handlers = useNodeMouseHandlers(node, {
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick
  });

  const icons = {
    Fruits: '🍎',
    Berries: '🍓',
    Citrus: '🍋',
    Floral: '🌸',
    Woody: '🌲'
  };

  return (
    <animated.g transform={`translate(${style.x}, ${style.y})`}>
      <animated.circle
        r={style.radius}
        fill={node.data.color || style.color}
        stroke={style.borderColor}
        strokeWidth={style.borderWidth}
        opacity={style.opacity}
        {...handlers}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        style={{ pointerEvents: 'none', fontSize: style.radius / 2 }}
      >
        {icons  [node.data.name] || node.data.name}
      </text>
    </animated.g>
  );
};

const CirclePackingChart = () => (
  <div style={{ height: '100%', width: '100%' }}>
    <ResponsiveCirclePacking
      data={data}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      id="name"
      value="loc"
      colors={{ scheme: 'nivo' }}
      childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
      padding={4}
      enableLabels={true}
      labelsFilter={(node) => node.node.depth === 2}
      labelsSkipRadius={10}
      labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'none',
          color: 'inherit',
          rotation: -45,
          lineWidth: 5,
          spacing: 8
        }
      ]}
      fill={[
        {
          match: { depth: 1 },
          id: 'lines'
        }
      ]}
      circleComponent={CircleWithIcon}
    />
  </div>
);

export default CirclePackingChart;
