import { useState, useEffect } from "react";
import figlet from "figlet";

type UseAsciiArtOptions = {
  text: string;
  font?: figlet.Fonts;
};

export const useAsciiArt = ({
  text,
  font = "Standard",
}: UseAsciiArtOptions) => {
  const [asciiArt, setAsciiArt] = useState<string>("");

  useEffect(() => {
    // Gera o ASCII Art
    figlet.text(text, { font }, (err, data) => {
      if (err) {
        console.error("Erro ao gerar ASCII art:", err);
        setAsciiArt("Erro ao gerar ASCII art");
      } else {
        setAsciiArt(data || "");
      }
    });
  }, [text, font]);

  return asciiArt;
};
