"use client";

import React, { useEffect, useRef } from "react";
let Prism: any = undefined;
if (typeof window !== "undefined") {
  // @ts-ignore
  Prism = require("prismjs");
  require("prismjs/components/prism-javascript");
}

type Pattern = {
  name: string;
  category: string;
  explanation: string;
  briefCode: string;
  simplestCode: string;
};

export default function PatternDetail({ pattern }: { pattern: Pattern }) {
  const briefRef = useRef<HTMLPreElement>(null);
  const simpleRef = useRef<HTMLPreElement>(null);
  useEffect(() => {
    if (Prism && briefRef.current) {
      Prism.highlightElement(briefRef.current.querySelector("code"));
    }
    if (Prism && simpleRef.current) {
      Prism.highlightElement(simpleRef.current.querySelector("code"));
    }
  }, [pattern]);
  if (!pattern) return null;
  return (
    <div>
      <h2 className="text-2xl font-bold text-zinc-700 mb-4">{pattern.name}</h2>
      <p className="text-zinc-600 leading-relaxed mb-6">
        {pattern.explanation}
      </p>
      <div className="mb-6">
        <details open>
          <summary className="text-lg font-semibold text-zinc-700 py-2">
            Brief Code Example
          </summary>
          <pre
            ref={briefRef}
            className="bg-zinc-900 text-yellow-100 rounded p-4 overflow-x-auto text-sm mb-2"
          >
            <code className="language-js">{pattern.briefCode}</code>
          </pre>
        </details>
      </div>
      <div>
        <details>
          <summary className="text-lg font-semibold text-zinc-700 py-2">
            Simplest Code
          </summary>
          <pre
            ref={simpleRef}
            className="bg-zinc-900 text-yellow-100 rounded p-4 overflow-x-auto text-sm"
          >
            <code className="language-js">{pattern.simplestCode}</code>
          </pre>
        </details>
      </div>
    </div>
  );
}
