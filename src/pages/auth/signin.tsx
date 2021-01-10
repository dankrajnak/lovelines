import { providers, signIn, SessionProvider } from "next-auth/client";
import CenterLayout from "../../Layout/CenterLayout";
import Colors from "../../Styles/colors";
import Logo from "../../UI/Logo";
import {
  GoogleOutlined,
  FacebookFilled,
  GithubOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const nameToIcon = {
  Google: <GoogleOutlined />,
  Facebook: <FacebookFilled />,
  GitHub: <GithubOutlined />,
};

const SignIn = ({
  query,
  providers,
}: {
  providers: SessionProvider;
  query: any;
}) => {
  const { error } = query;
  const router = useRouter();

  let errorMessage: string | null = null;
  if (error) {
    switch (error) {
      case "Signin":
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
        errorMessage = "Try signing with a different account";
        break;
      case "OAuthAccountNotLinked":
        errorMessage =
          "We already have that email, did you sign in a different way previously?";
        break;
      case "EmailSignin":
        errorMessage = "Check your email address";
        break;
      case "CredentialsSignin":
        errorMessage =
          "Sign in failed. Check the details you provided are correct";
        break;
      default:
        errorMessage = "Unable to sign in";
        break;
    }
  }
  return (
    <>
      <CenterLayout height="100vh">
        <div className="card">
          <Logo />
          {errorMessage ? (
            <div className="error">{errorMessage}</div>
          ) : (
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              No information is shared with these apps. They are only used to
              securely log you in without a password.
            </div>
          )}
          <div className="providers-holder">
            {Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                className="provider-button"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: router.query.callbackUrl as string,
                  })
                }
              >
                <span style={{ marginRight: 5 }}>
                  {nameToIcon[provider.name]}
                </span>
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
            margin: 8px 0px;
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
