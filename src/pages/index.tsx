import React, { useEffect } from "react";
import { useAsciiContext } from "../context/AsciiContext";
import { fontOptions } from "../config/fontOptions";
import Main from "../components/Main";
import { Form } from "../components/form";
import { ContextMenu } from "../components/contextMenu";

import { useContextMenu } from "react-contexify";

export default function Home() {
  const MENU_ID = "menu-id";
  const { show } = useContextMenu({ id: MENU_ID });
  const { font, setFont, text, setText, asciiArt, shareCurrentState } =
    useAsciiContext();

  useEffect(() => {
    const parseHashParams = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const paramFont = params.get("f");
      const paramText = params.get("t");
      if (paramFont && fontOptions.includes(paramFont)) {
        setFont(paramFont);
      }
      if (paramText) {
        setText(paramText);
      }
    };
    parseHashParams();
    window.addEventListener("hashchange", parseHashParams);
    return () => {
      window.removeEventListener("hashchange", parseHashParams);
    };
  }, []);

  function displayMenu(e: React.MouseEvent) {
    show({
      event: e,
    });
  }

  const handleMenuClick = (action: string) => {
    switch (action) {
      case "return":
        window.history.back();
        break;
      case "advance":
        window.history.forward();
        break;
      case "reload":
        location.reload();
        break;
      case "copyresult":
        navigator.clipboard.writeText(asciiArt);
        break;
      default:
        break;
    }
  };

  const PageDownloadResult = (
    opening: string,
    closing: string,
    extension: string
  ) => {
    const content = `${opening}\n${asciiArt}\n${closing}`;
    downloadFile(content, `ascii.${extension}`);
  };

  const PageDownloadLog = (logContent: string, fileName: string) => {
    downloadFile(logContent, fileName);
  };

  const downloadFile = (content: string, name: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
  };

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };
  return (
    <Main onContextMenu={displayMenu}>
      <Form
        text={text}
        setText={setText}
        font={font}
        setFont={setFont}
        fontOptions={fontOptions}
        asciiArt={asciiArt}
      />
      <ContextMenu
        MENU_ID={MENU_ID}
        handleMenuClick={handleMenuClick}
        shareCurrentState={shareCurrentState}
        asciiArt={asciiArt}
        PageDownloadResult={PageDownloadResult}
        PageDownloadLog={PageDownloadLog}
      />
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
    </Main>
  );
}
