import { AppProps } from "next/app";
import "../Styles/globals.css";
import "normalize.css";
import { RecoilRoot } from "recoil";
import { Provider } from "next-auth/client";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  </Provider>
);

export default MyApp;
