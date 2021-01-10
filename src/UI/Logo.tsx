import Colors from "../Styles/colors";
import Circle from "./Circle";

const Logo = () => (
  <>
    <h1>
      LoveLines
      <Circle color={Colors.red} style={{ marginLeft: 5 }} />
      <Circle color={Colors.blue} style={{ marginLeft: 5 }} />
      <Circle color={Colors.orange} style={{ marginLeft: 5 }} />
    </h1>
    <style jsx>
      {`
        h1 {
          margin-bottom: 3px;
          font-weight: 500;
        }
      `}
    </style>
  </>
);

export default Logo;
