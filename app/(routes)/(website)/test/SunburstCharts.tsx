'use client';

import { colorSchemes } from '@nivo/colors';
import { linearGradientDef, patternDotsDef, useTheme } from '@nivo/core';
import { generateLibTree } from '@nivo/generators';
import {
  ComputedDatum,
  ResponsiveSunburst,
  Sunburst,
  SunburstCustomLayerProps
} from '@nivo/sunburst';
import { useState } from 'react';

interface RawDatum {
  name: string;
  loc?: number;
  checked?: boolean;
  color?: string;
  children?: RawDatum[];
}

const commonProperties = {
  width: 900,
  height: 500,
  data: generateLibTree(),
  id: 'name',
  value: 'loc'
};

export function Basic() {
  return <ResponsiveSunburst {...commonProperties} />;
}

export const WithChildColorModifier = () => {
  return (
    <Sunburst<RawDatum>
      {...commonProperties}
      childColor={{ from: 'color', modifiers: [['brighter', 0.13]] }}
    />
  );
};

export const WithColorsIndependentFromParent = () => {
  return (
    <Sunburst<RawDatum> {...commonProperties} inheritColorFromParent={false} />
  );
};

const customPalette = [
  '#ffd700',
  '#ffb14e',
  '#fa8775',
  '#ea5f94',
  '#cd34b5',
  '#9d02d7',
  '#0000ff'
];
export function WithCustomColors() {
  return <Sunburst<RawDatum> {...commonProperties} colors={customPalette} />;
}

export function WithCustomChildColors() {
  return (
    <Sunburst<RawDatum>
      {...commonProperties}
      childColor={(parent, child) => {
        return child.data.color;
      }}
    />
  );
}

export function WithFormattedTooltipValue() {
  return <Sunburst<RawDatum> {...commonProperties} valueFormat=" >-$,.2f" />;
}

const CustomTooltipComponent = ({
  id,
  value,
  color
}: ComputedDatum<unknown>) => {
  const theme = useTheme();

  return (
    <strong style={{ ...theme.tooltip.container, color }}>
      {id}: {value}
    </strong>
  );
};

export function CustomTooltip() {
  return (
    <Sunburst<RawDatum>
      {...commonProperties}
      tooltip={CustomTooltipComponent}
      theme={{
        tooltip: {
          container: {
            background: '#333'
          }
        }
      }}
    />
  );
}

const initialData = {
  name: 'nivo',
  children: [
    {
      name: 'Фруктовый',
      color: '#EFE285',
      children: [
        {
          name: 'Цитрусы',
          loc: 50
        },
        {
          name: 'Яблоко',
          loc: 50
        },
        {
          name: 'Персик',
          loc: 50
        },
        {
          name: 'Груша',
          loc: 50
        }
      ]
    },
    {
      name: 'Цветочный',
      color: '#BCDAA5',
      children: [
        {
          name: 'Сирень',
          loc: 50
        },
        {
          name: 'Роза',
          loc: 50
        },
        {
          name: 'Липа',
          loc: 50
        },
        {
          name: 'Пион',
          loc: 50
        }
      ]
    },
    {
      name: 'Почвенный',
      color: '#334515',
      children: [
        {
          name: 'Земля',
          loc: 50
        },
        {
          name: 'Торф',
          loc: 50
        },
        {
          name: 'Мох',
          loc: 50
        }
      ]
    },
    {
      name: 'Минеральный',
      color: '#ACBDB1',
      children: [
        {
          name: 'Море',
          loc: 50
        },
        {
          name: 'Водоросли',
          loc: 50
        },
        {
          name: 'Рыба',
          loc: 50
        },
        {
          name: 'Соль',
          loc: 50
        }
      ]
    },
    {
      name: 'Овощной',
      color: '#C2D55E',
      children: [
        {
          name: 'Цукини',
          loc: 50
        },
        {
          name: 'Горошек',
          loc: 50
        },
        {
          name: 'Тормат',
          loc: 50
        },
        {
          name: 'Тыква',
          loc: 50
        }
      ]
    },
    {
      name: 'Травянистый',
      color: '#575F25',
      children: [
        {
          name: 'Трава',
          loc: 50
        },
        {
          name: 'Сено',
          loc: 50
        },
        {
          name: 'Лекарственные травы',
          loc: 50
        }
      ]
    },
    {
      name: 'Ореховый',
      color: '#D89741',
      children: [
        {
          name: 'Семена',
          loc: 50
        },
        {
          name: 'Грецкий',
          loc: 50
        },
        {
          name: 'Миндаль',
          loc: 50
        }
      ]
    },
    {
      name: 'Кофейный',
      color: '#A37005',
      loc: 50
    },
    {
      name: 'Пряный',
      color: '#C48112',
      children: [
        {
          name: 'Кориандр',
          loc: 50
        },
        {
          name: 'Мята',
          loc: 50
        },
        {
          name: 'Перец',
          loc: 50
        },
        {
          name: 'Ваниль',
          loc: 50
        },
        {
          name: 'Гвоздика',
          loc: 50
        }
      ]
    },
    {
      name: 'Древесный',
      color: '#E54C22',
      children: [
        {
          name: 'Уголь',
          loc: 50
        },
        {
          name: 'Бочка',
          loc: 50
        },
        {
          name: 'Дым',
          loc: 50
        },
        {
          name: 'Смола',
          loc: 50
        },
        {
          name: 'Хвоя',
          loc: 50
        }
      ]
    },
    {
      name: 'Ягодный',
      color: '#D9598B',
      children: [
        {
          name: 'Смородина',
          loc: 50
        },
        {
          name: 'Малина',
          loc: 50
        },
        {
          name: 'Виноград',
          loc: 50
        },
        {
          name: 'Шиповник',
          loc: 50
        }
      ]
    }
  ]
};

