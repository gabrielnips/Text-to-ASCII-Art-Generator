import "./globals.css";
import { AsciiProvider } from "../context/AsciiContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AsciiProvider>
      <Component {...pageProps} />
    </AsciiProvider>
  );
}
