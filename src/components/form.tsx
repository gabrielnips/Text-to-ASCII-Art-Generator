import React from "react";

export function Form({
  text,
  setText,
  font,
  setFont,
  fontOptions,
  asciiArt,
}: any) {
  return (
    <form
      className={`bg-stone-900 w-screen flex flex-col py-24 px-20 gap-3 rounded-lg
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
          {fontOptions.map((font: string, index: number) => (
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
  );
}