export function MouseEvents() {
  const [data, setData] = useState<RawDatum>(initialData);
  const [radius, setRadius] = useState(15); // Initial zoom level

  const handleClick = (node: ComputedDatum<RawDatum>) => {
    console.log('Handling checkbox change for node:', node);

    const updateNode = (nodeToUpdate: RawDatum, name: string): RawDatum => {
      console.log('Current node in updateNode:', nodeToUpdate);

      if (nodeToUpdate.name === name) {
        console.log('Node matched for update:', nodeToUpdate);
        return { ...nodeToUpdate, checked: !nodeToUpdate.checked };
      }

      return {
        ...nodeToUpdate,
        children: nodeToUpdate.children
          ? nodeToUpdate.children.map((child) => updateNode(child, name))
          : undefined
      };
    };

    const updatedData = updateNode(data, node.data.name);

    console.log('Updated data:', updatedData);

    setData(updatedData);
  };

  return (
    <ResponsiveSunburst<RawDatum>
      data={data}
      id="name"
      value="loc"
      onClick={handleClick}
      // colors={(node) => node.data.color || '#000'}
      // inheritColorFromParent={false}
      arcLabel={(node) => node.data.name}
      borderWidth={1}
      tooltip={() => <></>}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.6]]
      }}
      enableArcLabels
      defs={[
        patternDotsDef('pattern', {
          background: 'inherit',
          color: '#ffffff',
          size: 3,
          // padding: 1,
          stagger: true
        })
      ]}
      fill={[
        {
          match: (node: any) => node.data.checked || false,
          id: 'pattern'
        }
      ]}
      cornerRadius={15}
    />
  );
}

export function PatternsAndGradients() {
  return (
    <Sunburst<RawDatum>
      {...commonProperties}
      defs={[
        linearGradientDef('gradient', [
          { offset: 0, color: '#ffffff' },
          { offset: 15, color: 'inherit' },
          { offset: 100, color: 'inherit' }
        ]),
        patternDotsDef('pattern', {
          background: 'inherit',
          color: '#ffffff',
          size: 2,
          padding: 3,
          stagger: true
        })
      ]}
      fill={[
        {
          match: (node: ComputedDatum<RawDatum>) =>
            ['viz', 'text', 'utils'].includes(String(node.id)),
          id: 'gradient'
        },
        {
          match: (node: ComputedDatum<RawDatum>) =>
            ['set', 'generators', 'misc'].includes(String(node.id)),
          id: 'pattern'
        }
      ]}
    />
  );
}

const drillDownColors = colorSchemes.brown_blueGreen[7];
const drillDownColorMap = {
  viz: drillDownColors[0],
  colors: drillDownColors[1],
  utils: drillDownColors[2],
  generators: drillDownColors[3],
  set: drillDownColors[4],
  text: drillDownColors[5],
  misc: drillDownColors[6]
};
const getDrillDownColor = (
  node: Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>
) => {
  const category = [
    ...node.path
  ].reverse()[1] as keyof typeof drillDownColorMap;

  return drillDownColorMap[category];
};

//     motionConfig: ['default', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses']
export function ChildrenDrillDown() {
  const [data, setData] = useState(commonProperties.data);
  const [dataHistory, setDataHistory] = useState([commonProperties.data]);

  const handleReset = () => {
    setData(commonProperties.data);
    setDataHistory([commonProperties.data]);
  };

  const handleBack = () => {
    if (dataHistory.length > 1) {
      const newHistory = [...dataHistory];
      newHistory.pop();
      setData(newHistory[newHistory.length - 1]);
      setDataHistory(newHistory);
    }
  };

  const handleClick = (clickedData: ComputedDatum<RawDatum>) => {
    const foundObject = data.children?.find(
      (searchedName) => searchedName.name === clickedData.id
    );
    if (foundObject && foundObject.children) {
      setData(foundObject);
      setDataHistory([...dataHistory, foundObject]);
    }
  };

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleBack} disabled={dataHistory.length <= 1}>
        Back
      </button>

      <ResponsiveSunburst
        {...commonProperties}
        colors={getDrillDownColor}
        inheritColorFromParent={false}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.6]]
        }}
        animate={true}
        motionConfig={'gentle'}
        enableArcLabels
        arcLabelsTextColor="#ffffff" // Set the label text color to white
        arcLabelsSkipAngle={12}
        data={data}
        transitionMode="pushIn"
        onClick={handleClick}
      />
    </>
  );
}

function CenteredMetric({
  nodes,
  centerX,
  centerY
}: SunburstCustomLayerProps<RawDatum>) {
  const total = nodes.reduce((total, datum) => total + datum.value, 0);

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '42px',
        fontWeight: 600
      }}
    >
      Center
      {/* {Number.parseFloat(`${total}`).toExponential(2)} */}
    </text>
  );
}

export function AddingAMetricInTheCenterUsingACustomLayer() {
  return (
    <ResponsiveSunburst<RawDatum>
      {...commonProperties}
      layers={['arcs', 'arcLabels', CenteredMetric]}
    />
  );
}
