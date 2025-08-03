import Link from "next/link";
import { patternsData } from "./patternsData";

export default function PatternsList() {
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
          <Link
            href="/"
            className="text-xl font-semibold mb-4 text-zinc-700 hover:underline focus:outline-none block w-full text-left"
            aria-label="Go to homepage"
          >
            Patterns
          </Link>
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
                      className="w-full block text-left px-2 py-1 rounded hover:bg-zinc-200"
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
          <h1 className="text-3xl font-bold mb-6">All Design Patterns</h1>
          <ul className="space-y-2">
            {patternsData.map((pattern) => (
              <li key={pattern.name}>
                <Link
                  href={`/patterns/${pattern.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {pattern.name}
                </Link>
              </li>
            ))}
          </ul>
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
