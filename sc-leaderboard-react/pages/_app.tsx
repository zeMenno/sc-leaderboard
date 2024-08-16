import type { AppProps } from "next/app";
import "../assets/css/globals.css";
import { Akshar } from "next/font/google";
const inter = Akshar({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component className={inter.className} {...pageProps} />
  );
}

export default MyApp;