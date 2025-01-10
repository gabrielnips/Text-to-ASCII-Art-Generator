import React, { useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Main({
  children,
  onContextMenu,
}: {
  children: React.ReactNode;
  onContextMenu: (e: React.MouseEvent) => void;
}) {
  return (
    <main
      onContextMenu={onContextMenu}
      className={`h-screen flex items-center justify-center px-96 select-none ${inter.className}`}
    >
      <Head>
        <title>Text to ASCII Art Generator (TAAG)</title>
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
        <meta
          property="og:title"
          content="Text to ASCII Art Generator (TAAG)"
          key="title"
        />
      </Head>
      {children}
    </main>
  );
}
