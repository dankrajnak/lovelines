import { AppProps } from "next/app";
import "../Styles/globals.css";
import "normalize.css";
import { RecoilRoot } from "recoil";
import { Provider } from "next-auth/client";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  </RecoilRoot>
);

export default MyApp;
