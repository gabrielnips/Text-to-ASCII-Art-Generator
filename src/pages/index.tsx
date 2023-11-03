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

const fontOptions = [
  "1Row",
  "3-D",
  "3D Diagonal",
  "3D-ASCII",
  "3d",
  "3d_diagonal",
  "3x5",
  "4Max",
  "5 Line Oblique",
  "5lineoblique",
  "646-ca",
  "646-ca2",
  "646-cn",
  "646-cu",
  "646-de",
  "646-dk",
  "646-es",
  "646-es2",
  "646-fr",
  "646-gb",
  "646-hu",
  "646-irv",
  "646-it",
  "646-jp",
  "646-kr",
  "646-no",
  "646-no2",
  "646-pt",
  "646-pt2",
  "646-se",
  "646-se2",
  "646-yu",
  "8859-2",
  "8859-3",
  "8859-4",
  "8859-5",
  "8859-7",
  "8859-8",
  "8859-9",
  "AMC 3 Line",
  "AMC 3 Liv1",
  "AMC AAA01",
  "AMC Neko",
  "AMC Razor",
  "AMC Razor2",
  "AMC Slash",
  "AMC Slider",
  "AMC Thin",
  "AMC Tubes",
  "AMC Untitled",
  "ANSI Regular",
  "ANSI Shadow",
  "ASCII New Roman",
  "Acrobatic",
  "Alligator",
  "Alligator2",
  "Alpha",
  "Alphabet",
  "Arrows",
  "Avatar",
  "B1FF",
  "Banner",
  "Banner3-D",
  "Banner3",
  "Banner4",
  "Barbwire",
  "Basic",
  "Bear",
  "Bell",
  "Benjamin",
  "Big Chief",
  "Big Money-ne",
  "Big Money-nw",
  "Big Money-se",
  "Big Money-sw",
  "Big",
  "Bigfig",
  "Binary",
  "Block",
  "Blocks",
  "Bloody",
  "Bolger",
  "Braced",
  "Bright",
  "Broadway KB",
  "Broadway",
  "Bubble",
  "Bulbhead",
  "Caligraphy",
  "Caligraphy2",
  "Calvin S",
  "Cards",
  "Catwalk",
  "Chiseled",
  "Chunky",
  "Coinstak",
  "Cola",
  "Colossal",
  "Computer",
  "Contessa",
  "Contrast",
  "Cosmike",
  "Crawford",
  "Crawford2",
  "Crazy",
  "Cricket",
  "Cursive",
  "Cyberlarge",
  "Cybermedium",
  "Cybersmall",
  "Cygnet",
  "DANC4",
  "DOS Rebel",
  "DWhistled",
  "Dancing Font",
  "Decimal",
  "Def Leppard",
  "Delta Corps Priest 1",
  "Diamond",
  "Diet Cola",
  "Digital",
  "Doh",
  "Doom",
  "Dot Matrix",
  "Double Shorts",
  "Double",
  "Dr Pepper",
  "Efti Chess",
  "Efti Font",
  "Efti Italic",
  "Efti Piti",
  "Efti Robot",
  "Efti Wall",
  "Efti Water",
  "Electronic",
  "Elite",
  "Epic",
  "Fender",
  "Filter",
  "Fire Font-k",
  "Fire Font-s",
  "Flipped",
  "Flower Power",
  "Four Tops",
  "Fraktur",
  "Fun Face",
  "Fun Faces",
  "Fuzzy",
  "Georgi16",
  "Georgia11",
  "Ghost",
  "Ghoulish",
  "Glenyn",
  "Goofy",
  "Gothic",
  "Graceful",
  "Gradient",
  "Graffiti",
  "Greek",
  "Heart Left",
  "Heart Right",
  "Henry 3D",
  "Hex",
  "Hieroglyphs",
  "Hollywood",
  "Horizontal Left",
  "Horizontal Right",
  "ICL-1900",
  "Impossible",
  "Invita",
  "Isometric1",
  "Isometric2",
  "Isometric3",
  "Isometric4",
  "Italic",
  "Ivrit",
  "JS Block Letters",
  "JS Bracket Letters",
  "JS Capital Curves",
  "JS Cursive",
  "JS Stick Letters",
  "Jacky",
  "Jazmine",
  "Jerusalem",
  "Katakana",
  "Kban",
  "Keyboard",
  "Knob",
  "Konto Slant",
  "Konto",
  "LCD",
  "Larry 3D 2",
  "Larry 3D",
  "Lean",
  "Letters",
  "Lil Devil",
  "Line Blocks",
  "Linux",
  "Lockergnome",
  "Madrid",
  "Marquee",
  "Maxfour",
  "Merlin1",
  "Merlin2",
  "Mike",
  "Mini",
  "Mirror",
  "Mnemonic",
  "Modular",
  "Morse",
  "Morse2",
  "Moscow",
  "Mshebrew210",
  "Muzzle",
  "NScript",
  "NT Greek",
  "NV Script",
  "Nancyj-Fancy",
  "Nancyj-Improved",
  "Nancyj-Underlined",
  "Nancyj",
  "Nipples",
  "O8",
  "OS2",
  "Octal",
  "Ogre",
  "Old Banner",
  "Patorjk's Cheese",
  "Patorjk-HeX",
  "Pawp",
  "Peaks Slant",
  "Peaks",
  "Pebbles",
  "Pepper",
  "Poison",
  "Puffy",
  "Puzzle",
  "Pyramid",
  "Rammstein",
  "Rectangles",
  "Red Phoenix",
  "Relief",
  "Relief2",
  "Reverse",
  "Roman",
  "Rot13",
  "Rotated",
  "Rounded",
  "Rowan Cap",
  "Rozzo",
  "Runic",
  "Runyc",
  "S Blood",
  "SL Script",
  "Santa Clara",
  "Script",
  "Serifcap",
  "Shadow",
  "Shimrod",
  "Short",
  "Slant Relief",
  "Slant",
  "Slide",
  "Small Caps",
  "Small Isometric1",
  "Small Keyboard",
  "Small Poison",
  "Small Script",
  "Small Shadow",
  "Small Slant",
  "Small Tengwar",
  "Small",
  "Soft",
  "Speed",
  "Spliff",
  "Stacey",
  "Stampate",
  "Stampatello",
  "Standard",
  "Star Strips",
  "Star Wars",
  "Stellar",
  "Stforek",
  "Stick Letters",
  "Stop",
  "Straight",
  "Stronger Than All",
  "Sub-Zero",
  "Swamp Land",
  "Swan",
  "Sweet",
  "THIS",
  "Tanja",
  "Tengwar",
  "Term",
  "Test1",
  "The Edge",
  "Thick",
  "Thin",
  "Thorned",
  "Three Point",
  "Ticks Slant",
  "Ticks",
  "Tiles",
  "Tinker-Toy",
  "Tombstone",
  "Train",
  "Trek",
  "Tsalagi",
  "Tubular",
  "Twisted",
  "Two Point",
  "USA Flag",
  "Univers",
  "Varsity",
  "Wavy",
  "Weird",
  "Wet Letter",
  "Whimsy",
  "Wow",
  "alligator3",
  "amc3line",
  "amc3liv1",
  "amcaaa01",
  "amcneko",
  "amcrazo2",
  "amcrazor",
  "amcslash",
  "amcslder",
  "amcthin",
  "amctubes",
  "amcun1",
  "ascii12",
  "ascii9",
  "ascii_new_roman",
  "bigascii12",
  "bigascii9",
  "bigchief",
  "bigmono12",
  "bigmono9",
  "broadway_kb",
  "calgphy2",
  "circle",
  "cosmic",
  "dancingfont",
  "defleppard",
  "dietcola",
  "dosrebel",
  "dotmatrix",
  "doubleshorts",
  "drpepper",
  "eftichess",
  "eftifont",
  "eftipiti",
  "eftirobot",
  "eftitalic",
  "eftiwall",
  "eftiwater",
  "emboss",
  "emboss2",
  "fire_font-k",
  "fire_font-s",
  "flowerpower",
  "fourtops",
  "frango",
  "funface",
  "funfaces",
  "future",
  "halfiwi",
  "heart_left",
  "heart_right",
  "henry3d",
  "horizontalleft",
  "horizontalright",
  "hz",
  "ilhebrew",
  "jis0201",
  "koi8r",
  "kontoslant",
  "larry3d",
  "letter",
  "lildevil",
  "lineblocks",
  "maxiwi",
  "miniwi",
  "mono12",
  "mono9",
  "moscow",
  "ntgreek",
  "oldbanner",
  "pagga",
  "peaksslant",
  "rebel",
  "red_phoenix",
  "rev",
  "rowancap",
  "rusto",
  "rustofat",
  "s-relief",
  "santaclara",
  "sblood",
  "slscript",
  "smallcaps",
  "smascii12",
  "smascii9",
  "smblock",
  "smbraille",
  "smisome1",
  "smkeyboard",
  "smmono12",
  "smmono9",
  "smpoison",
  "smscript",
  "smshadow",
  "smslant",
  "smtengwar",
  "starstrips",
  "starwars",
  "swampland",
  "threepoint",
  "ticksslant",
  "twopoint",
  "upper",
  "usaflag",
  "ushebrew",
  "uskata",
  "utf8",
  "wetletter",
  "wideterm",
];

export default function Home() {
  const MENU_ID = "menu-id";
  const { show } = useContextMenu({ id: MENU_ID });
  const [asciiArt, setAsciiArt] = useState("");
  const [font, setFont] = useState("Big");
  const [text, setText] = useState("Test");

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
