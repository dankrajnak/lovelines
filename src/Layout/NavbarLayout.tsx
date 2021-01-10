import { useSession, signIn, signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import Colors from "../Styles/colors";

export const NAVBAR_HEIGHT = 50 as const;

const NavbarLayout: React.FunctionComponent = ({ children }) => {
  const [session] = useSession();
  const router = useRouter();
  return (
    <>
      <div className="menu">
        <div className="menu-container">
          <div className="box" />
          {session && (
            <div className="box box-center">
              <div>
                <Link href="/">
                  <a className={router.pathname === "/" ? "current" : ""}>
                    Home
                  </a>
                </Link>
                <Link href="/profile">
                  <a
                    className={
                      router.pathname.startsWith("/profile") ? "current" : ""
                    }
                  >
                    Profile
                  </a>
                </Link>
              </div>
            </div>
          )}
          <div className="box">
            <div>
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
          height: ${NAVBAR_HEIGHT}px;
          top: 0;
          width: 100%;
          z-index: 1000;
        }

        a.current {
          font-weight: 700;
        }

        .box {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .box.box-center a {
          margin-left: 10px;
          margin-right: 10px;
        }

        .box:first-child > div {
          margin-right: auto;
        }

        .box:last-child > div {
          margin-left: auto;
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
