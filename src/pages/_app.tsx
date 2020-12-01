import { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log(process.env.AUTH0_DOMAIN);
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      }
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
};

export default MyApp;
