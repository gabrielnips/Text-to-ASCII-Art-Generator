import React from "react";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export function ContextMenu({
  MENU_ID,
  handleMenuClick,
  shareCurrentState,
  asciiArt,
  PageDownloadResult,
  PageDownloadLog,
}: any) {
  return (
    <Menu
      id={MENU_ID}
      className={`bg-stone-900 shadow-lg border-stone-600 border rounded-lg outline-none placeholder:text-stone-600 text-stone-400 text-sm py-2 px-3`}
      animation="scale"
    >
      <Item onClick={() => handleMenuClick("return")}>Return</Item>
      <Item onClick={() => handleMenuClick("advance")}>Advance</Item>
      <Item onClick={() => handleMenuClick("reload")}>Reload</Item>
      <Separator />
      <Item onClick={shareCurrentState}>Copy Link Shareable</Item>
      <Item onClick={() => handleMenuClick("copyresult")}>Copy Result</Item>
      <Submenu label="Download Result">
        <Item disabled>Logs</Item>
        <Item onClick={() => PageDownloadResult("/*", "*/", "js")}>JS Log</Item>
        <Item onClick={() => PageDownloadResult("'''", "'''", "py")}>
          Python Log
        </Item>
        <Item onClick={() => PageDownloadResult("/*", "*/", "cs")}>C# Log</Item>
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
            PageDownloadLog(`console.log("${asciiArt}");`, "javascript-log.js")
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
          onClick={() => PageDownloadLog(`<!-- ${asciiArt} -->`, "xml-log.xml")}
        >
          XML Comment
        </Item>
      </Submenu>
    </Menu>
  );
}
