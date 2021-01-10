import Colors from "../styles/colors";
import useDimensions from "../hooks/useDimensions";

type Props = { width?: string; height?: string };

const NeuCard: React.FunctionComponent<Props> = (props) => {
  const [ref, dims] = useDimensions();
  const offset = dims ? Math.floor(Math.min(dims.width, dims.height) / 10) : 0;
  const blur = offset * 2;

  return (
    <>
      <div className="neu-card" ref={ref}>
        {props.children}
      </div>
      <style jsx>
        {`
          .neu-card {
            padding: 30px;
            border-radius: 10px;
            box-shadow: ${offset}px ${offset}px ${blur}px #c4c3c3,
              ${-offset}px ${-offset}px ${blur}px #ffffff;
            background-color: ${Colors.white};
            ${props.width ? `width: ${props.width}` : ""}
            ${props.height ? `height: ${props.height}` : ""}
          }
        `}
      </style>
    </>
  );
};

export default NeuCard;
