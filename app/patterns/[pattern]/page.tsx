import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { pattern: string };
}): Promise<Metadata> {
  const patternId = params.pattern;
  const patternObj = patternsData.find(
    (p: Pattern) => p.name.toLowerCase().replace(/\s+/g, "-") === patternId
  );
  if (!patternObj) {
    return {
      title: "Pattern Not Found | JavaScript Design Patterns",
      description: "Pattern not found. Browse all JavaScript design patterns.",
    };
  }
  return {
    title: `${patternObj.name} | JavaScript Design Patterns`,
    description:
      patternObj.explanation ||
      `Learn about the ${patternObj.name} pattern in JavaScript.`,
  };
}
import PatternDetail from "../PatternDetail";
import { patternsData, Pattern } from "../patternsData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageProps } from "@/.next/types/app/page";

export default async function PatternPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const pattern = resolvedParams.pattern ?? "";
  const patternObj = patternsData.find(
    (p: Pattern) => p.name.toLowerCase().replace(/\s+/g, "-") === pattern
  );
  if (!patternObj) return notFound();
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
            href="/patterns"
            className="text-xl font-semibold mb-4 text-zinc-700 hover:underline focus:outline-none block w-full text-left"
            aria-label="Go to patterns list"
          >
            Patterns
          </Link>
          <nav>
            <ul className="space-y-2 text-zinc-600">
              {patternsData.map((p) => {
                const url =
                  "/patterns/" + p.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <li key={p.name}>
                    <Link
                      href={url}
                      className={
                        "w-full block text-left px-2 py-1 rounded hover:bg-zinc-200" +
                        (pattern === p.name.toLowerCase().replace(/\s+/g, "-")
                          ? " bg-zinc-300 font-bold"
                          : "")
                      }
                    >
                      {p.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        {/* Main Content Area */}
        <section className="flex-grow bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
          <PatternDetail pattern={patternObj} />
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

export const dynamicParams = true;
