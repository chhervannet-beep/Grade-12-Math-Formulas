/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { HelpCircle, RefreshCw, Layers } from "lucide-react";

interface AnglePreset {
  deg: number;
  radStr: string;
  cosStr: string;
  sinStr: string;
  tanStr: string;
  cotStr: string;
  labelKh: string;
}

const ANGLE_PRESETS: AnglePreset[] = [
  { deg: 0, radStr: "0", cosStr: "1", sinStr: "0", tanStr: "0", cotStr: "∞", labelKh: "0" },
  { deg: 30, radStr: "π/6", cosStr: "√3/2", sinStr: "1/2", tanStr: "√3/3", cotStr: "√3", labelKh: "π/6 (30°)" },
  { deg: 45, radStr: "π/4", cosStr: "√2/2", sinStr: "√2/2", tanStr: "1", cotStr: "1", labelKh: "π/4 (45°)" },
  { deg: 60, radStr: "π/3", cosStr: "1/2", sinStr: "√3/2", tanStr: "√3", cotStr: "√3/3", labelKh: "π/3 (60°)" },
  { deg: 90, radStr: "π/2", cosStr: "0", sinStr: "1", tanStr: "∞", cotStr: "0", labelKh: "π/2 (90°)" },
  { deg: 120, radStr: "2π/3", cosStr: "-1/2", sinStr: "√3/2", tanStr: "-√3", cotStr: "-√3/3", labelKh: "2π/3 (120°)" },
  { deg: 135, radStr: "3π/4", cosStr: "-√2/2", sinStr: "√2/2", tanStr: "-1", cotStr: "-1", labelKh: "3π/4 (135°)" },
  { deg: 150, radStr: "5π/6", cosStr: "-√3/2", sinStr: "1/2", tanStr: "-√3/3", cotStr: "-√3", labelKh: "5π/6 (150°)" },
  { deg: 180, radStr: "π", cosStr: "-1", sinStr: "0", tanStr: "0", cotStr: "∞", labelKh: "π (180°)" },
  { deg: 210, radStr: "7π/6", cosStr: "-√3/2", sinStr: "-1/2", tanStr: "√3/3", cotStr: "√3", labelKh: "7π/6 (210°)" },
  { deg: 225, radStr: "5π/4", cosStr: "-√2/2", sinStr: "-√2/2", tanStr: "1", cotStr: "1", labelKh: "5π/4 (225°)" },
  { deg: 240, radStr: "4π/3", cosStr: "-1/2", sinStr: "-√3/2", tanStr: "√3", cotStr: "√3/3", labelKh: "4π/3 (240°)" },
  { deg: 270, radStr: "3π/2", cosStr: "0", sinStr: "-1", tanStr: "∞", cotStr: "0", labelKh: "3π/2 (270°)" },
  { deg: 300, radStr: "5π/3", cosStr: "1/2", sinStr: "-√3/2", tanStr: "-√3", cotStr: "-√3/3", labelKh: "5π/3 (300°)" },
  { deg: 315, radStr: "7π/4", cosStr: "√2/2", sinStr: "-√2/2", tanStr: "-1", cotStr: "-1", labelKh: "7π/4 (315°)" },
  { deg: 330, radStr: "11π/6", cosStr: "√3/2", sinStr: "-1/2", tanStr: "-√3/3", cotStr: "-√3", labelKh: "11π/6 (330°)" }
];

