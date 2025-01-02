import React, { useState, useEffect } from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import figlet from "figlet";
import Head from "next/head";

import { fontOptions } from "../others/fontOptions";

export default function Home() {
  const MENU_ID = "menu-id";
  const { show } = useContextMenu({ id: MENU_ID });
  const [asciiArt, setAsciiArt] = useState("");
  const [font, setFont] = useState("Big");
  const [text, setText] = useState("Test");

  useEffect(() => {
    // Função para extrair parâmetros da URL
    const parseHashParams = () => {
      const hash = window.location.hash.substring(1); // Remove o '#' do início
      const params = new URLSearchParams(hash);
      const paramFont = params.get("f"); // 'f' para a fonte
      const paramText = params.get("t"); // 't' para o texto

      if (paramFont && fontOptions.includes(paramFont)) {
        setFont(paramFont);
      }
      if (paramText) {
        setText(paramText);
      }
    };

    // Chama a função na inicialização
    parseHashParams();

    // Listener para alterações na URL
    window.addEventListener("hashchange", parseHashParams);

    // Remove o listener na desmontagem
    return () => {
      window.removeEventListener("hashchange", parseHashParams);
    };
  }, []);
  /**
   * Displays the context menu.
   * @param {Event} e - The event object.
   */
  function displayMenu(e: React.MouseEvent) {
    show({
      event: e,
    });
  }
  function genTaag() {
    figlet.text(
      text,
      { font: font as figlet.Fonts },
      function (err, data: any) {
        setAsciiArt(data);
      }
    );
  }

  useEffect(() => {
    genTaag();
  }, [text, font]);

  function PageAdvance() {
    window.history.forward();
  }

  function PageReturn() {
    window.history.back();
  }

  function PageReload() {
    location.reload();
  }
  function PageCopyResult() {
    navigator.clipboard.writeText(asciiArt);
  }
  function shareCurrentState() {
    const currentUrl = window.location.origin + window.location.pathname;
    const hashParams = `#p=display&f=${encodeURIComponent(
      font
    )}&t=${encodeURIComponent(text)}`;
    const shareableUrl = currentUrl + hashParams;

    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        alert("URL copiada para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar URL:", err);
      });
  }
  function PageDownloadResult(
    opening: string,
    closing: string,
    extension: string
  ) {
    const content = `${opening}\n${asciiArt}\n${closing}`;
    downloadFile(content, `ascii.${extension}`);
  }

  function PageDownloadLog(logContent: string, fileName: string) {
    downloadFile(logContent, fileName);
  }

  function downloadFile(content: string, name: string) {
    const fileData = content;
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
  }

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };
  return (
    <main
      onContextMenu={displayMenu}
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
      <form
        className={`bg-stone-900 w-screen flex flex-col py-32 px-20 gap-3 rounded-lg
        border border-stone-700 shadow-2xl`}
      >
        <a className={`text-stone-400 text-base text-center`}>
          Text to ASCII Art Generator
        </a>
        <div className="flex-col flex">
          <a className={`text-stone-400 text-sm`}>Text:</a>
          <textarea
            name="text"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`bg-stone-900 shadow-lg border-stone-600 border rounded-lg outline-none placeholder:text-stone-600 text-stone-400 text-sm py-2 px-3`}
            placeholder="Bla bla bla bla"
          ></textarea>
        </div>
        <div className="flex-col flex">
          <a className={`text-stone-400 text-sm`}>Font:</a>
          <select
            name="font"
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className={`bg-stone-900 shadow-lg border-stone-700 border rounded-lg outline-none text-stone-400 text-sm py-2 px-3`}
          >
            {fontOptions.map((font, index) => (
              <option key={index} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-col flex">
          <a className={`text-stone-400 text-sm`}>Result:</a>
          <pre
            className={`bg-stone-900 shadow-lg resize-none overflow-hidden border-stone-600 border rounded-lg outline-none placeholder:text-stone-600 text-stone-400 text-sm py-2 px-3`}
          >
            {asciiArt}
          </pre>
        </div>
      </form>
      <div
        className="fixed bottom-4 left-4 z-50 rounded-2xl border-2 p-4 border-solid border-stone-700 shareButton cursor-pointer"
        onClick={shareCurrentState}
      >
        <svg
          fill="#555555"
          width="40"
          height="40"
          viewBox="0 0 486.465 486.465"
        >
          <g>
            <g>
              <path
                d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143
        L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94
        c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503
        c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384
        c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342
        c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104
        c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308
        l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"
              />
              <path
                d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043
        l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974
        c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463
        c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151
        L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582
        c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819
        c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"
              />
            </g>
          </g>
        </svg>
      </div>
      <div
        className="fixed bottom-4 right-4 z-50 rounded-2xl border-2 border-solid border-stone-700 githubButton cursor-pointer"
        onClick={() => handleRedirect("https://github.com/gabrielnips")}
      >
        <svg
          width="70"
          height="70"
          viewBox="0 0 88 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Github">
            <path
              id="Vector"
              d="M39.0769 61.4369C28.3077 64.7185 28.3077 55.9677 24 54.8739M54.1538 68V59.5337C54.2346 58.4905 54.0959 57.4418 53.7468 56.4573C53.3977 55.4728 52.8463 54.5751 52.1292 53.8238C58.8923 53.0581 66 50.4548 66 38.51C65.9994 35.4556 64.8427 32.5184 62.7692 30.3062C63.7511 27.6339 63.6817 24.6802 62.5754 22.0586C62.5754 22.0586 60.0338 21.2929 54.1538 25.2964C49.2173 23.9374 44.0135 23.9374 39.0769 25.2964C33.1969 21.2929 30.6554 22.0586 30.6554 22.0586C29.5491 24.6802 29.4797 27.6339 30.4615 30.3062C28.3726 32.5348 27.2147 35.4986 27.2308 38.5756C27.2308 50.4329 34.3385 53.0362 41.1015 53.8894C40.3929 54.6332 39.8464 55.5201 39.4976 56.4926C39.1488 57.4651 39.0054 58.5012 39.0769 59.5337V68"
              stroke="#555555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <Menu
        id={MENU_ID}
        className={`bg-stone-900 shadow-lg border-stone-600 border rounded-lg outline-none placeholder:text-stone-600 text-stone-400 text-sm py-2 px-3`}
        animation="scale"
      >
        <Item onClick={PageReturn}>Return</Item>
        <Item onClick={PageAdvance}>Advance</Item>
        <Item onClick={PageReload}>Reload</Item>
        <Separator />
        <Item onClick={shareCurrentState}>Copy Link Shareable</Item>
        <Item onClick={PageCopyResult}>Copy Result</Item>
        <Submenu label="Download Result">
          <Item disabled>Logs</Item>

          <Item onClick={() => PageDownloadResult("/*", "*/", "js")}>
            JS Log
          </Item>
          <Item onClick={() => PageDownloadResult("'''", "'''", "py")}>
            Python Log
          </Item>
          <Item onClick={() => PageDownloadResult("/*", "*/", "cs")}>
            C# Log
          </Item>
          <Item onClick={() => PageDownloadResult("/*", "*/", "css")}>
            CSS Log
          </Item>
          <Item onClick={() => PageDownloadResult("<!--", "-->", "html")}>
            HTML Log
          </Item>
          <Item onClick={() => PageDownloadResult("<!--", "-->", "xml")}>
            XML Log
          </Item>

          <Item disabled>Comments</Item>

          <Item
            onClick={() =>
              PageDownloadLog(
                `console.log("${asciiArt}");`,
                "javascript-log.js"
              )
            }
          >
            JS Comment
          </Item>
          <Item
            onClick={() =>
              PageDownloadLog(`print("${asciiArt}")`, "python-log.py")
            }
          >
            Python Comment
          </Item>
          <Item
            onClick={() =>
              PageDownloadLog(
                `Console.WriteLine("${asciiArt}");`,
                "csharp-log.cs"
              )
            }
          >
            C# Comment
          </Item>
          <Item
            onClick={() => PageDownloadLog(`/* ${asciiArt} */`, "css-log.css")}
          >
            CSS Comment
          </Item>
          <Item
            onClick={() =>
              PageDownloadLog(`<!-- ${asciiArt} -->`, "html-log.html")
            }
          >
            HTML Comment
          </Item>
          <Item
            onClick={() =>
              PageDownloadLog(`<!-- ${asciiArt} -->`, "xml-log.xml")
            }
          >
            XML Comment
          </Item>
        </Submenu>
      </Menu>
    </main>
  );
}
