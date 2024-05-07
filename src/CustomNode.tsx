import { memo } from "react";
import { Handle, Position } from "reactflow";

function CustomNode(data:any) {
  const percentage = (data.data.inputWidth / data.data.maxWidth) * 100;
  const per = percentage.toFixed(2);
  console.log(data.data);
  return (
    <>
      <div key={data.inputWidth}>
        <div className="container w-20vw">
          <div className="innerContainer" style={{ width: `${per}%` }}></div>
          <div className="innerText">{data.data.text}</div>
          <div className="innerData">{data.data.inputWidth}</div>
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}

export default memo(CustomNode);
