/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MoveRight, TrendingUp, Compass, Settings, Eye } from "lucide-react";

interface LimitFormula {
  id: string;
  nameKh: string;
  formula: string;
  expression: (x: number, k: number) => number;
  limitVal: (k: number) => number;
  limitExplanationKh: (k: number) => string;
  kDefault: number;
  kMin: number;
  kMax: number;
  kLabelKh: string;
}

const LIMIT_FORMULAS: LimitFormula[] = [
  {
    id: "sin_x_x",
    nameKh: "លីមីតត្រីកោណមាត្រ (sin(kx)/x)",
    formula: "lim_(x→0) sin(kx) / x = k",
    expression: (x, k) => (x === 0 ? k : Math.sin(k * x) / x),
    limitVal: (k) => k,
    limitExplanationKh: (k) => `កាលណា x ខិតជិត 0 នោះផលធៀប sin(${k}x)/x ខិតជិតតម្លៃលីមីត k = ${k}។`,
    kDefault: 3,
    kMin: 1,
    kMax: 8,
    kLabelKh: "គុណមេគុណ k ក្នុងមុំ"
  },
  {
    id: "exp_x_1",
    nameKh: "លីមីតអិចស្ប៉ូណង់ស្យែល ((e^(kx) - 1)/x)",
    formula: "lim_(x→0) (e^(kx) - 1) / x = k",
    expression: (x, k) => (x === 0 ? k : (Math.exp(k * x) - 1) / x),
    limitVal: (k) => k,
    limitExplanationKh: (k) => `កាលណា x ខិតជិត 0 នោះ (e^(${k}x) - 1)/x ខិតជិតតម្លៃលីមីត k = ${k}។`,
    kDefault: 2,
    kMin: 1,
    kMax: 5,
    kLabelKh: "ស្វ័យគុណមេគុណ k"
  },
  {
    id: "ln_1_x",
    nameKh: "លីមីតឡូការីត (ln(1 + kx)/x)",
    formula: "lim_(x→0) ln(1 + kx) / x = k",
    expression: (x, k) => (x === 0 ? k : Math.log(1 + k * x) / x),
    limitVal: (k) => k,
    limitExplanationKh: (k) => `កាលណា x ខិតជិត 0 នោះ ln(1 + ${k}x)/x ខិតជិតតម្លៃលីមីត k = ${k}។`,
    kDefault: 4,
    kMin: 1,
    kMax: 6,
    kLabelKh: "មេគុណ k ក្នុងលោការីត"
  },
  {
    id: "cos_x_x2",
    nameKh: "លីមីតពិសេស ( (1 - cos x)/x² )",
    formula: "lim_(x→0) (1 - cos x) / x² = 1/2",
    expression: (x, _k) => (x === 0 ? 0.5 : (1 - Math.cos(x)) / (x * x)),
    limitVal: (_k) => 0.5,
    limitExplanationKh: () => `កាលណា x ខិតជិត 0 នោះតម្លៃផលធៀប (1 - cos x)/x² ខិតជិត 0.50 (ឬ 1/2) ជានិច្ច។`,
    kDefault: 1,
    kMin: 1,
    kMax: 1,
    kLabelKh: "គ្មានមេគុណប្តូរទេ"
  }
];

