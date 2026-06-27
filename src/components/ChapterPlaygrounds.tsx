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
  Eye
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
  const [n, setN] = useState<number>(5);
  const [r, setR] = useState<number>(2);

  // Ball picker
  const [redBalls, setRedBalls] = useState<number>(4);
  const [blueBalls, setBlueBalls] = useState<number>(3);

  // Math helper
  const fact = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const perm = n >= r ? fact(n) / fact(n - r) : 0;
  const comb = n >= r ? fact(n) / (fact(n - r) * fact(r)) : 0;

  // Probability drawing 1 red ball in 1 draw
  const totalBalls = redBalls + blueBalls;
  const probRed = totalBalls > 0 ? redBalls / totalBalls : 0;
  const probBlue = totalBalls > 0 ? blueBalls / totalBalls : 0;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="probability-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ៩៖ ប្រូបាប
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ម៉ាស៊ីនគណនាប្រូបាប និងបន្សំ (Combinatorics & Probability Calculator)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          សិក្សារូបមន្តបន្សំ ច្រាស់ និងពិសោធន៍ការចាប់បាល់ចេញពីថង់៖
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Combinatorics section */}
        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#ff4e00]" />
            <span>វិភាគបន្សំ និងសម្រាស់ (Combinatorics)</span>
          </h5>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">ចំនួនធាតុសរុប (n)</span>
              <input
                type="number"
                min="1"
                max="10"
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
              <span className="text-[10px] text-slate-400 block mb-1">ចំនួនធាតុជ្រើសរើស (r)</span>
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

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-black/30 p-2.5 rounded border border-white/5">
              <div className="text-[10px] text-slate-400 mb-1">សម្រាស់ (Permutations) P(n, r)៖</div>
              <div className="text-[#ff8c00] font-bold flex justify-between">
                <span dangerouslySetInnerHTML={{ __html: renderMath(`P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!}`) }} />
                <span>= {perm.toLocaleString()} របៀប</span>
              </div>
            </div>

            <div className="bg-[#ff4e00]/5 p-2.5 rounded border border-[#ff4e00]/10">
              <div className="text-[10px] text-[#ff8c00] mb-1">បន្សំ (Combinations) C(n, r)៖</div>
              <div className="text-white font-bold flex justify-between">
                <span dangerouslySetInnerHTML={{ __html: renderMath(`C(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!r!}`) }} />
                <span>= {comb.toLocaleString()} របៀប</span>
              </div>
            </div>
          </div>
        </div>

        {/* Urn model simulation */}
        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5 text-emerald-400" />
            <span>ពិសោធន៍ចាប់បាល់ (Urn Probability Model)</span>
          </h5>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] text-red-400 block mb-1">ចំនួនបាល់ក្រហម</span>
              <input
                type="number"
                min="0"
                max="10"
                value={redBalls}
                onChange={(e) => setRedBalls(Math.max(0, Number(e.target.value)))}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono"
              />
            </div>
            <div>
              <span className="text-[10px] text-blue-400 block mb-1">ចំនួនបាល់ខៀវ</span>
              <input
                type="number"
                min="0"
                max="10"
                value={blueBalls}
                onChange={(e) => setBlueBalls(Math.max(0, Number(e.target.value)))}
                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-black/30 rounded-xl border border-white/5">
            <div className="text-[10px] text-slate-400 mb-2">បាល់នៅក្នុងថង់ (Visual Container)：</div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {Array.from({ length: redBalls }).map((_, i) => (
                <div key={`red-${i}`} className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse" />
              ))}
              {Array.from({ length: blueBalls }).map((_, i) => (
                <div key={`blue-${i}`} className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-pulse" />
              ))}
              {totalBalls === 0 && <span className="text-[10px] text-slate-500 italic">គ្មានបាល់នៅក្នុងថង់ទេ</span>}
            </div>

            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">ប្រូបាបចាប់បានក្រហម 1 P(R)៖</span>
                <span className="text-red-400 font-bold">{totalBalls > 0 ? `${redBalls}/${totalBalls} (${(probRed * 100).toFixed(1)}%)` : "0%"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ប្រូបាបចាប់បានខៀវ 1 P(B)៖</span>
                <span className="text-blue-400 font-bold">{totalBalls > 0 ? `${blueBalls}/${totalBalls} (${(probBlue * 100).toFixed(1)}%)` : "0%"}</span>
              </div>
            </div>

            {totalBalls > 0 && (
              <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                <span className="text-[10px] text-slate-500 font-sans block">ក្រាបប្រូបាប (Probability Bar Distribution)៖</span>
                <div className="space-y-1.5 font-sans text-[11px]">
                  {/* Red Bar */}
                  <div>
                    <div className="flex justify-between mb-0.5 text-red-400">
                      <span>ក្រហម (Red)</span>
                      <span className="font-mono font-bold">{(probRed * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="bg-red-500 h-full transition-all duration-500 rounded-full"
                        style={{ width: `${probRed * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Blue Bar */}
                  <div>
                    <div className="flex justify-between mb-0.5 text-blue-400">
                      <span>ខៀវ (Blue)</span>
                      <span className="font-mono font-bold">{(probBlue * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="bg-blue-500 h-full transition-all duration-500 rounded-full"
                        style={{ width: `${probBlue * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. CURVE SKETCHING EXPLORER (Chapter 10)
// ==========================================
export function CurveSketchingExplorer() {
  const [funcType, setFuncType] = useState<string>("quadratic");
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-2);

  // Quadratic f(x) = ax^2 + bx + 1
  // Derivative f'(x) = 2ax + b
  // Critical point where f'(x) = 0 => x = -b / (2a)
  const x_crit = -b / (2 * a);
  const y_crit = a * x_crit * x_crit + b * x_crit + 1;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="curve-sketching-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ១០៖ សិក្សាអនុគមន៍ខ្សែគោល
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ឧបករណ៍វិភាគខ្សែគោល និងតារាងអថេរភាព (Curve Variation Analyzer)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          កែសម្រួលមេគុណនៃអនុគមន៍ដឺក្រេទី២ <span className="text-orange-400 font-bold">$f(x) = ax^2 + bx + 1$</span> ដើម្បីវិភាគតារាងអថេរភាព និងទិសដៅ៖
        </p>
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="curve-sketching-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>គំនូរក្រាហ្វិកខ្សែគោលដឺក្រេទី ២ (Quadratic Curve & Critical Vertex)</span>
        </span>
        <svg viewBox="0 0 400 200" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Coordinate grid lines */}
          <line x1="20" y1="120" x2="380" y2="120" stroke="#334155" strokeWidth="1" />
          <line x1="200" y1="10" x2="200" y2="190" stroke="#334155" strokeWidth="1" />
          
          {/* Labels for axes */}
          <text x="375" y="135" fill="#64748b" className="text-[10px] font-mono">x</text>
          <text x="210" y="20" fill="#64748b" className="text-[10px] font-mono font-bold">y</text>

          {(() => {
            const mapX = (xVal: number) => 200 + xVal * 32;
            const mapY = (yVal: number) => 120 - yVal * 7.5;

            // Plot curve: y = ax^2 + bx + 1
            const points: string[] = [];
            for (let sx = -4.5; sx <= 4.5; sx += 0.1) {
              const sy = a * sx * sx + b * sx + 1;
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

            const critX = mapX(x_crit);
            const critY = mapY(y_crit);

            return (
              <>
                {/* Horizontal Tangent line at vertex */}
                {critY >= 10 && critY <= 190 && (
                  <line x1="40" y1={critY} x2="360" y2={critY} stroke="#ff8c00" strokeWidth="1.25" strokeDasharray="4 4" opacity="0.8" />
                )}

                {/* Function Curve */}
                <path d={pathStr} fill="none" stroke="#ff4e00" strokeWidth="2.5" />

                {/* Critical Vertex dot */}
                {critY >= 10 && critY <= 190 && (
                  <>
                    <circle cx={critX} cy={critY} r="5.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                    <text x={critX + 8} y={critY - 6} fill="#e11d48" className="text-[9px] font-mono font-bold">កំពូល V({x_crit.toFixed(1)}, {y_crit.toFixed(1)})</text>
                  </>
                )}
              </>
            );
          })()}
        </svg>
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#ff4e00] inline-block" /> ខ្សែគោល y = {a}x² {b >= 0 ? "+" : ""} {b}x + 1</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 border-t border-dashed border-[#ff8c00] inline-block" /> បន្ទាត់ប៉ះត្រង់កំពូល y = {y_crit.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="space-y-4 bg-white/5 p-4 border border-white/10 rounded-xl">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
            <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
            <span>កែសម្រួលមេគុណ (Coefficients)</span>
          </h5>

          <div>
            <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
              <span>មេគុណ a (ដឺក្រេទី ២)</span>
              <span className="font-mono text-orange-400 font-bold">{a}</span>
            </div>
            <input
              type="range"
              min="-3"
              max="3"
              step="1"
              value={a}
              onChange={(e) => {
                const val = Number(e.target.value);
                setA(val === 0 ? 1 : val); // avoid a = 0 for quadratic
              }}
              className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
              <span>មេគុណ b (ដឺក្រេទី ១)</span>
              <span className="font-mono text-orange-400 font-bold">{b}</span>
            </div>
            <input type="range" min="-6" max="6" step="1" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
          </div>

          <div className="bg-black/30 p-3 rounded-lg border border-white/5 space-y-1 text-xs font-mono">
            <div>អនុគមន៍៖ <span className="text-white">f(x) = {a}x² {b >= 0 ? "+" : ""} {b}x + 1</span></div>
            <div>ដេរីវេ៖ <span className="text-[#ff8c00]">f'(x) = {2 * a}x {b >= 0 ? "+" : ""} {b}</span></div>
          </div>
        </div>

        {/* Dynamic Variation Table */}
        <div className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Grid className="w-3.5 h-3.5 text-[#ff8c00]" />
            <span>តារាងអថេរភាព (Table of Variations)</span>
          </h5>

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
                <div className="text-[10px] text-orange-400">{a > 0 ? "អប្បបរមា" : "អតិបរមា"}</div>
                {y_crit.toFixed(2)}
              </span>
              <span className="text-right self-end">{a > 0 ? "+∞" : "-∞"}</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 leading-relaxed font-sans bg-black/20 p-2.5 rounded border border-white/5">
            <strong>វិភាគក្រាហ្វ៖</strong> ប៉ារ៉ាបូលមានកំពូលត្រង់កូអរដោនេ <span className="text-white font-mono">I({x_crit.toFixed(1)}, {y_crit.toFixed(1)})</span> ដែលជាចំណុច {a > 0 ? "អប្បបរមា ( concave up )" : "អតិបរមា ( concave down )"}។
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ១១៖ វ៉ិចទ័រក្នុងលំហ
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ម៉ាស៊ីនគណនាវ៉ិចទ័រ 3D (3D Vector Space Calculator)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          បញ្ចូលកូអរដោនេនៃពីរវ៉ិចទ័រ <span className="text-orange-400 font-bold">{"$\\vec{u}$"}</span> និង <span className="text-orange-400 font-bold">{"$\\vec{v}$"}</span> ក្នុងលំហកូអរដោនេ 3D៖
        </p>
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
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#ff4e00] inline-block" /> វ៉ិចទ័រ u</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#3b82f6] inline-block" /> វ៉ិចទ័រ v</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 border-t border-dashed border-[#eab308] inline-block" /> ផលគុណខ្វែង u × v</span>
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
export function ConicsExplorer() {
  const [conicType, setConicType] = useState<string>("ellipse"); // parabola, ellipse, hyperbola
  const [a, setA] = useState<number>(5); // semi-major axis / parameters
  const [b, setB] = useState<number>(3); // semi-minor axis

  const h = 0;
  const k = 0;

  let detailsKh = "";
  let equationLatex = "";

  if (conicType === "ellipse") {
    const cVal = Math.sqrt(Math.abs(a * a - b * b));
    const ecc = a > 0 ? cVal / a : 0;
    equationLatex = `\\frac{x^2}{${a*a}} + \\frac{y^2}{${b*b}} = 1`;
    detailsKh = `អេលីបនេះមាន៖\n- កំពូល៖ V₁(${a}, 0) , V₂(-${a}, 0)\n- កំនុំ៖ F₁(${cVal.toFixed(2)}, 0) , F₂(-${cVal.toFixed(2)}, 0)\n- អុិចសង់ទ្រីស៊ីតេ៖ e = ${ecc.toFixed(3)} (អេលីបមាន 0 < e < 1 ជានិច្ច)`;
  } else if (conicType === "hyperbola") {
    const cVal = Math.sqrt(a * a + b * b);
    const asymptoteSlope = b / a;
    equationLatex = `\\frac{x^2}{${a*a}} - \\frac{y^2}{${b*b}} = 1`;
    detailsKh = `អ៊ីពែបូលនេះមាន៖\n- កំពូល៖ V₁(${a}, 0) , V₂(-${a}, 0)\n- កំនុំ៖ F₁(${cVal.toFixed(2)}, 0) , F₂(-${cVal.toFixed(2)}, 0)\n- អាស៊ីមតូត៖ y = ±${asymptoteSlope.toFixed(2)}x`;
  } else {
    // Parabola y^2 = 4px (setting p = a)
    const p = a;
    equationLatex = `y^2 = ${4 * p}x`;
    detailsKh = `ប៉ារ៉ាបូលនេះមាន៖\n- កំពូល៖ V(0, 0)\n- កំនុំ៖ F(${p}, 0)\n- បន្ទាត់ប្រាប់ទិស៖ x = -${p}`;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl" id="conics-explorer">
      <div className="mb-4">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          មេរៀនទី ១២៖ កោនិក
        </span>
        <h4 className="font-sans font-bold text-white text-base mt-2">ពិសោធន៍រាងធរណីមាត្រកោនិក (Interactive Conic Section Explorer)</h4>
        <p className="font-sans text-xs text-slate-400 mt-1">
          ជ្រើសរើសប្រភេទកោនិក និងកែសម្រួលប៉ារ៉ាម៉ែត្រ $a, b$ ដើម្បីសង្កេតសមីការស្តង់ដា និងលក្ខណៈសម្បត្តិ៖
        </p>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: "ellipse", name: "អេលីប (Ellipse)" },
          { id: "hyperbola", name: "អ៊ីពែបូល (Hyperbola)" },
          { id: "parabola", name: "ប៉ារ៉ាបូល (Parabola)" }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setConicType(t.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition flex-shrink-0 ${
              conicType === t.id
                ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold"
                : "bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-5 flex flex-col items-center justify-center relative min-h-[220px]" id="conics-graph">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>គំនូរធរណីមាត្រកោនិក (Interactive Geometric Conic Section Plot)</span>
        </span>
        <svg viewBox="0 0 400 220" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Coordinate Axes */}
          <line x1="20" y1="110" x2="380" y2="110" stroke="#334155" strokeWidth="1" />
          <line x1="200" y1="10" x2="200" y2="210" stroke="#334155" strokeWidth="1" />

          {/* Labels for axes */}
          <text x="375" y="122" fill="#64748b" className="text-[10px] font-mono">X</text>
          <text x="210" y="20" fill="#64748b" className="text-[10px] font-mono font-bold">Y</text>

          {(() => {
            const scale = 16;
            const cx = 200;
            const cy = 110;

            if (conicType === "ellipse") {
              const cVal = Math.sqrt(Math.abs(a * a - b * b));
              return (
                <>
                  {/* Ellipse Path */}
                  <ellipse cx={cx} cy={cy} rx={a * scale} ry={b * scale} fill="none" stroke="#10b981" strokeWidth="2.5" />
                  
                  {/* Foci (F1, F2) */}
                  <circle cx={cx + cVal * scale} cy={cy} r="4" fill="#ff4e00" />
                  <circle cx={cx - cVal * scale} cy={cy} r="4" fill="#ff4e00" />
                  <text x={cx + cVal * scale + 4} y={cy - 6} fill="#ff4e00" className="text-[8px] font-mono font-bold">F₁(c)</text>
                  <text x={cx - cVal * scale - 22} y={cy - 6} fill="#ff4e00" className="text-[8px] font-mono font-bold">F₂(-c)</text>

                  {/* Vertices (V1, V2) */}
                  <circle cx={cx + a * scale} cy={cy} r="3" fill="#3b82f6" />
                  <circle cx={cx - a * scale} cy={cy} r="3" fill="#3b82f6" />
                  <text x={cx + a * scale + 4} y={cy + 12} fill="#3b82f6" className="text-[8px] font-mono font-bold">V₁(a)</text>
                  <text x={cx - a * scale - 20} y={cy + 12} fill="#3b82f6" className="text-[8px] font-mono font-bold">V₂(-a)</text>
                </>
              );
            } else if (conicType === "hyperbola") {
              const cVal = Math.sqrt(a * a + b * b);
              const slope = b / a;

              const rightPoints: string[] = [];
              const leftPoints: string[] = [];
              for (let sy = -5; sy <= 5; sy += 0.2) {
                const sx = a * Math.sqrt(1 + (sy * sy) / (b * b));
                const pxRight = cx + sx * scale;
                const pxLeft = cx - sx * scale;
                const py = cy + sy * scale;

                if (pxRight >= 20 && pxRight <= 380) {
                  if (rightPoints.length === 0) rightPoints.push(`M ${pxRight} ${py}`);
                  else rightPoints.push(`L ${pxRight} ${py}`);
                }
                if (pxLeft >= 20 && pxLeft <= 380) {
                  if (leftPoints.length === 0) leftPoints.push(`M ${pxLeft} ${py}`);
                  else leftPoints.push(`L ${pxLeft} ${py}`);
                }
              }

              return (
                <>
                  {/* Asymptote lines: y = ±(b/a)x */}
                  <line x1="60" y1={cy - (140 * slope * scale) / 16} x2="340" y2={cy + (140 * slope * scale) / 16} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="60" y1={cy + (140 * slope * scale) / 16} x2="340" y2={cy - (140 * slope * scale) / 16} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="320" y={cy - 20} fill="#64748b" className="text-[8px] font-mono">y = ±(b/a)x</text>

                  {/* Left & Right branches */}
                  <path d={rightPoints.join(" ")} fill="none" stroke="#ec4899" strokeWidth="2.5" />
                  <path d={leftPoints.join(" ")} fill="none" stroke="#ec4899" strokeWidth="2.5" />

                  {/* Foci */}
                  <circle cx={cx + cVal * scale} cy={cy} r="4" fill="#ff4e00" />
                  <circle cx={cx - cVal * scale} cy={cy} r="4" fill="#ff4e00" />
                  <text x={cx + cVal * scale + 4} y={cy - 6} fill="#ff4e00" className="text-[8px] font-mono font-bold">F₁(c)</text>
                  <text x={cx - cVal * scale - 22} y={cy - 6} fill="#ff4e00" className="text-[8px] font-mono font-bold">F₂(-c)</text>

                  {/* Vertices */}
                  <circle cx={cx + a * scale} cy={cy} r="3" fill="#3b82f6" />
                  <circle cx={cx - a * scale} cy={cy} r="3" fill="#3b82f6" />
                  <text x={cx + a * scale + 4} y={cy + 12} fill="#3b82f6" className="text-[8px] font-mono font-bold">V₁(a)</text>
                  <text x={cx - a * scale - 20} y={cy + 12} fill="#3b82f6" className="text-[8px] font-mono font-bold">V₂(-a)</text>
                </>
              );
            } else {
              const p = a;
              const paraPoints: string[] = [];
              for (let sy = -5; sy <= 5; sy += 0.2) {
                const sx = (sy * sy) / (4 * p);
                const px = cx + sx * scale;
                const py = cy + sy * scale;
                if (px >= 20 && px <= 380) {
                  if (paraPoints.length === 0) paraPoints.push(`M ${px} ${py}`);
                  else paraPoints.push(`L ${px} ${py}`);
                }
              }

              return (
                <>
                  {/* Directrix line: x = -p */}
                  <line x1={cx - p * scale} y1="20" x2={cx - p * scale} y2="200" stroke="#f43f5e" strokeWidth="1.25" strokeDasharray="4 4" />
                  <text x={cx - p * scale - 36} y="40" fill="#f43f5e" className="text-[8px] font-mono font-bold">Directrix x=-p</text>

                  {/* Parabola Curve */}
                  <path d={paraPoints.join(" ")} fill="none" stroke="#eab308" strokeWidth="2.5" />

                  {/* Vertex V(0,0) */}
                  <circle cx={cx} cy={cy} r="4" fill="#3b82f6" />
                  <text x={cx + 6} y={cy + 12} fill="#3b82f6" className="text-[8px] font-mono font-bold">V(0,0)</text>

                  {/* Focus F(p, 0) */}
                  <circle cx={cx + p * scale} cy={cy} r="4" fill="#ff4e00" />
                  <text x={cx + p * scale + 6} y={cy - 6} fill="#ff4e00" className="text-[8px] font-mono font-bold">F(p, 0)</text>
                </>
              );
            }
          })()}
        </svg>
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center flex items-center justify-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ff4e00]" /> កំនុំ (Focus)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> កំពូល (Vertex)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4 bg-white/5 p-4 border border-[#ff4e00]/10 rounded-xl">
          <h5 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#ff4e00]" />
            <span>កែសម្រួលទំហំអ័ក្ស (Geometry Dimensions)</span>
          </h5>

          <div>
            <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
              <span>កន្លះអ័ក្សធំ a (ឬ ប៉ារ៉ាម៉ែត្រ p)</span>
              <span className="font-mono text-orange-400 font-bold">{a}</span>
            </div>
            <input type="range" min="2" max="8" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
          </div>

          {conicType !== "parabola" && (
            <div>
              <div className="flex justify-between text-[11px] font-sans text-slate-300 mb-1">
                <span>កន្លះអ័ក្សតូច b</span>
                <span className="font-mono text-orange-400 font-bold">{b}</span>
              </div>
              <input type="range" min="1" max={a - 1} value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full h-1 bg-white/10 accent-[#ff4e00] cursor-pointer" />
            </div>
          )}

          <div className="bg-black/40 p-3 rounded-lg border border-white/5 text-center font-mono text-white text-xs">
            <span className="text-slate-500 block mb-1 font-sans text-[10px]">សមីការស្តង់ដា (Standard Eq.)៖</span>
            <div dangerouslySetInnerHTML={{ __html: renderMathBlock(equationLatex) }} />
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
            *ចំណាំ៖ កោនិកទាំងអស់សិក្សាលើផ្ចិត / កំពូលស្ថិតនៅគល់តម្រុយ O(0,0) ដើម្បីងាយស្រួលយល់រូបមន្តគ្រឹះ។
          </div>
        </div>
      </div>
    </div>
  );
}
