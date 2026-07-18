"use client";

import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import CustomNode from "./custom-node";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 50 },
    data: { label: "IoT Sensors", icon: "sensors" },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 0, y: 150 },
    data: { label: "Cloud APIs", icon: "cloud" },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 250, y: 100 },
    data: { label: "MCP Core Engine", icon: "hub", isCore: true },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 550, y: 50 },
    data: { label: "Compliance Alert", icon: "warning" },
  },
  {
    id: "5",
    type: "custom",
    position: { x: 550, y: 150 },
    data: { label: "Audit Ledger", icon: "storage" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
  },
];

export default function HeroReactFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[300px] bg-gradient-to-br from-emerald-50/30 to-white rounded-2xl border border-emerald-100/50 shadow-sm overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#d1fae5" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor="#10b981"
          maskColor="rgb(240 253 244 / 0.8)"
          style={{ backgroundColor: "transparent" }}
        />
      </ReactFlow>
    </div>
  );
}