export default function LimitExplorer() {
  const [activeFormulaId, setActiveFormulaId] = useState<string>("sin_x_x");
  const [kVal, setKVal] = useState<number>(3);
  const [stepPower, setStepPower] = useState<number>(2); // 10^-stepPower

  const activeFormula = LIMIT_FORMULAS.find((f) => f.id === activeFormulaId) || LIMIT_FORMULAS[0];

  // Adjust kVal if the active formula changes and k is out of range
  const handleFormulaChange = (id: string) => {
    const f = LIMIT_FORMULAS.find((formula) => formula.id === id);
    if (f) {
      setActiveFormulaId(id);
      setKVal(f.kDefault);
    }
  };

  // Generate sequences approaching 0 from left and right
  const steps = [0.1, 0.05, 0.01, 0.005, 0.001, 0.0001];

  const leftApprovals = steps.map((h) => {
    const x = -h;
    const y = activeFormula.expression(x, kVal);
    return { x, y };
  });

  const rightApprovals = steps.map((h) => {
    const x = h;
    const y = activeFormula.expression(x, kVal);
    return { x, y };
  });

  const targetLimit = activeFormula.limitVal(kVal);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl" id="limit-explorer">
      <div className="mb-6">
        <span className="bg-[#ff4e00]/10 text-[#ff4e00] border border-[#ff4e00]/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          ការសង្កេតកម្រិតអន្តរកម្ម (Convergence Visualizer)
        </span>
        <h4 className="font-sans font-bold text-white text-lg mt-2 mb-1">
          ស្វែងយល់លីមីតតាមរយៈការខិតជិត (Numerical Approximation of Limits)
        </h4>
        <p className="font-sans text-xs text-slate-400">
          ជ្រើសរើសរូបមន្តរូបរាងមិនកំណត់ខាងក្រោម និងកែសម្រួលមេគុណ ដើម្បីសង្កេតមើលតម្លៃរបស់អនុគមន៍ខិតជិតទៅរកលីមីតពិត៖
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {LIMIT_FORMULAS.map((f) => (
          <button
            key={f.id}
            onClick={() => handleFormulaChange(f.id)}
            className={`px-3 py-2 rounded-xl text-xs font-sans font-medium transition ${
              activeFormulaId === f.id
                ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white shadow-md font-bold"
                : "bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white"
            }`}
          >
            {f.nameKh}
          </button>
        ))}
      </div>

      {/* Configuration Sliders */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-sans text-slate-300">
            <span className="font-semibold">កែសម្រួលមេគុណ k (Coefficient k)</span>
            <span className="font-mono text-[#ff4e00] font-bold">k = {kVal}</span>
          </div>
          {activeFormula.kMin !== activeFormula.kMax ? (
            <input
              type="range"
              min={activeFormula.kMin}
              max={activeFormula.kMax}
              value={kVal}
              onChange={(e) => setKVal(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff4e00]"
            />
          ) : (
            <p className="text-[10px] text-slate-500 font-sans italic pt-1">
              រូបមន្តនេះមានតម្លៃលីមីតថេរ មិនប្រែប្រួលតាម k ឡើយ
            </p>
          )}
          <span className="text-[10px] text-slate-500 block font-sans">
            {activeFormula.kLabelKh}
          </span>
        </div>

        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
          <div className="text-xs font-sans text-slate-400">លីមីតតាមទ្រឹស្តី (Theoretical Limit)：</div>
          <div className="text-2xl font-mono font-bold text-[#ff8c00] mt-1 flex items-center gap-2">
            L = {targetLimit.toFixed(2)}
          </div>
          <p className="text-[10px] text-slate-300 font-sans mt-1">
            {activeFormula.limitExplanationKh(kVal)}
          </p>
        </div>
      </div>

      {/* Interactive Graph Section */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-6 flex flex-col items-center justify-center relative min-h-[220px]" id="limit-graph-container">
        <span className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#ff4e00]" />
          <span>ក្រាហ្វិកខិតជិតលីមីត (Visual Convergence Curve)</span>
        </span>
        <svg viewBox="0 0 400 200" className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Grid & Axes */}
          <line x1="20" y1="100" x2="380" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
          <line x1="200" y1="10" x2="200" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="3" />
          {/* Labels */}
          <text x="375" y="115" fill="#64748b" className="text-[10px] font-mono">x</text>
          <text x="210" y="20" fill="#64748b" className="text-[10px] font-mono">y</text>
          <text x="188" y="115" fill="#64748b" className="text-[10px] font-mono">0</text>
          
          {/* Curve f(x) */}
          <path
            d={(() => {
              const points: string[] = [];
              const mapX = (xVal: number) => 200 + xVal * 90;
              const mapY = (yVal: number) => {
                const scaleY = 150 / (Math.max(kVal, 2) + 2);
                return 160 - yVal * scaleY;
              };
              
              let first = true;
              for (let sx = -1.9; sx <= 1.9; sx += 0.05) {
                if (Math.abs(sx) < 0.01) continue; // Skip x = 0 hole
                const sy = activeFormula.expression(sx, kVal);
                if (isNaN(sy) || !isFinite(sy)) continue;
                
                const px = mapX(sx);
                const py = mapY(sy);
                if (py < 10 || py > 190) continue;
                
                if (first) {
                  points.push(`M ${px} ${py}`);
                  first = false;
                } else {
                  points.push(`L ${px} ${py}`);
                }
              }
              return points.join(" ");
            })()}
            fill="none"
            stroke="#ff4e00"
            strokeWidth="2.5"
          />

          {/* The Target Limit Point Hole */}
          {(() => {
            const scaleY = 150 / (Math.max(kVal, 2) + 2);
            const limitY = 160 - targetLimit * scaleY;
            return (
              <>
                {/* horizontal asymptote of the limit point */}
                <line x1="40" y1={limitY} x2="360" y2={limitY} stroke="#ff8c00" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.5" />
                <text x="25" y={limitY + 4} fill="#ff8c00" className="text-[9px] font-mono">y = {targetLimit.toFixed(1)}</text>
                
                {/* Convergence points from Left/Right moving toward 0 */}
                {/* Left approaching dot */}
                <circle cx="170" cy={160 - activeFormula.expression(-0.3, kVal) * scaleY} r="4" fill="#ef4444" className="animate-pulse" />
                <line x1="170" y1="100" x2="170" y2={160 - activeFormula.expression(-0.3, kVal) * scaleY} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2" />
                
                {/* Right approaching dot */}
                <circle cx="230" cy={160 - activeFormula.expression(0.3, kVal) * scaleY} r="4" fill="#10b981" className="animate-pulse" />
                <line x1="230" y1="100" x2="230" y2={160 - activeFormula.expression(0.3, kVal) * scaleY} stroke="#10b981" strokeWidth="0.5" strokeDasharray="2" />

                {/* Hollow target point (since the limit value itself is not defined at x=0 but limit exists) */}
                <circle cx="200" cy={limitY} r="5" fill="#0f172a" stroke="#ff8c00" strokeWidth="2.5" />
              </>
            );
          })()}
        </svg>
        <div className="text-[10px] text-slate-500 font-sans mt-2 text-center">
          ចំណុច <span className="text-[#ff8c00] font-bold">o</span> តំណាងឱ្យលីមីតស្មើ <span className="font-mono">{targetLimit.toFixed(2)}</span> (ទោះបីជាអនុគមន៍មិនកំណត់ត្រង់ x = 0 ក៏ដោយ)
        </div>
      </div>

      {/* Numerical Sequence Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Left hand approximation (x < 0) */}
        <div className="border border-white/5 rounded-xl p-4 bg-red-500/5">
          <h5 className="text-xs font-sans font-bold text-red-400 flex items-center gap-1.5 mb-3 border-b border-white/5 pb-2">
            <span>លីមីតខាងឆ្វេង (Left Approach x → 0⁻)</span>
            <span className="bg-red-500/10 text-red-300 text-[9px] px-1.5 py-0.5 rounded font-mono">x &lt; 0</span>
          </h5>

          <div className="space-y-2">
            <div className="grid grid-cols-3 text-[10px] font-sans text-slate-500 font-bold uppercase tracking-wider mb-1">
              <span>តម្លៃ x</span>
              <span className="text-right">កន្សោម f(x)</span>
              <span className="text-right">គម្លាតពីលីមីត (Error)</span>
            </div>

            {leftApprovals.map((item, idx) => {
              const diff = Math.abs(item.y - targetLimit);
              return (
                <div key={idx} className="grid grid-cols-3 text-xs font-mono py-1.5 border-b border-white/5 items-center">
                  <span className="text-slate-400">{item.x.toFixed(4)}</span>
                  <span className="text-right font-bold text-red-400">{item.y.toFixed(6)}</span>
                  <span className="text-right text-slate-500 text-[10px]">-{diff.toFixed(6)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Right hand approximation (x > 0) */}
        <div className="border border-white/5 rounded-xl p-4 bg-emerald-500/5">
          <h5 className="text-xs font-sans font-bold text-emerald-400 flex items-center gap-1.5 mb-3 border-b border-white/5 pb-2">
            <span>លីមីតខាងស្តាំ (Right Approach x → 0⁺)</span>
            <span className="bg-emerald-500/10 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-mono">x &gt; 0</span>
          </h5>

          <div className="space-y-2">
            <div className="grid grid-cols-3 text-[10px] font-sans text-slate-500 font-bold uppercase tracking-wider mb-1">
              <span>តម្លៃ x</span>
              <span className="text-right">កន្សោម f(x)</span>
              <span className="text-right">គម្លាតពីលីមីត (Error)</span>
            </div>

            {rightApprovals.map((item, idx) => {
              const diff = Math.abs(item.y - targetLimit);
              return (
                <div key={idx} className="grid grid-cols-3 text-xs font-mono py-1.5 border-b border-white/5 items-center">
                  <span className="text-slate-400">+{item.x.toFixed(4)}</span>
                  <span className="text-right font-bold text-emerald-400">{item.y.toFixed(6)}</span>
                  <span className="text-right text-slate-500 text-[10px]">+{diff.toFixed(6)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Quiz reminder */}
      <div className="mt-5 flex items-center gap-2 text-xs font-sans text-slate-300 bg-[#ff4e00]/5 p-3 rounded-lg border border-[#ff4e00]/10">
        <TrendingUp className="w-4 h-4 text-[#ff4e00] flex-shrink-0" />
        <span>
          <strong>សេចក្តីសន្និដ្ឋាន៖</strong> ព្រោះលីមីតខាងឆ្វេង និងលីមីតខាងស្តាំខិតជិតរកតម្លៃដូចគ្នា ({targetLimit}) ដូចនេះលីមីត $\lim_{"{"}x \to 0{"}"} f(x)$ មានអត្ថិភាព និងស្មើ {targetLimit} ពិតប្រាកដមែន!
        </span>
      </div>
    </div>
  );
}
