'use client';

import React, { useState } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';

const initialData = {
  id: 'root',
  name: 'root',
  color: '#4682b4',
  children: [
    {
      id: 'child1',
      testField: 'test',
      name: 'child 1',
      value: 100,
      color: '#8a89a6',
      children: [
        {
          id: 'grandchild1',
          name: 'grandchild 1',
          value: 50,
          color: '#98abc5',
          checked: false
        }
      ]
    },
    {
      id: 'child2',
      name: 'child 2',
      value: 80,
      color: '#7b6888',
      checked: false
    }
  ]
};

const commonProperties = {
  width: 900,
  height: 500,
  id: 'name',
  value: 'value'
};

const getDrillDownColor = (node) => {
  // Цвета для выбранных и невыбранных нод
  return node.id === node.selectedId ? '#ff6347' : node.data.color || '#000';
};

// Кастомный компонент для отрисовки чекбоксов
const CheckboxLayer = ({
  nodes,
  centerX,
  centerY,
  onCheckboxChange,
  selectedNodeId,
  onNodeClick
}) => (
  <>
    {nodes.map((node) => {
      const { arc } = node;
      const { startAngle, endAngle, innerRadius, outerRadius } = arc;

      // Вычислить центр сектора
      const angle = (startAngle + endAngle) / 2;
      const radius = (innerRadius + outerRadius) / 2;
      const x = centerX + radius * Math.cos(angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(angle - Math.PI / 2);

      // Преобразование координат для SVG
      const transform = `translate(${x}, ${y})`;

      return (
        <g
          key={node.id}
          transform={transform}
          onClick={() => onNodeClick(node)}
        >
          <text
            x={0}
            y={-20}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '12px', fontWeight: 600 }}
          >
            {node.data.name}
          </text>
          <foreignObject
            x={-10}
            y={5}
            width="20"
            height="20"
            style={{ pointerEvents: 'auto' }} // Сделать чекбоксы кликабельными
          >
            <input
              type="checkbox"
              checked={node.data.checked || false}
              onChange={() => {
                console.log('Checkbox clicked for node:', node);
                onCheckboxChange(node);
              }}
              style={{ transform: 'scale(1.5)' }}
            />
          </foreignObject>
        </g>
      );
    })}
  </>
);

export function SunburstChartBack() {
  const [data, setData] = useState(initialData);
  const [dataHistory, setDataHistory] = useState([initialData]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleReset = () => {
    setData(initialData);
    setDataHistory([initialData]);
    setSelectedNodeId(null);
  };

  const handleBack = () => {
    if (dataHistory.length > 1) {
      const newHistory = [...dataHistory];
      newHistory.pop();
      setData(newHistory[newHistory.length - 1]);
      setDataHistory(newHistory);
      setSelectedNodeId(null);
    }
  };

  const handleClick = (clickedData) => {
    const foundObject = data.children?.find(
      (searchedName) => searchedName.name === clickedData.id
    );
    if (foundObject && foundObject.children) {
      setData(foundObject);
      setDataHistory([...dataHistory, foundObject]);
      setSelectedNodeId(foundObject.id);
    }
  };

  const handleCheckboxChange = (node) => {
    console.log('Handling checkbox change for node:', node);

    const updateNode = (nodeToUpdate, targetId) => {
      console.log('Current node in updateNode:', nodeToUpdate);

      if (nodeToUpdate.id === targetId) {
        console.log('Node matched for update:', nodeToUpdate);
        return { ...nodeToUpdate, checked: !nodeToUpdate.checked };
      }

      return {
        ...nodeToUpdate,
        children: nodeToUpdate.children
          ? nodeToUpdate.children.map((child) => updateNode(child, targetId))
          : undefined
      };
    };

    const updatedData = updateNode(data, node.data.id);

    console.log('Updated data:', updatedData);

    setData(updatedData);
    setDataHistory((prev) => {
      const newHistory = [...prev];
      newHistory[newHistory.length - 1] = updatedData;
      return newHistory;
    });
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
        arcLabelsSkipAngle={12}
        // arcLabelsTextColor={{
        //   from: 'color',
        //   modifiers: [['darker', 3]]
        // }}
        arcLabelsTextColor="#ffffff"
        data={data}
        transitionMode="pushIn"
        onClick={handleClick}
        layers={[
          'arcs',
          'arcLabels',
          (props) =>
            CheckboxLayer({
              ...props,
              selectedNodeId,
              onCheckboxChange: handleCheckboxChange,
              onNodeClick: handleClick
            })
        ]}
      />
    </>
  );
}
