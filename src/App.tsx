import { useCallback } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";

import "reactflow/dist/base.css";
import CustomNode from "./CustomNode";
import { initEdges,initNodes } from "./nodes-edges";


const nodeTypes = {
  custom: CustomNode,
};


const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
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
