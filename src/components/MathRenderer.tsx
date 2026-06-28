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
  const blocks: { type: string; lines: string[]; num?: string; itemContent?: string }[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("|")) {
      // It's a table! Group all consecutive lines starting with '|'
      const tableLines = [trimmedLine];
      i++;
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      blocks.push({ type: "table", lines: tableLines });
      continue;
    }

    if (trimmedLine === "") {
      blocks.push({ type: "empty", lines: [line] });
      i++;
      continue;
    }

    if (trimmedLine.startsWith("### ")) {
      blocks.push({ type: "header3", lines: [trimmedLine] });
      i++;
      continue;
    }

    if (trimmedLine.startsWith("#### ")) {
      blocks.push({ type: "header4", lines: [trimmedLine] });
      i++;
      continue;
    }

    if (trimmedLine.startsWith("$$") && trimmedLine.endsWith("$$")) {
      blocks.push({ type: "blockFormula", lines: [trimmedLine] });
      i++;
      continue;
    }

    if (trimmedLine.startsWith("* ") || trimmedLine.startsWith("- ")) {
      blocks.push({ type: "bullet", lines: [trimmedLine] });
      i++;
      continue;
    }

    const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      blocks.push({
        type: "numbered",
        lines: [trimmedLine],
        num: numberedMatch[1],
        itemContent: numberedMatch[2]
      });
      i++;
      continue;
    }

    // Default: normal paragraph
    blocks.push({ type: "paragraph", lines: [trimmedLine] });
    i++;
  }

  const renderedElements = blocks.map((block, index) => {
    if (block.type === "empty") {
      return <div key={index} className="h-2" />;
    }

    if (block.type === "header3") {
      return (
        <h3
          key={index}
          className="font-sans font-bold text-white text-base mt-6 mb-3 border-l-4 border-[#ff4e00] pl-3 leading-snug"
        >
          {parseInline(block.lines[0].slice(4))}
        </h3>
      );
    }

    if (block.type === "header4") {
      return (
        <h4
          key={index}
          className="font-sans font-semibold text-slate-200 text-xs mt-4 mb-2 flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00]"></span>
          {parseInline(block.lines[0].slice(5))}
        </h4>
      );
    }

    if (block.type === "blockFormula") {
      const formula = block.lines[0].slice(2, -2);
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

    if (block.type === "bullet") {
      return (
        <ul key={index} className="list-disc pl-5 space-y-1 mb-2">
          <li className="text-[11px] font-sans text-slate-300 leading-relaxed">
            {parseInline(block.lines[0].slice(2))}
          </li>
        </ul>
      );
    }

    if (block.type === "numbered") {
      return (
        <div key={index} className="flex gap-2 text-[11px] font-sans text-slate-300 leading-relaxed mb-2">
          <span className="text-[#ff8c00] font-bold">{block.num}.</span>
          <div className="flex-1">{parseInline(block.itemContent || "")}</div>
        </div>
      );
    }

    if (block.type === "table") {
      const tableRows = block.lines.map(line => {
        const rawCells = line.split("|").map(cell => cell.trim());
        if (rawCells[0] === "") rawCells.shift();
        if (rawCells[rawCells.length - 1] === "") rawCells.pop();
        return rawCells;
      });

      const separatorIndex = tableRows.findIndex(row =>
        row.every(cell => cell.match(/^:?-+:?$/))
      );

      let alignments: ("left" | "center" | "right")[] = [];
      if (separatorIndex !== -1) {
        const separatorRow = tableRows[separatorIndex];
        alignments = separatorRow.map(cell => {
          if (cell.startsWith(":") && cell.endsWith(":")) return "center";
          if (cell.endsWith(":")) return "right";
          return "left";
        });
        tableRows.splice(separatorIndex, 1);
      }

      return (
        <div key={index} className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-black/30 shadow-md">
          <table className="w-full border-collapse text-[11px] text-slate-300 font-sans">
            <tbody>
              {tableRows.map((row, rIdx) => {
                const isHeader = rIdx === 0;
                return (
                  <tr
                    key={rIdx}
                    className={`${
                      isHeader ? "bg-white/5 border-b border-white/10" : "hover:bg-white/5 border-b border-white/10 last:border-b-0"
                    }`}
                  >
                    {row.map((cell, cIdx) => {
                      const alignment = alignments[cIdx] || "center";
                      const CellTag = isHeader ? "th" : "td";
                      return (
                        <CellTag
                          key={cIdx}
                          className={`px-3 py-2 border-r border-white/10 last:border-r-0 ${
                            isHeader ? "font-bold text-orange-400 bg-white/5 text-center" : ""
                          }`}
                          style={{ textAlign: alignment }}
                        >
                          {parseInline(cell)}
                        </CellTag>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // Normal paragraph
    return (
      <p key={index} className="text-[11px] font-sans text-slate-300 leading-relaxed mb-3">
        {parseInline(block.lines[0])}
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
