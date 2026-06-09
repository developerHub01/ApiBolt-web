import { CSSProperties } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { LangType } from "@/types/code.types";
import { cn } from "@/lib/utils";

const getLang = (lang: LangType) => {
  switch (lang) {
    case "json":
      return json();
    case "ts":
    case "tsx":
    case "js":
    default:
      return javascript();
  }
};

interface Props {
  code: string;
  language: LangType;
  className?: string;
  transparentBg?: boolean;
  style?: CSSProperties;
}

const Code = ({
  code = "",
  language = "js",
  transparentBg = true,
  className,
  style = {},
}: Props) => {
  return (
    <CodeMirror
      className={cn(
        "rounded-lg text-base text-white font-mono custom-scrollbar overflow-hidden selection:text-white selection:bg-primary",
        {
          "[&>div]:bg-background!": !transparentBg,
          "[&>div]:bg-transparent!": transparentBg,
        },
        className,
      )}
      theme={githubDark}
      value={code}
      extensions={[getLang(language)]}
      editable={false}
      readOnly={true}
      indentWithTab={true}
      basicSetup={{
        lineNumbers: false,
        closeBrackets: false,
        foldGutter: false,
        highlightActiveLine: false,
      }}
      style={{
        ...style,
      }}
    />
  );
};

export default Code;
