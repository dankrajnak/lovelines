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

const SignIn = ({
  query,
  providers,
}: {
  providers: SessionProvider;
  query: any;
}) => {
  const { error } = query;

  let errorMessage;
  if (error) {
    switch (error) {
      case "Signin":
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
        errorMessage = <p>Try signing with a different account.</p>;
        break;
      case "OAuthAccountNotLinked":
        errorMessage = (
          <p>
            We already have that email, did you sign in a different way
            previously?
          </p>
        );
        break;
      case "EmailSignin":
        errorMessage = <p>Check your email address.</p>;
        break;
      case "CredentialsSignin":
        errorMessage = (
          <p>Sign in failed. Check the details you provided are correct.</p>
        );
        break;
      default:
        errorMessage = <p>Unable to sign in.</p>;
        break;
    }
  }
  return (
    <>
      <CenterLayout height="100vh">
        <div className="card">
          <Logo />
          {errorMessage && <div className="error">{errorMessage}</div>}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            No information is shared with these apps. They are only used to
            securely log you in without a password.
          </div>
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

          .error {
            color: ${Colors.red};
            text-align: center;
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
};

SignIn.getInitialProps = async ({ query }) => ({
  providers: await providers(),
  query,
});

export default SignIn;
