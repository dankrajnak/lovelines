import SEO from "../Utilities/SEO";
import Logo from "../UI/Logo";
import { signIn, signOut, useSession } from "next-auth/client";
import NavbarLayout from "../Layout/NavbarLayout";
import CenterLayout from "../Layout/CenterLayout";

const Home = () => (
  <NavbarLayout>
    <SEO />
    <CenterLayout height="100vh">
      <Logo />
      <div className="description">Under construction</div>
    </CenterLayout>
    <style jsx>{`
      .description {
        font-weight: lighter;
      }
    `}</style>
  </NavbarLayout>
);

export default Home;
