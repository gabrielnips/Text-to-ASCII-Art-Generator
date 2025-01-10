import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import figlet from "figlet";
import { fontOptions } from "../config/fontOptions";

// Define o tipo das propriedades do provider
interface AsciiProviderProps {
  children: ReactNode;
}

// Define o contexto
const AsciiContext = createContext<any>(null);

// Provider para encapsular o estado e funções globais
export const AsciiProvider: React.FC<AsciiProviderProps> = ({ children }) => {
  const [font, setFont] = useState("Big");
  const [text, setText] = useState("Test");
  const [asciiArt, setAsciiArt] = useState("");

  // Atualiza o ASCII Art quando o texto ou fonte muda
  useEffect(() => {
    figlet.text(text, { font: font as figlet.Fonts }, (err, data) => {
      if (!err) setAsciiArt(data || "");
    });
  }, [text, font]);

  // Lê parâmetros da URL e atualiza o estado
  useEffect(() => {
    const parseHashParams = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const paramFont = params.get("f");
      const paramText = params.get("t");

      if (paramFont && fontOptions.includes(paramFont)) setFont(paramFont);
      if (paramText) setText(paramText);
    };

    parseHashParams(); // Atualiza na inicialização
    window.addEventListener("hashchange", parseHashParams);

    return () => window.removeEventListener("hashchange", parseHashParams);
  }, []);

  // Função para compartilhar o estado atual via URL
  const shareCurrentState = () => {
    const currentUrl = window.location.origin + window.location.pathname;
    const hashParams = `#f=${encodeURIComponent(font)}&t=${encodeURIComponent(
      text
    )}`;
    const shareableUrl = currentUrl + hashParams;

    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => alert("URL copiada para a área de transferência!"))
      .catch((err) => console.error("Erro ao copiar URL:", err));
  };

  // Exporta o estado e funções do contexto
  return (
    <AsciiContext.Provider
      value={{
        font,
        setFont,
        text,
        setText,
        asciiArt,
        shareCurrentState,
      }}
    >
      {children}
    </AsciiContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAsciiContext = () => useContext(AsciiContext);
