"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { json } from "@codemirror/lang-json";

interface Props {
  example: string;
}

const ExampleToggle = ({ example }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
      >
        <span>{isOpen ? "Hide" : "Show"} Response</span>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="mt-3 overflow-hidden rounded-md"
          >
            <CodeMirror
              className="bg-black/40 rounded-lg text-base text-white font-mono custom-scrollbar overflow-hidden selection:text-white selection:bg-primary"
              theme={githubDark}
              value={example}
              extensions={[json()]}
              editable={false}
              readOnly={true}
              indentWithTab={true}
              basicSetup={{
                lineNumbers: false,
                closeBrackets: false,
                foldGutter: false,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExampleToggle;
