import Colors from "../Styles/colors";
import { NAVBAR_HEIGHT } from "./NavbarLayout";

export const SECONDARY_NAVBAR_HEIGHT = 30 as const;

type Props = {
  shadow?: boolean | null;
  buttons: React.ReactNode | React.ReactNode[];
};

const SecondaryNavbarLayout: React.FunctionComponent<Props> = ({
  shadow,
  buttons,
  children,
}) => (
  <>
    <div className={`menu ${shadow ? "menu-shadow" : ""}`}>
      <div className="menu-container">{buttons}</div>
    </div>
    {children}
    <style jsx>{`
      .menu {
        position: fixed;
        background: ${Colors.white};
        color: ${Colors.black};
        height: ${SECONDARY_NAVBAR_HEIGHT}px;
        top: ${NAVBAR_HEIGHT}px;
        width: 100%;
        z-index: 950;
        box-shadow: 0;
        transition: box-shadow 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      }

      .menu-container {
        display: flex;
        align-items: center;
        padding: 0px 10px;
        width: 100%;
        height: 100%;
      }

      .top-menu-holder .buttons button:hover {
        cursor: pointer;
      }

      .menu-shadow {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }
    `}</style>
  </>
);

export default SecondaryNavbarLayout;
