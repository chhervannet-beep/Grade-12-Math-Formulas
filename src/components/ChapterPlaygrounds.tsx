/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Calculator, 
  Layers, 
  GitCommit, 
  Maximize2, 
  HelpCircle, 
  Compass, 
  Activity, 
  Sliders, 
  TrendingUp, 
  Grid,
  Percent,
  RefreshCw,
  Eye,
  Trophy,
  Play,
  RotateCcw,
  Shuffle,
  Sparkles
} from "lucide-react";
import katex from "katex";

// Helper to render inline latex cleanly
function renderMath(latex: string): string {
  try {
    return katex.renderToString(latex, { throwOnError: false, displayMode: false });
  } catch {
    return latex;
  }
}

function renderMathBlock(latex: string): string {
  try {
    return katex.renderToString(latex, { throwOnError: false, displayMode: true });
  } catch {
    return latex;
  }
}

// ==========================================
// 1. CONTINUITY EXPLORER (Chapter 3)
// ==========================================
export function ContinuityExplorer() {
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(3);
  const [d, setD] = useState<number>(5);
  const [c, setC] = useState<number>(2); // point of continuity

  // f(x) = ax + b for x <= c
  // f(x) = x^2 + d for x > c
  const leftLimit = a * c + b;
  const rightLimit = c * c + d;
  const f_c = a * c + b; // defined on the left interval
  const isContinuous = Math.abs(leftLimit - rightLimit) < 0.0001;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="continuity-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ៣៖ ភាពជាប់នៃអនុគមន៍
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ពិសោធន៍ភាពជាប់នៃអនុគមន៍ត្រង់ចំណុច (Function Continuity Tester)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          កែសម្រួលតម្លៃមេគុណនៃអនុគមន៍ជាប់ដោយដុំ <span className="text-orange-400 font-bold">$f(x)$</span> ដើម្បីពិនិត្យលក្ខខណ្ឌភាពជាប់ត្រង់ <span className="font-mono text-orange-400">x = c</span>៖
        </p>
      </div>

      <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-5">
        <div className="text-center font-mono text-white text-xs mb-3 font-semibold">
          <div dangerouslySetInnerHTML={{ __html: renderMathBlock("f(x) = \\begin{cases} " + a + "x + " + b + " & \\text{បើ } x \\le " + c + " \\\\ x^2 + " + d + " & \\text{បើ } x > " + c + " \\end{cases}") }} />
        </div>
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="continuity-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>ក្រាហ្វិកភាពជាប់នៃអនុគមន៍ (Continuity Graph Model)</span>
        </span>
        <svg viewBox="0 0 400 200" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Coordinate grid lines */}
          <line x1="20" y1="120" x2="380" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
          <line x1="200" y1="10" x2="200" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
          
          {/* Dashed vertical indicator at x = c */}
          <line 
            x1={200 + c * 25} 
            y1="15" 
            x2={200 + c * 25} 
            y2="185" 
            stroke="#ff8c00" 
            strokeWidth="1.25" 
            strokeDasharray="4 4" 
            opacity="0.8" 
          />
          <text x={200 + c * 25 + 5} y="30" fill="#ff8c00" className="text-[9px] font-mono font-bold">x = c ({c})</text>
          
          {/* Labels for axes */}
          <text x="375" y="135" fill="#64748b" className="text-[10px] font-mono">x</text>
          <text x="210" y="20" fill="#64748b" className="text-[10px] font-mono font-bold">f(x)</text>

          {/* Piece 1: f(x) = ax + b for x <= c */}
          <path
            d={(() => {
              const mapX = (xVal: number) => 200 + xVal * 25;
              const mapY = (yVal: number) => 120 - yVal * 4.5;
              
              const xStart = -6;
              const xEnd = c;
              
              const yStart = a * xStart + b;
              const yEnd = a * xEnd + b;
              
              return `M ${mapX(xStart)} ${mapY(yStart)} L ${mapX(xEnd)} ${mapY(yEnd)}`;
            })()}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Piece 2: f(x) = x^2 + d for x > c */}
          <path
            d={(() => {
              const mapX = (xVal: number) => 200 + xVal * 25;
              const mapY = (yVal: number) => 120 - yVal * 4.5;
              
              const points: string[] = [];
              for (let sx = c + 0.01; sx <= 6; sx += 0.2) {
                const sy = sx * sx + d;
                const px = mapX(sx);
                const py = mapY(sy);
                if (py < 10 || py > 190) continue;
                
                if (points.length === 0) {
                  points.push(`M ${px} ${py}`);
                } else {
                  points.push(`L ${px} ${py}`);
                }
              }
              return points.join(" ");
            })()}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
          />

          {/* Endpoint nodes at x = c */}
          {(() => {
            const mapX = (xVal: number) => 200 + xVal * 25;
            const mapY = (yVal: number) => 120 - yVal * 4.5;
            const cx = mapX(c);
            const cyLeft = mapY(leftLimit);
            const cyRight = mapY(rightLimit);
            
            return isContinuous ? (
              <>
                <circle cx={cx} cy={cyLeft} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                <text x={cx + 8} y={cyLeft - 8} fill="#10b981" className="text-[10px] font-sans font-bold">ជាប់ត្រង់ c</text>
              </>
            ) : (
              <>
                {/* Closed dot on the left interval */}
                <circle cx={cx} cy={cyLeft} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                {/* Open circle on the right interval */}
                <circle cx={cx} cy={cyRight} r="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="2.5" />
                <text x={cx + 8} y={Math.min(cyLeft, cyRight) - 8} fill="#ef4444" className="text-[10px] font-sans font-bold">ដាច់ត្រង់ c (Jump)</text>
              </>
            );
          })()}
        </svg>
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#10b981] rounded-full inline-block" /> ផ្នែកឆ្វេង y = {a}x + {b}</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#3b82f6] rounded-full inline-block" /> ផ្នែកស្តាំ y = x² + {d}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Controls */}
        <div className="space-y-4 bg-white/5 p-4 border border-white/10 rounded-xl">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-3">
            <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
            <span>កែសម្រួលប៉ារ៉ាម៉ែត្រ (Parameters)</span>
          </h5>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>មេគុណ a (Coefficient a)</span>
                <span className="font-mono text-orange-400">{a}</span>
              </div>
              <input type="range" min="-5" max="5" step="1" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>មេគុណ b (Constant b)</span>
                <span className="font-mono text-orange-400">{b}</span>
              </div>
              <input type="range" min="-5" max="10" step="1" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>មេគុណ d (Constant d)</span>
                <span className="font-mono text-orange-400">{d}</span>
              </div>
              <input type="range" min="-5" max="10" step="1" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>ចំណុចសិក្សា c (Point c)</span>
                <span className="font-mono text-[#ff8c00] font-bold">x = {c}</span>
              </div>
              <input type="range" min="-3" max="4" step="1" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff8c00] cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Math Check and Visualization */}
        <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex flex-col justify-between">
          <div>
            <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-3">
              <Activity className="w-3.5 h-3.5 text-[#ff8c00]" />
              <span>លទ្ធផលនៃការពិនិត្យលក្ខខណ្ឌទាំង ៣ (IVT / Continuity Conditions)</span>
            </h5>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">១. រកតម្លៃកំណត់ $f({c})$：</span>
                <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                  {f_c}
                </span>
              </div>

              {/* Step 2 */}
              <div className="space-y-1 bg-black/20 p-2 rounded border border-white/5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">លីមីតខាងឆ្វេង $\lim_{"{x \\to " + c + "^-}"} f(x) = a({c}) + b$：</span>
                  <span className="font-mono text-red-400">{leftLimit}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">លីមីតខាងស្តាំ $\lim_{"{x \\to " + c + "^+}"} f(x) = ({c})^2 + d$：</span>
                  <span className="font-mono text-blue-400">{rightLimit}</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`p-3 rounded-lg flex items-center gap-3 border ${
                isContinuous 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" 
                  : "bg-red-500/10 border-red-500/20 text-red-300"
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                  isContinuous ? "bg-emerald-500 text-black" : "bg-red-500 text-white"
                }`}>
                  {isContinuous ? "✓" : "✗"}
                </div>
                <div className="text-[11px] font-sans">
                  <strong>សន្និដ្ឋាន៖</strong> {isContinuous 
                    ? `អនុគមន៍ f(x) ជាប់ត្រង់ x = ${c} ព្រោះលីមីតឆ្វេងស្មើ លីមីតស្តាំ (${leftLimit} = ${rightLimit})` 
                    : `អនុគមន៍ f(x) ដាច់ត្រង់ x = ${c} ព្រោះលីមីតឆ្វេងស្មើ ${leftLimit} ខុសពីលីមីតស្តាំស្មើ ${rightLimit}`}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 italic mt-3 pt-2 border-t border-white/5 font-sans">
            *រូបមន្ត៖ អនុគមន៍ f ជាប់ត្រង់ x = c លុះត្រាតែ $\lim_{"{x \\to c^-}"} f(x) = \lim_{"{x \\to c^+}"} f(x) = f(c)$
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. DERIVATIVE EXPLORER (Chapter 4)
// ==========================================
export function DerivativeExplorer() {
  const [funcId, setFuncId] = useState<string>("x2");
  const [x0, setX0] = useState<number>(2);

  // Define functions and their analytic derivatives
  const functions = [
    { id: "x2", name: "f(x) = x²", latex: "f(x) = x^2", f: (x: number) => x * x, df: (x: number) => 2 * x, derivLatex: "f'(x) = 2x" },
    { id: "x3", name: "f(x) = x³", latex: "f(x) = x^3", f: (x: number) => x * x * x, df: (x: number) => 3 * x * x, derivLatex: "f'(x) = 3x^2" },
    { id: "sin", name: "f(x) = sin(x)", latex: "f(x) = \\sin(x)", f: (x: number) => Math.sin(x), df: (x: number) => Math.cos(x), derivLatex: "f'(x) = \\cos(x)" },
    { id: "exp", name: "f(x) = e^x", latex: "f(x) = e^x", f: (x: number) => Math.exp(x), df: (x: number) => Math.exp(x), derivLatex: "f'(x) = e^x" }
  ];

  const activeFunc = functions.find(f => f.id === funcId) || functions[0];
  
  const y0 = activeFunc.f(x0);
  const slope = activeFunc.df(x0);

  // Tangent line equation: y = m*(x - x0) + y0
  // Approximation sequence (Secant slope)
  const hSteps = [0.1, 0.01, 0.001, 0.0001];
  const secants = hSteps.map(h => {
    const yh = activeFunc.f(x0 + h);
    const secSlope = (yh - y0) / h;
    return { h, secSlope };
  });

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="derivative-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ៤៖ ដេរីវេនៃអនុគមន៍
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ពិសោធន៍ដេរីវេ និងបន្ទាត់ប៉ះ (Tangent & Derivative Visualizer)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          ជ្រើសរើសអនុគមន៍ $f(x)$ និងចំណុចប៉ះ $x_0$ ដើម្បីសង្កេតមេគុណប្រាប់ទិសនៃបន្ទាត់ប៉ះ $f'(x_0)$៖
        </p>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
        {functions.map(f => (
          <button
            key={f.id}
            onClick={() => setFuncId(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition flex-shrink-0 ${
              funcId === f.id
                ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold"
                : "bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="derivative-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>ក្រាហ្វិកបន្ទាត់ប៉ះ (Tangent Curve Visualizer)</span>
        </span>
        <svg viewBox="0 0 400 200" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Coordinate grid lines */}
          <line x1="20" y1="100" x2="380" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
          <line x1="200" y1="10" x2="200" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
          
          {/* Labels for axes */}
          <text x="375" y="115" fill="#64748b" className="text-[10px] font-mono">x</text>
          <text x="210" y="20" fill="#64748b" className="text-[10px] font-mono font-bold">y</text>

          {/* Coordinate Mapping Helpers */}
          {(() => {
            const mapX = (xVal: number) => 200 + xVal * 45;
            const mapY = (yVal: number) => {
              const scaleY = funcId === "exp" ? 12 : funcId === "x3" ? 6 : 25;
              const offset = funcId === "exp" ? 160 : 100;
              return offset - yVal * scaleY;
            };

            // Draw Curve
            const points: string[] = [];
            const xRange = funcId === "sin" ? 4 : 3;
            for (let sx = -xRange; sx <= xRange; sx += 0.1) {
              const sy = activeFunc.f(sx);
              const px = mapX(sx);
              const py = mapY(sy);
              if (py < 10 || py > 190) continue;
              if (points.length === 0) {
                points.push(`M ${px} ${py}`);
              } else {
                points.push(`L ${px} ${py}`);
              }
            }
            const curvePath = points.join(" ");

            // Draw Tangent line
            const tangentPoints: string[] = [];
            for (let sx = -3.5; sx <= 3.5; sx += 0.5) {
              const sy = slope * (sx - x0) + y0;
              const px = mapX(sx);
              const py = mapY(sy);
              if (py < 10 || py > 190) continue;
              if (tangentPoints.length === 0) {
                tangentPoints.push(`M ${px} ${py}`);
              } else {
                tangentPoints.push(`L ${px} ${py}`);
              }
            }
            const tangentPath = tangentPoints.join(" ");

            return (
              <>
                {/* Curve */}
                <path d={curvePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                
                {/* Tangent line */}
                <path d={tangentPath} fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="2" />

                {/* Point of Tangency P(x0, y0) */}
                <circle cx={mapX(x0)} cy={mapY(y0)} r="6" fill="#ff4e00" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                <text x={mapX(x0) + 8} y={mapY(y0) - 8} fill="#ff4e00" className="text-[10px] font-sans font-bold">P({x0.toFixed(1)}, {y0.toFixed(1)})</text>
              </>
            );
          })()}
        </svg>
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#3b82f6] inline-block" /> ខ្សែកោង y = f(x)</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 border-t border-dashed border-[#10b981] inline-block" /> បន្ទាត់ប៉ះ y = f'(x₀)(x-x₀) + f(x₀)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4 bg-white/5 p-4 border border-[#ff4e00]/10 rounded-xl">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-slate-300 font-bold">កែសម្រួលចំណុចប៉ះ (Point x₀)</span>
            <span className="font-mono text-[#ff4e00] font-bold">x₀ = {x0.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={funcId === "sin" ? "-3.14" : "-2"}
            max={funcId === "sin" ? "3.14" : "3"}
            step="0.1"
            value={x0}
            onChange={(e) => setX0(Number(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff4e00]"
          />

          <div className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">អនុគមន៍សិក្សា：</span>
              <span className="text-white font-mono" dangerouslySetInnerHTML={{ __html: renderMath(activeFunc.latex) }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">រូបមន្តដេរីវេទូទៅ：</span>
              <span className="text-[#ff8c00] font-mono" dangerouslySetInnerHTML={{ __html: renderMath(activeFunc.derivLatex) }} />
            </div>
            <div className="flex justify-between text-xs border-t border-white/5 pt-2 mt-2">
              <span className="text-slate-400">តម្លៃដេរីវេត្រង់ $x_0$ (មេគុណប្រាប់ទិស)：</span>
              <span className="text-emerald-400 font-mono font-bold">f'({x0.toFixed(2)}) = {slope.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">កូអរដោនេចំណុចប៉ះ：</span>
              <span className="text-white font-mono">P({x0.toFixed(2)}, {y0.toFixed(4)})</span>
            </div>
          </div>

          <div className="text-[11px] text-[#ff8c00] bg-[#ff4e00]/5 p-2.5 rounded-lg border border-[#ff4e00]/10 leading-relaxed font-sans">
            <strong>សមីការបន្ទាត់ប៉ះត្រង់ x₀៖</strong><br />
            <span className="font-mono text-white text-xs">
              y = f'(x₀)(x - x₀) + f(x₀) <br />
              {"=> y = "}{slope.toFixed(2)}(x - {x0.toFixed(2)}) + {y0.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Secant Slope Approximating Derivative */}
        <div className="bg-white/5 p-4 border border-white/10 rounded-xl">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>គណនាដេរីវេតាមនិយមន័យ (Secant → Tangent)</span>
          </h5>

          <p className="text-[10px] text-slate-400 font-sans mb-3 leading-relaxed">
            តាមនិយមន័យ ដេរីវេគឺជាលីមីតនៃផលធៀបឃ្លាតគ្នា $\lim_{"{h \\to 0}"} \frac{"{f(x_0+h)-f(x_0)}"}{"h"}$៖
          </p>

          <div className="space-y-1.5 font-mono">
            <div className="grid grid-cols-3 text-[10px] text-slate-500 font-bold uppercase pb-1 border-b border-white/5">
              <span>គម្លាត h</span>
              <span className="text-right">តម្លៃ x₀ + h</span>
              <span className="text-right text-emerald-400">ផលធៀបមេគុណ</span>
            </div>
            {secants.map((s, idx) => (
              <div key={idx} className="grid grid-cols-3 text-[11px] py-1 border-b border-white/5 items-center">
                <span className="text-slate-400">{s.h}</span>
                <span className="text-right text-slate-300">{(x0 + s.h).toFixed(4)}</span>
                <span className="text-right font-bold text-emerald-400">{s.secSlope.toFixed(6)}</span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-400 mt-4 leading-relaxed font-sans italic bg-black/20 p-2.5 rounded border border-white/5">
            *នៅពេល h កាន់តែតូចខិតជិត 0 នោះតម្លៃផលធៀបស្មើរនឹងមេគុណប្រាប់ទិសពិត ({slope.toFixed(4)}) នៃបន្ទាត់ប៉ះក្រាហ្វ។
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. INDEFINITE INTEGRAL EXPLORER (Chapter 5)
// ==========================================
export function IndefiniteIntegralExplorer() {
  const [activeFuncId, setActiveFuncId] = useState<string>("poly");
  const [coef, setCoef] = useState<number>(3);

  const integrals = [
    {
      id: "poly",
      name: "ពហុធា (Polynomial)",
      f: `f(x) = ${coef}x^2`,
      integral: `\\int ${coef}x^2 dx = \\frac{${coef}}{3} x^3 + c`,
      derivCheck: `\\frac{d}{dx} \\left( \\frac{${coef}}{3} x^3 + c \\right) = ${coef}x^2`,
      explanation: `អនុវត្តរូបមន្តគ្រឹះ \\int x^n dx = \\frac{x^{n+1}}{n+1} + c (ចំពោះ n \\ne -1)។`
    },
    {
      id: "exp",
      name: "អិចស្ប៉ូណង់ស្យែល (Exponential)",
      f: `f(x) = e^{${coef}x}`,
      integral: `\\int e^{${coef}x} dx = \\frac{1}{${coef}} e^{${coef}x} + c`,
      derivCheck: `\\frac{d}{dx} \\left( \\frac{1}{${coef}} e^{${coef}x} + c \\right) = e^{${coef}x}`,
      explanation: `អនុវត្តរូបមន្តគ្រឹះ \\int e^{ax} dx = \\frac{1}{a} e^{ax} + c។`
    },
    {
      id: "trig",
      name: "ត្រីកោណមាត្រ (Trigonometric)",
      f: `f(x) = \\cos(${coef}x)`,
      integral: `\\int \\cos(${coef}x) dx = \\frac{1}{${coef}} \\sin(${coef}x) + c`,
      derivCheck: `\\frac{d}{dx} \\left( \\frac{1}{${coef}} \\sin(${coef}x) + c \\right) = \\cos(${coef}x)`,
      explanation: `អនុវត្តរូបមន្តគ្រឹះ \\int \\cos(ax) dx = \\frac{1}{a} \\sin(ax) + c។`
    }
  ];

  const activeInt = integrals.find(i => i.id === activeFuncId) || integrals[0];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="indefinite-integral-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ៥៖ អាំងតេក្រាលមិនកំណត់
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ពិសោធន៍ស្វែងរកព្រីមីទីវ (Indefinite Integral & Derivative Checker)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          រៀនគណនាព្រីមីទីវ និងផ្ទៀងផ្ទាត់ដោយប្រើប្រាស់ផលធៀបបញ្ច្រាសនៃការធ្វើដេរីវេ៖
        </p>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
        {integrals.map(i => (
          <button
            key={i.id}
            onClick={() => setActiveFuncId(i.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition flex-shrink-0 ${
              activeFuncId === i.id
                ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold"
                : "bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10"
            }`}
          >
            {i.name}
          </button>
        ))}
      </div>

      <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-5 space-y-4">
        <div className="flex justify-between text-xs font-sans">
          <span className="text-slate-300 font-semibold">កែសម្រួលមេគុណ / ថេរ (Constant Value)</span>
          <span className="font-mono text-[#ff4e00] font-bold">k = {coef}</span>
        </div>
        <input
          type="range"
          min="1"
          max="6"
          value={coef}
          onChange={(e) => setCoef(Number(e.target.value))}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff4e00]"
        />
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="indefinite-integral-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>គ្រួសារខ្សែគោលព្រីមីទីវ (Antiderivative Family of Curves, F(x) + C)</span>
        </span>
        <svg viewBox="0 0 400 200" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Coordinate grid lines */}
          <line x1="20" y1="100" x2="380" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
          <line x1="200" y1="10" x2="200" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
          
          {/* Labels for axes */}
          <text x="375" y="115" fill="#64748b" className="text-[10px] font-mono">x</text>
          <text x="210" y="20" fill="#64748b" className="text-[10px] font-mono font-bold">y</text>

          {/* Families of Curves */}
          {(() => {
            const mapX = (xVal: number) => 200 + xVal * 45;
            const mapY = (yVal: number) => {
              const scaleY = activeFuncId === "exp" ? 4 : activeFuncId === "poly" ? 6 : 25;
              return 100 - yVal * scaleY;
            };

            const getAntiderivative = (xVal: number) => {
              if (activeFuncId === "poly") {
                return (coef / 3) * (xVal * xVal * xVal);
              } else if (activeFuncId === "exp") {
                return (1 / coef) * Math.exp(coef * xVal * 0.4);
              } else {
                return (1 / coef) * Math.sin(coef * xVal) * 5;
              }
            };

            const constants = [-8, -4, 0, 4, 8];

            return constants.map((C, cIdx) => {
              const points: string[] = [];
              for (let sx = -3.2; sx <= 3.2; sx += 0.1) {
                const sy = getAntiderivative(sx) + C;
                const px = mapX(sx);
                const py = mapY(sy);
                if (py < 10 || py > 190) continue;
                if (points.length === 0) {
                  points.push(`M ${px} ${py}`);
                } else {
                  points.push(`L ${px} ${py}`);
                }
              }
              const pathStr = points.join(" ");
              const isMain = C === 0;

              return (
                <g key={cIdx}>
                  <path 
                    d={pathStr} 
                    fill="none" 
                    stroke={isMain ? "#ff4e00" : "#3b82f6"} 
                    strokeWidth={isMain ? "2.5" : "1.25"} 
                    opacity={isMain ? "1" : "0.4"} 
                  />
                  {points.length > 0 && (
                    <text 
                      x={mapX(2.2)} 
                      y={mapY(getAntiderivative(2.2) + C) - 4} 
                      fill={isMain ? "#ff4e00" : "#3b82f6"} 
                      opacity={isMain ? "1" : "0.5"} 
                      className="text-[8px] font-mono"
                    >
                      C = {C}
                    </text>
                  )}
                </g>
              );
            });
          })()}
        </svg>
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#ff4e00] inline-block" /> ខ្សែគោលចម្បង y = F(x) (C = 0)</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#3b82f6] opacity-50 inline-block" /> គ្រួសារខ្សែគោលដទៃ y = F(x) + C</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white/5 p-4 border border-[#ff4e00]/10 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-[#ff4e00]" />
            <span>ផលគណនាអាំងតេក្រាល (The Indefinite Integral)</span>
          </h5>

          <div className="space-y-3 font-mono">
            <div className="text-[11px] text-slate-400">អនុគមន៍ f(x)：</div>
            <div className="text-white text-sm bg-black/30 p-2.5 rounded border border-white/5 flex justify-center" dangerouslySetInnerHTML={{ __html: renderMathBlock(activeInt.f) }} />

            <div className="text-[11px] text-slate-400">ព្រីមីទីវ F(x) = ∫ f(x)dx：</div>
            <div className="text-[#ff8c00] text-sm bg-[#ff4e00]/5 p-2.5 rounded border border-[#ff4e00]/10 flex justify-center font-bold" dangerouslySetInnerHTML={{ __html: renderMathBlock(activeInt.integral) }} />
          </div>
        </div>

        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>ផ្ទៀងផ្ទាត់ដោយធ្វើដេរីវេ F'(x) (Derivative Verification)</span>
          </h5>

          <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
            ដេរីវេនៃព្រីមីទីវ ត្រូវតែស្មើនឹងអនុគមន៍ដើម <span className="text-orange-400">$f(x)$</span> វិញជានិច្ច <span className="font-mono">F'(x) = f(x)</span>៖
          </p>

          <div className="font-mono bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10 text-center">
            <div className="text-emerald-400 text-xs font-bold mb-2">ដេរីវេនៃចម្លើយ៖</div>
            <div className="text-white text-xs" dangerouslySetInnerHTML={{ __html: renderMathBlock(activeInt.derivCheck) }} />
          </div>

          <div className="text-[10px] text-slate-400 leading-relaxed font-sans italic p-2.5 bg-black/20 rounded border border-white/5">
            <strong>ពន្យល់៖</strong> {activeInt.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. DEFINITE INTEGRAL EXPLORER (Chapter 6)
// ==========================================
export function DefiniteIntegralExplorer() {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(3);
  const [n, setN] = useState<number>(10);

  // Consider f(x) = x^2 + 1
  const f = (x: number) => x * x + 1;
  const F = (x: number) => (x * x * x) / 3 + x; // Analytical antiderivative

  // Exact definite integral integral_a^b (x^2 + 1) dx
  const exactVal = F(b) - F(a);

  // Riemann Sum (Left endpoint)
  const dx = (b - a) / n;
  let riemannSum = 0;
  for (let i = 0; i < n; i++) {
    riemannSum += f(a + i * dx) * dx;
  }

  const errorPct = Math.abs((riemannSum - exactVal) / exactVal) * 100;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="definite-integral-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ៦៖ អាំងតេក្រាលកំណត់
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ពិសោធន៍ផ្ទៃក្រឡាក្រោមខ្សែគោល (Area Under Curve & Riemann Sum)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          គណនាផ្ទៃក្រឡាក្រោមក្រាហ្វនៃអនុគមន៍ $f(x) = x^2 + 1$ ចាប់ពី $x = a$ ដល់ $x = b$ ដោយប្រើប្រាស់ចតុកោណកែងតូចៗ $N$៖
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-1.5">
          <div className="flex justify-between text-[11px] font-sans">
            <span className="text-slate-300">ព្រំដែនក្រោម (a)</span>
            <span className="font-mono text-orange-400 font-bold">{a}</span>
          </div>
          <input type="range" min="0" max="2" value={a} onChange={(e) => setA(Math.min(Number(e.target.value), b - 1))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
        </div>

        <div className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-1.5">
          <div className="flex justify-between text-[11px] font-sans">
            <span className="text-slate-300">ព្រំដែនលើ (b)</span>
            <span className="font-mono text-orange-400 font-bold">{b}</span>
          </div>
          <input type="range" min="3" max="5" value={b} onChange={(e) => setB(Math.max(Number(e.target.value), a + 1))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
        </div>

        <div className="bg-black/30 border border-white/5 p-3 rounded-xl space-y-1.5">
          <div className="flex justify-between text-[11px] font-sans">
            <span className="text-slate-300">ចំនួនចតុកោណ N (Subintervals)</span>
            <span className="font-mono text-[#ff8c00] font-bold">N = {n}</span>
          </div>
          <input type="range" min="4" max="50" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff8c00] cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Dynamic Graphic SVG Representing Riemann Sum */}
        <div className="border border-white/10 bg-black/40 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[180px]">
          <span className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">គំនូរតំណាង (Dynamic Model)</span>
          {/* Simple Vector Riemann Sum simulation */}
          <svg viewBox="0 0 200 100" className="w-full max-w-[280px] h-auto overflow-visible">
            {/* Grid line */}
            <line x1="10" y1="90" x2="190" y2="90" stroke="#475569" strokeWidth="1" />
            <line x1="20" y1="10" x2="20" y2="95" stroke="#475569" strokeWidth="1" />
            
            {/* Draw approximation rectangles */}
            {(() => {
              const rects = [];
              const svgWidth = 160;
              const xStart = 20;
              const step = svgWidth / n;
              
              for (let i = 0; i < n; i++) {
                // normalized coordinate
                const xi = a + i * ((b - a) / n);
                const val = f(xi);
                // scaling val
                const h = (val / 27) * 75; // max value of x^2+1 in range [0,5] is 26
                const rectX = xStart + i * step;
                const rectY = 90 - h;
                rects.push(
                  <rect
                    key={i}
                    x={rectX}
                    y={rectY}
                    width={step - 0.5}
                    height={h}
                    fill="#ff4e00"
                    fillOpacity="0.25"
                    stroke="#ff8c00"
                    strokeWidth="0.5"
                  />
                );
              }
              return rects;
            })()}

            {/* Draw smooth curve f(x) = x^2+1 */}
            <path
              d={(() => {
                let dStr = "M 20 " + (90 - (f(a) / 27) * 75);
                for (let i = 1; i <= 20; i++) {
                  const xi = a + (i / 20) * (b - a);
                  const px = 20 + (i / 20) * 160;
                  const py = 90 - (f(xi) / 27) * 75;
                  dStr += ` L ${px} ${py}`;
                }
                return dStr;
              })()}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </svg>
          <div className="text-[10px] text-slate-500 font-mono mt-2">
            ព្រំដែនសិក្សា [{a}, {b}] | ទទឹងចតុកោណ Δx = {dx.toFixed(3)}
          </div>
        </div>

        {/* Math summary */}
        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-3.5">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Percent className="w-3.5 h-3.5 text-emerald-400" />
            <span>លទ្ធផលនៃការវាស់វែង (Calculation Results)</span>
          </h5>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">តម្លៃអាំងតេក្រាលពិត (Analytical)：</span>
              <span className="text-white font-bold">{exactVal.toFixed(6)}</span>
            </div>

            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">ផលបូក Riemann (N={n})：</span>
              <span className="text-[#ff8c00] font-bold">{riemannSum.toFixed(6)}</span>
            </div>

            <div className="flex justify-between text-xs font-mono border-t border-white/5 pt-2 mt-2">
              <span className="text-slate-400">គម្លាតលម្អៀង (Error Percentage)：</span>
              <span className={`font-bold ${errorPct < 1 ? "text-emerald-400" : "text-yellow-400"}`}>
                {errorPct.toFixed(3)}%
              </span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 leading-relaxed font-sans bg-black/20 p-2.5 rounded border border-white/5">
            <strong>សេចក្តីពន្យល់៖</strong> តាមនិយមន័យអាំងតេក្រាលរបស់ Cauchy/Riemann កាលណា <span className="text-white">N → +∞</span> (ចតុកោណកែងកាន់តែច្រើន និងស្តើងបំផុត) នោះផលបូករីម៉ាននឹងរំកិលទៅជិតតម្លៃពិតនៃផ្ទៃក្រឡាជាក់លាក់។
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. 1st ORDER DIFF EQ EXPLORER (Chapter 7)
// ==========================================
export function DiffEq1Explorer() {
  const [a, setA] = useState<number>(2); // y' + ay = b
  const [b, setB] = useState<number>(4);
  const [y0, setY0] = useState<number>(5); // y(0) = y0

  // Equation: y' + ay = b
  // Solution: y(x) = (y0 - b/a)*e^(-ax) + b/a
  const ssVal = b / a; // steady state

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="diff-eq-1-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ៧៖ សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី ១
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ម៉ាស៊ីនដោះស្រាយសមីការលំដាប់ទី១ (1st Order Linear Solver)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          ដោះស្រាយសមីការឌីផេរ៉ង់ស្យែលលីនេអ៊ែរ <span className="text-orange-400 font-bold">$y' + ay = b$</span> ជាមួយលក្ខខណ្ឌដើម <span className="font-mono text-orange-400">y(0) = y₀</span>៖
        </p>
      </div>

      <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-5 text-center font-mono text-white text-sm">
        <div dangerouslySetInnerHTML={{ __html: renderMathBlock("y' + " + a + "y = " + b + " \\quad , \\quad y(0) = " + y0) }} />
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="diff-eq-1-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>គំនូរខ្សែគោលចម្លើយសមីការឌីផេរ៉ង់ស្យែល (Solution Curve & Steady State)</span>
        </span>
        <svg viewBox="0 0 400 200" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Coordinate grid lines */}
          <line x1="40" y1="160" x2="380" y2="160" stroke="#334155" strokeWidth="1" />
          <line x1="60" y1="10" x2="60" y2="190" stroke="#334155" strokeWidth="1" />
          
          {/* Labels for axes */}
          <text x="375" y="175" fill="#64748b" className="text-[10px] font-mono">x (Time)</text>
          <text x="70" y="20" fill="#64748b" className="text-[10px] font-mono font-bold">y(x)</text>

          {(() => {
            const mapX = (xVal: number) => 60 + xVal * 65;
            const mapY = (yVal: number) => 160 - yVal * 12;

            const ssY = mapY(ssVal);

            const points: string[] = [];
            for (let sx = 0; sx <= 4.5; sx += 0.1) {
              const sy = (y0 - b / a) * Math.exp(-a * sx) + b / a;
              const px = mapX(sx);
              const py = mapY(sy);
              if (py < 10 || py > 190) continue;
              if (points.length === 0) {
                points.push(`M ${px} ${py}`);
              } else {
                points.push(`L ${px} ${py}`);
              }
            }
            const pathStr = points.join(" ");

            return (
              <>
                {/* Steady State Asymptote line */}
                <line x1="60" y1={ssY} x2="370" y2={ssY} stroke="#ff8c00" strokeWidth="1.25" strokeDasharray="4 4" opacity="0.8" />
                <text x="250" y={ssY - 5} fill="#ff8c00" className="text-[9px] font-mono">លំនឹង Steady State: y = {ssVal.toFixed(2)}</text>

                {/* Solution Curve */}
                <path d={pathStr} fill="none" stroke="#10b981" strokeWidth="2.5" />

                {/* Initial Condition dot */}
                <circle cx={mapX(0)} cy={mapY(y0)} r="5" fill="#ff4e00" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                <text x={mapX(0) + 8} y={mapY(y0) + 4} fill="#ff4e00" className="text-[10px] font-sans font-bold">y(0) = {y0}</text>
              </>
            );
          })()}
        </svg>
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#10b981] inline-block" /> ខ្សែគោលចម្លើយ y(x)</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 border-t border-dashed border-[#ff8c00] inline-block" /> បន្ទាត់លំនឹង Steady-state (y = b/a)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4 bg-white/5 p-4 border border-white/10 rounded-xl">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
            <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
            <span>កែសម្រួលប៉ារ៉ាម៉ែត្រ (Parameters)</span>
          </h5>

          <div>
            <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
              <span>មេគុណ a (Coefficient a)</span>
              <span className="font-mono text-orange-400 font-bold">{a}</span>
            </div>
            <input type="range" min="1" max="4" step="1" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
              <span>ថេរ b (Constant b)</span>
              <span className="font-mono text-orange-400 font-bold">{b}</span>
            </div>
            <input type="range" min="-4" max="8" step="1" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
              <span>លក្ខខណ្ឌដើម y(0) = y₀</span>
              <span className="font-mono text-[#ff8c00] font-bold">{y0}</span>
            </div>
            <input type="range" min="0" max="10" step="1" value={y0} onChange={(e) => setY0(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff8c00] cursor-pointer" />
          </div>
        </div>

        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>ចម្លើយជាក់លាក់ (Particular Solution)</span>
          </h5>

          <div className="font-mono bg-black/40 p-3 rounded-lg border border-white/5">
            <div className="text-slate-400 text-[10px] mb-1">រូបមន្តទូទៅ៖ y(x) = C · e⁻ᵃˣ + b/a</div>
            <div className="text-[#ff8c00] text-xs font-bold my-2" dangerouslySetInnerHTML={{ __html: renderMathBlock(`y(x) = (${y0} - ${ssVal.toFixed(2)}) e^{-${a}x} + ${ssVal.toFixed(2)}`) }} />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 font-sans font-semibold">តារាងកូអរដោនេចំណុច (Coordinates Table)</span>
            <div className="grid grid-cols-4 text-[9px] font-mono text-slate-500 font-bold border-b border-white/5 pb-1">
              <span>តម្លៃ x</span>
              <span>e^(-ax)</span>
              <span className="text-right">តម្លៃ y(x)</span>
              <span className="text-right">ស្ថានភាព</span>
            </div>
            {[0, 0.5, 1.0, 2.0].map((x) => {
              const expPart = Math.exp(-a * x);
              const yVal = (y0 - ssVal) * expPart + ssVal;
              return (
                <div key={x} className="grid grid-cols-4 text-[10px] font-mono py-1 border-b border-white/5">
                  <span className="text-slate-400">x = {x.toFixed(1)}</span>
                  <span className="text-slate-500">{expPart.toFixed(3)}</span>
                  <span className="text-right font-bold text-[#ff4e00]">{yVal.toFixed(4)}</span>
                  <span className="text-right text-slate-500 text-[8px] truncate">
                    {x === 0 ? "លក្ខខណ្ឌដើម" : yVal > ssVal ? "ចុះរក " + ssVal.toFixed(1) : "កើនរក " + ssVal.toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. 2nd ORDER DIFF EQ EXPLORER (Chapter 8)
// ==========================================
export function DiffEq2Explorer() {
  const [b, setB] = useState<number>(-5); // y'' + by' + cy = 0
  const [c, setC] = useState<number>(6);

  const delta = b * b - 4 * c;

  let solutionType = "";
  let solutionFormulaKh = "";
  let rootsText = "";

  if (delta > 0) {
    const r1 = (-b + Math.sqrt(delta)) / 2;
    const r2 = (-b - Math.sqrt(delta)) / 2;
    solutionType = "ឫសពិតផ្សេងគ្នា (Distinct Real Roots)";
    rootsText = `r_1 = ${r1.toFixed(2)} \\quad , \\quad r_2 = ${r2.toFixed(2)}`;
    solutionFormulaKh = `y(x) = C_1 e^{${r1.toFixed(1)}x} + C_2 e^{${r2.toFixed(1)}x}`;
  } else if (delta === 0) {
    const r = -b / 2;
    solutionType = "ឫសឌុប (Repeated Real Root)";
    rootsText = `r_0 = ${r.toFixed(2)}`;
    solutionFormulaKh = `y(x) = (C_1 x + C_2) e^{${r.toFixed(1)}x}`;
  } else {
    const alpha = -b / 2;
    const beta = Math.sqrt(-delta) / 2;
    solutionType = "ឫសកុំផ្លិចឆ្លាស់ (Complex Conjugate Roots)";
    rootsText = `r = ${alpha.toFixed(2)} \\pm ${beta.toFixed(2)}i`;
    solutionFormulaKh = `y(x) = e^{${alpha.toFixed(1)}x} (C_1 \\cos(${beta.toFixed(1)}x) + C_2 \\sin(${beta.toFixed(1)}x))`;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="diff-eq-2-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ៨៖ សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី ២
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">វិភាគសមីការលំដាប់ទី២ (2nd Order Homogeneous Analyzer)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          កំណត់មេគុណដើម្បីវិភាគសមីការឌីផេរ៉ង់ស្យែលលីនេអ៊ែរលំដាប់ទីពីរ <span className="text-orange-400 font-bold">$y'' + by' + cy = 0$</span>៖
        </p>
      </div>

      <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-5 text-center font-mono text-white text-sm">
        <div dangerouslySetInnerHTML={{ __html: renderMathBlock("y'' " + (b >= 0 ? "+ " : "") + b + "y' " + (c >= 0 ? "+ " : "") + c + "y = 0") }} />
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="diff-eq-2-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>គំនូរខ្សែគោលចម្លើយគំរូ y(x) (Representative Solution Curve for C₁=1.5, C₂=1.0)</span>
        </span>
        <svg viewBox="0 0 400 200" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Coordinate grid lines */}
          <line x1="40" y1="100" x2="380" y2="100" stroke="#334155" strokeWidth="1" />
          <line x1="60" y1="10" x2="60" y2="190" stroke="#334155" strokeWidth="1" />
          
          {/* Labels for axes */}
          <text x="375" y="115" fill="#64748b" className="text-[10px] font-mono">x</text>
          <text x="70" y="20" fill="#64748b" className="text-[10px] font-mono font-bold">y(x)</text>

          {(() => {
            const mapX = (xVal: number) => 60 + xVal * 60;
            const mapY = (yVal: number) => {
              const clamped = Math.max(-8, Math.min(8, yVal));
              return 100 - clamped * 10;
            };

            const points: string[] = [];
            const C1 = 1.5;
            const C2 = 1.0;

            for (let sx = 0; sx <= 5.0; sx += 0.05) {
              let sy = 0;
              if (delta > 0) {
                const r1 = (-b + Math.sqrt(delta)) / 2;
                const r2 = (-b - Math.sqrt(delta)) / 2;
                sy = C1 * Math.exp(Math.max(-2, Math.min(1.5, r1 * 0.3)) * sx) + C2 * Math.exp(Math.max(-2, Math.min(1.5, r2 * 0.3)) * sx);
              } else if (delta === 0) {
                const r = -b / 2;
                sy = (C1 * sx + C2) * Math.exp(Math.max(-2, Math.min(1.5, r * 0.3)) * sx);
              } else {
                const alpha = -b / 2;
                const beta = Math.sqrt(-delta) / 2;
                sy = Math.exp(Math.max(-1.5, Math.min(1.0, alpha * 0.2)) * sx) * (C1 * Math.cos(beta * sx) + C2 * Math.sin(beta * sx));
              }

              const px = mapX(sx);
              const py = mapY(sy);
              if (points.length === 0) {
                points.push(`M ${px} ${py}`);
              } else {
                points.push(`L ${px} ${py}`);
              }
            }
            const pathStr = points.join(" ");

            return (
              <>
                {/* Solution Curve */}
                <path d={pathStr} fill="none" stroke="#3b82f6" strokeWidth="2.5" />

                {/* Initial state point at x=0 */}
                <circle cx={mapX(0)} cy={mapY(C1 + C2)} r="4.5" fill="#ff4e00" stroke="#ffffff" strokeWidth="1.5" />
                <text x={mapX(0) + 8} y={mapY(C1 + C2) + 4} fill="#ff4e00" className="text-[9px] font-mono">y(0) = {(C1+C2).toFixed(1)}</text>
              </>
            );
          })()}
        </svg>
        <div className="text-[10px] text-slate-400 font-sans mt-2 text-center bg-black/20 px-3 py-1.5 rounded border border-white/5">
          ប្រភេទសមីការ៖ <span className="text-[#ff8c00] font-bold font-mono">{solutionType}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4 bg-white/5 p-4 border border-white/10 rounded-xl">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
            <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
            <span>កែសម្រួលមេគុណ (Coefficients)</span>
          </h5>

          <div>
            <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
              <span>មេគុណ b (y' coefficient)</span>
              <span className="font-mono text-orange-400 font-bold">{b}</span>
            </div>
            <input type="range" min="-6" max="6" step="1" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
              <span>មេគុណ c (y coefficient)</span>
              <span className="font-mono text-orange-400 font-bold">{c}</span>
            </div>
            <input type="range" min="-5" max="15" step="1" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
          </div>

          <div className="bg-black/20 p-3 rounded-lg border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 block font-sans">សមីការសម្គាល់ (Characteristic Eq.)៖</span>
            <div className="font-mono text-xs text-white" dangerouslySetInnerHTML={{ __html: renderMath("r^2 " + (b >= 0 ? "+ " : "") + b + "r " + (c >= 0 ? "+ " : "") + c + " = 0") }} />
          </div>
        </div>

        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-3">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>ដំណោះស្រាយតាមទ្រឹស្តី (Theoretical Analysis)</span>
          </h5>

          <div className="space-y-2.5 font-sans text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">ឌីស្គ្រីមីណង់ Δ = b² - 4ac：</span>
              <span className={`font-bold ${delta > 0 ? "text-emerald-400" : delta === 0 ? "text-yellow-400" : "text-purple-400"}`}>
                Δ = {delta}
              </span>
            </div>

            <div className="flex justify-between font-mono">
              <span className="text-slate-400">ប្រភេទចម្លើយ：</span>
              <span className="text-white text-[11px] font-bold">{solutionType}</span>
            </div>

            <div className="flex justify-between font-mono">
              <span className="text-slate-400">ឫសសមីការ r：</span>
              <span className="text-[#ff8c00] font-bold" dangerouslySetInnerHTML={{ __html: renderMath(rootsText) }} />
            </div>

            <div className="border-t border-white/5 pt-2 mt-2">
              <span className="text-[10px] text-slate-400 block mb-1">ទម្រង់ដំណោះស្រាយទូទៅ (General Solution)៖</span>
              <div className="bg-black/30 p-2 rounded text-[#ff4e00] font-mono text-center text-xs font-bold" dangerouslySetInnerHTML={{ __html: renderMathBlock(solutionFormulaKh) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. PROBABILITY EXPLORER (Chapter 9)
// ==========================================
export function ProbabilityExplorer() {
  const [subSection, setSubSection] = useState<"trials" | "bayes" | "game">("trials");
  const [gameChoice, setGameChoice] = useState<"monty" | "plinko">("monty");
  const [view3D, setView3D] = useState<boolean>(false);

  // Monty Hall State Variables
  const [montyCarDoor, setMontyCarDoor] = useState<number>(() => Math.floor(Math.random() * 3));
  const [montySelected, setMontySelected] = useState<number | null>(null);
  const [montyRevealed, setMontyRevealed] = useState<number | null>(null);
  const [montyStage, setMontyStage] = useState<"select" | "switch" | "result">("select");
  const [montySwitched, setMontySwitched] = useState<boolean | null>(null);
  const [montyResultWin, setMontyResultWin] = useState<boolean | null>(null);
  const [montyStayWins, setMontyStayWins] = useState<number>(0);
  const [montyStayTotal, setMontyStayTotal] = useState<number>(0);
  const [montySwitchWins, setMontySwitchWins] = useState<number>(0);
  const [montySwitchTotal, setMontySwitchTotal] = useState<number>(0);
  const [montyLog, setMontyLog] = useState<string[]>([]);

  // Galton Board (Plinko) State Variables
  const [plinkoBins, setPlinkoBins] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [plinkoTotalBalls, setPlinkoTotalBalls] = useState<number>(0);
  const [plinkoBallPos, setPlinkoBallPos] = useState<{ x: number; y: number } | null>(null);
  const [plinkoActivePath, setPlinkoActivePath] = useState<{ x: number; y: number }[]>([]);
  const [plinkoAnimating, setPlinkoAnimating] = useState<boolean>(false);

  // Monty Hall fast-auto-simulator
  const runMontyAutoSim = (iterations: number) => {
    let localStayWins = 0;
    let localStayTotal = 0;
    let localSwitchWins = 0;
    let localSwitchTotal = 0;
    
    for (let i = 0; i < iterations; i++) {
      const car = Math.floor(Math.random() * 3);
      const firstChoice = Math.floor(Math.random() * 3);
      
      // Host reveals a goat door
      let possibleReveals = [0, 1, 2].filter(d => d !== car && d !== firstChoice);
      const revealed = possibleReveals[Math.floor(Math.random() * possibleReveals.length)];
      
      // Stay strategy
      const stayChoice = firstChoice;
      if (stayChoice === car) {
        localStayWins++;
      }
      localStayTotal++;
      
      // Switch strategy
      const switchChoice = [0, 1, 2].find(d => d !== firstChoice && d !== revealed)!;
      if (switchChoice === car) {
        localSwitchWins++;
      }
      localSwitchTotal++;
    }
    
    setMontyStayWins(prev => prev + localStayWins);
    setMontyStayTotal(prev => prev + localStayTotal);
    setMontySwitchWins(prev => prev + localSwitchWins);
    setMontySwitchTotal(prev => prev + localSwitchTotal);
    
    setMontyLog(prev => [
      `បានដំណើរការការពិសោធន៍ស្វ័យប្រវត្តិចំនួន ${iterations} ដង៖`,
      `  • យុទ្ធសាស្ត្ររក្សាដដែល (Stay)៖ ឈ្នះ ${localStayWins}/${iterations} ដង (${((localStayWins/iterations)*100).toFixed(1)}%)`,
      `  • យុទ្ធសាស្ត្រប្តូរទ្វារ (Switch)៖ ឈ្នះ ${localSwitchWins}/${iterations} ដង (${((localSwitchWins/iterations)*100).toFixed(1)}%)`,
      ...prev
    ].slice(0, 10));
  };

  const handleMontySelect = (doorIdx: number) => {
    if (montyStage !== "select") return;
    setMontySelected(doorIdx);
    
    const possibleReveals = [0, 1, 2].filter(d => d !== montyCarDoor && d !== doorIdx);
    const chosenReveal = possibleReveals[Math.floor(Math.random() * possibleReveals.length)];
    
    setMontyRevealed(chosenReveal);
    setMontyStage("switch");
  };

  const handleMontyDecision = (shouldSwitch: boolean) => {
    if (montyStage !== "switch" || montySelected === null || montyRevealed === null) return;
    setMontySwitched(shouldSwitch);
    
    const finalChoice = shouldSwitch 
      ? [0, 1, 2].find(d => d !== montySelected && d !== montyRevealed)!
      : montySelected;
      
    const isWin = finalChoice === montyCarDoor;
    setMontyResultWin(isWin);
    
    if (shouldSwitch) {
      setMontySwitchTotal(prev => prev + 1);
      if (isWin) setMontySwitchWins(prev => prev + 1);
    } else {
      setMontyStayTotal(prev => prev + 1);
      if (isWin) setMontyStayWins(prev => prev + 1);
    }
    
    setMontyStage("result");
    setMontyLog(prev => [
      `លេងដោយផ្ទាល់៖ ជ្រើសរើសទ្វារ #${montySelected + 1}, បើកទ្វារពពែ #${montyRevealed + 1}, បាន${shouldSwitch ? "ប្តូរ" : "រក្សា"} -> សម្រេចចិត្តចុងក្រោយទ្វារ #${finalChoice + 1} (${isWin ? "ឈ្នះឡាន 🚗" : "ចាញ់ពពែ 🐐"})`,
      ...prev
    ].slice(0, 10));
  };

  const resetMontyGame = () => {
    setMontyCarDoor(Math.floor(Math.random() * 3));
    setMontySelected(null);
    setMontyRevealed(null);
    setMontyStage("select");
    setMontySwitched(null);
    setMontyResultWin(null);
  };

  const clearMontyStats = () => {
    setMontyStayWins(0);
    setMontyStayTotal(0);
    setMontySwitchWins(0);
    setMontySwitchTotal(0);
    setMontyLog([]);
  };

  // Galton Board (Plinko) logic
  const dropPlinkoBall = () => {
    if (plinkoAnimating) return;
    setPlinkoAnimating(true);
    
    let currentCol = 0;
    const pathPoints: { x: number; y: number }[] = [];
    
    pathPoints.push({ x: 200, y: 20 });
    
    for (let row = 0; row <= 5; row++) {
      const px = 200 + (currentCol - row / 2) * 40;
      const py = 50 + row * 28;
      pathPoints.push({ x: px, y: py });
      
      const choice = Math.random() < 0.5 ? 0 : 1;
      currentCol += choice;
    }
    
    const binX = 80 + currentCol * 40;
    pathPoints.push({ x: binX, y: 230 });
    
    let step = 0;
    setPlinkoActivePath(pathPoints);
    setPlinkoBallPos(pathPoints[0]);
    
    const interval = setInterval(() => {
      step++;
      if (step < pathPoints.length) {
        setPlinkoBallPos(pathPoints[step]);
      } else {
        clearInterval(interval);
        setPlinkoAnimating(false);
        setPlinkoBallPos(null);
        setPlinkoActivePath([]);
        
        const finalBin = currentCol;
        setPlinkoBins(prev => {
          const next = [...prev];
          next[finalBin]++;
          return next;
        });
        setPlinkoTotalBalls(prev => prev + 1);
      }
    }, 120);
  };

  const runPlinkoAutoSim = (count: number) => {
    const additionalBins = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < count; i++) {
      let col = 0;
      for (let row = 0; row < 6; row++) {
        if (Math.random() >= 0.5) {
          col++;
        }
      }
      additionalBins[col]++;
    }
    
    setPlinkoBins(prev => prev.map((v, idx) => v + additionalBins[idx]));
    setPlinkoTotalBalls(prev => prev + count);
  };

  const resetPlinkoBoard = () => {
    setPlinkoBins([0, 0, 0, 0, 0, 0, 0]);
    setPlinkoTotalBalls(0);
    setPlinkoBallPos(null);
    setPlinkoActivePath([]);
    setPlinkoAnimating(false);
  };

  // Stats / Trial system
  const [expType, setExpType] = useState<"urn" | "coin" | "dice" | "numbers" | "distinct" | "circular" | "partition" | "repeat">("urn");
  const [animating, setAnimating] = useState<boolean>(false);
  const [trialRes, setTrialRes] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  // 1. Combinatorics & Experiments inputs
  const [n, setN] = useState<number>(5);
  const [r, setR] = useState<number>(2);
  const [redBalls, setRedBalls] = useState<number>(4);
  const [blueBalls, setBlueBalls] = useState<number>(3);
  const [urnPicks, setUrnPicks] = useState<number>(1);
  const [urnRepeat, setUrnRepeat] = useState<boolean>(true);
  const [coins, setCoins] = useState<number>(2);
  const [dice, setDice] = useState<number>(1);
  const [numLength, setNumLength] = useState<number>(2);
  const [numRepeat, setNumRepeat] = useState<boolean>(false);
  const [circularN, setCircularN] = useState<number>(4);

  // 2. Bayes & Conditional inputs
  const [bayesTab, setBayesTab] = useState<"cond" | "total" | "bayes">("cond");
  const [probA, setProbA] = useState<number>(0.6);
  const [probB, setProbB] = useState<number>(0.5);
  const [probAandB, setProbAandB] = useState<number>(0.35); // overlapping
  const [priorA, setPriorA] = useState<number>(0.4);
  const [likeAgivenB, setLikeAgivenB] = useState<number>(0.8); // P(B|A)
  const [likeAgivenNotB, setLikeAgivenNotB] = useState<number>(0.3); // P(B|A')

  // Math helpers
  const fact = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const perm = n >= r ? fact(n) / fact(n - r) : 0;
  const comb = n >= r ? fact(n) / (fact(n - r) * fact(r)) : 0;

  const totalBalls = redBalls + blueBalls;
  const pRed = totalBalls > 0 ? redBalls / totalBalls : 0;
  const pBlue = totalBalls > 0 ? blueBalls / totalBalls : 0;

  // Clamping Overlap to keep it mathematically valid: max overlap is min(P(A), P(B)), min overlap is max(0, P(A)+P(B)-1)
  const maxOverlap = Math.min(probA, probB);
  const minOverlap = Math.max(0, probA + probB - 1);
  const validOverlap = Math.min(maxOverlap, Math.max(minOverlap, probAandB));

  const runExperimentTrial = () => {
    if (animating) return;
    setAnimating(true);
    let count = 0;
    const t = setInterval(() => {
      count++;
      if (count > 6) {
        clearInterval(t);
        setAnimating(false);
        let res: any = {};
        if (expType === "urn") {
          let pool = [...Array(redBalls).fill("R"), ...Array(blueBalls).fill("B")];
          let picked: string[] = [];
          for (let i = 0; i < urnPicks; i++) {
            if (pool.length === 0) break;
            const idx = Math.floor(Math.random() * pool.length);
            picked.push(pool[idx]);
            if (!urnRepeat) pool.splice(idx, 1);
          }
          res = { type: "urn", picked };
        } else if (expType === "coin") {
          let flipped: string[] = [];
          for (let i = 0; i < coins; i++) flipped.push(Math.random() < 0.5 ? "H" : "T");
          res = { type: "coin", flipped };
        } else if (expType === "dice") {
          let rolled: number[] = [];
          for (let i = 0; i < dice; i++) rolled.push(Math.floor(Math.random() * 6) + 1);
          res = { type: "dice", rolled, sum: rolled.reduce((a, b) => a + b, 0) };
        } else if (expType === "numbers") {
          let pool = [1, 2, 3, 4, 5];
          let digits: number[] = [];
          for (let i = 0; i < numLength; i++) {
            if (pool.length === 0) break;
            const idx = Math.floor(Math.random() * pool.length);
            digits.push(pool[idx]);
            if (!numRepeat) pool.splice(idx, 1);
          }
          res = { type: "numbers", digits, val: digits.join("") };
        } else if (expType === "distinct") {
          let items = ["A", "B", "C", "D"].slice(0, Math.min(4, n));
          for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
          }
          res = { type: "distinct", arr: items };
        } else if (expType === "circular") {
          let items = ["A", "B", "C", "D", "E"].slice(0, circularN);
          let rest = items.slice(1);
          for (let i = rest.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rest[i], rest[j]] = [rest[j], rest[i]];
          }
          res = { type: "circular", arr: [items[0], ...rest] };
        } else if (expType === "partition") {
          let items = ["A", "A", "B", "C"].slice(0, Math.min(4, n));
          for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
          }
          res = { type: "partition", arr: items };
        } else if (expType === "repeat") {
          let items = ["A", "B"];
          let arr: string[] = [];
          for (let i = 0; i < r; i++) arr.push(items[Math.floor(Math.random() * items.length)]);
          res = { type: "repeat", arr };
        }
        setTrialRes(res);
        setHistory(prev => [res, ...prev].slice(0, 30));
      }
    }, 80);
  };

  // Render SVG Isometric Cube Dots
  const render3DCubeDots = (faceCenter: { x: number, y: number }, val: number, face: "top" | "side") => {
    const dots: any[] = [];
    const drawDot = (ox: number, oy: number, isRed = false) => {
      dots.push(<circle key={`dot-${face}-${ox}-${oy}`} cx={faceCenter.x + ox} cy={faceCenter.y + oy} r={isRed ? 3.5 : 2} fill={isRed ? "#ef4444" : "#1e293b"} />);
    };
    if (val === 1) {
      drawDot(0, 0, true);
    } else {
      const scaleX = face === "top" ? 1.4 : 1.0;
      const scaleY = face === "top" ? 0.7 : 1.2;
      if (val === 2 || val === 3 || val === 4 || val === 5 || val === 6) {
        drawDot(-8 * scaleX, -8 * scaleY);
        drawDot(8 * scaleX, 8 * scaleY);
      }
      if (val === 4 || val === 5 || val === 6) {
        drawDot(8 * scaleX, -8 * scaleY);
        drawDot(-8 * scaleX, 8 * scaleY);
      }
      if (val === 3 || val === 5) {
        drawDot(0, 0);
      }
      if (val === 6) {
        drawDot(-8 * scaleX, 0);
        drawDot(8 * scaleX, 0);
      }
    }
    return dots;
  };

  const render2DDiceDots = (cx: number, cy: number, val: number) => {
    const dots: any[] = [];
    const drawDot = (ox: number, oy: number, isRed = false) => {
      dots.push(<circle key={`dot2d-${cx}-${ox}-${oy}`} cx={cx + ox} cy={cy + oy} r={isRed ? 4 : 2.5} fill={isRed ? "#ef4444" : "#0f172a"} />);
    };
    if (val === 1) {
      drawDot(0, 0, true);
    } else {
      if (val === 2 || val === 3 || val === 4 || val === 5 || val === 6) {
        drawDot(-10, -10);
        drawDot(10, 10);
      }
      if (val === 4 || val === 5 || val === 6) {
        drawDot(10, -10);
        drawDot(-10, 10);
      }
      if (val === 3 || val === 5) {
        drawDot(0, 0);
      }
      if (val === 6) {
        drawDot(-10, 0);
        drawDot(10, 0);
      }
    }
    return dots;
  };

  // Main visual canvas renderer
  const renderVisual = () => {
    const cx = 230;
    const cy = 125;

    const project = (xVal: number, yVal: number, zVal: number) => {
      const scale = 22;
      const px = cx - xVal * scale * Math.cos(Math.PI / 6) + yVal * scale * Math.cos(Math.PI / 6);
      const py = cy + xVal * scale * Math.sin(Math.PI / 6) + yVal * scale * Math.sin(Math.PI / 6) - zVal * scale;
      return { x: px, y: py };
    };

    if (view3D) {
      switch (expType) {
        case "urn": {
          const r = 2.5;
          const h = 3.5;
          return (
            <g>
              {/* Back Cylindrical Glass Lip */}
              <path d={`M ${project(-r, 0, -1.8).x} ${project(-r, 0, -1.8).y} A 54 27 0 0 0 ${project(r, 0, -1.8).x} ${project(r, 0, -1.8).y}`} fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="2 2" />
              {/* Spherical 3D shaded balls */}
              {Array.from({ length: redBalls + blueBalls }).map((_, idx) => {
                const isRed = idx < redBalls;
                const angle = (idx * 2.3) % (Math.PI * 2);
                const dist = (idx * 0.6) % (r - 0.5);
                const xVal = dist * Math.cos(angle);
                const yVal = dist * Math.sin(angle);
                const zVal = -1.5 + (idx * 2.8) / (redBalls + blueBalls + 0.1);
                const pt = project(xVal, yVal, zVal);
                return (
                  <g key={`ball3d-${idx}`}>
                    <circle cx={pt.x} cy={pt.y} r="8.5" fill={isRed ? "url(#rBall3D)" : "url(#bBall3D)"} />
                    <circle cx={pt.x - 2.5} cy={pt.y - 2.5} r="2.5" fill="rgba(255, 255, 255, 0.5)" />
                  </g>
                );
              })}
              {/* Front half cylinder body */}
              <line x1={project(-r, 0, -1.8).x} y1={project(-r, 0, -1.8).y} x2={project(-r, 0, h).x} y2={project(-r, 0, h).y} stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
              <line x1={project(r, 0, -1.8).x} y1={project(r, 0, -1.8).y} x2={project(r, 0, h).x} y2={project(r, 0, h).y} stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
              <path d={`M ${project(-r, 0, -1.8).x} ${project(-r, 0, -1.8).y} A 54 27 0 0 1 ${project(r, 0, -1.8).x} ${project(r, 0, -1.8).y}`} fill="rgba(56, 189, 248, 0.05)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2" />
              {/* Top Glass rim */}
              <ellipse cx={project(0, 0, h).x} cy={project(0, 0, h).y} rx={r * 22} ry={r * 11} fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
            </g>
          );
        }
        case "coin": {
          return (
            <g>
              {Array.from({ length: coins }).map((_, idx) => {
                const isHeads = trialRes && trialRes.flipped ? trialRes.flipped[idx] === "H" : idx % 2 === 0;
                const xOffset = (idx - (coins - 1) / 2) * 3.5;
                const topPt = project(xOffset, 0, animating ? 1.5 : 0);
                const bottomPt = project(xOffset, 0, animating ? 1.1 : -0.3);
                return (
                  <g key={`coin3d-${idx}`} className={animating ? "animate-bounce" : ""}>
                    <path d={`M ${topPt.x - 22} ${topPt.y} L ${bottomPt.x - 22} ${bottomPt.y} A 22 11 0 0 0 ${bottomPt.x + 22} ${bottomPt.y} L ${topPt.x + 22} ${topPt.y} A 22 11 0 0 1 ${topPt.x - 22} ${topPt.y}`} fill="url(#bronzeEdge)" />
                    <ellipse cx={topPt.x} cy={topPt.y} rx="22" ry="11" fill={isHeads ? "url(#heads3D)" : "url(#tails3D)"} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                    <text x={topPt.x} y={topPt.y + 4} textAnchor="middle" fill="#1c1917" className="text-[10px] font-sans font-bold">
                      {isHeads ? "H (ក្បាល)" : "T (កន្ទុយ)"}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        }
        case "dice": {
          return (
            <g>
              {Array.from({ length: dice }).map((_, idx) => {
                const val = trialRes && trialRes.rolled ? trialRes.rolled[idx] : (idx % 6) + 1;
                const xOffset = (idx - (dice - 1) / 2) * 4.5;
                const s = 1.2;
                const pt0 = project(xOffset - s, -s, -s);
                const pt1 = project(xOffset + s, -s, -s);
                const pt2 = project(xOffset + s, s, -s);
                const pt3 = project(xOffset - s, s, -s);
                const pt4 = project(xOffset - s, -s, s);
                const pt5 = project(xOffset + s, -s, s);
                const pt6 = project(xOffset + s, s, s);
                const pt7 = project(xOffset - s, s, s);
                return (
                  <g key={`dice3d-${idx}`} className={animating ? "animate-spin" : ""}>
                    {/* Cube Faces */}
                    <polygon points={`${pt4.x},${pt4.y} ${pt5.x},${pt5.y} ${pt6.x},${pt6.y} ${pt7.x},${pt7.y}`} fill="#f1f5f9" stroke="#94a3b8" />
                    <polygon points={`${pt3.x},${pt3.y} ${pt2.x},${pt2.y} ${pt6.x},${pt6.y} ${pt7.x},${pt7.y}`} fill="#cbd5e1" stroke="#94a3b8" />
                    <polygon points={`${pt1.x},${pt1.y} ${pt2.x},${pt2.y} ${pt6.x},${pt6.y} ${pt5.x},${pt5.y}`} fill="#94a3b8" stroke="#64748b" />
                    {/* Face dots */}
                    {render3DCubeDots(project(xOffset, 0, s), val, "top")}
                    {render3DCubeDots(project(xOffset, s, 0), 5, "side")}
                    {render3DCubeDots(project(xOffset + s, 0, 0), 3, "side")}
                  </g>
                );
              })}
            </g>
          );
        }
        case "numbers": {
          const list = trialRes && trialRes.digits ? trialRes.digits : [2, 5];
          return (
            <g>
              {list.map((dig: number, idx: number) => {
                const xOffset = (idx - (list.length - 1) / 2) * 3.5;
                const s = 1.0;
                const height = dig * 0.35;
                const pt4 = project(xOffset - s, -s, height);
                const pt5 = project(xOffset + s, -s, height);
                const pt6 = project(xOffset + s, s, height);
                const pt7 = project(xOffset - s, s, height);
                const pt0 = project(xOffset - s, s, -1);
                const pt1 = project(xOffset + s, s, -1);
                const pt2 = project(xOffset + s, -s, -1);
                return (
                  <g key={`num3d-${idx}`}>
                    <polygon points={`${pt4.x},${pt4.y} ${pt5.x},${pt5.y} ${pt6.x},${pt6.y} ${pt7.x},${pt7.y}`} fill="#f97316" stroke="#ea580c" />
                    <polygon points={`${pt0.x},${pt0.y} ${pt1.x},${pt1.y} ${pt6.x},${pt6.y} ${pt7.x},${pt7.y}`} fill="#ea580c" stroke="#c2410c" />
                    <polygon points={`${pt2.x},${pt2.y} ${pt1.x},${pt1.y} ${pt6.x},${pt6.y} ${pt5.x},${pt5.y}`} fill="#c2410c" stroke="#9a3412" />
                    <circle cx={project(xOffset, 0, height + 0.6).x} cy={project(xOffset, 0, height + 0.6).y} r="10" fill="#ffffff" />
                    <text x={project(xOffset, 0, height + 0.6).x} y={project(xOffset, 0, height + 0.6).y + 3.5} textAnchor="middle" fill="#000" className="text-[10px] font-mono font-bold">{dig}</text>
                  </g>
                );
              })}
            </g>
          );
        }
        case "distinct":
        case "partition":
        case "repeat": {
          const list = trialRes && trialRes.arr ? trialRes.arr : ["A", "B", "C", "D"].slice(0, n);
          return (
            <g>
              <polygon points={`${project(-6, -1.2, -0.5).x},${project(-6, -1.2, -0.5).y} ${project(6, -1.2, -0.5).x},${project(6, -1.2, -0.5).y} ${project(6, 1.2, -0.5).x},${project(6, 1.2, -0.5).y} ${project(-6, 1.2, -0.5).x},${project(-6, 1.2, -0.5).y}`} fill="#b45309" stroke="#78350f" />
              {list.map((char: string, idx: number) => {
                const xOffset = (idx - (list.length - 1) / 2) * 2.5;
                const s = 0.9;
                const pt4 = project(xOffset - s, -s, s);
                const pt5 = project(xOffset + s, -s, s);
                const pt6 = project(xOffset + s, s, s);
                const pt7 = project(xOffset - s, s, s);
                const colors = ["#10b981", "#3b82f6", "#ec4899", "#f59e0b"];
                const col = colors[idx % colors.length];
                return (
                  <g key={`box3d-${idx}`}>
                    <polygon points={`${pt4.x},${pt4.y} ${pt5.x},${pt5.y} ${pt6.x},${pt6.y} ${pt7.x},${pt7.y}`} fill={col} stroke="rgba(255,255,255,0.2)" />
                    <polygon points={`${project(xOffset - s, s, -s).x},${project(xOffset - s, s, -s).y} ${project(xOffset + s, s, -s).x},${project(xOffset + s, s, -s).y} ${pt6.x},${pt6.y} ${pt7.x},${pt7.y}`} fill="rgba(0,0,0,0.15)" />
                    <polygon points={`${project(xOffset + s, -s, -s).x},${project(xOffset + s, -s, -s).y} ${project(xOffset + s, s, -s).x},${project(xOffset + s, s, -s).y} ${pt6.x},${pt6.y} ${pt5.x},${pt5.y}`} fill="rgba(0,0,0,0.3)" />
                    <text x={project(xOffset, 0, s).x} y={project(xOffset, 0, s).y + 4.5} textAnchor="middle" fill="#fff" className="text-[11px] font-sans font-bold">{char}</text>
                  </g>
                );
              })}
            </g>
          );
        }
        case "circular": {
          const list = trialRes && trialRes.arr ? trialRes.arr : ["A", "B", "C", "D", "E"].slice(0, circularN);
          return (
            <g>
              <ellipse cx={project(0, 0, -0.4).x} cy={project(0, 0, -0.4).y} rx="90" ry="45" fill="rgba(15, 23, 42, 0.9)" stroke="#06b6d4" strokeWidth="2" />
              {list.map((char: string, idx: number) => {
                const angle = (idx * 2 * Math.PI) / list.length;
                const dist = 2.8;
                const pt = project(dist * Math.cos(angle), dist * Math.sin(angle), 0.8);
                const basePt = project(dist * Math.cos(angle), dist * Math.sin(angle), -0.2);
                return (
                  <g key={`circ3d-${idx}`}>
                    <line x1={basePt.x} y1={basePt.y} x2={pt.x} y2={pt.y} stroke="#64748b" strokeWidth="1.5" />
                    <circle cx={pt.x} cy={pt.y} r="8.5" fill="url(#circS)" />
                    <text x={pt.x} y={pt.y + 3.5} textAnchor="middle" fill="#fff" className="text-[10px] font-sans font-bold">{char}</text>
                  </g>
                );
              })}
            </g>
          );
        }
      }
    } else {
      // 2D View
      switch (expType) {
        case "urn": {
          return (
            <g>
              <path d="M 195 70 L 210 115 L 210 200 A 25 25 0 0 0 250 220 A 25 25 0 0 0 290 200 L 290 115 L 305 70 Z" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
              {Array.from({ length: redBalls }).map((_, i) => (
                <circle key={`r2d-${i}`} cx={222 + (i * 12) % 36} cy={140 + (i * 14) % 60} r="7" fill="#ef4444" />
              ))}
              {Array.from({ length: blueBalls }).map((_, i) => (
                <circle key={`b2d-${i}`} cx={242 + (i * 13) % 36} cy={145 + (i * 15) % 55} r="7" fill="#3b82f6" />
              ))}
              {trialRes && trialRes.picked && (
                <g>
                  <text x="250" y="50" textAnchor="middle" fill="#10b981" className="text-[10px] font-sans font-bold">លទ្ធផលចាប់បាន៖</text>
                  {trialRes.picked.map((ball: string, i: number) => (
                    <circle key={`picked-${i}`} cx={250 + (i - (trialRes.picked.length - 1) / 2) * 20} cy={64} r="7.5" fill={ball === "R" ? "#ef4444" : "#3b82f6"} stroke="#fff" />
                  ))}
                </g>
              )}
            </g>
          );
        }
        case "coin": {
          return (
            <g>
              {Array.from({ length: coins }).map((_, idx) => {
                const isHeads = trialRes && trialRes.flipped ? trialRes.flipped[idx] === "H" : idx % 2 === 0;
                const x = 250 + (idx - (coins - 1) / 2) * 65;
                return (
                  <g key={`coin2d-${idx}`} className={animating ? "animate-spin" : ""}>
                    <circle cx={x} cy={cy} r="22" fill={isHeads ? "url(#goldCoinGrad)" : "url(#silverCoinGrad)"} stroke="#ca8a04" strokeWidth="1" />
                    <text x={x} y={cy + 4.5} textAnchor="middle" fill="#000" className="text-[11px] font-sans font-extrabold">{isHeads ? "H" : "T"}</text>
                    <text x={x} y={cy + 38} textAnchor="middle" fill="#64748b" className="text-[9px] font-sans">{isHeads ? "ក្បាល" : "កន្ទុយ"}</text>
                  </g>
                );
              })}
            </g>
          );
        }
        case "dice": {
          return (
            <g>
              {Array.from({ length: dice }).map((_, idx) => {
                const val = trialRes && trialRes.rolled ? trialRes.rolled[idx] : (idx % 6) + 1;
                const x = 250 + (idx - (dice - 1) / 2) * 65;
                return (
                  <g key={`dice2d-${idx}`} className={animating ? "animate-bounce" : ""}>
                    <rect x={x - 20} y={cy - 20} width="40" height="40" rx="6" fill="#ffffff" stroke="#cbd5e1" />
                    {render2DDiceDots(x, cy, val)}
                  </g>
                );
              })}
            </g>
          );
        }
        case "numbers": {
          const list = trialRes && trialRes.digits ? trialRes.digits : [3, 4];
          return (
            <g>
              <rect x="150" y="70" width="200" height="110" rx="10" fill="rgba(249, 115, 22, 0.05)" stroke="#f97316" strokeDasharray="3 3" />
              <circle cx="210" cy="115" r="16" fill="#1e293b" stroke="#f97316" />
              <text x="210" y="119" textAnchor="middle" fill="#f97316" className="text-xs font-mono font-bold">{list[0] || "?"}</text>
              <text x="210" y="146" textAnchor="middle" fill="#64748b" className="text-[9px] font-sans">ខ្ទង់ដប់</text>
              <line x1="226" y1="115" x2="274" y2="115" stroke="#cbd5e1" />
              <circle cx="290" cy="115" r="16" fill="#1e293b" stroke="#0ea5e9" />
              <text x="290" y="119" textAnchor="middle" fill="#0ea5e9" className="text-xs font-mono font-bold">{list[1] || "?"}</text>
              <text x="290" y="146" textAnchor="middle" fill="#64748b" className="text-[9px] font-sans">ខ្ទង់រាយ</text>
              <text x="250" y="200" textAnchor="middle" fill="#f97316" className="text-xs font-sans font-bold">លេខបង្កើតបាន៖ {list.join("")}</text>
            </g>
          );
        }
        case "distinct":
        case "partition":
        case "repeat": {
          const list = trialRes && trialRes.arr ? trialRes.arr : ["A", "B", "C", "D"].slice(0, n);
          return (
            <g>
              {list.map((char: string, idx: number) => {
                const x = 250 + (idx - (list.length - 1) / 2) * 40;
                const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"];
                return (
                  <g key={`b2d-${idx}`}>
                    <rect x={x - 16} y={cy - 16} width="32" height="32" rx="4" fill={colors[idx % colors.length]} stroke="#fff" />
                    <text x={x} y={cy + 5} textAnchor="middle" fill="#fff" className="text-xs font-sans font-bold">{char}</text>
                  </g>
                );
              })}
            </g>
          );
        }
        case "circular": {
          const list = trialRes && trialRes.arr ? trialRes.arr : ["A", "B", "C", "D", "E"].slice(0, circularN);
          return (
            <g>
              <circle cx="250" cy="125" r="35" fill="rgba(15,23,42,0.8)" stroke="#ec4899" strokeWidth="2" />
              {list.map((char: string, idx: number) => {
                const angle = (idx * 2 * Math.PI) / list.length;
                const x = 250 + 55 * Math.cos(angle);
                const y = 125 + 55 * Math.sin(angle);
                return (
                  <g key={`circ2d-${idx}`}>
                    <circle cx={x} cy={y} r="11" fill="#c026d3" stroke="#fff" />
                    <text x={x} y={y + 3.5} textAnchor="middle" fill="#fff" className="text-[10px] font-sans font-bold">{char}</text>
                  </g>
                );
              })}
            </g>
          );
        }
      }
    }
  };

  // Bayes Visuals Renderers
  const renderBayesVisual = () => {
    const cx = 250;
    const cy = 135;

    const project = (xVal: number, yVal: number, zVal: number) => {
      const scale = 25;
      const px = cx - xVal * scale * Math.cos(Math.PI / 6) + yVal * scale * Math.cos(Math.PI / 6);
      const py = cy + xVal * scale * Math.sin(Math.PI / 6) + yVal * scale * Math.sin(Math.PI / 6) - zVal * scale;
      return { x: px, y: py };
    };

    if (bayesTab === "cond") {
      // Venn diagram
      if (view3D) {
        return (
          <g>
            {/* Cylinder A */}
            <ellipse cx={project(-1.2, 0, -0.4).x} cy={project(-1.2, 0, -0.4).y} rx="50" ry="25" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="1" />
            <ellipse cx={project(-1.2, 0, 0.4).x} cy={project(-1.2, 0, 0.4).y} rx="50" ry="25" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="1.5" />
            <line x1={project(-1.2, 0, -0.4).x - 50} y1={project(-1.2, 0, -0.4).y} x2={project(-1.2, 0, 0.4).x - 50} y2={project(-1.2, 0, 0.4).y} stroke="#ef4444" />
            <line x1={project(-1.2, 0, -0.4).x + 50} y1={project(-1.2, 0, -0.4).y} x2={project(-1.2, 0, 0.4).x + 50} y2={project(-1.2, 0, 0.4).y} stroke="#ef4444" />

            {/* Cylinder B */}
            <ellipse cx={project(1.2, 0, -0.4).x} cy={project(1.2, 0, -0.4).y} rx="50" ry="25" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="1" />
            <ellipse cx={project(1.2, 0, 0.4).x} cy={project(1.2, 0, 0.4).y} rx="50" ry="25" fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1={project(1.2, 0, -0.4).x - 50} y1={project(1.2, 0, -0.4).y} x2={project(1.2, 0, 0.4).x - 50} y2={project(1.2, 0, 0.4).y} stroke="#3b82f6" />
            <line x1={project(1.2, 0, -0.4).x + 50} y1={project(1.2, 0, -0.4).y} x2={project(1.2, 0, 0.4).x + 50} y2={project(1.2, 0, 0.4).y} stroke="#3b82f6" />

            {/* Golden glowing joint region */}
            <ellipse cx={project(0, 0, 0.4).x} cy={project(0, 0, 0.4).y} rx="22" ry="11" fill="rgba(234, 179, 8, 0.8)" stroke="#eab308" strokeWidth="2" className="animate-pulse" />
            <text x={project(0, 0, 1.2).x} y={project(0, 0, 1.2).y} textAnchor="middle" fill="#eab308" className="text-[10px] font-sans font-bold">A ∩ B</text>
          </g>
        );
      } else {
        return (
          <g>
            <circle cx="190" cy="130" r="55" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2" />
            <text x="150" y="134" fill="#ef4444" className="text-xs font-sans font-bold">P(A)</text>
            <circle cx="290" cy="130" r="55" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" />
            <text x="330" y="134" fill="#3b82f6" className="text-xs font-sans font-bold">P(B)</text>
            {/* Overlap area overlay */}
            <path d="M 240 92 A 55 55 0 0 1 240 168 A 55 55 0 0 1 240 92" fill="rgba(234, 179, 8, 0.65)" stroke="#eab308" strokeWidth="1.5" />
            <text x="240" y="134" textAnchor="middle" fill="#ffffff" className="text-[10px] font-sans font-bold">P(A∩B)</text>
          </g>
        );
      }
    } else {
      // Tree diagrams for Total Prob and Bayes
      const nodes2D = [
        { label: "Root", x: 70, y: 130 },
        { label: "A", x: 190, y: 70, val: priorA, name: "A" },
        { label: "A'", x: 190, y: 190, val: (1 - priorA), name: "A'" },
        { label: "B", x: 330, y: 40, path: "A ∩ B", p: priorA * likeAgivenB },
        { label: "B'", x: 330, y: 100, path: "A ∩ B'", p: priorA * (1 - likeAgivenB) },
        { label: "B", x: 330, y: 160, path: "A' ∩ B", p: (1 - priorA) * likeAgivenNotB },
        { label: "B'", x: 330, y: 220, path: "A' ∩ B'", p: (1 - priorA) * (1 - likeAgivenNotB) }
      ];

      if (view3D) {
        return (
          <g>
            {/* Draw 3D glowing isometric network tree */}
            <line x1={project(-3, 0, 0).x} y1={project(-3, 0, 0).y} x2={project(0, -2, 1).x} y2={project(0, -2, 1).y} stroke="#10b981" strokeWidth="2" />
            <line x1={project(-3, 0, 0).x} y1={project(-3, 0, 0).y} x2={project(0, 2, -1).x} y2={project(0, 2, -1).y} stroke="#64748b" strokeWidth="1.5" />
            <line x1={project(0, -2, 1).x} y1={project(0, -2, 1).y} x2={project(3, -3, 2).x} y2={project(3, -3, 2).y} stroke="#f59e0b" strokeWidth="2.5" />
            <line x1={project(0, -2, 1).x} y1={project(0, -2, 1).y} x2={project(3, -1, 0).x} y2={project(3, -1, 0).y} stroke="#64748b" strokeWidth="1" />
            <line x1={project(0, 2, -1).x} y1={project(0, 2, -1).y} x2={project(3, 1, 0).x} y2={project(3, 1, 0).y} stroke="#f59e0b" strokeWidth="2" />
            <line x1={project(0, 2, -1).x} y1={project(0, 2, -1).y} x2={project(3, 3, -2).x} y2={project(3, 3, -2).y} stroke="#64748b" strokeWidth="1" />

            {/* Nodes spheres */}
            <circle cx={project(-3, 0, 0).x} cy={project(-3, 0, 0).y} r="7" fill="#fff" />
            <circle cx={project(0, -2, 1).x} cy={project(0, -2, 1).y} r="10" fill="url(#rBall3D)" />
            <text x={project(0, -2, 1.7).x} y={project(0, -2, 1.7).y} textAnchor="middle" fill="#fff" className="text-[9px] font-sans">A</text>
            <circle cx={project(0, 2, -1).x} cy={project(0, 2, -1).y} r="10" fill="url(#bBall3D)" />
            <text x={project(0, 2, -0.3).x} y={project(0, 2, -0.3).y} textAnchor="middle" fill="#fff" className="text-[9px] font-sans">A'</text>

            <circle cx={project(3, -3, 2).x} cy={project(3, -3, 2).y} r="7" fill="url(#violetSphereGrad)" />
            <text x={project(3, -3, 2).x + 15} y={project(3, -3, 2).y} fill="#10b981" className="text-[8px] font-mono">P(A∩B)={ (priorA*likeAgivenB).toFixed(2) }</text>
            <circle cx={project(3, 1, 0).x} cy={project(3, 1, 0).y} r="7" fill="url(#violetSphereGrad)" />
            <text x={project(3, 1, 0).x + 15} y={project(3, 1, 0).y} fill="#38bdf8" className="text-[8px] font-mono">P(A'∩B)={ ((1-priorA)*likeAgivenNotB).toFixed(2) }</text>
          </g>
        );
      } else {
        return (
          <g>
            {/* Draw lines */}
            <line x1={nodes2D[0].x} y1={nodes2D[0].y} x2={nodes2D[1].x} y2={nodes2D[1].y} stroke="#94a3b8" strokeWidth="1.5" />
            <line x1={nodes2D[0].x} y1={nodes2D[0].y} x2={nodes2D[2].x} y2={nodes2D[2].y} stroke="#94a3b8" strokeWidth="1.5" />
            <line x1={nodes2D[1].x} y1={nodes2D[1].y} x2={nodes2D[3].x} y2={nodes2D[3].y} stroke="#10b981" strokeWidth="2" />
            <line x1={nodes2D[1].x} y1={nodes2D[1].y} x2={nodes2D[4].x} y2={nodes2D[4].y} stroke="#94a3b8" />
            <line x1={nodes2D[2].x} y1={nodes2D[2].y} x2={nodes2D[5].x} y2={nodes2D[5].y} stroke="#10b981" strokeWidth="2" />
            <line x1={nodes2D[2].x} y1={nodes2D[2].y} x2={nodes2D[6].x} y2={nodes2D[6].y} stroke="#94a3b8" />

            {/* Nodes content */}
            <circle cx={nodes2D[0].x} cy={nodes2D[0].y} r="6" fill="#64748b" />
            <circle cx={nodes2D[1].x} cy={nodes2D[1].y} r="15" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" />
            <text x={nodes2D[1].x} y={nodes2D[1].y + 4} textAnchor="middle" fill="#10b981" className="text-xs font-sans font-bold">A</text>
            <circle cx={nodes2D[2].x} cy={nodes2D[2].y} r="15" fill="rgba(148, 163, 184, 0.15)" stroke="#94a3b8" />
            <text x={nodes2D[2].x} y={nodes2D[2].y + 4} textAnchor="middle" fill="#94a3b8" className="text-xs font-sans font-bold">A'</text>

            <circle cx={nodes2D[3].x} cy={nodes2D[3].y} r="11" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" />
            <text x={nodes2D[3].x} y={nodes2D[3].y + 4} textAnchor="middle" fill="#f59e0b" className="text-[9px] font-sans font-bold">B</text>
            <text x={nodes2D[3].x + 16} y={nodes2D[3].y + 3} fill="#10b981" className="text-[9px] font-mono">{nodes2D[3].p.toFixed(3)}</text>

            <circle cx={nodes2D[5].x} cy={nodes2D[5].y} r="11" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" />
            <text x={nodes2D[5].x} y={nodes2D[5].y + 4} textAnchor="middle" fill="#f59e0b" className="text-[9px] font-sans font-bold">B</text>
            <text x={nodes2D[5].x + 16} y={nodes2D[5].y + 3} fill="#10b981" className="text-[9px] font-mono">{nodes2D[5].p.toFixed(3)}</text>

            {/* Line probabilities labeling */}
            <text x="130" y="90" fill="#a8a29e" className="text-[8px] font-mono">P(A)={priorA}</text>
            <text x="130" y="175" fill="#a8a29e" className="text-[8px] font-mono">P(A')={(1 - priorA).toFixed(2)}</text>
            <text x="260" y="45" fill="#10b981" className="text-[8px] font-mono">P(B|A)={likeAgivenB}</text>
            <text x="260" y="145" fill="#10b981" className="text-[8px] font-mono">P(B|A')={likeAgivenNotB}</text>
          </g>
        );
      }
    }
  };

  // Bayes Calculations Results
  const totalProbB = (priorA * likeAgivenB) + ((1 - priorA) * likeAgivenNotB);
  const posteriorA_B = totalProbB > 0 ? (priorA * likeAgivenB) / totalProbB : 0;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="probability-explorer">
      {/* Dynamic Gradients Header definitions */}
      <svg className="hidden">
        <defs>
          <radialGradient id="rBall3D" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
          <radialGradient id="bBall3D" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <radialGradient id="circS" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f5d0fe" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#701a75" />
          </radialGradient>
          <radialGradient id="violetSphereGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>
          <linearGradient id="goldCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="silverCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="bronzeEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
          <linearGradient id="heads3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="tails3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>
      </svg>

      {/* Navigation Headers and Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5 border-b border-white/5 pb-4">
        <div>
          <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            មេរៀនទី ៩៖ ប្រូបាប និងវិភាគបន្សំ
          </span>
          <h4 className="font-sans font-bold text-white text-base mt-2">ម៉ាស៊ីនពិសោធន៍ប្រូបាប និងបន្សំ (Combinatorics & Probability Engine)</h4>
          <p className="font-sans text-xs text-slate-400 mt-1">
            ស្វែងយល់ពីប្រូបាបមានលក្ខខណ្ឌ ទ្រឹស្តីបៃយេស និងការពិសោធន៍ចៃដន្យ 2D/3D៖
          </p>
        </div>

        {/* Tab Selector between Trials, Bayes, and Game */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 self-start">
          <button
            onClick={() => setSubSection("trials")}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition ${subSection === "trials" ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold" : "text-slate-400 hover:text-white"}`}
          >
            🎲 ពិសោធន៍ចៃដន្យ & បន្សំ
          </button>
          <button
            onClick={() => setSubSection("bayes")}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition ${subSection === "bayes" ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold" : "text-slate-400 hover:text-white"}`}
          >
            📊 លក្ខខណ្ឌ & បៃយេស
          </button>
          <button
            onClick={() => setSubSection("game")}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition ${subSection === "game" ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold" : "text-slate-400 hover:text-white"}`}
          >
            🎮 ម៉ាស៊ីនល្បែងកម្សាន្ត
          </button>
        </div>
      </div>

      {subSection === "trials" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Combinatorics Left Side Controls */}
          <div className="lg:col-span-4 bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#ff4e00]" />
              <span>គណនាវិភាគបន្សំ (Combinatorics)</span>
            </h5>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">ចំនួនធាតុសរុប (n)</span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={n}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value));
                    setN(val);
                    if (val < r) setR(val);
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">ចំនួនជ្រើសរើស (r)</span>
                <input
                  type="number"
                  min="0"
                  max={n}
                  value={r}
                  onChange={(e) => setR(Math.min(n, Math.max(0, Number(e.target.value))))}
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-slate-400 mb-0.5">ចម្លាស់លីនេអ៊ែរ (Permutations) P(n, r)៖</div>
                <div className="text-[#ff8c00] font-bold flex justify-between">
                  <span dangerouslySetInnerHTML={{ __html: renderMath(`P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!}`) }} />
                  <span>= {perm.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-slate-400 mb-0.5">បន្សំ (Combinations) C(n, r)៖</div>
                <div className="text-emerald-400 font-bold flex justify-between">
                  <span dangerouslySetInnerHTML={{ __html: renderMath(`C(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!r!}`) }} />
                  <span>= {comb.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-slate-400 mb-0.5">ចម្លាស់វង់ (Circular) (n-1)!៖</div>
                <div className="text-violet-400 font-bold flex justify-between">
                  <span>P_c = ({n}-1)!</span>
                  <span>= {fact(n - 1).toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-slate-400 mb-0.5">ចម្លាស់ច្រំដែល (With Repetition) n^r៖</div>
                <div className="text-pink-400 font-bold flex justify-between">
                  <span>P_r = {n}^{r}</span>
                  <span>= {Math.pow(n, r).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Random Trials Right Side Container */}
          <div className="lg:col-span-8 bg-white/5 p-4 border border-white/10 rounded-xl flex flex-col space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
              <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-emerald-400" />
                <span>ពិសោធន៍ចៃដន្យ (Random Experiments Panel)</span>
              </h5>

              {/* 2D / 3D Toggle */}
              <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10">
                <button onClick={() => setView3D(false)} className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${!view3D ? "bg-[#ff4e00] text-white" : "text-slate-400"}`}>2D</button>
                <button onClick={() => setView3D(true)} className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${view3D ? "bg-[#ff4e00] text-white" : "text-slate-400"}`}>3D</button>
              </div>
            </div>

            {/* Experiment Mode Selector */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 pb-1 overflow-x-auto scrollbar-thin">
              {[
                { id: "urn", label: "🔴 ចាប់បាល់" },
                { id: "coin", label: "🪙 បោះកាក់" },
                { id: "dice", label: "🎲 ឡុកឡាក់" },
                { id: "numbers", label: "🔢 បង្កើតលេខ" },
                { id: "distinct", label: "📦 ចម្លាស់ n" },
                { id: "circular", label: "🔄 ចម្លាស់វង់" },
                { id: "partition", label: "🧩 ចម្លាស់ក្រុម" },
                { id: "repeat", label: "🔁 ចម្លាស់សា" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setExpType(tab.id as any); setTrialRes(null); }}
                  className={`py-1 px-1.5 rounded text-[10px] text-center font-sans font-bold whitespace-nowrap transition ${expType === tab.id ? "bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/30" : "bg-black/30 text-slate-400 border border-transparent hover:text-white"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-panels for active experiment parameter tuning */}
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {expType === "urn" && (
                <>
                  <div>
                    <span className="text-[10px] text-red-400 block mb-1">បាល់ក្រហម (Red)៖</span>
                    <input type="number" min="0" max="10" value={redBalls} onChange={(e) => setRedBalls(Math.max(0, Number(e.target.value)))} className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white w-full" />
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-400 block mb-1">បាល់ខៀវ (Blue)៖</span>
                    <input type="number" min="0" max="10" value={blueBalls} onChange={(e) => setBlueBalls(Math.max(0, Number(e.target.value)))} className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white w-full" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 block mb-1">ចំនួនចាប់ (Picks)៖</span>
                    <select value={urnPicks} onChange={(e) => setUrnPicks(Number(e.target.value))} className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white w-full">
                      <option value={1}>ចាប់ម្ដង ១បាល់</option>
                      <option value={2}>ចាប់ម្ដង ២បាល់</option>
                      <option value={3}>ចាប់ម្ដង ៣បាល់</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" checked={urnRepeat} onChange={(e) => setUrnRepeat(e.target.checked)} id="urnRepeat" className="accent-[#ff4e00]" />
                    <label htmlFor="urnRepeat" className="text-[10px] text-slate-300">ចាប់ដោយសងវិញ (With Replacement)</label>
                  </div>
                </>
              )}

              {expType === "coin" && (
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">ចំនួនកាក់ (Coins)៖</span>
                  <input type="range" min="1" max="4" value={coins} onChange={(e) => setCoins(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                  <div className="text-[9px] text-right text-slate-300 font-mono mt-1">{coins} កាក់</div>
                </div>
              )}

              {expType === "dice" && (
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">ចំនួនគ្រាប់ឡុកឡាក់ (Dice)៖</span>
                  <input type="range" min="1" max="3" value={dice} onChange={(e) => setDice(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                  <div className="text-[9px] text-right text-slate-300 font-mono mt-1">{dice} គ្រាប់</div>
                </div>
              )}

              {expType === "numbers" && (
                <>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">ប្រវែងខ្ទង់លេខ (Length)៖</span>
                    <select value={numLength} onChange={(e) => setNumLength(Number(e.target.value))} className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-xs text-white w-full">
                      <option value={2}>២ ខ្ទង់</option>
                      <option value={3}>៣ ខ្ទង់</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" checked={numRepeat} onChange={(e) => setNumRepeat(e.target.checked)} id="numRepeat" className="accent-[#ff4e00]" />
                    <label htmlFor="numRepeat" className="text-[10px] text-slate-300">អនុញ្ញាតឱ្យលេខដដែលៗ (With Repetition)</label>
                  </div>
                </>
              )}

              {expType === "circular" && (
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">ចំនួនកៅអី/ធាតុ ( Seats )៖</span>
                  <input type="range" min="3" max="5" value={circularN} onChange={(e) => setCircularN(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                  <div className="text-[9px] text-right text-slate-300 font-mono mt-1">{circularN} នាក់</div>
                </div>
              )}

              {(expType === "distinct" || expType === "partition" || expType === "repeat") && (
                <div className="col-span-2">
                  <p className="text-[10px] text-slate-400">កំណត់ប៉ារ៉ាម៉ែត្រ $n, r$ នៅក្នុងប្រអប់ Combinatorics ខាងឆ្វេង ដើម្បីមើលការប្រែប្រួលនៃចម្លាស់ធាតុ!</p>
                </div>
              )}
            </div>

            {/* Interactive Visual Playground */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-3 relative flex flex-col items-center justify-center min-h-[200px]" id="experiments-canvas">
              <span className="absolute top-2 left-2 text-[8px] text-slate-500 font-mono">
                🔍 បង្ហាញ៖ {view3D ? "3D Perspective Grid" : "2D Orthogonal Schematic"}
              </span>
              <svg viewBox="0 0 460 230" className="w-full max-w-[420px] h-auto overflow-visible">
                {renderVisual()}
              </svg>

              {/* Action and Trial Button */}
              <button
                onClick={runExperimentTrial}
                disabled={animating}
                className="mt-2 px-5 py-1.5 bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:scale-105 transition duration-200 text-white font-sans text-xs font-bold rounded-lg disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-orange-500/10"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${animating ? "animate-spin" : ""}`} />
                <span>{animating ? "កំពុងបោះ..." : "ធ្វើការពិសោធន៍ (Run Trial)"}</span>
              </button>
            </div>

            {/* History tracking stats */}
            {history.length > 0 && (
              <div className="p-2.5 bg-black/40 rounded-lg border border-white/5 space-y-1">
                <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">ប្រវត្តិពិសោធន៍ចុងក្រោយ (Trial Log History)៖</span>
                <div className="flex flex-wrap gap-1 max-h-[50px] overflow-y-auto font-mono text-[9px] text-slate-400">
                  {history.map((h, i) => (
                    <span key={i} className="bg-white/5 px-1.5 py-0.5 rounded text-emerald-400">
                      #{history.length - i}៖ {h.picked ? h.picked.join("") : h.flipped ? h.flipped.join("") : h.rolled ? `[${h.rolled}] Sum:${h.sum}` : h.digits ? h.val : h.arr ? h.arr.join("") : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Bayes and Conditional Sub-Section
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Inputs Left Column */}
          <div className="lg:col-span-4 bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
              <span>កំណត់ប៉ារ៉ាម៉ែត្រលក្ខខណ្ឌ</span>
            </h5>

            {/* Select Bayes Type */}
            <div className="flex bg-black/30 p-1 rounded-lg border border-white/5">
              <button onClick={() => setBayesTab("cond")} className={`flex-1 py-1 rounded text-[10px] font-sans font-bold ${bayesTab === "cond" ? "bg-[#ff4e00]/10 text-[#ff4e00]" : "text-slate-400"}`}>ប្រូបាបលក្ខខណ្ឌ</button>
              <button onClick={() => setBayesTab("total")} className={`flex-1 py-1 rounded text-[10px] font-sans font-bold ${bayesTab === "total" ? "bg-[#ff4e00]/10 text-[#ff4e00]" : "text-slate-400"}`}>ប្រូបាបសរុប</button>
              <button onClick={() => setBayesTab("bayes")} className={`flex-1 py-1 rounded text-[10px] font-sans font-bold ${bayesTab === "bayes" ? "bg-[#ff4e00]/10 text-[#ff4e00]" : "text-slate-400"}`}>បៃយេស (Bayes)</button>
            </div>

            {bayesTab === "cond" ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>ប្រូបាប P(A)៖</span>
                    <span className="font-mono text-orange-400 font-bold">{probA}</span>
                  </div>
                  <input type="range" min="0.1" max="0.9" step="0.05" value={probA} onChange={(e) => setProbA(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>ប្រូបាប P(B)៖</span>
                    <span className="font-mono text-orange-400 font-bold">{probB}</span>
                  </div>
                  <input type="range" min="0.1" max="0.9" step="0.05" value={probB} onChange={(e) => setProbB(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>ប្រូបាបប្រសព្វ P(A ∩ B)៖</span>
                    <span className="font-mono text-yellow-400 font-bold">{validOverlap.toFixed(2)}</span>
                  </div>
                  <input type="range" min="0.0" max="0.9" step="0.05" value={probAandB} onChange={(e) => setProbAandB(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                  <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">ប្រព័ន្ធចងភ្ជាប់ស្វ័យប្រវត្តិកម្រិត៖ {minOverlap.toFixed(2)} ដល់ {maxOverlap.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>Prior P(A) (ម៉ាស៊ីន A)៖</span>
                    <span className="font-mono text-orange-400 font-bold">{priorA}</span>
                  </div>
                  <input type="range" min="0.1" max="0.9" step="0.05" value={priorA} onChange={(e) => setPriorA(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>Likelihood P(B|A) (ខូចដោយ A)៖</span>
                    <span className="font-mono text-orange-400 font-bold">{likeAgivenB}</span>
                  </div>
                  <input type="range" min="0.05" max="0.95" step="0.05" value={likeAgivenB} onChange={(e) => setLikeAgivenB(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                    <span>Likelihood P(B|A') (ខូចដោយ A')៖</span>
                    <span className="font-mono text-orange-400 font-bold">{likeAgivenNotB}</span>
                  </div>
                  <input type="range" min="0.05" max="0.95" step="0.05" value={likeAgivenNotB} onChange={(e) => setLikeAgivenNotB(Number(e.target.value))} className="w-full accent-[#ff4e00]" />
                </div>
              </div>
            )}
          </div>

          {/* Visual display of formulas and SVG */}
          <div className="lg:col-span-8 bg-white/5 p-4 border border-white/10 rounded-xl flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {bayesTab === "cond" ? "វិភាគប្រូបាបមានលក្ខខណ្ឌ" : bayesTab === "total" ? "ទ្រឹស្តីបទប្រូបាបសរុប (Total Prob)" : "ទ្រឹស្តីបទបៃយេស (Bayes' Theorem)"}
                </span>
              </h5>
              <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10">
                <button onClick={() => setView3D(false)} className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${!view3D ? "bg-[#ff4e00] text-white" : "text-slate-400"}`}>2D</button>
                <button onClick={() => setView3D(true)} className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${view3D ? "bg-[#ff4e00] text-white" : "text-slate-400"}`}>3D</button>
              </div>
            </div>

            {/* Calculations LaTeX details */}
            <div className="bg-black/40 p-3 rounded-lg border border-white/5 text-xs font-mono">
              {bayesTab === "cond" ? (
                <div className="space-y-1.5 text-slate-300">
                  <div className="text-[10px] text-[#ff8c00] font-sans">រូបមន្តប្រូបាបមានលក្ខខណ្ឌ៖</div>
                  <div dangerouslySetInnerHTML={{ __html: renderMathBlock(`P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{${validOverlap.toFixed(2)}}{${probB}} = ${(validOverlap / probB).toFixed(4)}`) }} />
                  <div dangerouslySetInnerHTML={{ __html: renderMathBlock(`P(B|A) = \\frac{P(A \\cap B)}{P(A)} = \\frac{${validOverlap.toFixed(2)}}{${probA}} = ${(validOverlap / probA).toFixed(4)}`) }} />
                </div>
              ) : bayesTab === "total" ? (
                <div className="space-y-1.5 text-slate-300">
                  <div className="text-[10px] text-[#ff8c00] font-sans">រូបមន្តប្រូបាបសរុប (Total Probability)៖</div>
                  <div dangerouslySetInnerHTML={{ __html: renderMathBlock(`P(B) = P(B|A)P(A) + P(B|A')P(A')`) }} />
                  <div dangerouslySetInnerHTML={{ __html: renderMathBlock(`P(B) = (${likeAgivenB} \\times ${priorA}) + (${likeAgivenNotB} \\times ${(1 - priorA).toFixed(2)}) = ${totalProbB.toFixed(4)}`) }} />
                </div>
              ) : (
                <div className="space-y-1.5 text-slate-300">
                  <div className="text-[10px] text-[#ff8c00] font-sans">រូបមន្តទ្រឹស្តីបទបៃយេស (Bayes' Theorem)៖</div>
                  <div dangerouslySetInnerHTML={{ __html: renderMathBlock(`P(A|B) = \\frac{P(B|A)P(A)}{P(B)}`) }} />
                  <div dangerouslySetInnerHTML={{ __html: renderMathBlock(`P(A|B) = \\frac{${likeAgivenB} \\times ${priorA}}{${totalProbB.toFixed(4)}} = ${posteriorA_B.toFixed(4)}`) }} />
                </div>
              )}
            </div>

            {/* SVG Visualizer diagram */}
            <div className="bg-black/30 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center min-h-[200px]" id="bayes-canvas">
              <svg viewBox="0 0 460 230" className="w-full max-w-[420px] h-auto overflow-visible">
                {renderBayesVisual()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {subSection === "game" && (
        <div className="space-y-6">
          {/* Game Selection Tabs */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 max-w-md mx-auto">
            <button
              onClick={() => setGameChoice("monty")}
              className={`flex-1 py-2 rounded-lg text-xs font-sans font-medium transition flex items-center justify-center gap-1.5 ${gameChoice === "monty" ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold shadow" : "text-slate-400 hover:text-white"}`}
            >
              🚪 ល្បែងទ្វារសំណាង (Monty Hall)
            </button>
            <button
              onClick={() => setGameChoice("plinko")}
              className={`flex-1 py-2 rounded-lg text-xs font-sans font-medium transition flex items-center justify-center gap-1.5 ${gameChoice === "plinko" ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold shadow" : "text-slate-400 hover:text-white"}`}
            >
              🏀 ជញ្ជាំងគ្រាប់បាល់ហ្គាល់តុន (Plinko)
            </button>
          </div>

          {/* MONTY HALL SIMULATOR */}
          {gameChoice === "monty" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Monty Hall Controls & Stats (Left) */}
              <div className="lg:col-span-5 bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
                <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  <span>ទិន្នន័យនៃការពិសោធន៍ប្រូបាប (Statistics)</span>
                </h5>

                {/* Main Win percentages comparing Stay vs Switch */}
                <div className="space-y-3 bg-black/30 p-3 rounded-lg border border-white/5">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-sans">
                      <span>យុទ្ធសាស្ត្ររក្សាទ្វារដដែល (Stay)</span>
                      <span className="font-mono text-[#ff8c00] font-bold">
                        {montyStayTotal > 0 ? `${((montyStayWins / montyStayTotal) * 100).toFixed(1)}%` : "0.0%"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#ff8c00] h-full transition-all duration-300"
                        style={{ width: `${montyStayTotal > 0 ? (montyStayWins / montyStayTotal) * 100 : 0}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex justify-between">
                      <span>ឈ្នះ: {montyStayWins} / សរុប: {montyStayTotal}</span>
                      <span>ទ្រឹស្តី: 33.3% (1/3)</span>
                    </div>
                  </div>

                  <hr className="border-white/5" />

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-sans">
                      <span>យុទ្ធសាស្ត្រផ្លាស់ប្តូរទ្វារ (Switch)</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {montySwitchTotal > 0 ? `${((montySwitchWins / montySwitchTotal) * 100).toFixed(1)}%` : "0.0%"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-400 h-full transition-all duration-300"
                        style={{ width: `${montySwitchTotal > 0 ? (montySwitchWins / montySwitchTotal) * 100 : 0}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex justify-between">
                      <span>ឈ្នះ: {montySwitchWins} / សរុប: {montySwitchTotal}</span>
                      <span>ទ្រឹស្តី: 66.7% (2/3)</span>
                    </div>
                  </div>
                </div>

                {/* Auto simulator buttons */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold font-sans">ម៉ាស៊ីនពិសោធន៍ល្បឿនលឿន (Auto-Simulation)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => runMontyAutoSim(100)}
                      className="bg-white/10 hover:bg-white/15 border border-white/5 text-white font-semibold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-[#ff8c00]" />
                      <span>ពិសោធន៍ +100</span>
                    </button>
                    <button
                      onClick={() => runMontyAutoSim(1000)}
                      className="bg-white/10 hover:bg-white/15 border border-white/5 text-white font-semibold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      <span>ពិសោធន៍ +1000</span>
                    </button>
                  </div>
                  <button
                    onClick={clearMontyStats}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>លុបទិន្នន័យ (Reset Stats)</span>
                  </button>
                </div>

                {/* Event Logs */}
                <div className="bg-black/35 rounded-lg p-2.5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold">កំណត់ត្រាការលេង និងការពិសោធន៍៖</span>
                  <div className="h-32 overflow-y-auto text-[10px] font-mono text-slate-300 space-y-1 pr-1 custom-scrollbar">
                    {montyLog.length === 0 ? (
                      <div className="text-slate-500 italic text-center pt-8">មិនទាន់មានកំណត់ត្រានៅឡើយទេ</div>
                    ) : (
                      montyLog.map((log, idx) => (
                        <div key={idx} className="border-b border-white/5 pb-1 leading-relaxed">
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Monty Hall Visual Arena (Right) */}
              <div className="lg:col-span-7 bg-white/5 p-4 border border-white/10 rounded-xl flex flex-col justify-between space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>សង្វៀនល្បែងទ្វារសំណាង (Monty Hall Interactive Arena)</span>
                  </h5>
                  <p className="text-xs text-slate-300 mt-2 font-sans">
                    ជ្រើសរើសទ្វារមួយដើម្បីស្វែងរក <strong className="text-emerald-400">ឡានស្ព័រ 🚗</strong>! ជៀសវាង <strong className="text-slate-400">ពពែ 🐐</strong>!
                  </p>
                </div>

                {/* 3 Doors Visual */}
                <div className="grid grid-cols-3 gap-4 py-4">
                  {[0, 1, 2].map((doorIdx) => {
                    const isSelected = montySelected === doorIdx;
                    const isRevealed = montyRevealed === doorIdx;
                    const isGameOver = montyStage === "result";
                    const isCar = montyCarDoor === doorIdx;

                    let cardClass = "relative aspect-[3/4] rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ";
                    let doorBg = "";

                    if (isGameOver) {
                      // Show everything opened
                      if (isCar) {
                        doorBg = "bg-gradient-to-b from-emerald-950/80 to-emerald-900/60 border-emerald-500 shadow-lg shadow-emerald-500/20";
                      } else {
                        doorBg = "bg-slate-900 border-white/10 opacity-70";
                      }
                    } else if (isRevealed) {
                      // Host revealed this goat
                      doorBg = "bg-slate-950 border-red-500/40 opacity-70 scale-95";
                    } else if (isSelected) {
                      // User currently selecting
                      doorBg = "bg-amber-950/80 border-amber-500 shadow-md shadow-amber-500/20 scale-105 ring-2 ring-amber-500/30";
                    } else {
                      // Unselected closed door
                      doorBg = "bg-gradient-to-b from-[#3a2010] to-[#251005] hover:from-[#4a2b16] hover:to-[#2e1507] border-[#5a3820] hover:border-amber-500/50 hover:scale-[1.02]";
                    }

                    return (
                      <div
                        key={doorIdx}
                        onClick={() => handleMontySelect(doorIdx)}
                        className={`${cardClass} ${doorBg}`}
                      >
                        {/* Selected overlay border */}
                        {isSelected && !isGameOver && (
                          <div className="absolute top-1.5 left-1.5 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
                            ជម្រើសរបស់អ្នក
                          </div>
                        )}

                        {/* Door Contents */}
                        {isGameOver || isRevealed ? (
                          <div className="text-center space-y-2 flex flex-col items-center justify-center h-full p-2">
                            {isCar ? (
                              <>
                                <span className="text-4xl animate-bounce">🚗</span>
                                <span className="text-[10px] text-emerald-400 font-bold font-sans">ឡានស្ព័រ (ឈ្នះ!)</span>
                              </>
                            ) : (
                              <>
                                <span className="text-4xl">🐐</span>
                                <span className="text-[10px] text-slate-400 font-bold font-sans">ពពែ (ចាញ់)</span>
                              </>
                            )}
                            {isRevealed && !isGameOver && (
                              <div className="mt-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[8px] px-1 py-0.5 uppercase tracking-wide font-semibold font-sans">
                                ម៉ុងទី បើកបង្ហើប
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center space-y-3 h-full flex flex-col items-center justify-between py-5 px-1 relative w-full">
                            {/* Wood Door Detail lines */}
                            <div className="absolute inset-x-2 inset-y-2 border border-amber-800/40 rounded-lg pointer-events-none" />
                            
                            <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10">
                              <span className="text-xs text-amber-500 font-bold font-mono">{doorIdx + 1}</span>
                            </div>
                            
                            {/* Door Knob */}
                            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-600 border border-yellow-700 shadow-md flex items-center justify-center my-2">
                              <div className="w-1 h-1 rounded-full bg-yellow-900" />
                            </div>

                            <span className="text-[9px] text-amber-600 uppercase tracking-wider font-bold">ទ្វារបិទជិត</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Sub controls depending on phase */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
                  {montyStage === "select" && (
                    <div className="text-center py-2 space-y-1">
                      <div className="text-xs text-slate-300 font-semibold font-sans">👉 ជំហានទី ១៖ ជ្រើសរើសទ្វារដំបូងរបស់អ្នក</div>
                      <p className="text-[10px] text-slate-400 font-sans">សូមចុចលើទ្វារណាមួយខាងលើដែលអ្នកពេញចិត្ត។</p>
                    </div>
                  )}

                  {montyStage === "switch" && (
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-xs text-yellow-400 font-bold font-sans flex items-center justify-center gap-1">
                          <span>🤔 ជំហានទី ២៖ ម៉ុងទី បើកទ្វារលេខ {montyRevealed !== null ? montyRevealed + 1 : ""} បង្ហាញពពែ 🐐!</span>
                        </div>
                        <p className="text-[10px] text-slate-300 font-sans mt-1">
                          តើអ្នកចង់ប្តូរជម្រើសទៅកាន់ទ្វារដែលនៅសល់ ឬរក្សាជម្រើសទ្វារចាស់ដដែល?
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                        <button
                          onClick={() => handleMontyDecision(false)}
                          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition duration-200 shadow"
                        >
                          រក្សាទុកដដែល (Stay)
                        </button>
                        <button
                          onClick={() => handleMontyDecision(true)}
                          className="bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:from-[#ff621a] hover:to-[#ffa31a] text-white font-bold py-2 px-3 rounded-lg text-xs transition duration-200 shadow flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>ផ្លាស់ប្តូរទ្វារ (Switch)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {montyStage === "result" && (
                    <div className="space-y-3 text-center">
                      <div>
                        {montyResultWin ? (
                          <div className="text-sm text-emerald-400 font-bold font-sans animate-pulse">
                            🎉 អបអរសាទរ! អ្នកបានឈ្នះរថយន្តស្ព័រ 🚗!
                          </div>
                        ) : (
                          <div className="text-sm text-red-400 font-bold font-sans">
                            🐐 សោកស្តាយណាស់! អ្នកបានសត្វពពែ!
                          </div>
                        )}
                        <p className="text-[10px] text-slate-400 mt-1 font-sans">
                          {montySwitched 
                            ? "ការសម្រេចចិត្តផ្លាស់ប្តូរទ្វាររបស់អ្នក បាននាំឱ្យអ្នកមកទ្វារនេះ។"
                            : "ការសម្រេចចិត្តរក្សាទុកទ្វារចាស់ដដែល បាននាំឱ្យអ្នកមកទ្វារនេះ។"}
                        </p>
                      </div>
                      <button
                        onClick={resetMontyGame}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition duration-200 shadow inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>លេងម្តងទៀត (Play Again)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Khmer Educational Context for Monty Hall */}
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 text-[10px] text-slate-300 leading-relaxed font-sans">
                  <span className="text-[#ff8c00] font-bold block mb-1">💡 ហេតុអ្វីការប្តូរទ្វារជានិច្ចផ្តល់ប្រូបាបឈ្នះ ២/៣ (៦៦.៧%)?</span>
                  <p>
                    កាលពីដើម ឱកាសជ្រើសរើសទ្វារចំឡានស្ព័រគឺ ១/៣ (៣៣%) និងចំទ្វារពពែគឺ ២/៣ (៦៧%)។ នៅពេលអ្នកសម្របសម្រួលបើកបង្ហាញទ្វារពពែមួយចេញ នោះរាល់ករណីដែលអ្នករើសចំទ្វារពពែតាំងពីដំបូង (២/៣) នឹងប្រែជាឈ្នះឡានវិញ ប្រសិនបើអ្នកជ្រើសរើស <strong>"ប្តូរទ្វារ"</strong>។ ដូចនេះ យុទ្ធសាស្ត្រផ្លាស់ប្តូរទ្វារមានប្រូបាបឈ្នះខ្ពស់ជាងរក្សាដដែលទ្វេដង!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* GALTON BOARD PLINKO */}
          {gameChoice === "plinko" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Plinko Controls & Stats (Left) */}
              <div className="lg:col-span-5 bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
                <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ស្ថិតិប្រឡោះនីមួយៗ (Bin Distributions)</span>
                </h5>

                <div className="space-y-3 bg-black/30 p-3 rounded-lg border border-white/5">
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-sans">
                    <span>ចំនួនគ្រាប់បាល់សរុប៖</span>
                    <span className="font-mono text-[#ff4e00] font-bold text-sm">
                      {plinkoTotalBalls} គ្រាប់
                    </span>
                  </div>

                  {/* Bin rows stats displaying empirical vs theoretical */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {[0, 1, 2, 3, 4, 5, 6].map((binIdx) => {
                      const count = plinkoBins[binIdx];
                      const pct = plinkoTotalBalls > 0 ? (count / plinkoTotalBalls) * 100 : 0;
                      // Theoretical percentages for n=6: (1, 6, 15, 20, 15, 6, 1)/64
                      const theoreticalPct = [1.56, 9.38, 23.44, 31.25, 23.44, 9.38, 1.56][binIdx];

                      return (
                        <div key={binIdx} className="space-y-0.5">
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>ប្រឡោះ #{binIdx} (k={binIdx})</span>
                            <span>{count} គ្រាប់ ({pct.toFixed(1)}%) vs ទ្រឹស្តី {theoreticalPct.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                            {/* Empirical bar */}
                            <div 
                              className="bg-emerald-400 h-full transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Fast Simulator Controls */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold font-sans">ទម្លាក់គ្រាប់បាល់ស្វ័យប្រវត្តិ (Fast Auto-Toss)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => runPlinkoAutoSim(100)}
                      className="bg-white/10 hover:bg-white/15 border border-white/5 text-white font-semibold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>ទម្លាក់ +100 គ្រាប់</span>
                    </button>
                    <button
                      onClick={() => runPlinkoAutoSim(1000)}
                      className="bg-white/10 hover:bg-white/15 border border-white/5 text-white font-semibold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      <span>ទម្លាក់ +1000 គ្រាប់</span>
                    </button>
                  </div>
                  <button
                    onClick={resetPlinkoBoard}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>សម្អាតក្តារ (Reset Board)</span>
                  </button>
                </div>
              </div>

              {/* Plinko Live SVG Visual Arena (Right) */}
              <div className="lg:col-span-7 bg-white/5 p-4 border border-white/10 rounded-xl flex flex-col justify-between space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
                    <Grid className="w-3.5 h-3.5 text-[#ff4e00]" />
                    <span>ក្តារហ្គាល់តុនផ្ទាល់ (Galton Board Visual Arena)</span>
                  </h5>
                  <p className="text-xs text-slate-300 mt-2 font-sans">
                    ចុច <strong>"ទម្លាក់គ្រាប់បាល់"</strong> ដើម្បីមើលការលោតទម្លាក់តាមរូបមន្តប្រូបាប P=0.5 ឆ្វេង/ស្តាំ។
                  </p>
                </div>

                {/* Plinko Board Drawing Area */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex justify-center items-center">
                  <svg viewBox="0 0 400 250" className="w-full max-w-[380px] h-auto overflow-visible">
                    {/* Bins / Channels Dividers at the bottom (y: 220 to 250) */}
                    {[80, 120, 160, 200, 240, 280, 320].map((x, idx) => (
                      <g key={`bin-divider-${idx}`}>
                        <line x1={x} y1={214} x2={x} y2={245} stroke="#334155" strokeWidth="2" strokeDasharray="1,1" />
                        {/* Bin labels */}
                        <text x={x} y={248} fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                          {idx}
                        </text>
                      </g>
                    ))}
                    
                    {/* Bin floors glass overlay */}
                    <line x1="60" y1="214" x2="340" y2="214" stroke="#475569" strokeWidth="2" />

                    {/* Pegs / Pins Pyramid */}
                    {/* Row 0 to 5 */}
                    {[0, 1, 2, 3, 4, 5].map((rowIdx) => {
                      return [0, 1, 2, 3, 4, 5].slice(0, rowIdx + 1).map((colIdx) => {
                        const px = 200 + (colIdx - rowIdx / 2) * 40;
                        const py = 50 + rowIdx * 28;
                        return (
                          <circle
                            key={`peg-${rowIdx}-${colIdx}`}
                            cx={px}
                            cy={py}
                            r="3"
                            fill="#cbd5e1"
                            stroke="#475569"
                            strokeWidth="1"
                          />
                        );
                      });
                    })}

                    {/* Funnel at the top */}
                    <path d="M 180,10 L 195,20 L 195,30 M 220,10 L 205,20 L 205,30" stroke="#475569" strokeWidth="2" fill="none" />

                    {/* Current Animating Ball */}
                    {plinkoBallPos && (
                      <circle
                        cx={plinkoBallPos.x}
                        cy={plinkoBallPos.y}
                        r="6"
                        fill="#facc15"
                        stroke="#eab308"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                    )}

                    {/* Static visual graph overlays representing bin fill counts */}
                    {[0, 1, 2, 3, 4, 5, 6].map((binIdx) => {
                      const count = plinkoBins[binIdx];
                      const height = plinkoTotalBalls > 0 ? Math.min(45, (count / plinkoTotalBalls) * 90) : 0;
                      const bx = 62 + binIdx * 40;
                      return (
                        <rect
                          key={`bin-fill-${binIdx}`}
                          x={bx + 6}
                          y={214 - height}
                          width="26"
                          height={height}
                          fill="url(#emeraldGrad)"
                          rx="2"
                          opacity="0.65"
                        />
                      );
                    })}

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Drop Trigger Button */}
                <div className="flex justify-center">
                  <button
                    onClick={dropPlinkoBall}
                    disabled={plinkoAnimating}
                    className={`px-5 py-2.5 rounded-lg text-xs font-bold text-white transition-all shadow-md flex items-center gap-2 ${
                      plinkoAnimating
                        ? "bg-slate-700 cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 animate-pulse" />
                    <span>{plinkoAnimating ? "គ្រាប់បាល់កំពុងធ្លាក់..." : "ទម្លាក់គ្រាប់បាល់ (Drop Ball)"}</span>
                  </button>
                </div>

                {/* Khmer Educational Context for Galton Board */}
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 text-[10px] text-slate-300 leading-relaxed font-sans">
                  <span className="text-[#ff8c00] font-bold block mb-1">💡 តើក្តារ Plinko បង្ហាញពីប្រូបាបយ៉ាងដូចម្តេច?</span>
                  <p>
                    នៅគ្រប់ចំណុចនៃម្ជុលដែក គ្រាប់បាល់ត្រូវធ្វើការសម្រេចចិត្តដោយចៃដន្យ បត់ឆ្វេង (០) ឬបត់ស្តាំ (១) ជាមួយប្រូបាបស្មើគ្នាគឺ $0.5$។ បន្ទាប់ពីឆ្លងកាត់ជួរម្ជុលទាំង ៦ ទីតាំងចុងក្រោយនៃគ្រាប់បាល់នីមួយៗគឺជាផលបូកនៃការសម្រេចចិត្តទាំងនោះ ដែលវាដើរតាម<strong>របាយទ្វេធា (Binomial Distribution)</strong> Bin(6, 0.5)។ នៅពេលចំនួនគ្រាប់បាល់កាន់តែច្រើន កម្ពស់នៃជួរនីមួយៗនឹងបង្កើតបានជា រូបរាងជួង (Bell Curve) ដែលស្របទៅនឹង<strong>ទ្រឹស្តីបទលីមីតកណ្តាល</strong>!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Safe math parser for custom user functions
const evaluateCustom = (x: number, expr: string): number => {
  if (!expr || expr.trim() === "") return NaN;
  try {
    let clean = expr.toLowerCase();
    
    // Replace ^ with **
    clean = clean.replace(/\^/g, "**");
    
    // Implicit multiplication: digit followed by a letter or parenthesis (e.g., 2x -> 2*x, 2(x) -> 2*(x))
    clean = clean.replace(/(\d+)\s*([a-zA-Z\(])/g, "$1*$2");
    
    // Implicit multiplication: x or closing parenthesis followed by a letter or parenthesis (e.g., x(x) -> x*(x))
    clean = clean.replace(/([x\)])\s*([a-zA-Z\(])/g, "$1*$2");
    
    // Create a function with mapped safe arguments
    const fn = new Function(
      "x", "sin", "cos", "tan", "log", "ln", "exp", "sqrt", "abs", "pi", "e",
      `return (${clean});`
    );
    
    const val = fn(
      x,
      Math.sin,
      Math.cos,
      Math.tan,
      Math.log10,
      Math.log,
      Math.exp,
      Math.sqrt,
      Math.abs,
      Math.PI,
      Math.E
    );
    
    if (typeof val === "number" && !isNaN(val) && isFinite(val)) {
      return val;
    }
  } catch (err) {
    // Fail silently with NaN
  }
  return NaN;
};

export function CurveSketchingExplorer() {
  const [funcType, setFuncType] = useState<string>("quadratic");
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-2);
  const [c, setC] = useState<number>(1);
  
  // Custom formula states
  const [customExpr, setCustomExpr] = useState<string>("x^2 - 3*x + 1");
  const [customError, setCustomError] = useState<string>("");

  // Reset defaults on type change to keep graphs highly legible and well-bounded
  const handleTypeChange = (type: string) => {
    setFuncType(type);
    if (type === "quadratic") {
      setA(1);
      setB(-2);
      setC(1);
    } else if (type === "rational") {
      setA(1);
      setB(-2);
      setC(2);
    } else if (type === "exponential") {
      setA(1);
      setB(-1);
      setC(1);
    } else if (type === "logarithmic") {
      setA(1);
      setB(1);
      setC(-1);
    }
  };

  const handleCustomExprChange = (val: string) => {
    setCustomExpr(val);
    setFuncType("custom");
    
    if (!val.trim()) {
      setCustomError("");
      return;
    }
    
    try {
      let clean = val.toLowerCase().replace(/\^/g, "**");
      clean = clean.replace(/(\d+)\s*([a-zA-Z\(])/g, "$1*$2");
      clean = clean.replace(/([x\)])\s*([a-zA-Z\(])/g, "$1*$2");
      
      new Function(
        "x", "sin", "cos", "tan", "log", "ln", "exp", "sqrt", "abs", "pi", "e",
        `return (${clean});`
      );
      setCustomError("");
    } catch (err) {
      setCustomError("រូបមន្តមិនត្រឹមត្រូវ (Syntax Error)");
    }
  };

  // Quadratic calculations
  const x_crit = funcType === "quadratic" ? (a === 0 ? 0 : -b / (2 * a)) : 0;
  const y_crit = funcType === "quadratic" ? (a * x_crit * x_crit + b * x_crit + c) : 0;

  // Rational calculations: y = (ax^2 + bx + c) / (x - 1)
  const rat_D = a * (a + b + c);
  const rat_hasExtrema = rat_D > 0 && a !== 0;
  const rat_x1 = rat_hasExtrema ? 1 - Math.sqrt(rat_D) / Math.abs(a) : 0;
  const rat_x2 = rat_hasExtrema ? 1 + Math.sqrt(rat_D) / Math.abs(a) : 0;
  const rat_y1 = rat_hasExtrema ? (a * rat_x1 * rat_x1 + b * rat_x1 + c) / (rat_x1 - 1) : 0;
  const rat_y2 = rat_hasExtrema ? (a * rat_x2 * rat_x2 + b * rat_x2 + c) / (rat_x2 - 1) : 0;

  // Exponential calculations: y = (ax + b) * e^x + c
  const exp_x = a !== 0 ? -1 - b / a : 0;
  const exp_y = a !== 0 ? (a * exp_x + b) * Math.exp(exp_x) + c : 0;

  // Logarithmic calculations: y = ax + b + c * ln(x)
  const log_hasExtrema = a !== 0 && (-c / a) > 0;
  const log_x = log_hasExtrema ? -c / a : 0;
  const log_y = log_hasExtrema ? a * log_x + b + c * Math.log(log_x) : 0;

  // Numerical local extrema scanner for custom formulas
  const customExtrema: { x: number; y: number; type: "max" | "min" }[] = [];
  if (funcType === "custom" && customExpr.trim() !== "" && !customError) {
    let prevY = evaluateCustom(-4.8, customExpr);
    let prevSlope = 0;
    
    for (let sx = -4.75; sx <= 4.8; sx += 0.05) {
      const sy = evaluateCustom(sx, customExpr);
      if (!isNaN(sy) && !isNaN(prevY) && isFinite(sy) && isFinite(prevY)) {
        const slope = sy - prevY;
        if (prevSlope !== 0 && slope !== 0) {
          if ((prevSlope > 0 && slope < 0) || (prevSlope < 0 && slope > 0)) {
            const extX = sx - 0.025;
            const extY = evaluateCustom(extX, customExpr);
            if (!isNaN(extY) && isFinite(extY)) {
              customExtrema.push({
                x: extX,
                y: extY,
                type: prevSlope > 0 ? "max" : "min"
              });
            }
          }
        }
        prevSlope = slope;
      }
      prevY = sy;
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="curve-sketching-explorer">
      {/* Header Block with Custom Expression input in the top right (yellow circle) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 border-b border-white/5 pb-4">
        <div className="flex-1">
          <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            មេរៀនទី ១០៖ សិក្សាអនុគមន៍ខ្សែគោល
          </span>
          <h4 className="font-sans font-bold text-white text-base mt-2">ឧបករណ៍វិភាគខ្សែគោល និងតារាងអថេរភាព (Curve Variation Analyzer)</h4>
          <p className="font-sans text-xs text-slate-400 mt-1">
            ជ្រើសរើសប្រភេទអនុគមន៍ រួចកែសម្រួលមេគុណដើម្បីវិភាគក្រាប អាស៉ីមតូត និងសង់តារាងអថេរភាពដោយស្វ័យប្រវត្ត៖
          </p>
        </div>
        
        {/* Custom expression input container (Yellow Circle area) */}
        <div className="w-full lg:w-80 bg-white/5 border border-orange-500/20 rounded-xl p-3 flex flex-col gap-1.5 shadow-lg shadow-orange-500/5 hover:border-orange-500/40 transition-all duration-300">
          <label className="text-[11px] font-sans text-orange-400 font-bold flex items-center gap-1">
            <span>✍️ សរសេរអនុគមន៍ផ្ទាល់ខ្លួន (Custom Formula)</span>
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="ឧទាហរណ៍៖ x^2 - 3*x + 1"
              value={customExpr}
              onChange={(e) => handleCustomExprChange(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#ff4e00]/50"
            />
            {funcType === "custom" && (
              <button
                onClick={() => {
                  setCustomExpr("");
                  setCustomError("");
                  handleTypeChange("quadratic");
                }}
                className="px-2 py-1 text-[10px] font-sans text-slate-400 hover:text-white border border-white/10 rounded-lg bg-white/5 transition-all"
              >
                លុប
              </button>
            )}
          </div>
          {customError ? (
            <span className="text-[10px] text-red-400 font-sans font-medium">{customError}</span>
          ) : (
            <span className="text-[9px] text-slate-400 font-sans">
              គាំទ្រ៖ <code className="text-orange-300">+, -, *, /, ^, sin, cos, ln, exp, sqrt, abs</code>
            </span>
          )}
        </div>
      </div>

      {/* Function Type Selector Tabbed Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {[
          { id: "quadratic", label: "ដឺក្រេទី ២ (Quadratic)", desc: "y = ax² + bx + c" },
          { id: "rational", label: "សនិទានដឺក្រេទី២លើទី១", desc: "y = (ax² + bx + c) / (x - 1)" },
          { id: "exponential", label: "អិចស្ប៉ូណង់ស្យែលលាយពហុធា", desc: "y = (ax + b)e^x + c" },
          { id: "logarithmic", label: "លោការីតនេពែលាយពហុធា", desc: "y = ax + b + c·ln(x)" }
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => handleTypeChange(type.id)}
            className={`px-2.5 py-2 rounded-xl border text-[11px] font-semibold font-sans transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
              funcType === type.id
                ? "bg-[#ff4e00] text-white border-[#ff4e00] shadow-lg shadow-[#ff4e00]/20"
                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <span className="truncate w-full">{type.label}</span>
            <span className="text-[9px] opacity-75 font-mono truncate w-full">{type.desc}</span>
          </button>
        ))}
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[240px]" id="curve-sketching-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#ff4e00]" />
          <span>
            {funcType === "quadratic" && `គំនូរខ្សែគោលប៉ារ៉ាបូល (Quadratic Parabola)`}
            {funcType === "rational" && `គំនូរខ្សែគោលសនិទានដឺក្រេទី២លើទី១ (Rational Degree 2/1)`}
            {funcType === "exponential" && `គំនូរខ្សែគោលអិចស្ប៉ូណង់ស្យែលលាយពហុធា (Mixed Exponential Curve)`}
            {funcType === "logarithmic" && `គំនូរខ្សែគោលលោការីតនេពែលាយពហុធា (Mixed Natural Logarithm Curve)`}
          </span>
        </span>
        
        <svg viewBox="0 0 400 200" className="w-full max-w-[480px] h-auto overflow-visible mt-4">
          {/* Subtle grid lines for a premium graphing feel */}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((gridX) => (
            <line
              key={`gridX-${gridX}`}
              x1={200 + gridX * 32}
              y1="10"
              x2={200 + gridX * 32}
              y2="190"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          ))}
          {[-8, -6, -4, -2, 2, 4, 6, 8].map((gridY) => (
            <line
              key={`gridY-${gridY}`}
              x1="20"
              y1={120 - gridY * 8}
              x2="380"
              y2={120 - gridY * 8}
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          ))}

          {/* Coordinate axes */}
          <line x1="20" y1="120" x2="380" y2="120" stroke="#475569" strokeWidth="1.25" />
          <line x1="200" y1="10" x2="200" y2="190" stroke="#475569" strokeWidth="1.25" />
          
          {/* Axis Labels */}
          <text x="375" y="135" fill="#94a3b8" className="text-[10px] font-mono">x</text>
          <text x="212" y="18" fill="#94a3b8" className="text-[10px] font-mono font-bold">y</text>

          {(() => {
            const mapX = (xVal: number) => 200 + xVal * 32;
            const mapY = (yVal: number) => 120 - yVal * 8;

            if (funcType === "quadratic") {
              const points: string[] = [];
              for (let sx = -4.8; sx <= 4.8; sx += 0.1) {
                const sy = a * sx * sx + b * sx + c;
                const px = mapX(sx);
                const py = mapY(sy);
                if (py < 10 || py > 190) continue;
                if (points.length === 0) points.push(`M ${px} ${py}`);
                else points.push(`L ${px} ${py}`);
              }
              const pathStr = points.join(" ");
              const critX = mapX(x_crit);
              const critY = mapY(y_crit);

              return (
                <>
                  {/* Vertex Horizontal Tangent */}
                  {critY >= 10 && critY <= 190 && (
                    <line x1="30" y1={critY} x2="370" y2={critY} stroke="#f97316" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
                  )}
                  {/* Function Curve */}
                  {pathStr && <path d={pathStr} fill="none" stroke="#ff4e00" strokeWidth="2.5" strokeLinecap="round" />}
                  {/* Critical Vertex dot */}
                  {critY >= 10 && critY <= 190 && (
                    <>
                      <circle cx={critX} cy={critY} r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                      <text x={critX + 8} y={critY - 5} fill="#f43f5e" className="text-[9px] font-mono font-bold">V({x_crit.toFixed(1)}, {y_crit.toFixed(1)})</text>
                    </>
                  )}
                </>
              );
            } else if (funcType === "rational") {
              // y = (ax^2 + bx + c) / (x - 1)
              // asymptote at x = 1
              const leftPoints: string[] = [];
              const rightPoints: string[] = [];

              for (let sx = -4.8; sx <= 4.8; sx += 0.05) {
                if (Math.abs(sx - 1) < 0.15) continue; // safety gap around vertical asymptote
                const sy = (a * sx * sx + b * sx + c) / (sx - 1);
                const px = mapX(sx);
                const py = mapY(sy);
                if (py < 10 || py > 190) continue;

                if (sx < 1) {
                  if (leftPoints.length === 0) leftPoints.push(`M ${px} ${py}`);
                  else leftPoints.push(`L ${px} ${py}`);
                } else {
                  if (rightPoints.length === 0) rightPoints.push(`M ${px} ${py}`);
                  else rightPoints.push(`L ${px} ${py}`);
                }
              }

              const leftPath = leftPoints.join(" ");
              const rightPath = rightPoints.join(" ");
              const asympX = mapX(1);

              // Oblique asymptote line: y = ax + (a + b)
              const x1_o = -4.8;
              const y1_o = a * x1_o + a + b;
              const x2_o = 4.8;
              const y2_o = a * x2_o + a + b;
              const asymp_x1 = mapX(x1_o);
              const asymp_y1 = mapY(y1_o);
              const asymp_x2 = mapX(x2_o);
              const asymp_y2 = mapY(y2_o);

              return (
                <>
                  {/* Vertical Asymptote x = 1 */}
                  {asympX >= 30 && asympX <= 370 && (
                    <>
                      <line x1={asympX} y1="10" x2={asympX} y2="190" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" />
                      <text x={asympX + 6} y="22" fill="#06b6d4" className="text-[8px] font-mono font-bold">x = 1 (ឈរ)</text>
                    </>
                  )}
                  {/* Oblique Asymptote y = ax + (a+b) */}
                  {asymp_y1 >= 10 && asymp_y1 <= 190 && asymp_y2 >= 10 && asymp_y2 <= 190 && (
                    <>
                      <line x1={asymp_x1} y1={asymp_y1} x2={asymp_x2} y2={asymp_y2} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
                      <text x="25" y={asymp_y1 - 5} fill="#10b981" className="text-[8px] font-mono font-bold">y = {a === 1 ? "" : a === -1 ? "-" : a}x {a+b >= 0 ? "+" : "-"} {Math.abs(a+b)} (ទ្រត)</text>
                    </>
                  )}
                  {/* Local Extrema Dots if any */}
                  {rat_hasExtrema && (
                    <>
                      {mapY(rat_y1) >= 10 && mapY(rat_y1) <= 190 && (
                        <>
                          <circle cx={mapX(rat_x1)} cy={mapY(rat_y1)} r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
                          <text x={mapX(rat_x1) + 6} y={mapY(rat_y1) - 4} fill="#f43f5e" className="text-[8px] font-mono font-bold">E1({rat_x1.toFixed(1)}, {rat_y1.toFixed(1)})</text>
                        </>
                      )}
                      {mapY(rat_y2) >= 10 && mapY(rat_y2) <= 190 && (
                        <>
                          <circle cx={mapX(rat_x2)} cy={mapY(rat_y2)} r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
                          <text x={mapX(rat_x2) + 6} y={mapY(rat_y2) - 4} fill="#f43f5e" className="text-[8px] font-mono font-bold">E2({rat_x2.toFixed(1)}, {rat_y2.toFixed(1)})</text>
                        </>
                      )}
                    </>
                  )}
                  {/* Two hyperbola branches */}
                  {leftPath && <path d={leftPath} fill="none" stroke="#ff4e00" strokeWidth="2.5" strokeLinecap="round" />}
                  {rightPath && <path d={rightPath} fill="none" stroke="#ff4e00" strokeWidth="2.5" strokeLinecap="round" />}
                </>
              );
            } else if (funcType === "exponential") {
              // y = (ax + b) * e^x + c
              const points: string[] = [];
              for (let sx = -4.8; sx <= 4.8; sx += 0.05) {
                const sy = (a * sx + b) * Math.exp(sx) + c;
                const px = mapX(sx);
                const py = mapY(sy);
                if (py < 10 || py > 190) continue;
                if (points.length === 0) points.push(`M ${px} ${py}`);
                else points.push(`L ${px} ${py}`);
              }
              const pathStr = points.join(" ");
              const asympY = mapY(c);

              return (
                <>
                  {/* Horizontal Asymptote y = c (as x -> -infinity) */}
                  {asympY >= 10 && asympY <= 190 && (
                    <>
                      <line x1="20" y1={asympY} x2="380" y2={asympY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
                      <text x="25" y={asympY - 5} fill="#10b981" className="text-[8px] font-mono font-bold">y = {c} (ដេក, x → -∞)</text>
                    </>
                  )}
                  {/* Extrema Dot */}
                  {a !== 0 && mapY(exp_y) >= 10 && mapY(exp_y) <= 190 && (
                    <>
                      <circle cx={mapX(exp_x)} cy={mapY(exp_y)} r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
                      <text x={mapX(exp_x) + 6} y={mapY(exp_y) - 4} fill="#f43f5e" className="text-[8px] font-mono font-bold">E({exp_x.toFixed(1)}, {exp_y.toFixed(1)})</text>
                    </>
                  )}
                  {/* Function Curve */}
                  {pathStr && <path d={pathStr} fill="none" stroke="#ff4e00" strokeWidth="2.5" strokeLinecap="round" />}
                </>
              );
            } else if (funcType === "logarithmic") {
              // y = ax + b + c * ln(x), domain x > 0
              const points: string[] = [];
              for (let sx = 0.05; sx <= 4.8; sx += 0.05) {
                const sy = a * sx + b + c * Math.log(sx);
                const px = mapX(sx);
                const py = mapY(sy);
                if (py < 10 || py > 190) continue;
                if (points.length === 0) points.push(`M ${px} ${py}`);
                else points.push(`L ${px} ${py}`);
              }
              const pathStr = points.join(" ");
              const asympX = mapX(0);

              return (
                <>
                  {/* Vertical Asymptote x = 0 */}
                  {asympX >= 30 && asympX <= 370 && (
                    <>
                      <line x1={asympX} y1="10" x2={asympX} y2="190" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" />
                      <text x={asympX + 6} y="22" fill="#06b6d4" className="text-[8px] font-mono font-bold">x = 0 (ឈរ)</text>
                    </>
                  )}
                  {/* Shaded undefined area on the left of x = 0 */}
                  {asympX > 30 && (
                    <rect x="20" y="10" width={asympX - 20} height="180" fill="rgba(239, 68, 68, 0.05)" />
                  )}
                  {/* Extrema Dot */}
                  {log_hasExtrema && mapY(log_y) >= 10 && mapY(log_y) <= 190 && (
                    <>
                      <circle cx={mapX(log_x)} cy={mapY(log_y)} r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
                      <text x={mapX(log_x) + 6} y={mapY(log_y) - 4} fill="#f43f5e" className="text-[8px] font-mono font-bold">E({log_x.toFixed(1)}, {log_y.toFixed(1)})</text>
                    </>
                  )}
                  {/* Function Curve */}
                  {pathStr && <path d={pathStr} fill="none" stroke="#ff4e00" strokeWidth="2.5" strokeLinecap="round" />}
                </>
              );
            } else if (funcType === "custom") {
              const points: string[] = [];
              let isDrawing = false;
              
              for (let sx = -4.8; sx <= 4.8; sx += 0.02) {
                const sy = evaluateCustom(sx, customExpr);
                const px = mapX(sx);
                const py = mapY(sy);
                
                if (isNaN(sy) || !isFinite(sy) || py < 10 || py > 190) {
                  isDrawing = false;
                  continue;
                }
                
                if (!isDrawing) {
                  points.push(`M ${px} ${py}`);
                  isDrawing = true;
                } else {
                  points.push(`L ${px} ${py}`);
                }
              }
              const pathStr = points.join(" ");

              return (
                <>
                  {/* Function Curve */}
                  {pathStr && <path d={pathStr} fill="none" stroke="#ff4e00" strokeWidth="2.5" strokeLinecap="round" />}
                  
                  {/* Numerical Extrema Dots */}
                  {customExtrema.map((ext, idx) => {
                    const cx = mapX(ext.x);
                    const cy = mapY(ext.y);
                    if (cy >= 10 && cy <= 190 && cx >= 20 && cx <= 380) {
                      return (
                        <g key={`custom-ext-${idx}`}>
                          <circle cx={cx} cy={cy} r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
                          <text x={cx + 6} y={cy - 4} fill="#f43f5e" className="text-[8px] font-mono font-bold">
                            {ext.type === "max" ? "Max" : "Min"}({ext.x.toFixed(1)}, {ext.y.toFixed(1)})
                          </text>
                        </g>
                      );
                    }
                    return null;
                  })}
                </>
              );
            }
            return null;
          })()}
        </svg>

        <div className="text-[10px] text-slate-400 font-sans mt-3 text-center flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#ff4e00] inline-block rounded" />
            <span>
              {funcType === "quadratic" && `ខ្សែគោល y = ${a}x² ${b >= 0 ? "+" : ""} ${b}x ${c >= 0 ? "+" : ""} ${c}`}
              {funcType === "rational" && `ខ្សែគោល y = (${a}x² ${b >= 0 ? "+" : ""} ${b}x ${c >= 0 ? "+" : ""} ${c}) / (x - 1)`}
              {funcType === "exponential" && `ខ្សែគោល y = (${a}x ${b >= 0 ? "+" : ""} ${b})·e^x ${c >= 0 ? "+" : ""} ${c}`}
              {funcType === "logarithmic" && `ខ្សែគោល y = ${a}x ${b >= 0 ? "+" : ""} ${b} ${c >= 0 ? "+" : ""} ${c}·ln(x)`}
              {funcType === "custom" && `ខ្សែគោល y = ${customExpr || "..."}`}
            </span>
          </span>
          {funcType === "quadratic" && (
            <span className="flex items-center gap-1.5 text-orange-400">
              <span className="w-2.5 h-0.5 border-t border-dashed border-[#f97316] inline-block" />
              <span>បន្ទាត់ប៉ះត្រង់កំពូល y = {y_crit.toFixed(2)}</span>
            </span>
          )}
          {funcType === "rational" && (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-0.5 border-t border-dashed border-[#10b981] inline-block" />
              <span>អាស៉ីមតូតទ្រត y = {a === 1 ? "" : a === -1 ? "-" : a}x {a+b >= 0 ? "+" : "-"} {Math.abs(a+b)}</span>
            </span>
          )}
          {(funcType === "rational" || funcType === "logarithmic") && (
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-0.5 border-t border-dashed border-[#06b6d4] inline-block" />
              <span>អាស៉ីមតូតឈរ</span>
            </span>
          )}
          {funcType === "exponential" && (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-0.5 border-t border-dashed border-[#10b981] inline-block" />
              <span>អាស៉ីមតូតដេក y = {c}</span>
            </span>
          )}
          {funcType === "custom" && customExtrema.length > 0 && (
            <span className="flex items-center gap-1.5 text-orange-400">
              <span className="w-2 px-1 text-[8px] border border-orange-500/30 rounded inline-block bg-orange-500/10 font-bold">E</span>
              <span>មានចំណុចបរមា {customExtrema.length}</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {funcType === "custom" ? (
          <div className="space-y-4 bg-white/5 p-4 border border-white/10 rounded-xl flex flex-col justify-between">
            <div>
              <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-3">
                <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
                <span>រូបមន្តអនុគមន៍ផ្ទាល់ខ្លួន (Custom Formula Details)</span>
              </h5>
              
              <div className="bg-black/30 p-3 rounded-lg border border-white/5 space-y-1.5 mb-3">
                <div className="text-[11px] text-slate-300">
                  អនុគមន៍បច្ចុប្បន្ន៖
                </div>
                <div className="text-sm font-mono text-orange-400 font-bold bg-black/50 p-2 rounded border border-white/10 break-all">
                  f(x) = {customExpr || "..."}
                </div>
              </div>

              <div className="text-[11px] text-slate-300 mb-2">
                សាកល្បងរូបមន្តគំរូដ៏គួរឱ្យចាប់អារម្មណ៍ខាងក្រោម៖
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "រលក Sinc (sin(x)/x)", expr: "sin(x) / x" },
                  { label: "កណ្ដឹង Gaussian", expr: "exp(-x^2)" },
                  { label: "ដឺក្រេទី ៣ (Cubic)", expr: "x^3 - 3*x" },
                  { label: "ខ្សែកោង Agnesi", expr: "1 / (x^2 + 1)" },
                  { label: "តម្លៃដាច់ខាត (Abs)", expr: "abs(x)" },
                  { label: "រលកបូកបញ្ចូលគ្នា", expr: "sin(x) + cos(2*x)" }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCustomExprChange(preset.expr)}
                    className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 text-left hover:text-white font-sans transition-all hover:border-orange-500/30"
                  >
                    💡 {preset.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-[10px] text-slate-400 leading-relaxed font-sans mt-3 bg-black/20 p-2 rounded border border-white/5">
              💡 <strong>ណែនាំ៖</strong> អ្នកអាចប្រើប្រាស់សញ្ញាគណិតវិទ្យាដូចជា <code className="text-orange-300 font-mono">+, -, *, /, ^</code> និងអនុគមន៍ <code className="text-orange-300 font-mono">sin, cos, tan, ln, log, exp, sqrt, abs</code>។
            </div>
          </div>
        ) : (
          <div className="space-y-4 bg-white/5 p-4 border border-white/10 rounded-xl">
            <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
              <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
              <span>កែសម្រួលមេគុណ (Coefficients)</span>
            </h5>

            <div>
              <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
                <span>
                  {funcType === "quadratic" && "មេគុណ a (ដឺក្រេទី ២)"}
                  {funcType === "rational" && "មេគុណ a (ដឺក្រេទី ២ នៃភាគយក)"}
                  {funcType === "exponential" && "មេគុណ a (មេគុណ x នៃពហុធា)"}
                  {funcType === "logarithmic" && "មេគុណ a (មេគុណ x នៃពហុធា)"}
                </span>
                <span className="font-mono text-orange-400 font-bold">{a}</span>
              </div>
              <input
                type="text"
                className="hidden"
                value={a}
                readOnly
              />
              <input
                type="range"
                min="-3"
                max="3"
                step="1"
                value={a}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setA(val === 0 ? 1 : val);
                }}
                className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
                <span>
                  {funcType === "quadratic" && "មេគុណ b (ដឺក្រេទី ១)"}
                  {funcType === "rational" && "មេគុណ b (ដឺក្រេទី ១ នៃភាគយក)"}
                  {funcType === "exponential" && "មេគុណ b (តួសេរីនៃពហុធា)"}
                  {funcType === "logarithmic" && "មេគុណ b (តួសេរីពហុធា)"}
                </span>
                <span className="font-mono text-orange-400 font-bold">{b}</span>
              </div>
              <input
                type="range"
                min={funcType === "quadratic" ? "-6" : "-4"}
                max={funcType === "quadratic" ? "6" : "4"}
                step="1"
                value={b}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setB(val);
                }}
                className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
                <span>
                  {funcType === "quadratic" && "មេគុណ c (តួសេរី)"}
                  {funcType === "rational" && "មេគុណ c (តួសេរីនៃភាគយក)"}
                  {funcType === "exponential" && "មេគុណ c (តួសេរីអាស៉ីមតូតដេក)"}
                  {funcType === "logarithmic" && "មេគុណ c (មេគុណនៃ ln(x))"}
                </span>
                <span className="font-mono text-orange-400 font-bold">{c}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={c}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (funcType === "logarithmic" && val === 0) {
                    setC(-1);
                  } else {
                    setC(val);
                  }
                }}
                className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer"
              />
            </div>

            <div className="bg-black/30 p-3 rounded-lg border border-white/5 space-y-1 text-xs font-mono">
              {funcType === "quadratic" && (
                <>
                  <div>អនុគមន៍៖ <span className="text-white">f(x) = {a === 1 ? "" : a === -1 ? "-" : a}x² {b >= 0 ? "+" : ""} {b}x {c >= 0 ? "+" : ""} {c}</span></div>
                  <div>ដេរីវេ៖ <span className="text-[#ff8c00]">f'(x) = {2 * a}x {b >= 0 ? "+" : ""} {b}</span></div>
                </>
              )}
              {funcType === "rational" && (
                <>
                  <div>អនុគមន៍៖ <span className="text-white">f(x) = ({a === 1 ? "" : a === -1 ? "-" : a}x² {b >= 0 ? "+" : ""} {b}x {c >= 0 ? "+" : ""} {c}) / (x - 1)</span></div>
                  <div>ដេរីវេ៖ <span className="text-[#ff8c00]">f'(x) = ({a === 1 ? "" : a === -1 ? "-" : a}x² - {2 * a}x {b+c >= 0 ? "-" : "+"} {Math.abs(b+c)}) / (x - 1)²</span></div>
                </>
              )}
              {funcType === "exponential" && (
                <>
                  <div>អនុគមន៍៖ <span className="text-white">f(x) = ({a === 1 ? "" : a === -1 ? "-" : a}x {b >= 0 ? "+" : ""} {b}) · e^x {c >= 0 ? "+" : ""} {c}</span></div>
                  <div>ដេរីវេ៖ <span className="text-[#ff8c00]">f'(x) = ({a === 1 ? "" : a === -1 ? "-" : a}x {a+b >= 0 ? "+" : ""} {a+b}) · e^x</span></div>
                </>
              )}
              {funcType === "logarithmic" && (
                <>
                  <div>អនុគមន៍៖ <span className="text-white">f(x) = {a === 1 ? "" : a === -1 ? "-" : a}x {b >= 0 ? "+" : ""} {b} {c >= 0 ? "+" : ""} {c} · ln(x)</span></div>
                  <div>ដេរីវេ៖ <span className="text-[#ff8c00]">f'(x) = ({a === 1 ? "" : a === -1 ? "-" : a}x {c >= 0 ? "+" : ""} {c}) / x</span></div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Variation Table */}
        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Grid className="w-3.5 h-3.5 text-[#ff8c00]" />
            <span>តារាងអថេរភាព (Table of Variations)</span>
          </h5>

          {funcType === "quadratic" && (
            <div className="border border-white/10 rounded-lg overflow-hidden font-mono text-xs">
              {/* Header x */}
              <div className="grid grid-cols-4 bg-black/40 text-slate-400 font-bold py-1.5 px-2 border-b border-white/10">
                <span>x</span>
                <span>-∞</span>
                <span className="text-[#ff4e00] font-bold text-center">{x_crit.toFixed(2)}</span>
                <span className="text-right">+∞</span>
              </div>

              {/* Row f'(x) */}
              <div className="grid grid-cols-4 py-1.5 px-2 border-b border-white/10 items-center">
                <span className="text-slate-400 font-bold">f'(x)</span>
                <span>{a > 0 ? "-" : "+"}</span>
                <span className="text-center font-bold text-white">0</span>
                <span className="text-right">{a > 0 ? "+" : "-"}</span>
              </div>

              {/* Row f(x) with arrows */}
              <div className="grid grid-cols-4 py-3 px-2 items-center bg-white/5 h-16">
                <span className="text-slate-400 font-bold">f(x)</span>
                <span className="self-start">{a > 0 ? "+∞" : "-∞"}</span>
                <span className="text-center font-bold text-white self-center">
                  <div className="text-[10px] text-orange-400 font-sans">{a > 0 ? "អប្បបរមា" : "អតិបរមា"}</div>
                  {y_crit.toFixed(2)}
                </span>
                <span className="text-right self-end">{a > 0 ? "+∞" : "-∞"}</span>
              </div>
            </div>
          )}

          {funcType === "rational" && (() => {
            const D_val = a * (a + b + c);
            const hasExtr = D_val > 0 && a !== 0;
            const x1_val = hasExtr ? 1 - Math.sqrt(D_val) / Math.abs(a) : 0;
            const x2_val = hasExtr ? 1 + Math.sqrt(D_val) / Math.abs(a) : 0;
            const y1_val = hasExtr ? (a * x1_val * x1_val + b * x1_val + c) / (x1_val - 1) : 0;
            const y2_val = hasExtr ? (a * x2_val * x2_val + b * x2_val + c) / (x2_val - 1) : 0;

            const signL = a > 0 ? "+" : "-";
            const signR = a > 0 ? "+" : "-";

            return (
              <div className="border border-white/10 rounded-lg overflow-hidden font-mono text-xs">
                {/* Header x */}
                <div className="grid grid-cols-6 bg-black/40 text-slate-400 font-bold py-1.5 px-2 border-b border-white/10 text-center">
                  <span className="text-left font-sans">x</span>
                  <span>-∞</span>
                  <span>{hasExtr ? x1_val.toFixed(1) : ""}</span>
                  <span className="text-cyan-400 font-bold">1</span>
                  <span>{hasExtr ? x2_val.toFixed(1) : ""}</span>
                  <span className="text-right">+∞</span>
                </div>

                {/* Row f'(x) */}
                <div className="grid grid-cols-6 py-1.5 px-2 border-b border-white/10 items-center text-center">
                  <span className="text-left text-slate-400 font-bold font-sans">f'(x)</span>
                  <span>{hasExtr ? signL : (a > 0 ? "+" : "-")}</span>
                  <span>{hasExtr ? "0" : ""}</span>
                  <span className="text-cyan-400 font-bold border-x border-dashed border-cyan-500/50 h-4 flex items-center justify-center">||</span>
                  <span>{hasExtr ? "0" : ""}</span>
                  <span className="text-right">{hasExtr ? signR : (a > 0 ? "+" : "-")}</span>
                </div>

                {/* Row f(x) */}
                <div className="grid grid-cols-6 py-3 px-2 items-center bg-white/5 h-16 text-center">
                  <span className="text-left text-slate-400 font-bold font-sans">f(x)</span>
                  <span className={a > 0 ? "self-end" : "self-start"}>
                    {a > 0 ? "-∞" : "+∞"}
                  </span>
                  
                  {hasExtr ? (
                    <span className={a > 0 ? "self-start text-orange-400" : "self-end text-orange-400"}>
                      <div className="text-[8px] font-sans opacity-70">{a > 0 ? "អតិបរមា" : "អប្បបរមា"}</div>
                      {y1_val.toFixed(1)}
                    </span>
                  ) : <span></span>}

                  <span className="text-cyan-400 font-bold border-x border-dashed border-cyan-500/50 h-12 flex flex-col justify-between text-[10px]">
                    <span>{hasExtr ? (a > 0 ? "-∞" : "+∞") : (a > 0 ? "+∞" : "-∞")}</span>
                    <span>||</span>
                    <span>{hasExtr ? (a > 0 ? "+∞" : "-∞") : (a > 0 ? "-∞" : "+∞")}</span>
                  </span>

                  {hasExtr ? (
                    <span className={a > 0 ? "self-end text-orange-400" : "self-start text-orange-400"}>
                      <div className="text-[8px] font-sans opacity-70">{a > 0 ? "អប្បបរមា" : "អតិបរមា"}</div>
                      {y2_val.toFixed(1)}
                    </span>
                  ) : <span></span>}

                  <span className={a > 0 ? "self-start text-right" : "self-end text-right"}>
                    {a > 0 ? "+∞" : "-∞"}
                  </span>
                </div>
              </div>
            );
          })()}

          {funcType === "exponential" && (() => {
            const exp_x_val = a !== 0 ? -1 - b / a : 0;
            const exp_y_val = a !== 0 ? (a * exp_x_val + b) * Math.exp(exp_x_val) + c : 0;

            return (
              <div className="border border-white/10 rounded-lg overflow-hidden font-mono text-xs">
                {/* Header x */}
                <div className="grid grid-cols-4 bg-black/40 text-slate-400 font-bold py-1.5 px-2 border-b border-white/10 text-center">
                  <span className="text-left font-sans">x</span>
                  <span>-∞</span>
                  <span className="text-orange-400">{a !== 0 ? exp_x_val.toFixed(1) : ""}</span>
                  <span className="text-right">+∞</span>
                </div>

                {/* Row f'(x) */}
                <div className="grid grid-cols-4 py-1.5 px-2 border-b border-white/10 items-center text-center">
                  <span className="text-left text-slate-400 font-bold font-sans">f'(x)</span>
                  <span>{a > 0 ? "-" : "+"}</span>
                  <span>0</span>
                  <span className="text-right">{a > 0 ? "+" : "-"}</span>
                </div>

                {/* Row f(x) with arrows */}
                <div className="grid grid-cols-4 py-3 px-2 items-center bg-white/5 h-16 text-center">
                  <span className="text-left text-slate-400 font-bold font-sans">f(x)</span>
                  <span className="self-center">{c}</span>
                  <span className={a > 0 ? "self-end text-orange-400" : "self-start text-orange-400"}>
                    <div className="text-[8px] font-sans opacity-70">{a > 0 ? "អប្បបរមា" : "អតិបរមា"}</div>
                    {exp_y_val.toFixed(1)}
                  </span>
                  <span className={a > 0 ? "self-start text-right" : "self-end text-right"}>{a > 0 ? "+∞" : "-∞"}</span>
                </div>
              </div>
            );
          })()}

          {funcType === "logarithmic" && (() => {
            const hasExtr = a !== 0 && (-c / a) > 0;
            const extX = hasExtr ? -c / a : 1;
            const extY = hasExtr ? a * extX + b + c * Math.log(extX) : 0;

            return (
              <div className="border border-white/10 rounded-lg overflow-hidden font-mono text-xs">
                {/* Header x */}
                <div className="grid grid-cols-4 bg-black/40 text-slate-400 font-bold py-1.5 px-2 border-b border-white/10 text-center">
                  <span className="text-left font-sans">x</span>
                  <span className="text-cyan-400 font-bold">0</span>
                  <span className="text-orange-400">{hasExtr ? extX.toFixed(1) : ""}</span>
                  <span className="text-right">+∞</span>
                </div>

                {/* Row f'(x) */}
                <div className="grid grid-cols-4 py-1.5 px-2 border-b border-white/10 items-center text-center">
                  <span className="text-left text-slate-400 font-bold font-sans">f'(x)</span>
                  <span className="text-cyan-400 font-bold">||</span>
                  <span>{hasExtr ? "0" : ""}</span>
                  <span className="text-right">
                    {hasExtr ? (a > 0 ? "+" : "-") : (a > 0 ? "+" : "-")}
                  </span>
                </div>

                {/* Row f(x) with arrows */}
                <div className="grid grid-cols-4 py-3 px-2 items-center bg-white/5 h-16 text-center">
                  <span className="text-left text-slate-400 font-bold font-sans">f(x)</span>
                  <span className="text-cyan-400 font-bold flex flex-col justify-center h-12 text-[10px]">
                    <span>||</span>
                    <span>{c > 0 ? "-∞" : "+∞"}</span>
                  </span>
                  {hasExtr ? (
                    <span className={a > 0 ? "self-end text-orange-400" : "self-start text-orange-400"}>
                      <div className="text-[8px] font-sans opacity-70">{a > 0 ? "អប្បបរមា" : "អតិបរមា"}</div>
                      {extY.toFixed(1)}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  <span className={a > 0 ? "self-start text-right" : "self-end text-right"}>{a > 0 ? "+∞" : "-∞"}</span>
                </div>
              </div>
            );
          })()}

          {funcType === "custom" && (() => {
            if (customError || !customExpr.trim()) {
              return (
                <div className="flex items-center justify-center h-28 border border-white/10 border-dashed rounded-lg text-slate-500 text-xs font-sans">
                  សូមបញ្ចូលរូបមន្តអនុគមន៍ត្រឹមត្រូវដើម្បីបង្ហាញតារាងអថេរភាព
                </div>
              );
            }
            
            const sortedExt = [...customExtrema].sort((a, b) => a.x - b.x);
            const displayExt = sortedExt.slice(0, 3);
            const colsCount = 2 + displayExt.length;
            
            const yStart = evaluateCustom(-4.8, customExpr);
            const yEnd = evaluateCustom(4.8, customExpr);
            
            return (
              <div className="border border-white/10 rounded-lg overflow-hidden font-mono text-xs">
                {/* Header x */}
                <div className="grid bg-black/40 text-slate-400 font-bold py-1.5 px-2 border-b border-white/10 text-center"
                     style={{ gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))` }}>
                  <span className="text-left font-sans">x</span>
                  <span>-4.8</span>
                  {displayExt.map((ext, idx) => (
                    <span key={idx} className="text-orange-400">{ext.x.toFixed(1)}</span>
                  ))}
                  <span className="text-right">4.8</span>
                </div>

                {/* Row f'(x) */}
                <div className="grid py-1.5 px-2 border-b border-white/10 items-center text-center"
                     style={{ gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))` }}>
                  <span className="text-left text-slate-400 font-bold font-sans">f'(x)</span>
                  <span></span>
                  {displayExt.map((ext, idx) => {
                    const isPrevMax = ext.type === "max";
                    return (
                      <span key={idx} className="text-slate-400">
                        {isPrevMax ? "+" : "-"} <span className="text-white font-bold mx-1">0</span>
                      </span>
                    );
                  })}
                  <span className="text-right text-slate-400">
                    {displayExt.length > 0 
                      ? (displayExt[displayExt.length - 1].type === "max" ? "-" : "+")
                      : (yEnd > yStart ? "+" : "-")}
                  </span>
                </div>

                {/* Row f(x) with arrows */}
                <div className="grid py-3 px-2 items-center bg-white/5 h-16 text-center"
                     style={{ gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))` }}>
                  <span className="text-left text-slate-400 font-bold font-sans">f(x)</span>
                  <span className={displayExt.length > 0 ? (displayExt[0].type === "max" ? "self-end" : "self-start") : (yEnd > yStart ? "self-end" : "self-start")}>
                    {!isNaN(yStart) && isFinite(yStart) ? yStart.toFixed(1) : "-"}
                  </span>
                  {displayExt.map((ext, idx) => (
                    <span key={idx} className={ext.type === "max" ? "self-start text-orange-400" : "self-end text-orange-400"}>
                      <div className="text-[8px] font-sans opacity-70">
                        {ext.type === "max" ? "អតិបរមា" : "អប្បបរមា"}
                      </div>
                      {ext.y.toFixed(1)}
                    </span>
                  ))}
                  <span className={displayExt.length > 0 ? (displayExt[displayExt.length - 1].type === "max" ? "self-end text-right" : "self-start text-right") : (yEnd > yStart ? "self-start text-right" : "self-end text-right")}>
                    {!isNaN(yEnd) && isFinite(yEnd) ? yEnd.toFixed(1) : "-"}
                  </span>
                </div>
              </div>
            );
          })()}

          <div className="text-[10px] text-slate-400 leading-relaxed font-sans bg-black/20 p-2.5 rounded border border-white/5">
            {funcType === "quadratic" && (
              <>
                <strong>វិភាគក្រាប៖</strong> ប៉ារ៉ាបូលមានកំពូលត្រង់កូអរដោនេ <span className="text-white font-mono">I({x_crit.toFixed(1)}, {y_crit.toFixed(1)})</span> ដែលជាចំណុច {a > 0 ? "អប្បបរមា ( concave up )" : "អតិបរមា ( concave down )"}។
              </>
            )}
            {funcType === "rational" && (() => {
              const D_val = a * (a + b + c);
              const hasExtr = D_val > 0 && a !== 0;
              const x1_val = hasExtr ? 1 - Math.sqrt(D_val) / Math.abs(a) : 0;
              const x2_val = hasExtr ? 1 + Math.sqrt(D_val) / Math.abs(a) : 0;
              const y1_val = hasExtr ? (a * x1_val * x1_val + b * x1_val + c) / (x1_val - 1) : 0;
              const y2_val = hasExtr ? (a * x2_val * x2_val + b * x2_val + c) / (x2_val - 1) : 0;
              return (
                <>
                  <strong>វិភាគក្រាប៖</strong> អនុគមន៍សនិទានមានអាស៉ីមតូតឈរ <span className="text-cyan-400 font-mono">x = 1</span> និងអាស៉ីមតូតទ្រត <span className="text-emerald-400 font-mono">y = {a === 1 ? "" : a === -1 ? "-" : a}x {a+b >= 0 ? "+" : "-"} {Math.abs(a+b)}</span>។
                  {hasExtr ? (
                    <span> មានចំណុចបរមាពីរគឺ អតិបរមាត្រង់ <span className="text-orange-400">({x1_val.toFixed(1)}, {y1_val.toFixed(1)})</span> និងអប្បបរមាត្រង់ <span className="text-orange-400">({x2_val.toFixed(1)}, {y2_val.toFixed(1)})</span>។</span>
                  ) : (
                    <span> គ្មានចំណុចបរមាទេ (ខ្សែកោងកើនឡើង ឬចុះក្រោមជានិច្ច)។</span>
                  )}
                </>
              );
            })()}
            {funcType === "exponential" && (() => {
              const exp_x_val = a !== 0 ? -1 - b / a : 0;
              const exp_y_val = a !== 0 ? (a * exp_x_val + b) * Math.exp(exp_x_val) + c : 0;
              return (
                <>
                  <strong>វិភាគក្រាប៖</strong> អនុគមន៍អិចស្ប៉ូណង់ស្យែលលាយពហុធាមានអាស៉ីមតូតដេក <span className="text-emerald-400 font-mono">y = {c}</span> (នៅពេល x → -∞)។
                  {a !== 0 && (
                    <span> មានចំណុចបរមាមួយត្រង់កូអរដោនេ <span className="text-orange-400">({exp_x_val.toFixed(1)}, {exp_y_val.toFixed(1)})</span> ដែលជាចំណុច {a > 0 ? "អប្បបរមា" : "អតិបរមា"}។</span>
                  )}
                </>
              );
            })()}
            {funcType === "logarithmic" && (() => {
              const hasExtr = a !== 0 && (-c / a) > 0;
              const extX = hasExtr ? -c / a : 0;
              const extY = hasExtr ? a * extX + b + c * Math.log(extX) : 0;
              return (
                <>
                  <strong>វិភាគក្រាប៖</strong> អនុគមន៍លោការីតនេពែលាយពហុធាមានដែនកំណត់ចំពោះ <span className="text-cyan-400 font-mono">x &gt; 0</span> និងមានអាស៉ីមតូតឈរ <span className="text-cyan-400 font-mono">x = 0</span> (អ័ក្សអរដោនេ)។
                  {hasExtr ? (
                    <span> មានចំណុចបរមាមួយត្រង់ <span className="text-orange-400 font-mono">({extX.toFixed(1)}, {extY.toFixed(1)})</span>។</span>
                  ) : (
                    <span> គ្មានចំណុចបរមាទេ ព្រោះដេរីវេមានសញ្ញាវិជ្ជមាន ឬអវិជ្ជមានជានិច្ចក្នុងដែនកំណត់។</span>
                  )}
                </>
              );
            })()}
            {funcType === "custom" && (() => {
              if (customError || !customExpr.trim()) {
                return (
                  <span>អនុគមន៍ផ្ទាល់ខ្លួនមិនទាន់មានរូបមន្តត្រឹមត្រូវ។</span>
                );
              }
              const extCount = customExtrema.length;
              return (
                <>
                  <strong>វិភាគក្រាប៖</strong> អនុគមន៍ផ្ទាល់ខ្លួន <span className="text-orange-400 font-mono">f(x) = {customExpr}</span> ត្រូវបានគូរលើចន្លោះដែនកំណត់ <span className="text-cyan-400 font-mono">[-4.8, 4.8]</span>។
                  {extCount > 0 ? (
                    <span> តាមរយៈការវិភាគជាលេខ គេរកឃើញចំណុចបរមា {extCount}៖ {customExtrema.map((e, i) => (
                      <span key={i}> {e.type === "max" ? "អតិបរមា" : "អប្បបរមា"}ត្រង់ <span className="text-orange-400 font-mono">({e.x.toFixed(1)}, {e.y.toFixed(1)})</span>{i < extCount - 1 ? " និង" : ""}</span>
                    ))}។</span>
                  ) : (
                    <span> គ្មានចំណុចបរមាត្រូវបានរកឃើញទេ (ខ្សែកោងកើនឡើង ឬចុះក្រោមជានិច្ច)។</span>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Safe math parser for custom 3D parametric formulas
const evaluate3DParametric = (t: number, expr: string): { x: number; y: number; z: number } | null => {
  if (!expr || expr.trim() === "") return null;
  try {
    let clean = expr.trim();
    // Remove wrapping parentheses or brackets
    if (clean.startsWith("(") && clean.endsWith(")")) {
      clean = clean.slice(1, -1);
    } else if (clean.startsWith("[") && clean.endsWith("]")) {
      clean = clean.slice(1, -1);
    }
    
    const parts = clean.split(",");
    if (parts.length !== 3) return null;
    
    const evalComp = (comp: string): number => {
      let s = comp.toLowerCase();
      s = s.replace(/\^/g, "**");
      s = s.replace(/(\d+)\s*([t_a-zA-Z\(])/g, "$1*$2");
      s = s.replace(/([t\)])\s*([_a-zA-Z\(])/g, "$1*$2");
      
      const fn = new Function(
        "t", "sin", "cos", "tan", "log", "ln", "exp", "sqrt", "abs", "pi", "e",
        `return (${s});`
      );
      
      const val = fn(
        t,
        Math.sin,
        Math.cos,
        Math.tan,
        Math.log10,
        Math.log,
        Math.exp,
        Math.sqrt,
        Math.abs,
        Math.PI,
        Math.E
      );
      return typeof val === "number" && !isNaN(val) && isFinite(val) ? val : NaN;
    };
    
    const rx = evalComp(parts[0]);
    const ry = evalComp(parts[1]);
    const rz = evalComp(parts[2]);
    
    if (isNaN(rx) || isNaN(ry) || isNaN(rz)) return null;
    return { x: rx, y: ry, z: rz };
  } catch (err) {
    return null;
  }
};

const getPlaneLatex = (a: number, b: number, c: number, d: number): string => {
  let parts: string[] = [];
  if (a !== 0) {
    if (a === 1) parts.push("x");
    else if (a === -1) parts.push("-x");
    else parts.push(`${a}x`);
  }
  if (b !== 0) {
    const sign = b > 0 ? (parts.length > 0 ? "+" : "") : "";
    if (b === 1) parts.push(`${sign}y`);
    else if (b === -1) parts.push("-y");
    else parts.push(`${sign}${b}y`);
  }
  if (c !== 0) {
    const sign = c > 0 ? (parts.length > 0 ? "+" : "") : "";
    if (c === 1) parts.push(`${sign}z`);
    else if (c === -1) parts.push("-z");
    else parts.push(`${sign}${c}z`);
  }
  if (d !== 0) {
    const sign = d > 0 ? (parts.length > 0 ? "+" : "") : "";
    parts.push(`${sign}${d}`);
  }
  if (parts.length === 0) return "0 = 0";
  return parts.join("") + " = 0";
};

const getSphereLatex = (h: number, k: number, l: number, r: number): string => {
  const formatTerm = (val: number, char: string): string => {
    if (val === 0) return `${char}^2`;
    const sign = val > 0 ? "-" : "+";
    const absVal = Math.abs(val);
    return `(${char} ${sign} ${absVal})^2`;
  };
  return `${formatTerm(h, "x")} + ${formatTerm(k, "y")} + ${formatTerm(l, "z")} = ${r * r}`;
};

// ==========================================
// 9. VECTORS IN SPACE EXPLORER (Chapter 11)
// ==========================================
export function VectorsSpaceExplorer() {
  const [ux, setUx] = useState<number>(1);
  const [uy, setUy] = useState<number>(2);
  const [uz, setUz] = useState<number>(-1);

  const [vx, setVx] = useState<number>(3);
  const [vy, setVy] = useState<number>(0);
  const [vz, setVz] = useState<number>(2);

  // Custom 3D equation mode and inputs
  const [customMode, setCustomMode] = useState<"curve" | "plane" | "sphere">("curve");

  // Curve Mode
  const [customExpr, setCustomExpr] = useState<string>("(2*cos(t), 2*sin(t), 0.5*t)");
  const [customError, setCustomError] = useState<string>("");

  // Plane Mode (Ax + By + Cz + D = 0)
  const [planeA, setPlaneA] = useState<number>(2);
  const [planeB, setPlaneB] = useState<number>(-1);
  const [planeC, setPlaneC] = useState<number>(1);
  const [planeD, setPlaneD] = useState<number>(-2);

  // Sphere Mode ((x-h)^2 + (y-k)^2 + (z-l)^2 = R^2)
  const [sphereH, setSphereH] = useState<number>(0);
  const [sphereK, setSphereK] = useState<number>(0);
  const [sphereL, setSphereL] = useState<number>(0);
  const [sphereR, setSphereR] = useState<number>(3);

  const handleCustomExprChange = (val: string) => {
    setCustomExpr(val);
    if (!val.trim()) {
      setCustomError("");
      return;
    }
    const parsed = evaluate3DParametric(1, val);
    if (!parsed) {
      setCustomError("រូបមន្តមិនត្រឹមត្រូវ (ត្រូវមានកូអរដោនេ ៣ បំបែកដោយក្បៀស x,y,z)");
    } else {
      setCustomError("");
    }
  };

  const isFixedPoint = customExpr.trim() && !customExpr.toLowerCase().includes("t") && !customError;
  const parsedPoint = isFixedPoint ? evaluate3DParametric(1, customExpr) : null;

  // Calculations
  const dotProduct = ux * vx + uy * vy + uz * vz;
  const normU = Math.sqrt(ux * ux + uy * uy + uz * uz);
  const normV = Math.sqrt(vx * vx + vy * vy + vz * vz);

  // Cross Product: u x v = (u_y*v_z - u_z*v_y, u_z*v_x - u_x*v_z, u_x*v_y - u_y*v_x)
  const cx = uy * vz - uz * vy;
  const cy = uz * vx - ux * vz;
  const cz = ux * vy - uy * vx;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="vectors-space-explorer">
      {/* Header Block with Custom 3D Equation input in the top right (yellow circle area) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 border-b border-white/5 pb-4">
        <div className="flex-1">
          <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            មេរៀនទី ១១៖ វ៉ិចទ័រក្នុងលំហ
          </span>
          <h4 className="font-sans font-bold text-white text-base mt-2">ម៉ាស៊ីនគណនាវ៉ិចទ័រ 3D (3D Vector Space Calculator)</h4>
          <p className="font-sans text-xs text-slate-400 mt-1">
            បញ្ចូលកូអរដោនេនៃពីរវ៉ិចទ័រ <span className="text-orange-400 font-bold">{"$\\vec{u}$"}</span> និង <span className="text-orange-400 font-bold">{"$\\vec{v}$"}</span> ក្នុងលំហកូអរដោនេ 3D ឬសរសេរសមីការបន្ទាត់/ខ្សែកោង៖
          </p>
        </div>

        {/* Custom expression input container (Yellow Circle area) */}
        <div className="w-full lg:w-96 bg-white/5 border border-yellow-500/20 rounded-xl p-3 flex flex-col gap-2.5 shadow-lg shadow-yellow-500/5 hover:border-yellow-500/40 transition-all duration-300">
          <label className="text-[11px] font-sans text-yellow-400 font-bold flex items-center gap-1 border-b border-white/5 pb-1.5 justify-between">
            <span>✍️ សរសេរសមីការក្នុងលំហ (3D Formulas & Shapes)</span>
            <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded-full uppercase">3D Render</span>
          </label>

          {/* Custom Mode Tabs */}
          <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setCustomMode("curve")}
              className={`flex-1 py-1 rounded text-[10px] font-sans font-bold transition ${customMode === "curve" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "text-slate-400 hover:text-white"}`}
            >
              📈 ខ្សែកោង/បន្ទាត់
            </button>
            <button
              onClick={() => setCustomMode("plane")}
              className={`flex-1 py-1 rounded text-[10px] font-sans font-bold transition ${customMode === "plane" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "text-slate-400 hover:text-white"}`}
            >
              📐 សមីការប្លង់
            </button>
            <button
              onClick={() => setCustomMode("sphere")}
              className={`flex-1 py-1 rounded text-[10px] font-sans font-bold transition ${customMode === "sphere" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "text-slate-400 hover:text-white"}`}
            >
              🌐 សមីការស្វ៊ែ
            </button>
          </div>

          {/* Tab Content: Curve Mode */}
          {customMode === "curve" && (
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="ឧទាហរណ៍៖ (2*cos(t), 2*sin(t), 0.5*t)"
                  value={customExpr}
                  onChange={(e) => handleCustomExprChange(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-yellow-500/50"
                />
                {customExpr && (
                  <button
                    onClick={() => {
                      setCustomExpr("");
                      setCustomError("");
                    }}
                    className="px-2 py-1 text-[10px] font-sans text-slate-400 hover:text-white border border-white/10 rounded-lg bg-white/5 transition-all"
                  >
                    លុប
                  </button>
                )}
              </div>

              {parsedPoint && (
                <div className="flex gap-1.5 mt-0.5">
                  <button
                    onClick={() => {
                      setUx(Number(parsedPoint.x.toFixed(1)));
                      setUy(Number(parsedPoint.y.toFixed(1)));
                      setUz(Number(parsedPoint.z.toFixed(1)));
                    }}
                    className="flex-1 py-1 rounded bg-[#ff4e00]/15 border border-[#ff4e00]/30 text-[9px] text-orange-400 hover:bg-[#ff4e00]/30 transition font-sans text-center font-bold"
                  >
                    កំណត់ជា u
                  </button>
                  <button
                    onClick={() => {
                      setVx(Number(parsedPoint.x.toFixed(1)));
                      setVy(Number(parsedPoint.y.toFixed(1)));
                      setVz(Number(parsedPoint.z.toFixed(1)));
                    }}
                    className="flex-1 py-1 rounded bg-blue-500/15 border border-blue-500/30 text-[9px] text-blue-400 hover:bg-blue-500/30 transition font-sans text-center font-bold"
                  >
                    កំណត់ជា v
                  </button>
                </div>
              )}

              {customError ? (
                <span className="text-[10px] text-red-400 font-sans font-medium">{customError}</span>
              ) : (
                <span className="text-[9px] text-slate-400 font-sans">
                  គាំទ្រ៖ <code className="text-yellow-300">(x(t), y(t), z(t))</code> ឬ <code className="text-yellow-300">(x, y, z)</code>
                </span>
              )}

              <div className="flex flex-wrap gap-1 mt-1 border-t border-white/5 pt-1.5">
                {[
                  { label: "បន្ទាត់ (Line)", expr: "(t, 2*t, -t)" },
                  { label: "ស្ពីរ៉ាល់ (Helix)", expr: "(2*cos(t), 2*sin(t), 0.5*t)" },
                  { label: "ចំណុច (Point)", expr: "(3, -2, 4)" }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCustomExprChange(p.expr)}
                    className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-slate-300 font-sans transition"
                    title={p.expr}
                  >
                    💡 {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Plane Mode */}
          {customMode === "plane" && (
            <div className="flex flex-col gap-2">
              <div className="text-center bg-black/40 py-1 rounded-lg border border-white/5 flex items-center justify-center min-h-[26px]">
                <span
                  className="text-xs text-yellow-400 font-mono"
                  dangerouslySetInnerHTML={{
                    __html: renderMath(`(P): ` + getPlaneLatex(planeA, planeB, planeC, planeD)),
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-1">
                <div>
                  <span className="text-[9px] text-slate-400 block mb-0.5 text-center font-mono">A (x)</span>
                  <input
                    type="number"
                    value={planeA}
                    onChange={(e) => setPlaneA(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block mb-0.5 text-center font-mono">B (y)</span>
                  <input
                    type="number"
                    value={planeB}
                    onChange={(e) => setPlaneB(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block mb-0.5 text-center font-mono">C (z)</span>
                  <input
                    type="number"
                    value={planeC}
                    onChange={(e) => setPlaneC(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block mb-0.5 text-center font-mono">D (const)</span>
                  <input
                    type="number"
                    value={planeD}
                    onChange={(e) => setPlaneD(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]"
                  />
                </div>
              </div>

              {/* Presets for common planes */}
              <div className="flex flex-wrap gap-1 mt-1 border-t border-white/5 pt-1.5">
                {[
                  { label: "ប្លង់ XY (z=0)", a: 0, b: 0, c: 1, d: 0 },
                  { label: "ប្លង់ x+y+z=0", a: 1, b: 1, c: 1, d: 0 },
                  { label: "ប្លង់ x-y=1", a: 1, b: -1, c: 0, d: -1 },
                  { label: "ប្លង់ 2x-z=2", a: 2, b: 0, c: -1, d: -2 }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPlaneA(p.a);
                      setPlaneB(p.b);
                      setPlaneC(p.c);
                      setPlaneD(p.d);
                    }}
                    className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-slate-300 font-sans transition"
                  >
                    💡 {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Sphere Mode */}
          {customMode === "sphere" && (
            <div className="flex flex-col gap-2">
              <div className="text-center bg-black/40 py-1 rounded-lg border border-white/5 flex items-center justify-center min-h-[26px]">
                <span
                  className="text-xs text-yellow-400 font-mono"
                  dangerouslySetInnerHTML={{
                    __html: renderMath(`(S): ` + getSphereLatex(sphereH, sphereK, sphereL, sphereR)),
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-1">
                <div>
                  <span className="text-[9px] text-slate-400 block mb-0.5 text-center font-mono">Center h</span>
                  <input
                    type="number"
                    value={sphereH}
                    onChange={(e) => setSphereH(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block mb-0.5 text-center font-mono">Center k</span>
                  <input
                    type="number"
                    value={sphereK}
                    onChange={(e) => setSphereK(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block mb-0.5 text-center font-mono">Center l</span>
                  <input
                    type="number"
                    value={sphereL}
                    onChange={(e) => setSphereL(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block mb-0.5 text-center font-mono">Radius R</span>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={sphereR}
                    onChange={(e) => setSphereR(Math.max(0.1, Number(e.target.value)))}
                    className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]"
                  />
                </div>
              </div>

              {/* Presets for common spheres */}
              <div className="flex flex-wrap gap-1 mt-1 border-t border-white/5 pt-1.5">
                {[
                  { label: "គល់តម្រុយ R=3", h: 0, k: 0, l: 0, r: 3 },
                  { label: "ស្វ៊ែ R=2 (1,2,-1)", h: 1, k: 2, l: -1, r: 2 },
                  { label: "ស្វ៊ែ R=1.5 (0,-2,2)", h: 0, k: -2, l: 2, r: 1.5 }
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSphereH(s.h);
                      setSphereK(s.k);
                      setSphereL(s.l);
                      setSphereR(s.r);
                    }}
                    className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-slate-300 font-sans transition"
                  >
                    💡 {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="vector-3d-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>គំនូរតំណាងវ៉ិចទ័រក្នុងលំហ 3D (3D Isometric Vector Projection)</span>
        </span>
        <svg viewBox="0 0 400 220" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Coordinates Projection Helper */}
          {(() => {
            const project = (xVal: number, yVal: number, zVal: number) => {
              const scale = 14;
              const cx = 200;
              const cy = 110;
              const px = cx - xVal * scale * Math.cos(Math.PI / 6) + yVal * scale * Math.cos(Math.PI / 6);
              const py = cy + xVal * scale * Math.sin(Math.PI / 6) + yVal * scale * Math.sin(Math.PI / 6) - zVal * scale;
              return { x: px, y: py };
            };

            const origin = project(0, 0, 0);
            const axisX = project(5, 0, 0);
            const axisY = project(0, 5, 0);
            const axisZ = project(0, 0, 5);

            const ptU = project(ux, uy, uz);
            const ptV = project(vx, vy, vz);
            
            const normC = Math.sqrt(cx * cx + cy * cy + cz * cz);
            const scaleC = normC > 5 ? 5 / normC : 1;
            const ptCross = project(cx * scaleC, cy * scaleC, cz * scaleC);

            return (
              <>
                {/* Axes */}
                {/* X Axis */}
                <line x1={origin.x} y1={origin.y} x2={axisX.x} y2={axisX.y} stroke="#475569" strokeWidth="1.5" />
                <text x={axisX.x - 10} y={axisX.y + 12} fill="#94a3b8" className="text-[10px] font-mono font-bold">X</text>
                
                {/* Y Axis */}
                <line x1={origin.x} y1={origin.y} x2={axisY.x} y2={axisY.y} stroke="#475569" strokeWidth="1.5" />
                <text x={axisY.x + 8} y={axisY.y + 10} fill="#94a3b8" className="text-[10px] font-mono font-bold">Y</text>

                {/* Z Axis */}
                <line x1={origin.x} y1={origin.y} x2={axisZ.x} y2={axisZ.y} stroke="#475569" strokeWidth="1.5" />
                <text x={axisZ.x - 4} y={axisZ.y - 6} fill="#94a3b8" className="text-[10px] font-mono font-bold">Z</text>

                {/* Custom 3D Shape Render (Curve, Plane, or Sphere) */}
                {(() => {
                  if (customMode === "curve") {
                    if (customError || !customExpr.trim()) return null;
                    const pts: string[] = [];
                    let isDrawing = false;
                    
                    // Sweep t from -6 to 6
                    for (let tVal = -6; tVal <= 6; tVal += 0.1) {
                      const res = evaluate3DParametric(tVal, customExpr);
                      if (res) {
                        const proj = project(res.x, res.y, res.z);
                        if (proj.y >= -100 && proj.y <= 320 && proj.x >= -100 && proj.x <= 500) {
                          if (!isDrawing) {
                            pts.push(`M ${proj.x} ${proj.y}`);
                            isDrawing = true;
                          } else {
                            pts.push(`L ${proj.x} ${proj.y}`);
                          }
                        } else {
                          isDrawing = false;
                        }
                      } else {
                        isDrawing = false;
                      }
                    }
                    
                    const dPath = pts.join(" ");
                    if (!dPath) return null;
                    
                    return (
                      <path
                        d={dPath}
                        fill="none"
                        stroke="#eab308"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                    );
                  }

                  if (customMode === "plane") {
                    const normSq = planeA * planeA + planeB * planeB + planeC * planeC;
                    if (normSq > 0.01) {
                      // Closest point to origin on plane: P0 = (-A*D/normSq, -B*D/normSq, -C*D/normSq)
                      const p0x = -planeA * planeD / normSq;
                      const p0y = -planeB * planeD / normSq;
                      const p0z = -planeC * planeD / normSq;

                      // Find two orthogonal unit vectors in plane
                      let uxTemp = 0, uyTemp = 0, uzTemp = 0;
                      if (Math.abs(planeA) > 0.01 || Math.abs(planeB) > 0.01) {
                        uxTemp = -planeB;
                        uyTemp = planeA;
                        uzTemp = 0;
                      } else {
                        uxTemp = 1;
                        uyTemp = 0;
                        uzTemp = 0;
                      }
                      const lenU = Math.sqrt(uxTemp * uxTemp + uyTemp * uyTemp + uzTemp * uzTemp);
                      const uxp = uxTemp / lenU;
                      const uyp = uyTemp / lenU;
                      const uzp = uzTemp / lenU;

                      // Cross product for second in-plane vector vp = n x up
                      const vxp = planeB * uzp - planeC * uyp;
                      const vyp = planeC * uxp - planeA * uzp;
                      const vzp = planeA * uyp - planeB * uxp;
                      const lenV = Math.sqrt(vxp * vxp + vyp * vyp + vzp * vzp);
                      const vxp_norm = vxp / lenV;
                      const vyp_norm = vyp / lenV;
                      const vzp_norm = vzp / lenV;

                      // Create a bounded quadrilateral patch centered at P0
                      const patchSize = 3.5;
                      const c1 = { x: p0x - patchSize * uxp - patchSize * vxp_norm, y: p0y - patchSize * uyp - patchSize * vyp_norm, z: p0z - patchSize * uzp - patchSize * vzp_norm };
                      const c2 = { x: p0x + patchSize * uxp - patchSize * vxp_norm, y: p0y + patchSize * uyp - patchSize * vyp_norm, z: p0z + patchSize * uzp - patchSize * vzp_norm };
                      const c3 = { x: p0x + patchSize * uxp + patchSize * vxp_norm, y: p0y + patchSize * uyp + patchSize * vyp_norm, z: p0z + patchSize * uzp + patchSize * vzp_norm };
                      const c4 = { x: p0x - patchSize * uxp + patchSize * vxp_norm, y: p0y - patchSize * uyp + patchSize * vyp_norm, z: p0z - patchSize * uzp + patchSize * vzp_norm };

                      const p1 = project(c1.x, c1.y, c1.z);
                      const p2 = project(c2.x, c2.y, c2.z);
                      const p3 = project(c3.x, c3.y, c3.z);
                      const p4 = project(c4.x, c4.y, c4.z);

                      // Inside grid lines for visualization
                      const gridLines: { pStart: { x: number, y: number }, pEnd: { x: number, y: number } }[] = [];
                      const divisions = 4;
                      for (let i = 0; i <= divisions; i++) {
                        const frac = -patchSize + (2 * patchSize * i) / divisions;
                        // Line parallel to u
                        const startU = { x: p0x + frac * uxp - patchSize * vxp_norm, y: p0y + frac * uyp - patchSize * vyp_norm, z: p0z + frac * uzp - patchSize * vzp_norm };
                        const endU = { x: p0x + frac * uxp + patchSize * vxp_norm, y: p0y + frac * uyp + patchSize * vyp_norm, z: p0z + frac * uzp + patchSize * vzp_norm };
                        gridLines.push({ pStart: project(startU.x, startU.y, startU.z), pEnd: project(endU.x, endU.y, endU.z) });

                        // Line parallel to v
                        const startV = { x: p0x - patchSize * uxp + frac * vxp_norm, y: p0y - patchSize * uyp + frac * vyp_norm, z: p0z - patchSize * uzp + frac * vzp_norm };
                        const endV = { x: p0x + patchSize * uxp + frac * vxp_norm, y: p0y + patchSize * uyp + frac * vyp_norm, z: p0z + patchSize * uzp + frac * vzp_norm };
                        gridLines.push({ pStart: project(startV.x, startV.y, startV.z), pEnd: project(endV.x, endV.y, endV.z) });
                      }

                      return (
                        <g opacity="0.95">
                          {/* Translucent Plane Face */}
                          <polygon
                            points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
                            fill="rgba(234, 179, 8, 0.2)"
                            stroke="rgba(234, 179, 8, 0.75)"
                            strokeWidth="1.5"
                          />
                          {/* Inside Grid Lines */}
                          {gridLines.map((line, idx) => (
                            <line
                              key={idx}
                              x1={line.pStart.x}
                              y1={line.pStart.y}
                              x2={line.pEnd.x}
                              y2={line.pEnd.y}
                              stroke="rgba(251, 191, 36, 0.3)"
                              strokeWidth="0.8"
                            />
                          ))}
                          {/* Label */}
                          <text x={project(p0x, p0y, p0z).x + 5} y={project(p0x, p0y, p0z).y - 5} fill="#f59e0b" className="text-[9px] font-sans font-bold">ប្លង់ (P)</text>
                        </g>
                      );
                    }
                  }

                  if (customMode === "sphere") {
                    const center2D = project(sphereH, sphereK, sphereL);
                    const scale = 14;
                    const r2D = sphereR * scale;

                    // Helper to generate coordinates of a 3D circle and map to SVG path string
                    const getRingPath = (type: "xy" | "xz" | "yz") => {
                      const pts: string[] = [];
                      for (let angle = 0; angle <= 2 * Math.PI + 0.1; angle += 0.15) {
                        let sx = sphereH;
                        let sy = sphereK;
                        let sz = sphereL;
                        if (type === "xy") {
                          sx += sphereR * Math.cos(angle);
                          sy += sphereR * Math.sin(angle);
                        } else if (type === "xz") {
                          sx += sphereR * Math.cos(angle);
                          sz += sphereR * Math.sin(angle);
                        } else if (type === "yz") {
                          sy += sphereR * Math.cos(angle);
                          sz += sphereR * Math.sin(angle);
                        }
                        const proj = project(sx, sy, sz);
                        pts.push(`${angle === 0 ? "M" : "L"} ${proj.x} ${proj.y}`);
                      }
                      return pts.join(" ");
                    };

                    const ringXY = getRingPath("xy");
                    const ringXZ = getRingPath("xz");
                    const ringYZ = getRingPath("yz");

                    return (
                      <g opacity="0.95">
                        {/* Shaded silhouette 2D Circle for sphere volume */}
                        <circle
                          cx={center2D.x}
                          cy={center2D.y}
                          r={r2D}
                          fill="rgba(234, 179, 8, 0.12)"
                          stroke="rgba(234, 179, 8, 0.6)"
                          strokeWidth="1.5"
                        />
                        {/* 3D Wireframe Rings */}
                        <path d={ringXY} fill="none" stroke="rgba(251, 191, 36, 0.65)" strokeWidth="1.2" strokeDasharray="3 1.5" />
                        <path d={ringXZ} fill="none" stroke="rgba(251, 191, 36, 0.65)" strokeWidth="1.2" strokeDasharray="3 1.5" />
                        <path d={ringYZ} fill="none" stroke="rgba(251, 191, 36, 0.65)" strokeWidth="1.2" strokeDasharray="3 1.5" />
                        
                        {/* Center Point dot */}
                        <circle cx={center2D.x} cy={center2D.y} r="3" fill="#eab308" />
                        <text x={center2D.x + 5} y={center2D.y - 4} fill="#f59e0b" className="text-[9px] font-sans font-bold">
                          I({sphereH},{sphereK},{sphereL})
                        </text>
                      </g>
                    );
                  }

                  return null;
                })()}

                {/* Dashed projections for Vector U */}
                <line x1={project(ux, uy, 0).x} y1={project(ux, uy, 0).y} x2={ptU.x} y2={ptU.y} stroke="#ff4e00" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
                <line x1={project(ux, 0, 0).x} y1={project(ux, 0, 0).y} x2={project(ux, uy, 0).x} y2={project(ux, uy, 0).y} stroke="#ff4e00" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
                <line x1={project(0, uy, 0).x} y1={project(0, uy, 0).y} x2={project(ux, uy, 0).x} y2={project(ux, uy, 0).y} stroke="#ff4e00" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />

                {/* Dashed projections for Vector V */}
                <line x1={project(vx, vy, 0).x} y1={project(vx, vy, 0).y} x2={ptV.x} y2={ptV.y} stroke="#3b82f6" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
                <line x1={project(vx, 0, 0).x} y1={project(vx, 0, 0).y} x2={project(vx, vy, 0).x} y2={project(vx, vy, 0).y} stroke="#3b82f6" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
                <line x1={project(0, vy, 0).x} y1={project(0, vy, 0).y} x2={project(vx, vy, 0).x} y2={project(vx, vy, 0).y} stroke="#3b82f6" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />

                {/* Vector U Arrow */}
                <line x1={origin.x} y1={origin.y} x2={ptU.x} y2={ptU.y} stroke="#ff4e00" strokeWidth="2.5" />
                <circle cx={ptU.x} cy={ptU.y} r="4" fill="#ff4e00" />
                <text x={ptU.x + 6} y={ptU.y - 4} fill="#ff4e00" className="text-[10px] font-sans font-bold">u({ux},{uy},{uz})</text>

                {/* Vector V Arrow */}
                <line x1={origin.x} y1={origin.y} x2={ptV.x} y2={ptV.y} stroke="#3b82f6" strokeWidth="2.5" />
                <circle cx={ptV.x} cy={ptV.y} r="4" fill="#3b82f6" />
                <text x={ptV.x + 6} y={ptV.y - 4} fill="#3b82f6" className="text-[10px] font-sans font-bold">v({vx},{vy},{vz})</text>

                {/* Cross Product Vector Arrow (scaled) */}
                {normC > 0.1 && (
                  <>
                    <line x1={origin.x} y1={origin.y} x2={ptCross.x} y2={ptCross.y} stroke="#eab308" strokeWidth="2" strokeDasharray="2" />
                    <circle cx={ptCross.x} cy={ptCross.y} r="3.5" fill="#eab308" />
                    <text x={ptCross.x + 6} y={ptCross.y - 4} fill="#eab308" className="text-[9px] font-mono font-bold">u × v (ទិសដៅ)</text>
                  </>
                )}
              </>
            );
          })()}
        </svg>
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#ff4e00] inline-block" /> វ៉ិចទ័រ u</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#3b82f6] inline-block" /> វ៉ិចទ័រ v</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 border-t border-dashed border-[#eab308] inline-block" /> ផលគុណខ្វែង u × v</span>
          {customMode === "curve" && customExpr && !customError && (
            <span className="flex items-center gap-1 text-yellow-500"><span className="w-2.5 h-0.5 border-t border-dashed border-[#eab308] inline-block" /> គន្លង៖ {customExpr}</span>
          )}
          {customMode === "plane" && (
            <span className="flex items-center gap-1 text-yellow-500"><span className="w-3 h-2 bg-yellow-500/20 border border-yellow-500/50 inline-block rounded-sm" /> ប្លង់ (P)៖ {getPlaneLatex(planeA, planeB, planeC, planeD)}</span>
          )}
          {customMode === "sphere" && (
            <span className="flex items-center gap-1 text-yellow-500"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/50 inline-block" /> ស្វ៊ែ (S)៖ R={sphereR}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Vector U */}
        <div className="bg-white/5 p-4 border border-[#ff4e00]/10 rounded-xl space-y-3">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2">
            <div className="w-2 h-2 rounded-full bg-[#ff4e00]" />
            <span>វ៉ិចទ័រ u (Vector u)</span>
          </h5>

          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">x-component</span>
              <input type="number" value={ux} onChange={(e) => setUx(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-center" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">y-component</span>
              <input type="number" value={uy} onChange={(e) => setUy(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-center" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">z-component</span>
              <input type="number" value={uz} onChange={(e) => setUz(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-center" />
            </div>
          </div>
          <div className="text-xs font-mono text-[#ff8c00] text-center pt-1 font-bold">
            \vec{"{"}u{"}"} = ({ux}, {uy}, {uz})
          </div>
        </div>

        {/* Vector V */}
        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-3">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>វ៉ិចទ័រ v (Vector v)</span>
          </h5>

          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">x-component</span>
              <input type="number" value={vx} onChange={(e) => setVx(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-center" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">y-component</span>
              <input type="number" value={vy} onChange={(e) => setVy(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-center" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">z-component</span>
              <input type="number" value={vz} onChange={(e) => setVz(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-center" />
            </div>
          </div>
          <div className="text-xs font-mono text-[#ff8c00] text-center pt-1 font-bold">
            \vec{"{"}v{"}"} = ({vx}, {vy}, {vz})
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-3 font-mono text-xs">
          <h6 className="text-[11px] font-bold text-white border-b border-white/5 pb-1 uppercase text-slate-400">ផលគុណស្កាលែ (Dot Product)</h6>
          <div className="bg-black/30 p-2.5 rounded border border-white/5">
            <div className="text-slate-500 text-[10px] mb-1">រូបមន្ត៖ \vec{"{"}u{"}"} \cdot \vec{"{"}v{"}"} = xx' + yy' + zz'</div>
            <div className="text-[#ff8c00] font-bold text-center mt-1">
              {ux}({vx}) + {uy}({vy}) + {uz}({vz}) = <span className="text-white text-sm font-black">{dotProduct}</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-sans leading-relaxed">
            *បើផលគុណស្កាលែស្មើ 0 នោះវ៉ិចទ័រទាំងពីរអរតូកូណាល់គ្នា (កែងគ្នា)។
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <h6 className="text-[11px] font-bold text-white border-b border-white/5 pb-1 uppercase text-slate-400">ផលគុណវ៉ិចទ័រ (Cross Product)</h6>
          <div className="bg-[#ff4e00]/5 p-2.5 rounded border border-[#ff4e00]/10">
            <div className="text-[#ff8c00] text-[10px] mb-1">រូបមន្ត៖ \vec{"{"}u{"}"} \times \vec{"{"}v{"}"} ៖</div>
            <div className="text-white font-bold text-center mt-1">
              \vec{"{"}w{"}"} = ({cx}, {cy}, {cz})
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-sans leading-relaxed">
            *វ៉ិចទ័រលទ្ធផល \vec{"{"}w{"}"} គឺកែងទៅនឹងប្លង់ដែលបង្កើតឡើងដោយ \vec{"{"}u{"}"} និង \vec{"{"}v{"}"}។
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. CONICS EXPLORER (Chapter 12)
// ==========================================
// ==========================================
// 10. CONICS EXPLORER (Chapter 12)
// ==========================================
const formatTermConic = (char: string, val: number): string => {
  if (val === 0) return `${char}`;
  const sign = val > 0 ? "-" : "+";
  return `(${char} ${sign} ${Math.abs(val)})`;
};

const getEllipseStandardLatex = (h: number, k: number, a: number, b: number): string => {
  return `\\frac{${formatTermConic("x", h)}^2}{${a * a}} + \\frac{${formatTermConic("y", k)}^2}{${b * b}} = 1`;
};

const getHyperbolaStandardLatex = (h: number, k: number, a: number, b: number, isVertical: boolean): string => {
  const xTerm = formatTermConic("x", h);
  const yTerm = formatTermConic("y", k);
  return isVertical 
    ? `\\frac{${yTerm}^2}{${a * a}} - \\frac{${xTerm}^2}{${b * b}} = 1`
    : `\\frac{${xTerm}^2}{${a * a}} - \\frac{${yTerm}^2}{${b * b}} = 1`;
};

const getParabolaStandardLatex = (h: number, k: number, p: number, isVertical: boolean): string => {
  const xTerm = formatTermConic("x", h);
  const yTerm = formatTermConic("y", k);
  return isVertical ? `${xTerm}^2 = ${4 * p}${yTerm}` : `${yTerm}^2 = ${4 * p}${xTerm}`;
};

const getConicGeneralLatex = (A: number, C: number, D: number, E: number, F: number): string => {
  let parts: string[] = [];
  if (A !== 0) parts.push(A === 1 ? "x^2" : A === -1 ? "-x^2" : `${A}x^2`);
  if (C !== 0) {
    const s = C > 0 ? (parts.length > 0 ? "+" : "") : "";
    parts.push(C === 1 ? `${s}y^2` : C === -1 ? "-y^2" : `${s}${C}y^2`);
  }
  if (D !== 0) {
    const s = D > 0 ? (parts.length > 0 ? "+" : "") : "";
    parts.push(D === 1 ? `${s}x` : D === -1 ? "-x" : `${s}${D}x`);
  }
  if (E !== 0) {
    const s = E > 0 ? (parts.length > 0 ? "+" : "") : "";
    parts.push(E === 1 ? `${s}y` : E === -1 ? "-y" : `${s}${E}y`);
  }
  if (F !== 0) {
    const s = F > 0 ? (parts.length > 0 ? "+" : "") : "";
    parts.push(`${s}${F}`);
  }
  return parts.length === 0 ? "0 = 0" : parts.join("") + " = 0";
};

const getParabolaGeneralLatex = (h: number, k: number, p: number, isVertical: boolean): string => {
  let parts: string[] = [];
  if (isVertical) {
    const D = -2 * h;
    const E = -4 * p;
    const F = h * h + 4 * p * k;
    parts.push("x^2");
    if (D !== 0) parts.push(D > 0 ? `+${D}x` : `${D}x`);
    if (E !== 0) parts.push(E > 0 ? `+${E}y` : `${E}y`);
    if (F !== 0) parts.push(F > 0 ? `+${F}` : `${F}`);
  } else {
    const D = -4 * p;
    const E = -2 * k;
    const F = k * k + 4 * p * h;
    parts.push("y^2");
    if (D !== 0) parts.push(D > 0 ? `+${D}x` : `${D}x`);
    if (E !== 0) parts.push(E > 0 ? `+${E}y` : `${E}y`);
    if (F !== 0) parts.push(F > 0 ? `+${F}` : `${F}`);
  }
  return parts.join("") + " = 0";
};

export function ConicsExplorer() {
  const [conicType, setConicType] = useState<string>("ellipse"); // parabola, ellipse, hyperbola, custom
  const [conicH, setConicH] = useState<number>(0);
  const [conicK, setConicK] = useState<number>(0);
  const [conicA, setConicA] = useState<number>(5);
  const [conicB, setConicB] = useState<number>(3);
  const [conicP, setConicP] = useState<number>(2);
  const [conicDir, setConicDir] = useState<"h" | "v">("h");
  const [conicsView3D, setConicsView3D] = useState<boolean>(false);

  // Custom formula states
  const [customExpr, setCustomExpr] = useState<string>("2 * sqrt(9 - x^2)");
  const [customError, setCustomError] = useState<string>("");
  const [showMirror, setShowMirror] = useState<boolean>(true);

  const handleCustomExprChange = (val: string) => {
    setCustomExpr(val);
    setConicType("custom");
    if (!val.trim()) {
      setCustomError("");
      return;
    }
    try {
      let clean = val.toLowerCase().replace(/\^/g, "**");
      clean = clean.replace(/(\d+)\s*([a-zA-Z\(])/g, "$1*$2");
      clean = clean.replace(/([x\)])\s*([a-zA-Z\(])/g, "$1*$2");
      new Function("x", "sin", "cos", "tan", "log", "ln", "exp", "sqrt", "abs", "pi", "e", `return (${clean});`);
      setCustomError("");
    } catch (err) {
      setCustomError("រូបមន្តមិនត្រឹមត្រូវ (Syntax Error)");
    }
  };

  let detailsKh = "";
  let equationLatex = "";
  let generalLatex = "";

  if (conicType === "ellipse") {
    const cVal = Math.sqrt(Math.abs(conicA * conicA - conicB * conicB));
    const ecc = conicA > 0 ? cVal / conicA : 0;
    equationLatex = getEllipseStandardLatex(conicH, conicK, conicA, conicB);
    
    const A = conicB * conicB;
    const C = conicA * conicA;
    const D = -2 * conicH * conicB * conicB;
    const E = -2 * conicK * conicA * conicA;
    const F = conicH * conicH * conicB * conicB + conicK * conicK * conicA * conicA - conicA * conicA * conicB * conicB;
    generalLatex = getConicGeneralLatex(A, C, D, E, F);

    detailsKh = `អេលីបនេះមាន៖\n- ផ្ចិត៖ I(${conicH}, ${conicK})\n- កំពូលធំ៖ V₁(${conicH + conicA}, ${conicK}) , V₂(${conicH - conicA}, ${conicK})\n- កំពូលតូច៖ B₁(${conicH}, ${conicK + conicB}) , B₂(${conicH}, ${conicK - conicB})\n- កំនុំ៖ F₁(${(conicH + cVal).toFixed(2)}, ${conicK}) , F₂(${(conicH - cVal).toFixed(2)}, ${conicK})\n- អុិចសង់ទ្រីស៊ីតេ៖ e = ${ecc.toFixed(3)} (0 < e < 1)`;
  } else if (conicType === "hyperbola") {
    const cVal = Math.sqrt(conicA * conicA + conicB * conicB);
    const isVertical = conicDir === "v";
    equationLatex = getHyperbolaStandardLatex(conicH, conicK, conicA, conicB, isVertical);

    let A = 0, C = 0, D = 0, E = 0, F = 0;
    if (!isVertical) {
      A = conicB * conicB;
      C = -conicA * conicA;
      D = -2 * conicH * conicB * conicB;
      E = 2 * conicK * conicA * conicA;
      F = conicH * conicH * conicB * conicB - conicK * conicK * conicA * conicA - conicA * conicA * conicB * conicB;
    } else {
      A = -conicB * conicB;
      C = conicA * conicA;
      D = 2 * conicH * conicB * conicB;
      E = -2 * conicK * conicA * conicA;
      F = -conicH * conicH * conicB * conicB + conicK * conicK * conicA * conicA - conicA * conicA * conicB * conicB;
    }
    generalLatex = getConicGeneralLatex(A, C, D, E, F);

    const m = isVertical ? conicA / conicB : conicB / conicA;
    detailsKh = `អ៊ីពែបូល${isVertical ? "ឈរ" : "ដេក"}មាន៖\n- ផ្ចិត៖ I(${conicH}, ${conicK})\n- កំពូល៖ V₁(${isVertical ? conicH : conicH + conicA}, ${isVertical ? conicK + conicA : conicK}) , V₂(${isVertical ? conicH : conicH - conicA}, ${isVertical ? conicK - conicA : conicK})\n- កំនុំ៖ F₁(${isVertical ? conicH : (conicH + cVal).toFixed(2)}, ${isVertical ? (conicK + cVal).toFixed(2) : conicK}) , F₂(${isVertical ? conicH : (conicH - cVal).toFixed(2)}, ${isVertical ? (conicK - cVal).toFixed(2) : conicK})\n- អាស៊ីមតូត៖ y - ${conicK} = ±${m.toFixed(2)}(x - ${conicH})`;
  } else if (conicType === "parabola") {
    const isVertical = conicDir === "v";
    equationLatex = getParabolaStandardLatex(conicH, conicK, conicP, isVertical);
    generalLatex = getParabolaGeneralLatex(conicH, conicK, conicP, isVertical);
    detailsKh = `ប៉ារ៉ាបូល${isVertical ? "ឈរ" : "ដេក"}មាន៖\n- កំពូល៖ V(${conicH}, ${conicK})\n- កំនុំ៖ ${isVertical ? `F(${conicH}, ${conicK + conicP})` : `F(${conicH + conicP}, ${conicK})`}\n- បន្ទាត់ប្រាប់ទិស៖ ${isVertical ? `y = ${conicK - conicP}` : `x = ${conicH - conicP}`}\n- ទិសដៅ៖ ${conicP > 0 ? (isVertical ? "ផ្ងារឡើងលើ" : "ផ្ងារទៅស្តាំ") : (isVertical ? "ផ្ងារចុះក្រោម" : "ផ្ងារទៅឆ្វេង")}`;
  } else {
    equationLatex = `y = ${customExpr || "..."}`;
    generalLatex = `y - (${customExpr || "..."}) = 0`;
    detailsKh = `អនុគមន៍ផ្ទាល់ខ្លួន៖ f(x) = ${customExpr || "..."}\n- ដែនកំណត់សង្កេត៖ x ∈ [-12, 12]\n${showMirror ? "- បង្ហាញខ្សែកោងឆ្លុះ (Mirror Across X-axis)" : ""}`;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="conics-explorer">
      {/* Header Block with custom input area adaptable to each mode */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 border-b border-white/5 pb-4">
        <div className="flex-1">
          <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            មេរៀនទី ១២៖ កោនិក
          </span>
          <h4 className="font-sans font-bold text-white text-base mt-2">ពិសោធន៍រាងធរណីមាត្រកោនិក (Interactive Conic Section Explorer)</h4>
          <p className="font-sans text-xs text-slate-400 mt-1">
            សរសេរសមីការទូទៅប៉ារ៉ាបូល អេលីប ឬអ៊ីពែបូល ដើម្បីសង្កេតរូប 2D ឬ 3D ក្នុងតម្រុយ៖
          </p>
        </div>

        {/* Dynamic Equation Builder (Yellow Box) */}
        {conicType === "ellipse" && (
          <div className="w-full lg:w-96 bg-white/5 border border-yellow-500/20 rounded-xl p-3 flex flex-col gap-2 shadow-lg shadow-yellow-500/5 hover:border-yellow-500/40 transition-all duration-300">
            <label className="text-[11px] font-sans text-yellow-400 font-bold flex items-center justify-between border-b border-white/5 pb-1">
              <span>✍️ សរសេរកែសមីការអេលីប (Ellipse Builder)</span>
              <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded-full font-mono">Center (h, k)</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">ផ្ចិត h</span>
                <input type="number" step="0.5" value={conicH} onChange={(e) => setConicH(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">ផ្ចិត k</span>
                <input type="number" step="0.5" value={conicK} onChange={(e) => setConicK(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">កន្លះអ័ក្ស a</span>
                <input type="number" min="1" max="10" value={conicA} onChange={(e) => setConicA(Math.max(1, Number(e.target.value)))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">កន្លះអ័ក្ស b</span>
                <input type="number" min="1" max="10" value={conicB} onChange={(e) => setConicB(Math.max(1, Number(e.target.value)))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
            </div>
            <div className="flex gap-1 border-t border-white/5 pt-1.5">
              {[{ l: "គល់ (0,0)", h: 0, k: 0, a: 5, b: 3 }, { l: "ផ្ចិត (2,-1)", h: 2, k: -1, a: 4, b: 2 }].map((p, i) => (
                <button key={i} onClick={() => { setConicH(p.h); setConicK(p.k); setConicA(p.a); setConicB(p.b); }} className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-slate-300 font-sans transition">💡 {p.l}</button>
              ))}
            </div>
          </div>
        )}

        {conicType === "hyperbola" && (
          <div className="w-full lg:w-96 bg-white/5 border border-yellow-500/20 rounded-xl p-3 flex flex-col gap-2 shadow-lg shadow-yellow-500/5 hover:border-yellow-500/40 transition-all duration-300">
            <label className="text-[11px] font-sans text-yellow-400 font-bold flex items-center justify-between border-b border-white/5 pb-1">
              <span>✍️ សរសេរកែសមីការអ៊ីពែបូល (Hyperbola Builder)</span>
              <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded-full font-mono">Center (h, k)</span>
            </label>
            <div className="flex gap-2 mb-0.5">
              <button onClick={() => setConicDir("h")} className={`flex-1 py-0.5 rounded text-[9px] font-sans font-bold transition ${conicDir === "h" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-black/30 text-slate-400"}`}>↔️ ផ្ដេក</button>
              <button onClick={() => setConicDir("v")} className={`flex-1 py-0.5 rounded text-[9px] font-sans font-bold transition ${conicDir === "v" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-black/30 text-slate-400"}`}>↕️ ឈរ</button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">ផ្ចិត h</span>
                <input type="number" step="0.5" value={conicH} onChange={(e) => setConicH(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">ផ្ចិត k</span>
                <input type="number" step="0.5" value={conicK} onChange={(e) => setConicK(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">អ័ក្ស a</span>
                <input type="number" min="1" max="10" value={conicA} onChange={(e) => setConicA(Math.max(1, Number(e.target.value)))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">អ័ក្ស b</span>
                <input type="number" min="1" max="10" value={conicB} onChange={(e) => setConicB(Math.max(1, Number(e.target.value)))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
            </div>
          </div>
        )}

        {conicType === "parabola" && (
          <div className="w-full lg:w-96 bg-white/5 border border-yellow-500/20 rounded-xl p-3 flex flex-col gap-2 shadow-lg shadow-yellow-500/5 hover:border-yellow-500/40 transition-all duration-300">
            <label className="text-[11px] font-sans text-yellow-400 font-bold flex items-center justify-between border-b border-white/5 pb-1">
              <span>✍️ សរសេរកែសមីការប៉ារ៉ាបូល (Parabola Builder)</span>
              <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded-full font-mono">Vertex (h, k)</span>
            </label>
            <div className="flex gap-2 mb-0.5">
              <button onClick={() => setConicDir("h")} className={`flex-1 py-0.5 rounded text-[9px] font-sans font-bold transition ${conicDir === "h" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-black/30 text-slate-400"}`}>↔️ ផ្ងារដេក</button>
              <button onClick={() => setConicDir("v")} className={`flex-1 py-0.5 rounded text-[9px] font-sans font-bold transition ${conicDir === "v" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-black/30 text-slate-400"}`}>↕️ ផ្ងារឈរ</button>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">កំពូល h</span>
                <input type="number" step="0.5" value={conicH} onChange={(e) => setConicH(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">កំពូល k</span>
                <input type="number" step="0.5" value={conicK} onChange={(e) => setConicK(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block text-center font-mono">ប៉ារ៉ាម៉ែត្រ p</span>
                <input type="number" step="0.5" value={conicP} onChange={(e) => setConicP(Number(e.target.value) === 0 ? 1 : Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded px-1 py-1 text-white text-center font-mono text-[10px]" />
              </div>
            </div>
          </div>
        )}

        {conicType === "custom" && (
          <div className="w-full lg:w-96 bg-white/5 border border-yellow-500/20 rounded-xl p-3 flex flex-col gap-1.5 shadow-lg shadow-yellow-500/5 hover:border-yellow-500/40 transition-all duration-300">
            <label className="text-[11px] font-sans text-yellow-400 font-bold flex items-center gap-1 border-b border-white/5 pb-1 justify-between">
              <span>✍️ សរសេរអនុគមន៍ផ្ទាល់ខ្លួន (Custom Formula)</span>
              <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded-full font-mono">f(x) Plot</span>
            </label>
            <div className="flex gap-1.5">
              <input type="text" placeholder="ឧទាហរណ៍៖ sqrt(16 - x^2)" value={customExpr} onChange={(e) => handleCustomExprChange(e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-yellow-500/50" />
              {customExpr && (
                <button onClick={() => { setCustomExpr(""); setCustomError(""); }} className="px-2 py-1 text-[10px] font-sans text-slate-400 hover:text-white border border-white/10 rounded bg-white/5 transition-all">លុប</button>
              )}
            </div>
            {customError ? (
              <span className="text-[10px] text-red-400 font-sans font-medium">{customError}</span>
            ) : (
              <span className="text-[9px] text-slate-400 font-sans">គាំទ្រ៖ <code className="text-yellow-300">+, -, *, /, ^, sqrt, sin, cos, abs</code></span>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: "ellipse", name: "អេលីប (Ellipse)" },
          { id: "hyperbola", name: "អ៊ីពែបូល (Hyperbola)" },
          { id: "parabola", name: "ប៉ារ៉ាបូល (Parabola)" },
          { id: "custom", name: "អនុគមន៍ផ្ទាល់ខ្លួន (Custom)" }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setConicType(t.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition flex-shrink-0 ${
              conicType === t.id
                ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold animate-pulse"
                : "bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Interactive Graph Section with 2D/3D Toggle */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="conics-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>គំនូរធរណីមាត្រកោនិក ({conicsView3D ? "3D Isometric View" : "2D Orthogonal View"})</span>
        </span>

        {/* 2D / 3D Toggle on top right */}
        <div className="absolute top-2 right-2 flex gap-1 z-10 bg-black/60 p-0.5 rounded-lg border border-white/10">
          <button onClick={() => setConicsView3D(false)} className={`px-2 py-1 rounded text-[9px] font-sans font-bold transition ${!conicsView3D ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white" : "text-slate-400 hover:text-white"}`}>📊 2D</button>
          <button onClick={() => setConicsView3D(true)} className={`px-2 py-1 rounded text-[9px] font-sans font-bold transition ${conicsView3D ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white" : "text-slate-400 hover:text-white"}`}>🌐 3D</button>
        </div>

        <svg viewBox="0 0 400 220" className="w-full max-w-[480px] h-auto overflow-visible">
          {(() => {
            const scale = 14;
            const cx = 200;
            const cy = 110;

            const project = (xVal: number, yVal: number, zVal: number) => {
              const px = cx - xVal * scale * Math.cos(Math.PI / 6) + yVal * scale * Math.cos(Math.PI / 6);
              const py = cy + xVal * scale * Math.sin(Math.PI / 6) + yVal * scale * Math.sin(Math.PI / 6) - zVal * scale;
              return { x: px, y: py };
            };

            if (conicsView3D) {
              // 3D ISOMETRIC VIEW
              const origin3D = project(0, 0, 0);
              const axisX = project(8, 0, 0);
              const axisY = project(0, 8, 0);
              const axisZ = project(0, 0, 8);

              // Draw XY Plane 3D Grid lines
              const gridLines: any[] = [];
              for (let g = -6; g <= 6; g += 2) {
                gridLines.push(<line key={`gx-${g}`} x1={project(g, -6, 0).x} y1={project(g, -6, 0).y} x2={project(g, 6, 0).x} y2={project(g, 6, 0).y} stroke="#334155" strokeWidth="0.5" strokeDasharray="1 3" />);
                gridLines.push(<line key={`gy-${g}`} x1={project(-6, g, 0).x} y1={project(-6, g, 0).y} x2={project(6, g, 0).x} y2={project(6, g, 0).y} stroke="#334155" strokeWidth="0.5" strokeDasharray="1 3" />);
              }

              // Draw double cone wireframe to visualize the intersection
              const getConeRingPath = (zVal: number) => {
                const r = Math.abs(zVal) * 0.7;
                const pts: string[] = [];
                for (let angle = 0; angle <= 2 * Math.PI + 0.1; angle += 0.3) {
                  const proj = project(r * Math.cos(angle), r * Math.sin(angle), zVal);
                  pts.push(`${angle === 0 ? "M" : "L"} ${proj.x} ${proj.y}`);
                }
                return pts.join(" ");
              };

              let conicPath3D = "";
              if (conicType === "ellipse") {
                const pts: string[] = [];
                for (let i = 0; i <= 80; i++) {
                  const th = (i * 2 * Math.PI) / 80;
                  const p3 = project(conicH + conicA * Math.cos(th), conicK + conicB * Math.sin(th), 0);
                  pts.push(`${i === 0 ? "M" : "L"} ${p3.x} ${p3.y}`);
                }
                conicPath3D = pts.join(" ");
              } else if (conicType === "hyperbola") {
                const isVertical = conicDir === "v";
                const b1: string[] = [];
                const b2: string[] = [];
                for (let t = -2.2; t <= 2.2; t += 0.1) {
                  if (!isVertical) {
                    const pL = project(conicH - conicA * Math.cosh(t), conicK + conicB * Math.sinh(t), 0);
                    const pR = project(conicH + conicA * Math.cosh(t), conicK + conicB * Math.sinh(t), 0);
                    b1.push(`${b1.length === 0 ? "M" : "L"} ${pL.x} ${pL.y}`);
                    b2.push(`${b2.length === 0 ? "M" : "L"} ${pR.x} ${pR.y}`);
                  } else {
                    const pB = project(conicH + conicB * Math.sinh(t), conicK - conicA * Math.cosh(t), 0);
                    const pT = project(conicH + conicB * Math.sinh(t), conicK + conicA * Math.cosh(t), 0);
                    b1.push(`${b1.length === 0 ? "M" : "L"} ${pB.x} ${pB.y}`);
                    b2.push(`${b2.length === 0 ? "M" : "L"} ${pT.x} ${pT.y}`);
                  }
                }
                conicPath3D = `${b1.join(" ")} ${b2.join(" ")}`;
              } else if (conicType === "parabola") {
                const isVertical = conicDir === "v";
                const pts: string[] = [];
                for (let d = -6; d <= 6; d += 0.2) {
                  const val = (d * d) / (4 * conicP);
                  const p3 = isVertical ? project(conicH + d, conicK + val, 0) : project(conicH + val, conicK + d, 0);
                  pts.push(`${pts.length === 0 ? "M" : "L"} ${p3.x} ${p3.y}`);
                }
                conicPath3D = pts.join(" ");
              }

              return (
                <>
                  {/* XY plane 3D Grid */}
                  {gridLines}

                  {/* Isometric Axes */}
                  <line x1={origin3D.x} y1={origin3D.y} x2={axisX.x} y2={axisX.y} stroke="#475569" strokeWidth="1.5" />
                  <text x={axisX.x - 8} y={axisX.y + 12} fill="#94a3b8" className="text-[9px] font-mono font-bold">X</text>
                  <line x1={origin3D.x} y1={origin3D.y} x2={axisY.x} y2={axisY.y} stroke="#475569" strokeWidth="1.5" />
                  <text x={axisY.x + 8} y={axisY.y + 10} fill="#94a3b8" className="text-[9px] font-mono font-bold">Y</text>
                  <line x1={origin3D.x} y1={origin3D.y} x2={axisZ.x} y2={axisZ.y} stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                  <text x={axisZ.x + 6} y={axisZ.y + 4} fill="#94a3b8" className="text-[9px] font-mono font-bold">Z</text>

                  {/* Translucent Double Cone to illustrate Conic Section Geometry */}
                  <path d={getConeRingPath(5)} fill="none" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="0.75" strokeDasharray="2 3" />
                  <path d={getConeRingPath(-5)} fill="none" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="0.75" strokeDasharray="2 3" />
                  <line x1={project(-3.5, 0, -5).x} y1={project(-3.5, 0, -5).y} x2={project(3.5, 0, 5).x} y2={project(3.5, 0, 5).y} stroke="rgba(244, 63, 94, 0.1)" strokeWidth="0.5" strokeDasharray="1 4" />
                  <line x1={project(3.5, 0, -5).x} y1={project(3.5, 0, -5).y} x2={project(-3.5, 0, 5).x} y2={project(-3.5, 0, 5).y} stroke="rgba(244, 63, 94, 0.1)" strokeWidth="0.5" strokeDasharray="1 4" />

                  {/* Projected Conic Curve in 3D */}
                  {conicPath3D && (
                    <path
                      d={conicPath3D}
                      fill="none"
                      stroke={conicType === "ellipse" ? "#10b981" : conicType === "hyperbola" ? "#ec4899" : "#eab308"}
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Key points in 3D */}
                  {conicType !== "custom" && (
                    <>
                      {/* Center/Vertex */}
                      <circle cx={project(conicH, conicK, 0).x} cy={project(conicH, conicK, 0).y} r="3.5" fill="#3b82f6" />
                      {/* Projection lines from center to X and Y axes */}
                      <line x1={project(conicH, conicK, 0).x} y1={project(conicH, conicK, 0).y} x2={project(conicH, 0, 0).x} y2={project(conicH, 0, 0).y} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
                      <line x1={project(conicH, conicK, 0).x} y1={project(conicH, conicK, 0).y} x2={project(0, conicK, 0).x} y2={project(0, conicK, 0).y} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
                    </>
                  )}
                </>
              );
            } else {
              // 2D ORTHOGONAL VIEW
              // Faint 2D coordinate grid lines
              const gridLines2D: any[] = [];
              for (let g = -12; g <= 12; g += 2) {
                if (g === 0) continue;
                gridLines2D.push(<line key={`v-${g}`} x1={cx + g * scale} y1="10" x2={cx + g * scale} y2="210" stroke="#1e293b" strokeWidth="0.5" />);
                gridLines2D.push(<line key={`h-${g}`} x1="10" y1={cy - g * scale} x2="390" y2={cy - g * scale} stroke="#1e293b" strokeWidth="0.5" />);
              }

              // Axes lines
              const axisX2D = <line x1="10" y1={cy} x2="390" y2={cy} stroke="#475569" strokeWidth="1.25" />;
              const axisY2D = <line x1={cx} y1="10" x2={cx} y2="210" stroke="#475569" strokeWidth="1.25" />;

              let renderElement: React.ReactNode = null;

              if (conicType === "ellipse") {
                const cVal = Math.sqrt(Math.abs(conicA * conicA - conicB * conicB));
                const horizontal = conicA >= conicB;
                const f1x = cx + (conicH + (horizontal ? cVal : 0)) * scale;
                const f1y = cy - (conicK + (horizontal ? 0 : cVal)) * scale;
                const f2x = cx + (conicH - (horizontal ? cVal : 0)) * scale;
                const f2y = cy - (conicK - (horizontal ? 0 : cVal)) * scale;

                renderElement = (
                  <>
                    <ellipse cx={cx + conicH * scale} cy={cy - conicK * scale} rx={conicA * scale} ry={conicB * scale} fill="none" stroke="#10b981" strokeWidth="2.5" />
                    {/* Foci */}
                    <circle cx={f1x} cy={f1y} r="3.5" fill="#ff4e00" />
                    <circle cx={f2x} cy={f2y} r="3.5" fill="#ff4e00" />
                    <text x={f1x + 4} y={f1y - 4} fill="#ff4e00" className="text-[7px] font-mono font-bold">F₁</text>
                    <text x={f2x - 12} y={f2y - 4} fill="#ff4e00" className="text-[7px] font-mono font-bold">F₂</text>
                    {/* Center */}
                    <circle cx={cx + conicH * scale} cy={cy - conicK * scale} r="3" fill="#3b82f6" />
                    <text x={cx + conicH * scale + 4} y={cy - conicK * scale + 10} fill="#3b82f6" className="text-[7px] font-mono font-bold">I(h,k)</text>
                  </>
                );
              } else if (conicType === "hyperbola") {
                const isVertical = conicDir === "v";
                const cVal = Math.sqrt(conicA * conicA + conicB * conicB);
                const b1: string[] = [];
                const b2: string[] = [];

                if (!isVertical) {
                  for (let dy = -8; dy <= 8; dy += 0.2) {
                    const dx = conicA * Math.sqrt(1 + (dy * dy) / (conicB * conicB));
                    const pxRight = cx + (conicH + dx) * scale;
                    const pxLeft = cx + (conicH - dx) * scale;
                    const py = cy - (conicK + dy) * scale;
                    if (pxRight >= 10 && pxRight <= 390 && py >= 10 && py <= 210) b1.push(`${b1.length === 0 ? "M" : "L"} ${pxRight} ${py}`);
                    if (pxLeft >= 10 && pxLeft <= 390 && py >= 10 && py <= 210) b2.push(`${b2.length === 0 ? "M" : "L"} ${pxLeft} ${py}`);
                  }
                } else {
                  for (let dx = -10; dx <= 10; dx += 0.2) {
                    const dy = conicA * Math.sqrt(1 + (dx * dx) / (conicB * conicB));
                    const px = cx + (conicH + dx) * scale;
                    const pyTop = cy - (conicK + dy) * scale;
                    const pyBottom = cy - (conicK - dy) * scale;
                    if (px >= 10 && px <= 390 && pyTop >= 10 && pyTop <= 210) b1.push(`${b1.length === 0 ? "M" : "L"} ${px} ${pyTop}`);
                    if (px >= 10 && px <= 390 && pyBottom >= 10 && pyBottom <= 210) b2.push(`${b2.length === 0 ? "M" : "L"} ${px} ${pyBottom}`);
                  }
                }

                // Asymptote lines
                const m = isVertical ? conicA / conicB : conicB / conicA;
                const asy1_start = { x: cx + (conicH - 12) * scale, y: cy - (conicK - 12 * m) * scale };
                const asy1_end = { x: cx + (conicH + 12) * scale, y: cy - (conicK + 12 * m) * scale };
                const asy2_start = { x: cx + (conicH - 12) * scale, y: cy - (conicK + 12 * m) * scale };
                const asy2_end = { x: cx + (conicH + 12) * scale, y: cy - (conicK - 12 * m) * scale };

                // Foci points
                const f1x = cx + (conicH + (isVertical ? 0 : cVal)) * scale;
                const f1y = cy - (conicK + (isVertical ? cVal : 0)) * scale;
                const f2x = cx + (conicH - (isVertical ? 0 : cVal)) * scale;
                const f2y = cy - (conicK - (isVertical ? cVal : 0)) * scale;

                renderElement = (
                  <>
                    <line x1={asy1_start.x} y1={asy1_start.y} x2={asy1_end.x} y2={asy1_end.y} stroke="#334155" strokeWidth="0.75" strokeDasharray="3 3" />
                    <line x1={asy2_start.x} y1={asy2_start.y} x2={asy2_end.x} y2={asy2_end.y} stroke="#334155" strokeWidth="0.75" strokeDasharray="3 3" />
                    {b1.length > 0 && <path d={b1.join(" ")} fill="none" stroke="#ec4899" strokeWidth="2.5" />}
                    {b2.length > 0 && <path d={b2.join(" ")} fill="none" stroke="#ec4899" strokeWidth="2.5" />}
                    <circle cx={f1x} cy={f1y} r="3.5" fill="#ff4e00" />
                    <circle cx={f2x} cy={f2y} r="3.5" fill="#ff4e00" />
                    <text x={f1x + 4} y={f1y - 4} fill="#ff4e00" className="text-[7px] font-mono font-bold">F₁</text>
                    <text x={f2x - 12} y={f2y - 4} fill="#ff4e00" className="text-[7px] font-mono font-bold">F₂</text>
                    <circle cx={cx + conicH * scale} cy={cy - conicK * scale} r="3" fill="#3b82f6" />
                    <text x={cx + conicH * scale + 4} y={cy - conicK * scale + 10} fill="#3b82f6" className="text-[7px] font-mono font-bold">I(h,k)</text>
                  </>
                );
              } else if (conicType === "parabola") {
                const isVertical = conicDir === "v";
                const paraPoints: string[] = [];

                if (!isVertical) {
                  for (let dy = -8; dy <= 8; dy += 0.2) {
                    const dx = (dy * dy) / (4 * conicP);
                    const px = cx + (conicH + dx) * scale;
                    const py = cy - (conicK + dy) * scale;
                    if (px >= 10 && px <= 390 && py >= 10 && py <= 210) {
                      paraPoints.push(`${paraPoints.length === 0 ? "M" : "L"} ${px} ${py}`);
                    }
                  }
                } else {
                  for (let dx = -10; dx <= 10; dx += 0.2) {
                    const dy = (dx * dx) / (4 * conicP);
                    const px = cx + (conicH + dx) * scale;
                    const py = cy - (conicK + dy) * scale;
                    if (px >= 10 && px <= 390 && py >= 10 && py <= 210) {
                      paraPoints.push(`${paraPoints.length === 0 ? "M" : "L"} ${px} ${py}`);
                    }
                  }
                }

                // Focus
                const fx = cx + (conicH + (isVertical ? 0 : conicP)) * scale;
                const fy = cy - (conicK + (isVertical ? conicP : 0)) * scale;

                // Directrix Line
                const dirX1 = isVertical ? 10 : cx + (conicH - conicP) * scale;
                const dirX2 = isVertical ? 390 : cx + (conicH - conicP) * scale;
                const dirY1 = isVertical ? cy - (conicK - conicP) * scale : 10;
                const dirY2 = isVertical ? cy - (conicK - conicP) * scale : 210;

                renderElement = (
                  <>
                    <line x1={dirX1} y1={dirY1} x2={dirX2} y2={dirY2} stroke="#f43f5e" strokeWidth="1.25" strokeDasharray="3 3" />
                    <text x={isVertical ? 15 : cx + (conicH - conicP) * scale - 45} y={isVertical ? cy - (conicK - conicP) * scale - 4 : 20} fill="#f43f5e" className="text-[7px] font-sans font-bold">Directrix</text>
                    {paraPoints.length > 0 && <path d={paraPoints.join(" ")} fill="none" stroke="#eab308" strokeWidth="2.5" />}
                    <circle cx={cx + conicH * scale} cy={cy - conicK * scale} r="3.5" fill="#3b82f6" />
                    <text x={cx + conicH * scale + 4} y={cy - conicK * scale + 10} fill="#3b82f6" className="text-[7px] font-mono font-bold">V(h,k)</text>
                    <circle cx={fx} cy={fy} r="3.5" fill="#ff4e00" />
                    <text x={fx + 4} y={fy - 4} fill="#ff4e00" className="text-[7px] font-mono font-bold">F</text>
                  </>
                );
              } else if (conicType === "custom") {
                const points: string[] = [];
                const mirrorPoints: string[] = [];
                let isDrawing = false;
                let isDrawingMirror = false;
                
                for (let sx = -11.5; sx <= 11.5; sx += 0.05) {
                  const sy = evaluateCustom(sx, customExpr);
                  const px = cx + sx * scale;
                  const py = cy - sy * scale;
                  
                  if (!isNaN(sy) && isFinite(sy) && py >= 10 && py <= 210) {
                    if (!isDrawing) {
                      points.push(`M ${px} ${py}`);
                      isDrawing = true;
                    } else {
                      points.push(`L ${px} ${py}`);
                    }
                  } else {
                    isDrawing = false;
                  }

                  if (showMirror) {
                    const pyMirror = cy + sy * scale;
                    if (!isNaN(sy) && isFinite(sy) && pyMirror >= 10 && pyMirror <= 210) {
                      if (!isDrawingMirror) {
                        mirrorPoints.push(`M ${px} ${pyMirror}`);
                        isDrawingMirror = true;
                      } else {
                        mirrorPoints.push(`L ${px} ${pyMirror}`);
                      }
                    } else {
                      isDrawingMirror = false;
                    }
                  }
                }
                const pathStr = points.join(" ");
                const mirrorPathStr = mirrorPoints.join(" ");

                renderElement = (
                  <>
                    {pathStr && <path d={pathStr} fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />}
                    {showMirror && mirrorPathStr && <path d={mirrorPathStr} fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.8" />}
                  </>
                );
              }

              return (
                <>
                  {gridLines2D}
                  {axisX2D}
                  {axisY2D}
                  <text x="375" y={cy + 12} fill="#64748b" className="text-[9px] font-mono font-bold">X</text>
                  <text x={cx + 8} y="20" fill="#64748b" className="text-[9px] font-mono font-bold">Y</text>
                  {renderElement}
                </>
              );
            }
          })()}
        </svg>
        <div className="text-[9px] text-slate-500 font-sans mt-2 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00]" /> កំនុំ (Focus)</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" /> ផ្ចិត/កំពូល (Center/Vertex)</span>
          {conicType === "parabola" && <span className="flex items-center gap-1"><span className="w-3 h-0.5 border-t border-dashed border-[#f43f5e]" /> បន្ទាត់ប្រាប់ទិស (Directrix)</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4 bg-white/5 p-4 border border-[#ff4e00]/10 rounded-xl">
          <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
            <span>កែសម្រួលសមីការស្តង់ដា និងទូទៅ (Equation Adjuster)</span>
          </h5>

          {conicType === "custom" ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-sans text-slate-300 bg-white/5 p-2 rounded border border-white/5">
                <span>ឆ្លុះអ័ក្ស X (Mirror Curve ±y)</span>
                <button
                  onClick={() => setShowMirror(!showMirror)}
                  className={`px-2 py-1 rounded text-[10px] font-bold font-sans transition ${
                    showMirror 
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                      : "bg-white/5 text-slate-400 border border-white/5 hover:text-white"
                  }`}
                >
                  {showMirror ? "បើក (ON)" : "បិទ (OFF)"}
                </button>
              </div>

              <div className="text-[11px] text-slate-300">
                សាកល្បងរូបមន្តកោនិក ឬអនុគមន៍គំរូ៖
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "រង្វង់ (Circle): sqrt(16-x^2)", expr: "sqrt(16 - x^2)" },
                  { label: "អេលីប (Ellipse): 2*sqrt(9-x^2)", expr: "2 * sqrt(9 - x^2)" },
                  { label: "អ៊ីពែបូល (Hyperbola): 1.5*sqrt(x^2-4)", expr: "1.5 * sqrt(x^2 - 4)" },
                  { label: "ប៉ារ៉ាបូល (Parabola): x^2 / 4", expr: "x^2 / 4" }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCustomExprChange(preset.expr)}
                    className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 text-left hover:text-white font-sans transition-all hover:border-yellow-500/30"
                  >
                    💡 {preset.label.split(":")[0]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Sliders to easily fine-tune coordinates visually */}
              <div>
                <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
                  <span>កូអរដោនេ h (ផ្ចិត ឬកំពូល)</span>
                  <span className="font-mono text-orange-400 font-bold">{conicH}</span>
                </div>
                <input type="range" min="-5" max="5" step="0.5" value={conicH} onChange={(e) => setConicH(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
                  <span>កូអរដោនេ k (ផ្ចិត ឬកំពូល)</span>
                  <span className="font-mono text-orange-400 font-bold">{conicK}</span>
                </div>
                <input type="range" min="-5" max="5" step="0.5" value={conicK} onChange={(e) => setConicK(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
                  <span>{conicType === "parabola" ? "ប៉ារ៉ាម៉ែត្រ p" : "កន្លះអ័ក្ស a (ទំហំ)"}</span>
                  <span className="font-mono text-orange-400 font-bold">{conicType === "parabola" ? conicP : conicA}</span>
                </div>
                <input
                  type="range"
                  min={conicType === "parabola" ? "-5" : "1"}
                  max="10"
                  step="0.5"
                  value={conicType === "parabola" ? conicP : conicA}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (conicType === "parabola") {
                      setConicP(val === 0 ? 0.5 : val);
                    } else {
                      setConicA(val);
                    }
                  }}
                  className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer"
                />
              </div>

              {conicType !== "parabola" && (
                <div>
                  <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
                    <span>កន្លះអ័ក្ស b</span>
                    <span className="font-mono text-orange-400 font-bold">{conicB}</span>
                  </div>
                  <input type="range" min="1" max="10" step="0.5" value={conicB} onChange={(e) => setConicB(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
                </div>
              )}
            </>
          )}

          <div className="space-y-1.5 mt-2">
            <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 text-center font-mono text-white text-[11px]">
              <span className="text-slate-500 block mb-0.5 font-sans text-[10px]">សមីការស្តង់ដា (Standard Form)៖</span>
              <div dangerouslySetInnerHTML={{ __html: renderMathBlock(equationLatex) }} />
            </div>
            {generalLatex && (
              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 text-center font-mono text-white text-[11px]">
                <span className="text-slate-500 block mb-0.5 font-sans text-[10px]">សមីការទូទៅ (General expanded Form)៖</span>
                <div dangerouslySetInnerHTML={{ __html: renderMathBlock(generalLatex) }} />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex flex-col justify-between">
          <div>
            <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>ព័ត៌មានលម្អិតធរណីមាត្រ (Geometric Details)</span>
            </h5>

            <pre className="font-sans text-xs text-slate-200 mt-3 whitespace-pre-line leading-relaxed">
              {detailsKh}
            </pre>
          </div>

          <div className="text-[10px] text-slate-500 italic font-sans border-t border-white/5 pt-2 mt-4">
            *ចំណាំ៖ អ្នកអាចកែប្រែកូអរដោនេផ្ចិត ឬកំពូល (h, k) ព្រមទាំងប៉ារ៉ាម៉ែត្ររបស់សមីការកោនិកទូទៅបានយ៉ាងសេរី!
          </div>
        </div>
      </div>
    </div>
  );
}
