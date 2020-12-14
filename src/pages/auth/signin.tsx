import { providers, signIn, SessionProvider } from "next-auth/client";
import CenterLayout from "../../Layout/CenterLayout";
import Colors from "../../Styles/colors";
import Logo from "../../UI/Logo";
import {
  faGithub,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const nameToIcon = {
  Google: faGoogle,
  Facebook: faFacebook,
  GitHub: faGithub,
};

const SignIn = ({ providers }: { providers: SessionProvider }) => (
  <>
    <CenterLayout height="100vh">
      <div className="card">
        <Logo />
        <p style={{ textAlign: "center" }}>
          No information is shared with these apps. They are only used to
          securely log you in without a password.
        </p>
        <div className="providers-holder">
          {Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              className="provider-button"
              onClick={() => signIn(provider.id)}
            >
              <FontAwesomeIcon
                fixedWidth
                icon={nameToIcon[provider.name]}
                style={{ marginRight: 5 }}
              />
              {provider.name}
            </button>
          ))}
        </div>
      </div>
    </CenterLayout>
    <style jsx>
      {`
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: ${Colors.white};
          border-radius: 10px;
          box-shadow: 11px 11px 22px #c4c3c3, -11px -11px 22px #ffffff;
          padding: 30px;
          max-width: 300px;
        }

        .provider-button {
          display: flex;
          align-items: center;
          margin-top: 10px;
          background: none;
          border: solid 1px ${Colors.black};
          border-radius: 5px;
        }

        .providers-holder {
          display: flex;
          width: 100%;
          flex-direction: column;
        }
      `}
    </style>
  </>
);

SignIn.getInitialProps = async () => ({
  providers: await providers(),
});

export default SignIn;
