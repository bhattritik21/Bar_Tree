import { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/base.css";
import CustomNode from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

const initNodes = [
  {
    id: "1",
    type: "custom",
    data: { inputWidth: 100, maxWidth: 100 },
    position: { x: -200, y: 100 },
  },
  {
    id: "2",
    type: "custom",
    data: { inputWidth: 50, maxWidth: 100 },
    position: { x: 200, y: 0 },
  },
  {
    id: "3",
    type: "custom",
    data: { inputWidth: 20, maxWidth: 100 },
    position: { x: 200, y: 50 },
  },
  {
    id: "4",
    type: "custom",
    data: { inputWidth: 10, maxWidth: 100 },
    position: { x: 200, y: 100 },
  },
  {
    id: "5",
    type: "custom",
    data: { inputWidth: 10, maxWidth: 100 },
    position: { x: 200, y: 150 },
  },
];

const initEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
  },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params:any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      className="bg-teal-50"
    ></ReactFlow>
  );
};

export default Flow;
