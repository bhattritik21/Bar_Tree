import { memo } from "react";
import { Handle, Position } from "reactflow";

function CustomNode({ data }: { data: { inputWidth: number; maxWidth: number } }) {
  const percentage = (data.inputWidth / data.maxWidth) * 100;
  const per = percentage.toFixed(2);
  return (
    <>
      <div key={data.inputWidth}>
        <div className="container w-20vw">
          <div className="innerContainer" style={{ width: `${per}%` }}></div>
          <div className="innerText">{data.inputWidth}</div>
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}

export default memo(CustomNode);