export default function TrigCircle() {
  const [selectedIdx, setSelectedIdx] = useState<number>(1); // Default to π/6 (30 degrees)
  const currentPreset = ANGLE_PRESETS[selectedIdx];

  // SVG configurations
  const size = 320;
  const center = size / 2;
  const radius = size * 0.4; // 128px radius

  // Convert degree to SVG coordinates
  const getCoords = (deg: number) => {
    // Math.cos / sin expects radians.
    // SVG has 0 degrees at right (3 o'clock) and runs clockwise.
    // Trigonometry has 0 degrees at right (3 o'clock) and runs counter-clockwise.
    const rad = (deg * Math.PI) / 180;
    const x = center + radius * Math.cos(rad);
    const y = center - radius * Math.sin(rad); // Flip Y for SVG
    return { x, y };
  };

  const { x: px, y: py } = getCoords(currentPreset.deg);

  // Helper numerical values for display
  const numericalCos = Math.cos((currentPreset.deg * Math.PI) / 180).toFixed(2);
  const numericalSin = Math.sin((currentPreset.deg * Math.PI) / 180).toFixed(2);

  // Evaluate the formulas in the pink box for the current angle
  // 1. cos(pi/2 - alpha) = sin(alpha)
  const complementAngleDeg = 90 - currentPreset.deg;
  const complementCos = Math.cos((complementAngleDeg * Math.PI) / 180).toFixed(2);
  // 2. cos(pi - alpha) = -cos(alpha)
  const supplementAngleDeg = 180 - currentPreset.deg;
  const supplementCos = Math.cos((supplementAngleDeg * Math.PI) / 180).toFixed(2);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row gap-8" id="trig-circle-container">
      {/* SVG Interactive Visualizer */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h4 className="font-sans font-semibold text-white text-lg mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#ff4e00]" />
          រង្វង់ត្រីកោណមាត្រអន្តរកម្ម (Interactive Unit Circle)
        </h4>
        <p className="font-sans text-xs text-slate-400 mb-4 text-center">
          សូមចុចលើចំណុចនីមួយៗលើរង្វង់ ឬជ្រើសរើសមុំខាងក្រោម ដើម្បីមើលតម្លៃកូអរដោនេ
        </p>

        <div className="relative w-[320px] h-[320px] bg-black/40 rounded-full p-2 border border-white/10 shadow-inner flex items-center justify-center">
          <svg width={size} height={size} className="overflow-visible select-none">
            {/* Draw grid lines / axes */}
            <line
              x1={10}
              y1={center}
              x2={size - 10}
              y2={center}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <line
              x1={center}
              y1={10}
              x2={size - 10}
              y2={10}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              className="hidden" // hidden just keeping layout
            />
            <line
              x1={center}
              y1={10}
              x2={center}
              y2={size - 10}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />

            {/* Labels for axes */}
            <text x={size - 15} y={center - 6} className="fill-slate-400 font-mono text-[10px] font-bold">cos α</text>
            <text x={center + 6} y={15} className="fill-slate-400 font-mono text-[10px] font-bold">sin α</text>
            <text x={center - 12} y={center + 14} className="fill-slate-500 font-mono text-[10px]">O</text>

            {/* Main unit circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Projection lines for active point */}
            <line
              x1={px}
              y1={py}
              x2={px}
              y2={center}
              stroke="#00f0ff"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <line
              x1={px}
              y1={py}
              x2={center}
              y2={py}
              stroke="#39ff14"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Vector from origin to point */}
            <line
              x1={center}
              y1={center}
              x2={px}
              y2={py}
              stroke="#ec4899"
              strokeWidth="2.5"
            />

            {/* Cosine segment highlighted on X axis */}
            <line
              x1={center}
              y1={center}
              x2={px}
              y2={center}
              stroke="#00f0ff"
              strokeWidth="3.5"
              className="opacity-80"
            />

            {/* Sine segment highlighted on Y axis */}
            <line
              x1={center}
              y1={center}
              x2={center}
              y2={py}
              stroke="#39ff14"
              strokeWidth="3.5"
              className="opacity-80"
            />

            {/* Angle arc indicator */}
            <path
              d={`M ${center + 25} ${center} A 25 25 0 ${currentPreset.deg > 180 ? 1 : 0} 0 ${
                center + 25 * Math.cos((-currentPreset.deg * Math.PI) / 180)
              } ${center + 25 * Math.sin((-currentPreset.deg * Math.PI) / 180)}`}
              fill="none"
              stroke="#ff8c00"
              strokeWidth="2"
            />
            <text
              x={center + 30}
              y={center - 10}
              className="fill-[#ff8c00] font-sans text-[10px] font-bold"
            >
              {currentPreset.radStr}
            </text>

            {/* Draw preset clickable dots */}
            {ANGLE_PRESETS.map((preset, idx) => {
              const { x: cx, y: cy } = getCoords(preset.deg);
              const isActive = idx === selectedIdx;
              return (
                <g key={idx} className="cursor-pointer group" onClick={() => setSelectedIdx(idx)}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? 7 : 4}
                    className={`${
                      isActive
                        ? "fill-pink-500 stroke-white stroke-2 shadow-sm animate-pulse"
                        : "fill-white/20 group-hover:fill-white/55 group-hover:r-5 transition-all"
                    }`}
                  />
                  {/* Subtle small labels for key angles */}
                  {preset.deg % 90 === 0 && (
                    <text
                      x={cx + (preset.deg === 180 ? -22 : preset.deg === 0 ? 8 : -6)}
                      y={cy + (preset.deg === 90 ? -8 : preset.deg === 270 ? 14 : 4)}
                      className="fill-slate-500 font-mono text-[9px] pointer-events-none"
                    >
                      {preset.deg === 0
                        ? "(1,0)"
                        : preset.deg === 90
                        ? "(0,1)"
                        : preset.deg === 180
                        ? "(-1,0)"
                        : "(0,-1)"}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Main active indicator dot */}
            <circle
              cx={px}
              cy={py}
              r={8}
              fill="#ec4899"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
          </svg>

          {/* Floating coordinate tooltip */}
          <div className="absolute top-4 right-4 bg-black/90 text-white px-3 py-1.5 rounded-lg text-xs font-mono shadow-md border border-white/10">
            P({currentPreset.radStr}) = ({currentPreset.cosStr}, {currentPreset.sinStr})
          </div>
        </div>

        {/* Sliders and presets selector */}
        <div className="w-full max-w-xs mt-5">
          <div className="flex justify-between text-xs font-sans text-slate-300 mb-1">
            <span>រមូរជ្រើសរើសមុំ (Angle Slider)</span>
            <span className="font-mono text-[#ff4e00] font-bold">{currentPreset.deg}° ({currentPreset.radStr})</span>
          </div>
          <input
            type="range"
            min={0}
            max={ANGLE_PRESETS.length - 1}
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(parseInt(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff4e00]"
          />
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {ANGLE_PRESETS.slice(0, 8).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`text-[10px] font-mono py-1 rounded transition ${
                  selectedIdx === idx
                    ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white font-bold"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {preset.radStr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Formulas & Values */}
      <div className="flex-1 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
        <div>
          <h4 className="font-sans font-bold text-white text-md mb-4 flex items-center gap-2">
            <HelpCircle className="w-4.5 h-4.5 text-[#ff4e00]" />
            តម្លៃត្រីកោណមាត្រនៃមុំ {currentPreset.radStr} ({currentPreset.deg}°)
          </h4>

          {/* Trigonometric values grids */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#00f0ff]/5 border border-[#00f0ff]/15 rounded-xl p-3 flex flex-col">
              <span className="text-xs text-[#00f0ff] font-sans font-medium">កូស៉ីនុស (cos α)</span>
              <span className="text-lg font-mono font-bold text-[#00f0ff] mt-1">{currentPreset.cosStr}</span>
              <span className="text-[10px] text-slate-400 font-mono">≈ {numericalCos}</span>
            </div>

            <div className="bg-[#39ff14]/5 border border-[#39ff14]/15 rounded-xl p-3 flex flex-col">
              <span className="text-xs text-[#39ff14] font-sans font-medium">ស៉ីនុស (sin α)</span>
              <span className="text-lg font-mono font-bold text-[#39ff14] mt-1">{currentPreset.sinStr}</span>
              <span className="text-[10px] text-slate-400 font-mono">≈ {numericalSin}</span>
            </div>

            <div className="bg-[#ff8c00]/5 border border-[#ff8c00]/15 rounded-xl p-3 flex flex-col">
              <span className="text-xs text-[#ff8c00] font-sans font-medium">តង់សង់ (tan α)</span>
              <span className="text-lg font-mono font-bold text-[#ff8c00] mt-1">{currentPreset.tanStr}</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {currentPreset.tanStr === "∞" ? "មិនកំណត់" : `≈ ${(parseFloat(numericalSin)/parseFloat(numericalCos) || 0).toFixed(2)}`}
              </span>
            </div>

            <div className="bg-[#ab47bc]/5 border border-[#ab47bc]/15 rounded-xl p-3 flex flex-col">
              <span className="text-xs text-[#ab47bc] font-sans font-medium">កូតង់សង់ (cot α)</span>
              <span className="text-lg font-mono font-bold text-[#ab47bc] mt-1">{currentPreset.cotStr}</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {currentPreset.cotStr === "∞" ? "មិនកំណត់" : `≈ ${(parseFloat(numericalCos)/parseFloat(numericalSin) || 0).toFixed(2)}`}
              </span>
            </div>
          </div>

          {/* Pink box equivalents from the PDF! */}
          <div className="border border-white/10 bg-black/40 rounded-2xl p-4" id="pink-identity-box">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff4e00] animate-pulse"></span>
              <span className="font-sans font-bold text-[#ff4e00] text-xs uppercase tracking-wider">រូបមន្តទំនាក់ទំនងត្រីកោណមាត្រ (Identities Verification)</span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>cos(π/2 - α) = sin α</span>
                <span className="text-[#ff8c00] font-semibold">
                  cos({(90 - currentPreset.deg)}°) = {currentPreset.sinStr}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>sin(π/2 - α) = cos α</span>
                <span className="text-[#ff8c00] font-semibold">
                  sin({(90 - currentPreset.deg)}°) = {currentPreset.cosStr}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>cos(π - α) = -cos α</span>
                <span className="text-[#ff8c00] font-semibold">
                  cos({(180 - currentPreset.deg)}°) = {currentPreset.deg === 0 ? "-1" : currentPreset.deg === 180 ? "1" : `-${currentPreset.cosStr}`}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>sin(π - α) = sin α</span>
                <span className="text-[#ff8c00] font-semibold">
                  sin({(180 - currentPreset.deg)}°) = {currentPreset.sinStr}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>sin²α + cos²α = 1</span>
                <span className="text-[#ff8c00] font-semibold">
                  ({numericalSin})² + ({numericalCos})² = 1.00
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>tan α · cot α = 1</span>
                <span className="text-[#ff8c00] font-semibold">
                  {currentPreset.tanStr === "∞" || currentPreset.cotStr === "∞" ? "1 (លក្ខខណ្ឌវិភាគ)" : "1.00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={() => setSelectedIdx(1)} // Reset to 30 degrees (pi/6)
            className="flex items-center gap-1 text-[11px] font-sans font-medium text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 px-2.5 py-1 rounded-lg transition"
          >
            <RefreshCw className="w-3 h-3" />
            កំណត់ឡើងវិញ (Reset Visualizer)
          </button>
        </div>
      </div>
    </div>
  );
}
