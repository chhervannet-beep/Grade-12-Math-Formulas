/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import katex from "katex";

interface MathRendererProps {
  content: string;
}

// Render latex using KaTeX
function renderLaTeX(latex: string, displayMode: boolean = false): React.ReactNode {
  try {
    // Clean up any double backslashes that might have been escaped twice
    const cleanLatex = latex.replace(/\\\\/g, "\\");
    const html = katex.renderToString(cleanLatex, {
      throwOnError: false,
      displayMode,
      trust: true
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (err) {
    console.error("KaTeX error:", err);
    return <code className="font-mono bg-white/10 text-[#ff8c00] px-1.5 py-0.5 rounded text-xs">{latex}</code>;
  }
}

export default function MathRenderer({ content }: MathRendererProps) {
  // Simple custom parser to render math markdown beautifully
  const lines = content.split("\n");

  const renderedElements = lines.map((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      return <div key={index} className="h-2" />;
    }

    // Header 3 (e.g. ### Title)
    if (trimmedLine.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="font-sans font-bold text-white text-base mt-6 mb-3 border-l-4 border-[#ff4e00] pl-3 leading-snug"
        >
          {parseInline(trimmedLine.slice(4))}
        </h3>
      );
    }

    // Header 4 (e.g. #### Title)
    if (trimmedLine.startsWith("#### ")) {
      return (
        <h4
          key={index}
          className="font-sans font-semibold text-slate-200 text-xs mt-4 mb-2 flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00]"></span>
          {parseInline(trimmedLine.slice(5))}
        </h4>
      );
    }

    // Block formulas (e.g. $$formula$$)
    if (trimmedLine.startsWith("$$") && trimmedLine.endsWith("$$")) {
      const formula = trimmedLine.slice(2, -2);
      return (
        <div
          key={index}
          className="my-4 p-4 bg-black/40 border border-white/10 rounded-xl flex justify-center text-center overflow-x-auto scrollbar-thin shadow-inner"
        >
          <div className="text-white text-sm max-w-full overflow-x-auto scrollbar-thin">
            {renderLaTeX(formula, true)}
          </div>
        </div>
      );
    }

    // Bullet points (e.g. * item)
    if (trimmedLine.startsWith("* ") || trimmedLine.startsWith("- ")) {
      return (
        <ul key={index} className="list-disc pl-5 space-y-1 mb-2">
          <li className="text-[11px] font-sans text-slate-300 leading-relaxed">
            {parseInline(trimmedLine.slice(2))}
          </li>
        </ul>
      );
    }

    // Numbered lists (e.g. 1. item)
    const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const itemContent = numberedMatch[2];
      return (
        <div key={index} className="flex gap-2 text-[11px] font-sans text-slate-300 leading-relaxed mb-2">
          <span className="text-[#ff8c00] font-bold">{num}.</span>
          <div className="flex-1">{parseInline(itemContent)}</div>
        </div>
      );
    }

    // Normal paragraph
    return (
      <p key={index} className="text-[11px] font-sans text-slate-300 leading-relaxed mb-3">
        {parseInline(trimmedLine)}
      </p>
    );
  });

  return <div className="space-y-1">{renderedElements}</div>;
}

// Function to parse inline math $...$ and bold **...**
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];

  // Regex to find **bold**, $inline math$, and standard text
  const regex = /(\*\*.*?\*\*|\$.*?\$)/g;
  const matches = text.match(regex);

  if (!matches) {
    return [text];
  }

  let lastIndex = 0;
  text.replace(regex, (match, _, index) => {
    // Add text before the match
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }

    if (match.startsWith("**") && match.endsWith("**")) {
      parts.push(
        <strong key={index} className="font-bold text-white font-sans">
          {match.slice(2, -2)}
        </strong>
      );
    } else if (match.startsWith("$") && match.endsWith("$")) {
      parts.push(
        <span key={index} className="inline-block px-1 text-orange-400 font-medium">
          {renderLaTeX(match.slice(1, -1), false)}
        </span>
      );
    }

    lastIndex = index + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}
