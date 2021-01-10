import { CSSProperties } from "react";

const Circle = (props: {
  color: string;
  style?: CSSProperties;
  radius?: number;
}) => {
  const radius = props.radius ?? 5;
  return (
    <svg width={radius * 2} height={radius * 2} style={props.style}>
      <circle
        r={radius}
        cx={radius}
        cy={radius}
        style={{ fill: props.color }}
      />
    </svg>
  );
};

export default Circle;
