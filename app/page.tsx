"use client";

export async function generateMetadata() {
  return {
    title: "JavaScript Design Patterns | Home",
    description:
      "A comprehensive interactive guide to JavaScript design patterns, including code examples and explanations for each pattern.",
  };
}
import { useState, useRef, useEffect } from "react";
// Chart.js is a client-side library, so we import dynamically
// Removed unused ChartType import
import ChartMod from "chart.js/auto"; // Import Chart.js auto module
function PatternsDonutChart({
  data,
}: {
  data: { [category: string]: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ChartMod || !canvasRef.current) return;
    // Chart.js ESM/CJS interop: use .default if present
    const ChartCtor = (ChartMod as { default?: unknown })?.default ?? ChartMod;
    const chart = new (ChartCtor as new (
      ctx: HTMLCanvasElement,
      config: unknown
    ) => unknown)(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: [
              "#fde68a", // Creational
              "#a5b4fc", // Structural
              "#fca5a5", // Behavioral
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: { color: "#52525b", font: { size: 14 } },
          },
        },
        cutout: "70%",
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    return () => (chart as { destroy: () => void }).destroy();
  }, [data]);
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <canvas ref={canvasRef} width={320} height={256} />
    </div>
  );
}
import PatternDetail from "./patterns/PatternDetail";
import Link from "next/link";
import { patternsData, Pattern } from "./patterns/patternsData";

export default function Home() {
  const [selected, setSelected] = useState<Pattern | null>(null);
  return (
    <div className="bg-stone-50 text-zinc-800 font-sans min-h-screen flex flex-col">
      <header className="bg-zinc-200 shadow-md py-4 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-zinc-700">
            JavaScript Design Patterns
          </h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 py-6 md:px-8 space-y-6 md:space-y-0 md:space-x-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-zinc-100 p-4 rounded-lg shadow-sm flex-shrink-0">
          <button
            className="text-xl font-semibold mb-4 text-zinc-700 hover:underline focus:outline-none"
            style={{ display: "block", width: "100%", textAlign: "left" }}
            onClick={() => setSelected(null)}
            aria-label="Go to homepage"
          >
            Patterns
          </button>
          <nav>
            <ul className="space-y-2 text-zinc-600">
              {patternsData.map((pattern) => {
                const url =
                  "/patterns/" +
                  pattern.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <li key={pattern.name}>
                    <Link
                      href={url}
                      className={
                        "w-full block text-left px-2 py-1 rounded hover:bg-zinc-200" +
                        (typeof window !== "undefined" &&
                        window.location.pathname === url
                          ? " bg-zinc-300 font-bold"
                          : "")
                      }
                    >
                      {pattern.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        {/* Main Content Area */}
        <section className="flex-grow bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
          {!selected ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-zinc-700 mb-4">
                  Welcome to the Interactive Design Patterns Guide
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  This single-page application is designed to help you easily
                  explore and understand common JavaScript design patterns. On
                  the left, you&apos;ll find a list of all patterns. Simply
                  click on a pattern name to load its detailed explanation and
                  code examples here.
                </p>
                <p className="text-zinc-600 leading-relaxed">
                  Each pattern comes with a brief explanation, a more
                  comprehensive code example, and a simplified version to
                  highlight the core concept. The goal is to provide a clear,
                  concise, and interactive resource for learning these
                  fundamental software design principles.
                </p>
              </div>
              {/* Chart and overview placeholder (to be implemented) */}
              <div className="mt-8 pt-8 border-t border-zinc-200">
                <h2 className="text-2xl font-bold text-zinc-700 mb-4">
                  Design Patterns Overview
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  This chart visually represents the distribution of the design
                  patterns across their main categories: Creational, Structural,
                  and Behavioral. It offers a quick way to understand the
                  proportion of patterns in each category.
                </p>
                <div className="chart-container">
                  {/* Chart.js donut chart */}
                  <PatternsDonutChart
                    data={patternsData.reduce((acc, p) => {
                      acc[p.category] = (acc[p.category] || 0) + 1;
                      return acc;
                    }, {} as { [category: string]: number })}
                  />
                </div>
              </div>
            </>
          ) : (
            <PatternDetail pattern={selected} />
          )}
        </section>
      </main>
      <footer className="bg-zinc-200 py-4 px-6 md:px-8 mt-6">
        <div className="max-w-7xl mx-auto text-center text-zinc-600 text-sm">
          &copy; 2025 JavaScript Design Patterns Guide. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
