import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export default function App({ Component, pageProps }: AppProps) {

  return <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}><Component {...pageProps} /></ReCaptchaProvider>;
}
