"use client";

import React, { useEffect, useRef } from "react";
import { highlight } from "sugar-high";

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
            className="bg-gray-800 rounded p-4 overflow-x-auto text-sm mb-2"
          >
            <code
              className="language-js"
              dangerouslySetInnerHTML={{ __html: highlight(pattern.briefCode) }}
            />
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
            className="bg-gray-900 rounded p-4 overflow-x-auto text-sm"
          >
            <code
              className="language-js"
              dangerouslySetInnerHTML={{
                __html: highlight(pattern.simplestCode),
              }}
            />
          </pre>
        </details>
      </div>
    </div>
  );
}
