'use client';

import {
  ComputedLink,
  ComputedNode,
  NodeCanvasRendererProps,
  ResponsiveTree,
  ResponsiveTreeCanvas
} from '@nivo/tree';
import { useState } from 'react';

interface Datum {
  name: string;
  color?: string;
  selected?: boolean;
  isVisible?: boolean;
  children?: Datum[];
}

const data: Datum = {
  name: 'Ароматы',
  isVisible: true,
  children: [
    {
      name: 'Цветочные',
      color: 'black',
      children: [
        { name: 'Жасмин', color: 'hsl(90, 70%, 50%)' },
        { name: 'Роза', color: 'hsl(30, 70%, 50%)' },
        { name: 'Лаванда', color: 'hsl(70, 70%, 50%)' },
        { name: 'Тимьян', color: 'hsl(50, 70%, 50%)' }
      ]
    },
    {
      name: 'Фруктовые',
      color: 'hsl(120, 70%, 50%)',
      children: [
        { name: 'Яблоко', color: 'hsl(150, 70%, 50%)' },
        { name: 'Груша', color: 'hsl(180, 70%, 50%)' },
        { name: 'Абрикос', color: 'hsl(200, 70%, 50%)' },
        { name: 'Персик', color: 'hsl(220, 70%, 50%)' },
        {
          name: 'Цитрусовые',
          color: 'hsl(240, 70%, 50%)',
          children: [
            { name: 'Лимон', color: 'hsl(260, 70%, 50%)' },
            { name: 'Апельсин', color: 'hsl(280, 70%, 50%)' },
            { name: 'Грейпфрут', color: 'hsl(300, 70%, 50%)' }
          ]
        }
      ]
    },
    {
      name: 'Пряные',
      color: 'hsl(180, 70%, 50%)',
      children: [
        { name: 'Корень имбиря', color: 'hsl(200, 70%, 50%)' },
        { name: 'Корица', color: 'hsl(220, 70%, 50%)' },
        { name: 'Кардамон', color: 'hsl(240, 70%, 50%)' },
        { name: 'Гвоздика', color: 'hsl(260, 70%, 50%)' },
        { name: 'Черный перец', color: 'hsl(280, 70%, 50%)' }
      ]
    },
    {
      name: 'Травяные',
      color: 'hsl(240, 70%, 50%)',
      children: [
        { name: 'Мелисса', color: 'hsl(260, 70%, 50%)' },
        { name: 'Череда', color: 'hsl(320, 70%, 50%)' }
      ]
    },
    {
      name: 'Древесные',
      color: 'hsl(300, 70%, 50%)',
      children: [
        { name: 'Кедр', color: 'hsl(320, 70%, 50%)' },
        { name: 'Дуб', color: 'hsl(340, 70%, 50%)' },
        { name: 'Сосна', color: 'hsl(360, 70%, 50%)' }
      ]
    },
    {
      name: 'Ореховые',
      color: 'hsl(360, 70%, 50%)',
      children: [
        { name: 'Миндаль', color: 'hsl(10, 70%, 50%)' },
        { name: 'Фундук', color: 'hsl(30, 70%, 50%)' },
        { name: 'Грецкий орех', color: 'hsl(50, 70%, 50%)' }
      ]
    },
    {
      name: 'Молочные',
      color: 'hsl(90, 70%, 50%)',
      children: [
        { name: 'Крем', color: 'hsl(110, 70%, 50%)' },
        { name: 'Молоко', color: 'hsl(130, 70%, 50%)' }
      ]
    },
    {
      name: 'Зелёные',
      color: 'hsl(100, 70%, 50%)',
      children: [
        { name: 'Зелёный чай', color: 'hsl(120, 70%, 50%)' },
        { name: 'Мелисса', color: 'hsl(140, 70%, 50%)' }
      ]
    },
    {
      name: 'Сладкие',
      color: 'hsl(70, 70%, 50%)',
      children: [
        { name: 'Мёд', color: 'hsl(90, 70%, 50%)' },
        { name: 'Карамель', color: 'hsl(110, 70%, 50%)' }
      ]
    }
  ]
};
const renderNodeCustom = (
  ctx: CanvasRenderingContext2D,
  { node }: NodeCanvasRendererProps<Datum>
) => {
  const isSelected = node.data.selected;

  ctx.save();

  ctx.translate(node.x, node.y);

  if (!isSelected) {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = node.color;
  } else {
    ctx.fillStyle = node.color;
  }

  ctx.beginPath();

  const nodeSize = isSelected ? (node.size || 20) * 1.5 : node.size || 20;
  ctx.arc(0, 0, node.size / 2, 0, 2 * Math.PI);
  ctx.fill();
  if (!isSelected) {
    ctx.stroke();
  }

  ctx.restore();
};

export const MyResponsiveTree = () => {
  const [treeData, setTreeData] = useState<Datum>(data);

  const handleNodeClick = (clickedNode: ComputedNode<any>) => {
    if (clickedNode.path.length === 1) {
      return;
    }

    const updateNodeSelection = (node: Datum): Datum => {
      if (node.name === clickedNode.data.name) {
        return {
          ...node,
          isVisible: !node.isVisible,
          selected: !node.selected
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNodeSelection)
        };
      }
      return node;
    };

    setTreeData(updateNodeSelection(treeData));
  };

  const renderNodes = (node: Datum): Datum => {
    if (!node.isVisible && node.children) {
      return { ...node, children: [] }; // Hide children if not visible
    }
    return { ...node, children: node.children?.map(renderNodes) };
  };

  return (
    <ResponsiveTreeCanvas
      // data={treeData}
      data={renderNodes(treeData)}
      identity="name"
      //   activeNodeSize={(node) => (node.path.length === 1 ? 12 : 24)}
      linkCurve="bump"
      nodeColor={(node) => node.data.color || '#000'}
      linkColor={{
        from: 'target.color',
        modifiers: [['opacity', 0.7]]
      }}
      fixNodeColorAtDepth={1}
      linkThickness={1}
      //   activeLinkThickness={3}
      //   inactiveLinkThickness={2}
      layout="left-to-right"
      //   mode="tree"
      // orientLabel={false}
      margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
      meshDetectionRadius={80}
      // onLinkMouseEnter={() => {}}
      // onLinkMouseMove={() => {}}
      // onLinkMouseLeave={() => {}}
      // onLinkClick={() => {}}
      onNodeClick={handleNodeClick}
      // linkTooltip={(props) => {
      //   return <></>;
      // }}
      // linkTooltipAnchor={'top'}
      //   layers={['labels', 'links', 'nodes']}
      renderNode={renderNodeCustom}
    />
  );
};
