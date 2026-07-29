"use client";

import { Highlight, themes, type Language } from "prism-react-renderer";

const supportedLanguages = new Set(["javascript", "typescript", "jsx", "tsx"]);

export default function CodeBlock({ code, language }: { code: string; language: string }) {
  const safeLanguage = supportedLanguages.has(language) ? language : "javascript";

  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={safeLanguage as Language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          dir="ltr"
          className={`${className} max-w-full overflow-x-auto rounded-2xl border border-white/10 p-5 text-left text-sm leading-7 shadow-inner sm:p-6`}
          style={{ ...style, background: "#07111f" }}
          tabIndex={0}
          aria-label={`کد ${language}`}
        >
          <code>
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })}>
                <span className="mr-5 inline-block w-6 select-none text-right text-slate-600">
                  {lineIndex + 1}
                </span>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
