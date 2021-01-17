import { CSSProperties } from "react";

const Container: React.FunctionComponent<{ style?: CSSProperties }> = ({
  children,
  style,
}) => (
  <>
    <div className="container" style={style}>
      {children}
    </div>
    <style jsx>{`
      .container {
        width: 90%;
        padding: 10px;
        margin-right: auto;
        margin-left: auto;
      }

      @media (min-width: 576px) {
        .container {
          max-width: 576px;
        }
      }

      @media (min-width: 768px) {
        .container {
          max-width: 720px;
        }
      }

      @media (min-width: 992px) {
        .container {
          max-width: 960px;
        }
      }
    `}</style>
  </>
);

export default Container;
