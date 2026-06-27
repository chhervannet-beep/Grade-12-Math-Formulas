/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Plus, Minus, Hash, Info, Zap } from "lucide-react";

export default function ComplexExplorer() {
  const [real, setReal] = useState<number>(3);
  const [imag, setImag] = useState<number>(4);

  const modulus = Math.sqrt(real * real + imag * imag);
  const conjugate = `${real} ${imag >= 0 ? "-" : "+"} ${Math.abs(imag)}i`;

  // Calculate angle in radians
  const angleRad = Math.atan2(imag, real);
  let angleDeg = (angleRad * 180) / Math.PI;
  if (angleDeg < 0) angleDeg += 360;

  // Convert angle to nice common fractions of pi if close
  const getPiFraction = (rad: number) => {
    let positiveRad = rad;
    if (positiveRad < 0) positiveRad += 2 * Math.PI;
    const ratio = positiveRad / Math.PI;

    if (Math.abs(ratio - 0) < 0.05) return "0";
    if (Math.abs(ratio - 1/6) < 0.05) return "π/6";
    if (Math.abs(ratio - 1/4) < 0.05) return "π/4";
    if (Math.abs(ratio - 1/3) < 0.05) return "π/3";
    if (Math.abs(ratio - 1/2) < 0.05) return "π/2";
    if (Math.abs(ratio - 2/3) < 0.05) return "2π/3";
    if (Math.abs(ratio - 3/4) < 0.05) return "3π/4";
    if (Math.abs(ratio - 5/6) < 0.05) return "5π/6";
    if (Math.abs(ratio - 1) < 0.05) return "π";
    if (Math.abs(ratio - 7/6) < 0.05) return "7π/6";
    if (Math.abs(ratio - 5/4) < 0.05) return "5π/4";
    if (Math.abs(ratio - 4/3) < 0.05) return "4π/3";
    if (Math.abs(ratio - 3/2) < 0.05) return "3/2";
    if (Math.abs(ratio - 5/3) < 0.05) return "5π/3";
    if (Math.abs(ratio - 7/4) < 0.05) return "7π/4";
    if (Math.abs(ratio - 11/6) < 0.05) return "11π/6";
    if (Math.abs(ratio - 2) < 0.05) return "2π";

    return `${ratio.toFixed(2)}π`;
  };

  const piFraction = getPiFraction(angleRad);

  // SVG configurations for plotting
  const size = 260;
  const center = size / 2;
  const scale = 20; // 1 unit = 20px

  // Compute coordinate points
  const px = center + real * scale;
  const py = center - imag * scale; // Flip Y for screen coordinates

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl" id="complex-explorer">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Controls Section */}
        <div className="flex-1 space-y-5">
          <div>
            <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              កម្រិតអន្តរកម្ម (Interactive Mode)
            </span>
            <h4 className="font-sans font-bold text-white text-lg mt-2 mb-1">
              គណនាចំនួនកុំផ្លិចអន្តរកម្ម (Complex Numbers Analyzer)
            </h4>
            <p className="font-sans text-xs text-slate-400">
              បញ្ចូលផ្នែកពិត $a$ និងផ្នែកនិម្មិត $b$ ដើម្បីគណនាម៉ូឌុល អាគុយម៉ង់ និងទម្រង់ត្រីកោណមាត្រ៖
            </p>
          </div>

          {/* Form inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-slate-300 block">
                ផ្នែកពិត a (Real part)
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setReal((r) => Math.max(-6, r - 1))}
                  className="bg-white/10 hover:bg-white/15 text-slate-200 p-2 rounded-l-lg border border-white/10 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="-6"
                  max="6"
                  value={real}
                  onChange={(e) => setReal(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-1.5 bg-black/40 border-y border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#ff4e00]/50"
                />
                <button
                  type="button"
                  onClick={() => setReal((r) => Math.min(6, r + 1))}
                  className="bg-white/10 hover:bg-white/15 text-slate-200 p-2 rounded-r-lg border border-white/10 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-slate-300 block">
                ផ្នែកនិម្មិត b (Imaginary part)
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setImag((i) => Math.max(-6, i - 1))}
                  className="bg-white/10 hover:bg-white/15 text-slate-200 p-2 rounded-l-lg border border-white/10 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min="-6"
                  max="6"
                  value={imag}
                  onChange={(e) => setImag(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-1.5 bg-black/40 border-y border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#ff4e00]/50"
                />
                <button
                  type="button"
                  onClick={() => setImag((i) => Math.min(6, i + 1))}
                  className="bg-white/10 hover:bg-white/15 text-slate-200 p-2 rounded-r-lg border border-white/10 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results readout */}
          <div className="bg-black/40 rounded-xl p-4 border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-sans font-medium text-slate-400">ចំនួនកុំផ្លិច z៖</span>
              <span className="font-mono text-sm font-bold text-white">
                z = {real} {imag >= 0 ? "+" : "-"} {Math.abs(imag)}i
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-sans font-medium text-slate-400">កុំផ្លិចឆ្លាស់ (Conjugate) z̅៖</span>
              <span className="font-mono text-sm font-bold text-[#00f0ff]">{conjugate}</span>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-sans font-medium text-slate-400">ម៉ូឌុល (Modulus) |z| = r៖</span>
              <div className="flex flex-col items-end">
                <span className="font-mono text-sm font-bold text-[#39ff14]">r = {modulus.toFixed(3)}</span>
                <span className="text-[9px] font-mono text-slate-500">
                  r = √({real}² + ({imag}²) = √{real*real + imag*imag}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-sans font-medium text-slate-400">អាគុយម៉ង់ (Argument) θ៖</span>
              <span className="font-mono text-sm font-bold text-[#ff8c00]">
                {angleDeg.toFixed(1)}° ({piFraction})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-medium text-slate-400">ទម្រង់ត្រីកោណមាត្រ៖</span>
              <span className="font-mono text-[11px] font-bold text-pink-400 text-right">
                {modulus.toFixed(2)}(cos {piFraction} + i sin {piFraction})
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Plot visualizer (Complex Plane) */}
        <div className="flex flex-col items-center justify-center bg-black/30 rounded-xl p-4 border border-white/10">
          <span className="text-[10px] font-sans text-slate-400 font-semibold mb-2">ប្លង់កុំផ្លិច (Complex Plane / Argand Diagram)</span>
          <div className="relative bg-black/40 rounded-lg border border-white/10 shadow-inner">
            <svg width={size} height={size} className="overflow-visible">
              {/* Grid background lines */}
              {Array.from({ length: 13 }).map((_, i) => {
                const gridVal = i - 6;
                const offset = center + gridVal * scale;
                return (
                  <g key={i}>
                    {/* Vertical grid */}
                    <line
                      x1={offset}
                      y1={0}
                      x2={offset}
                      y2={size}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth={gridVal === 0 ? "1.5" : "0.5"}
                    />
                    {/* Horizontal grid */}
                    <line
                      x1={0}
                      y1={offset}
                      x2={size}
                      y2={offset}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth={gridVal === 0 ? "1.5" : "0.5"}
                    />
                  </g>
                );
              })}

              {/* Major Axes */}
              <line x1={0} y1={center} x2={size} y2={center} stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
              <line x1={center} y1={0} x2={center} y2={size} stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />

              {/* Axis labels */}
              <text x={size - 14} y={center - 4} className="fill-slate-400 font-mono text-[8px] font-bold">Re</text>
              <text x={center + 4} y={10} className="fill-slate-400 font-mono text-[8px] font-bold">Im</text>

              {/* Ticks & Values */}
              {[-5, -3, 3, 5].map((val) => (
                <g key={val}>
                  <line x1={center + val * scale} y1={center - 3} x2={center + val * scale} y2={center + 3} stroke="rgba(255, 255, 255, 0.25)" />
                  <text x={center + val * scale - 4} y={center + 12} className="fill-slate-500 font-mono text-[8px]">{val}</text>
                  <line x1={center - 3} y1={center - val * scale} x2={center + 3} y2={center - val * scale} stroke="rgba(255, 255, 255, 0.25)" />
                  <text x={center - 14} y={center - val * scale + 3} className="fill-slate-500 font-mono text-[8px]">{val}i</text>
                </g>
              ))}

              {/* Origin Circle */}
              <circle cx={center} cy={center} r={2} fill="#64748b" />

              {/* Angle Arc */}
              {real !== 0 || imag !== 0 ? (
                <path
                  d={`M ${center + 20} ${center} A 20 20 0 ${angleRad < 0 ? 0 : 0} 0 ${
                    center + 20 * Math.cos(-angleRad)
                  } ${center + 20 * Math.sin(-angleRad)}`}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                />
              ) : null}

              {/* vector from origin to point */}
              <line
                x1={center}
                y1={center}
                x2={px}
                y2={py}
                stroke="#00f0ff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Highlight components projected on X (Real) and Y (Imag) */}
              <line x1={px} y1={py} x2={px} y2={center} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
              <line x1={px} y1={py} x2={center} y2={py} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />

              {/* Point z dot */}
              <circle cx={px} cy={py} r={6} fill="#ff4e00" stroke="#ffffff" strokeWidth="2" />

              {/* Dot Label */}
              <text x={px + 8} y={py - 4} className="fill-white font-mono text-[10px] font-bold">
                z({real},{imag})
              </text>
            </svg>
          </div>
          <div className="flex gap-4 text-[10px] font-mono mt-3 text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span> វ៉ិចទ័រ z
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ff4e00]"></span> រូបភាព M(a, b)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 inline-block border-t border-r border-amber-500"></span> មុំ θ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
