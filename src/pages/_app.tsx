import { AppProps } from "next/app";
import "../Styles/globals.css";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

export default MyApp;
