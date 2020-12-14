import { useSession, signIn, signOut } from "next-auth/client";
import Colors from "../Styles/colors";

const NavbarLayout: React.FunctionComponent = ({ children }) => {
  const [session] = useSession();
  return (
    <>
      <div className="menu">
        <div className="menu-container">
          <div></div>
          {!!session ? (
            <button className="sign-button" onClick={() => signOut()}>
              Sign Out
            </button>
          ) : (
            <button className="sign-button" onClick={() => signIn()}>
              Sign In
            </button>
          )}
        </div>
      </div>
      {children}
      <style jsx>{`
        .menu {
          position: fixed;
          background: ${Colors.black};
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
          color: white;
          height: 50px;
          top: 0;
          width: 100%;
          z-index: 1000;
        }

        .menu-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          width: 100%;
          height: 100%;
        }

        .sign-button {
          background: none;
          color: ${Colors.white};
          border: none;
        }

        .sign-button:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default NavbarLayout;
