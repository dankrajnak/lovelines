import Colors from "../styles/colors";
import { NAVBAR_HEIGHT } from "./NavbarLayout";

export const SECONDARY_NAVBAR_HEIGHT = 40 as const;

type Props = {
  buttons: React.ReactNode | React.ReactNode[];
};

const SecondaryNavbarLayout: React.FunctionComponent<Props> = ({
  buttons,
  children,
}) => (
  <>
    <div className="menu">
      <div className="menu-container">{buttons}</div>
    </div>
    {children}
    <style jsx>{`
      .menu {
        position: fixed;
        background: ${Colors.white};
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        color: ${Colors.black};
        height: ${SECONDARY_NAVBAR_HEIGHT}px;
        top: ${NAVBAR_HEIGHT}px;
        width: 100%;
        z-index: 1000;
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
    `}</style>
  </>
);

export default SecondaryNavbarLayout;
