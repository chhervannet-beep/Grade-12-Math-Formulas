/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Plus, Minus, Hash, Info, Zap, RotateCw, Boxes, Activity, Compass } from "lucide-react";

export default function ComplexExplorer() {
  const [real, setReal] = useState<number>(3);
  const [imag, setImag] = useState<number>(4);
  const [simulatorMode, setSimulatorMode] = useState<"vector" | "rotate2d" | "rotate3d" | "ac_circuit" | "mandelbrot">("vector");
  const [acTime, setAcTime] = useState<number>(0);

  // Animation effect for AC circuit & 3D rotating cube
  useEffect(() => {
    let frameId: number;
    if (simulatorMode === "ac_circuit" || simulatorMode === "rotate3d") {
      const update = () => {
        setAcTime((t) => (t + 0.03) % (2 * Math.PI));
        frameId = requestAnimationFrame(update);
      };
      frameId = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(frameId);
  }, [simulatorMode]);

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

  // 2D Rotation Helper
  const rotate2D = (x: number, y: number) => {
    if (modulus === 0) return { x, y };
    const u = real / modulus;
    const v = imag / modulus;
    // z_shape * (z / |z|) = (x + iy) * (u + iv) = (x*u - y*v) + i*(x*v + y*u)
    return {
      x: x * u - y * v,
      y: x * v + y * u,
    };
  };

  // 3D Cube Rotation and Projection Helpers
  const vertices3D = [
    { x: -1, y: -1, z: -1 },
    { x: 1, y: -1, z: -1 },
    { x: 1, y: 1, z: -1 },
    { x: -1, y: 1, z: -1 },
    { x: -1, y: -1, z: 1 },
    { x: 1, y: -1, z: 1 },
    { x: 1, y: 1, z: 1 },
    { x: -1, y: 1, z: 1 }
  ];

  const edges3D = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Back face
    [4, 5], [5, 6], [6, 7], [7, 4], // Front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // Connector edges
  ];

  const project3D = (v: { x: number; y: number; z: number }) => {
    // Scale cube based on complex modulus
    const s = Math.max(0.6, modulus * 0.35);
    let x = v.x * s;
    let y = v.y * s;
    let z = v.z * s;

    // 1. Rotate around X-axis by acTime (auto-rotation)
    const cosX = Math.cos(acTime);
    const sinX = Math.sin(acTime);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;
    const x1 = x;

    // 2. Rotate around Y-axis by acTime * 0.7 (auto-rotation)
    const cosY = Math.cos(acTime * 0.7);
    const sinY = Math.sin(acTime * 0.7);
    const x2 = x1 * cosY + z1 * sinY;
    const z2 = -x1 * sinY + z1 * cosY;
    const y2 = y1;

    // 3. Rotate around Z-axis by the exact complex number angle theta
    const cosZ = modulus > 0 ? real / modulus : 1;
    const sinZ = modulus > 0 ? imag / modulus : 0;
    const x3 = x2 * cosZ - y2 * sinZ;
    const y3 = x2 * sinZ + y2 * cosZ;
    const z3 = z2;

    // 4. Project to 2D screen space
    const d = 5; // distance
    const perspective = d / (d - z3 * 0.5);
    const screenX = center + x3 * scale * 1.5 * perspective;
    const screenY = center - y3 * scale * 1.5 * perspective;
    return { x: screenX, y: screenY };
  };

  // Mandelbrot Set Boundary (parametric cardioid points)
  const getCardioidPath = () => {
    const points = [];
    const mbScale = scale * 1.4;
    for (let deg = 0; deg <= 360; deg += 10) {
      const rad = (deg * Math.PI) / 180;
      const r_card = 0.5 * (1 - Math.cos(rad));
      // Parametric cardioid centered around -0.25
      const cx = -0.25 + r_card * Math.cos(rad);
      const cy = r_card * Math.sin(rad);
      points.push(`${center + cx * mbScale},${center - cy * mbScale}`);
    }
    return `M ${points.join(" L ")} Z`;
  };

  // Compute Mandelbrot trajectory (orbit) for c = a * 0.3 + b * 0.3 * i
  const getMandelbrotOrbit = () => {
    const orbit = [];
    const mbScale = scale * 1.4;
    
    // Scale coordinates slightly to fit nicely within standard [-2, 2] Mandelbrot space
    const cx = real * 0.25;
    const cy = imag * 0.25;

    let zr = 0;
    let zi = 0;
    orbit.push({ x: center + zr * mbScale, y: center - zi * mbScale });

    for (let step = 0; step < 16; step++) {
      const nextZr = zr * zr - zi * zi + cx;
      const nextZi = 2 * zr * zi + cy;

      if (nextZr * nextZr + nextZi * nextZi > 16) {
        orbit.push({ x: center + nextZr * mbScale, y: center - nextZi * mbScale });
        break;
      }

      zr = nextZr;
      zi = nextZi;
      orbit.push({ x: center + zr * mbScale, y: center - zi * mbScale });
    }
    return { orbit, cx: center + cx * mbScale, cy: center - cy * mbScale };
  };

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

          {/* Simulator Mode Selector */}
          <div className="space-y-2 bg-black/35 p-3 rounded-xl border border-white/5" id="simulator-mode-selector">
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block font-sans">
              🎨 របៀបពិសោធន៍ក្នុងតម្រុយ (Simulator Mode)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
              <button
                type="button"
                id="btn-mode-vector"
                onClick={() => setSimulatorMode("vector")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-sans font-medium transition flex items-center justify-center gap-1 border ${
                  simulatorMode === "vector"
                    ? "bg-[#ff4e00]/25 text-white border-[#ff4e00] font-bold"
                    : "bg-white/5 text-slate-300 border-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                <span>📍 វ៉ិចទ័រទូទៅ</span>
              </button>
              <button
                type="button"
                id="btn-mode-rotate2d"
                onClick={() => setSimulatorMode("rotate2d")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-sans font-medium transition flex items-center justify-center gap-1 border ${
                  simulatorMode === "rotate2d"
                    ? "bg-[#ff4e00]/25 text-white border-[#ff4e00] font-bold"
                    : "bg-white/5 text-slate-300 border-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                <RotateCw className="w-3 h-3 text-[#ff4e00]" />
                <span>🤖 បង្វិលរូប 2D</span>
              </button>
              <button
                type="button"
                id="btn-mode-rotate3d"
                onClick={() => setSimulatorMode("rotate3d")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-sans font-medium transition flex items-center justify-center gap-1 border ${
                  simulatorMode === "rotate3d"
                    ? "bg-[#ff4e00]/25 text-white border-[#ff4e00] font-bold"
                    : "bg-white/5 text-slate-300 border-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                <Boxes className="w-3 h-3 text-[#ff4e00]" />
                <span>📦 បង្វិលគូប 3D</span>
              </button>
              <button
                type="button"
                id="btn-mode-ac"
                onClick={() => setSimulatorMode("ac_circuit")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-sans font-medium transition flex items-center justify-center gap-1 border ${
                  simulatorMode === "ac_circuit"
                    ? "bg-[#ff4e00]/25 text-white border-[#ff4e00] font-bold"
                    : "bg-white/5 text-slate-300 border-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                <Activity className="w-3 h-3 text-[#ff4e00]" />
                <span>⚡ សៀគ្វី AC</span>
              </button>
              <button
                type="button"
                id="btn-mode-mandel"
                onClick={() => setSimulatorMode("mandelbrot")}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-sans font-medium transition flex items-center justify-center gap-1 border ${
                  simulatorMode === "mandelbrot"
                    ? "bg-[#ff4e00]/25 text-white border-[#ff4e00] font-bold"
                    : "bg-white/5 text-slate-300 border-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                <Compass className="w-3 h-3 text-[#ff4e00]" />
                <span>🌀 គន្លង Mandelbrot</span>
              </button>
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

        {/* Dynamic Plot visualizer (Complex Plane & Practical Application Simulators) */}
        <div className="flex-1 flex flex-col items-center justify-center bg-black/30 rounded-xl p-4 border border-white/10 w-full min-w-0" id="complex-plane-simulator">
          <span className="text-[10px] font-sans text-slate-300 font-bold mb-3 tracking-wide uppercase text-center block" id="simulator-title">
            {simulatorMode === "vector" && "📍 ប្លង់កុំផ្លិច (Complex Plane / Argand Diagram)"}
            {simulatorMode === "rotate2d" && "🤖 ការបង្វិលរូបភាព ២ឌី (2D Graphics Rotation)"}
            {simulatorMode === "rotate3d" && "📦 ការបង្វិលគូប ៣ឌី (3D Graphics Projection)"}
            {simulatorMode === "ac_circuit" && "⚡ សៀគ្វីចរន្តឆ្លាស់ AC (AC Phasor & Oscilloscope)"}
            {simulatorMode === "mandelbrot" && "🌀 គន្លងហ្វ្រាក់តាល់ Mandelbrot (Mandelbrot Fractal Orbits)"}
          </span>
          
          <div className="relative bg-black/45 rounded-xl border border-white/10 shadow-2xl p-2 max-w-full overflow-x-auto overflow-y-hidden" id="simulator-canvas-frame">
            <svg width={simulatorMode === "ac_circuit" ? 420 : size} height={size} className="overflow-visible transition-all duration-300">
              <defs>
                <linearGradient id="cubeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#ff4e00" />
                </linearGradient>
                <linearGradient id="mandelGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Grid background lines - Render only for non-Mandelbrot to keep clean */}
              {simulatorMode !== "mandelbrot" && simulatorMode !== "ac_circuit" && (
                Array.from({ length: 13 }).map((_, i) => {
                  const gridVal = i - 6;
                  const offset = center + gridVal * scale;
                  return (
                    <g key={i} opacity="0.6">
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
                })
              )}

              {/* Major Axes - Render for vector and rotate2d */}
              {(simulatorMode === "vector" || simulatorMode === "rotate2d") && (
                <>
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
                </>
              )}

              {/* Mode-Specific Content */}

              {/* MODE 1: Standard Vector View */}
              {simulatorMode === "vector" && (
                <>
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
                </>
              )}

              {/* MODE 2: 2D Shape Rotation View */}
              {simulatorMode === "rotate2d" && (() => {
                // Compute original points and rotated points
                const h = rotate2D(0, 3.2);
                const bStart = rotate2D(0, 2.0);
                const bEnd = rotate2D(0, -0.4);
                const lArm = rotate2D(-1.3, 0.8);
                const rArm = rotate2D(1.3, 0.8);
                const lLeg = rotate2D(-0.9, -2.1);
                const rLeg = rotate2D(0.9, -2.1);

                return (
                  <>
                    {/* Original Shape (Faint/Dashed White) */}
                    <g opacity="0.12" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round">
                      <circle cx={center} cy={center - 3.2 * scale} r={0.6 * scale} />
                      <line x1={center} y1={center - 2.0 * scale} x2={center} y2={center + 0.4 * scale} />
                      <line x1={center - 1.3 * scale} y1={center - 0.8 * scale} x2={center + 1.3 * scale} y2={center - 0.8 * scale} />
                      <line x1={center} y1={center + 0.4 * scale} x2={center - 0.9 * scale} y2={center + 2.1 * scale} />
                      <line x1={center} y1={center + 0.4 * scale} x2={center + 0.9 * scale} y2={center + 2.1 * scale} />
                    </g>

                    {/* Rotated Shape (Bright Neon Color Pairing) */}
                    <g strokeLinecap="round">
                      {/* Head */}
                      <circle
                        cx={center + h.x * scale}
                        cy={center - h.y * scale}
                        r={0.6 * scale}
                        stroke="#ff4e00"
                        strokeWidth="2"
                        fill="rgba(255, 78, 0, 0.1)"
                      />
                      {/* Body */}
                      <line
                        x1={center + bStart.x * scale}
                        y1={center - bStart.y * scale}
                        x2={center + bEnd.x * scale}
                        y2={center - bEnd.y * scale}
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                      />
                      {/* Arms */}
                      <line
                        x1={center + lArm.x * scale}
                        y1={center - lArm.y * scale}
                        x2={center + rArm.x * scale}
                        y2={center - rArm.y * scale}
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                      />
                      {/* Left Leg */}
                      <line
                        x1={center + bEnd.x * scale}
                        y1={center - bEnd.y * scale}
                        x2={center + lLeg.x * scale}
                        y2={center - lLeg.y * scale}
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                      />
                      {/* Right Leg */}
                      <line
                        x1={center + bEnd.x * scale}
                        y1={center - bEnd.y * scale}
                        x2={center + rLeg.x * scale}
                        y2={center - rLeg.y * scale}
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                      />
                    </g>

                    {/* Operator complex number vector (dashed) */}
                    <line
                      x1={center}
                      y1={center}
                      x2={px}
                      y2={py}
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                    />
                    <circle cx={px} cy={py} r={4.5} fill="#fbbf24" stroke="#fff" strokeWidth="1" />

                    {/* Mathematical representation text */}
                    <text x="10" y="22" className="fill-slate-400 font-mono text-[8px]">
                      រូបមន្ត៖ V_ថ្មី = V_ដើម × (z / |z|)
                    </text>
                    <text x="10" y="34" className="fill-[#00f0ff] font-sans text-[8px] font-bold">
                      បង្វិលបានមុំ θ = {angleDeg.toFixed(1)}°
                    </text>
                  </>
                );
              })()}

              {/* MODE 3: 3D Cube Rotation Projection */}
              {simulatorMode === "rotate3d" && (() => {
                const projected = vertices3D.map(project3D);
                return (
                  <>
                    {/* Draw edges of the projected 3D Cube */}
                    {edges3D.map(([idx1, idx2], i) => {
                      const p1 = projected[idx1];
                      const p2 = projected[idx2];
                      return (
                        <line
                          key={i}
                          x1={p1.x}
                          y1={p1.y}
                          x2={p2.x}
                          y2={p2.y}
                          stroke="url(#cubeGrad)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          opacity="0.9"
                        />
                      );
                    })}

                    {/* Draw vertex points */}
                    {projected.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill={i < 4 ? "#00f0ff" : "#ff4e00"}
                        className="transition-all"
                      />
                    ))}

                    <text x="10" y="22" className="fill-slate-400 font-mono text-[8px]">
                      បង្វិលលំហ (3D Projection)
                    </text>
                    <text x="10" y="34" className="fill-pink-400 font-sans text-[8px] font-bold">
                      Z-Angle θ = {angleDeg.toFixed(1)}° | Scale r = {modulus.toFixed(2)}
                    </text>
                  </>
                );
              })()}

              {/* MODE 4: AC Impedance and Waveforms */}
              {simulatorMode === "ac_circuit" && (() => {
                const center_x = 95;
                const center_y = 130;
                const r_max = 65;
                
                // Rotations
                const phi = acTime;
                const v_x = center_x + r_max * Math.cos(phi);
                const v_y = center_y - r_max * Math.sin(phi);

                // Current lags voltage by angleRad
                const i_x = center_x + (r_max * 0.7) * Math.cos(phi - angleRad);
                const i_y = center_y - (r_max * 0.7) * Math.sin(phi - angleRad);

                // Oscilloscope calculations
                const vPoints = [];
                const iPoints = [];
                const oscWidth = 185;
                const oscStartX = 215;
                const oscY = center_y;
                const oscAmp = 45;

                for (let px_val = 0; px_val <= oscWidth; px_val += 2) {
                  // Two full cycles of sine wave
                  const t_val = (px_val / oscWidth) * 3.5 * Math.PI - acTime * 1.5;
                  
                  // Voltage waveform
                  const vy = oscY - Math.sin(t_val) * oscAmp;
                  vPoints.push(`${oscStartX + px_val},${vy}`);
                  
                  // Current waveform
                  const iy = oscY - Math.sin(t_val - angleRad) * (oscAmp * 0.65);
                  iPoints.push(`${oscStartX + px_val},${iy}`);
                }

                const vPath = `M ${vPoints.join(" L ")}`;
                const iPath = `M ${iPoints.join(" L ")}`;

                return (
                  <>
                    {/* Phasor domain divider line */}
                    <line x1="200" y1="20" x2="200" y2={size - 20} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                    
                    {/* Left Panel: Phasor circle & axes */}
                    <circle cx={center_x} cy={center_y} r={r_max} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" fill="none" />
                    <line x1={center_x - r_max - 10} y1={center_y} x2={center_x + r_max + 10} y2={center_y} stroke="rgba(255,255,255,0.12)" />
                    <line x1={center_x} y1={center_y - r_max - 10} x2={center_x} y2={center_y + r_max + 10} stroke="rgba(255,255,255,0.12)" />
                    
                    {/* Voltage Phasor vector */}
                    <line x1={center_x} y1={center_y} x2={v_x} y2={v_y} stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                    <circle cx={v_x} cy={v_y} r="2.5" fill="#10b981" />
                    <text x={v_x + 5} y={v_y - 2} className="fill-[#10b981] font-mono text-[8px] font-bold">V</text>

                    {/* Current Phasor vector */}
                    <line x1={center_x} y1={center_y} x2={i_x} y2={i_y} stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx={i_x} cy={i_y} r="2.5" fill="#38bdf8" />
                    <text x={i_x + 5} y={i_y - 2} className="fill-[#38bdf8] font-mono text-[8px] font-bold">I</text>

                    {/* Phase shift angle arc */}
                    <path
                      d={`M ${center_x + 22 * Math.cos(phi)} ${center_y - 22 * Math.sin(phi)} A 22 22 0 0 1 ${
                        center_x + 22 * Math.cos(phi - angleRad)
                      } ${center_y - 22 * Math.sin(phi - angleRad)}`}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1.2"
                    />

                    {/* Text Label Left */}
                    <text x="10" y="22" className="fill-slate-400 font-sans text-[8px] font-semibold">
                      ប្លង់ផាស័រ (Phasor Diagram)
                    </text>

                    {/* Right Panel: Oscilloscope Frame */}
                    <rect x={oscStartX} y={center_y - oscAmp - 10} width={oscWidth} height={oscAmp * 2 + 20} fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.06)" rx="4" />
                    <line x1={oscStartX} y1={center_y} x2={oscStartX + oscWidth} y2={center_y} stroke="rgba(255,255,255,0.08)" />
                    <line x1={oscStartX + oscWidth/2} y1={center_y - oscAmp} x2={oscStartX + oscWidth/2} y2={center_y + oscAmp} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

                    {/* Waveforms */}
                    <path d={vPath} fill="none" stroke="#10b981" strokeWidth="1.8" />
                    <path d={iPath} fill="none" stroke="#38bdf8" strokeWidth="1.5" />

                    {/* Text Labels Right */}
                    <text x={oscStartX + 6} y="22" className="fill-slate-400 font-sans text-[8px] font-semibold">
                      រលកសញ្ញាចរន្តឆ្លាស់ (AC Oscilloscope)
                    </text>
                    <text x={oscStartX + 6} y={size - 14} className="fill-[#fbbf24] font-mono text-[8px] font-semibold">
                      គម្លាតផាស lag θ = {angleDeg.toFixed(1)}° ({piFraction})
                    </text>
                  </>
                );
              })()}

              {/* MODE 5: Mandelbrot Fractal Orbit Explorer */}
              {simulatorMode === "mandelbrot" && (() => {
                const cardioidPath = getCardioidPath();
                const { orbit, cx, cy } = getMandelbrotOrbit();
                const orbitPointsStr = orbit.map(p => `${p.x},${p.y}`).join(" L ");
                const orbitPath = `M ${orbitPointsStr}`;

                return (
                  <>
                    {/* Mandelbrot fractal body boundary background */}
                    <path d={cardioidPath} fill="url(#mandelGrad)" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" />
                    <circle cx={center - 1.0 * scale * 1.4} cy={center} r={0.25 * scale * 1.4} fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" />
                    <circle cx={center + 0.125 * scale * 1.4} cy={center - 0.649 * scale * 1.4} r={0.1 * scale * 1.4} fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.2" />
                    <circle cx={center + 0.125 * scale * 1.4} cy={center + 0.649 * scale * 1.4} r={0.1 * scale * 1.4} fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.2" />

                    {/* Trajectory path (Orbit lines) */}
                    <path d={orbitPath} fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />

                    {/* Iterative Orbit sequence coordinates dots */}
                    {orbit.map((p, idx) => (
                      <circle
                        key={idx}
                        cx={p.x}
                        cy={p.y}
                        r={idx === 0 ? "3.5" : "2"}
                        fill={idx === 0 ? "#00f0ff" : "#f97316"}
                      />
                    ))}

                    {/* Dynamic constant parameter target coordinate c */}
                    <circle cx={cx} cy={cy} r="4.5" fill="#eab308" stroke="#ffffff" strokeWidth="1" />
                    <text x={cx + 7} y={cy - 4} className="fill-[#eab308] font-mono text-[8px] font-bold">c</text>

                    <text x="10" y="22" className="fill-slate-400 font-mono text-[8px]">
                      ស្វែងរកទីតាំង៖ c = {(real * 0.25).toFixed(2)} {imag * 0.25 >= 0 ? "+" : "-"} {Math.abs(imag * 0.25).toFixed(2)}i
                    </text>
                    <text x="10" y="34" className="fill-[#f97316] font-sans text-[8px] font-semibold">
                      សមីការ៖ z_n+1 = z_n² + c
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Contextual Mode Legend block */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center text-[10px] font-mono mt-4 text-slate-400" id="simulator-legend">
            {simulatorMode === "vector" && (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]"></span> វ៉ិចទ័រ z
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff4e00]"></span> កូអរដោនេ M(a, b)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 inline-block border-t-2 border-r-2 border-amber-500 rounded-tr-md"></span> មុំផាស θ
                </span>
              </>
            )}
            {simulatorMode === "rotate2d" && (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-white/10 border border-white/20"></span> រូបដើម (Original)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff4e00]"></span> ក្បាលមនុស្សបន្ទាប់ពីបង្វិល
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#00f0ff]"></span> ខ្លួន/អវយវៈដែលបង្វិល (Rotated)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]"></span> វ៉ិចទ័រ z
                </span>
              </>
            )}
            {simulatorMode === "rotate3d" && (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-gradient-to-br from-[#00f0ff] to-[#ff4e00]"></span> គែមគូប 3D (Edges)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]"></span> កំពូលផ្នែកខាងក្រោយ
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff4e00]"></span> កំពូលផ្នែកខាងមុខ
                </span>
              </>
            )}
            {simulatorMode === "ac_circuit" && (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> តង់ស្យុង V (Voltage Wave)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span> ចរន្តអគ្គិសនី I (Current Wave)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]"></span> មុំផាសឡេត (θ Phase Shift)
                </span>
              </>
            )}
            {simulatorMode === "mandelbrot" && (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-2 rounded bg-indigo-500/20 border border-indigo-400/40"></span> សំណុំ Mandelbrot (Body)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span> ថេរស្មុគស្មាញ c (User constant)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]"></span> ចំណុចចាប់ផ្តើម (z_0)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span> គន្លងគណនា (Orbit Points)
                </span>
              </>
            )}
          </div>

          {/* Khmer Educational Explanation Box - Fits perfectly next to or below the plot */}
          <div className="mt-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-[10px] text-slate-300 leading-relaxed font-sans max-w-md" id="simulator-explanation-box">
            <span className="text-[#fbbf24] font-bold block mb-1">
              {simulatorMode === "vector" && "💡 តើប្លង់កុំផ្លិច Argand ដំណើរការដូចម្តេច?"}
              {simulatorMode === "rotate2d" && "💡 ហេតុអ្វីបានជាចំនួនកុំផ្លិចអាចបង្វិលរូបភាពបាន?"}
              {simulatorMode === "rotate3d" && "💡 ស្វែងយល់អំពីការបង្វិលលំហ 3D ជាមួយចំនួនកុំផ្លិច៖"}
              {simulatorMode === "ac_circuit" && "💡 ទំនាក់ទំនងរវាងចំនួនកុំផ្លិច និងវិស្វកម្មអគ្គិសនី AC៖"}
              {simulatorMode === "mandelbrot" && "💡 តើអ្វីទៅជាគន្លង Mandelbrot ក្នុងគណិតវិទ្យា?"}
            </span>
            <p>
              {simulatorMode === "vector" && "ចំនួនកុំផ្លិចនិមួយៗ z = a + bi ត្រូវបានតំណាងដោយចំណុច M(a,b) ឬវ៉ិចទ័រ OM ក្នុងប្លង់កូអរដោនេ។ ផ្នែកពិត (a) កំណត់ទីតាំងផ្ដេក ចំណែកផ្នែកនិម្មិត (b) កំណត់ទីតាំងបញ្ឈរ។ ម៉ូឌុល |z| គឺជាចម្ងាយពីគល់រហូតដល់ចំណុច M។"}
              {simulatorMode === "rotate2d" && "នៅពេលយើងគុណវ៉ិចទ័រកូអរដោនេកុំផ្លិចជាមួយចំនួនកុំផ្លិចឯកតា z/|z| នោះប្រព័ន្ធនឹងធ្វើការបូកមុំបន្ថែម (θ) ដោយស្វ័យប្រវត្តិតាមរូបមន្តដឺម័រ (De Moivre)។ វិធីសាស្ត្រនេះគឺជារបៀបបង្វិលវត្ថុ 2D លឿនបំផុតក្នុងវិស័យបង្កើតហ្គេម និងកម្មវិធីក្រាហ្វិកកុំព្យូទ័រ!"}
              {simulatorMode === "rotate3d" && "ការបង្វិលលំហ 3D ប្រើប្រាស់គោលការណ៍គុណកុំផ្លិចមកបង្វិលកូអរដោនេជុំវិញអ័ក្ស Z។ ក្នុងវិស័យក្រាហ្វិក 3D កម្រិតខ្ពស់ និងរ៉ូបូត ប្រព័ន្ធប្រើប្រាស់ ចំនួនកុំផ្លិចលំហបួន (Quaternions) ដើម្បីបង្វិលវត្ថុគ្រប់ទិសទីក្នុងលំហដោយគ្មានភាពទាក់ (Gimbal Lock)!"}
              {simulatorMode === "ac_circuit" && "ក្នុងចរន្តអគ្គិសនីឆ្លាស់ របាំងរួម (Impedance) ត្រូវបានគណនាដោយចំនួនកុំផ្លិច Z = R + jX ដែល R ជាធន់ពិត និង X ជាធន់ប្រតិកម្ម។ មុំ θ បង្ហាញពីគម្លាតពេលវេលា (Phase Lag) រវាងរលកតង់ស្យុង V(t) និងចរន្តអគ្គិសនី I(t) ដែលឆ្លងកាត់ឧបករណ៍ប្រើប្រាស់!"}
              {simulatorMode === "mandelbrot" && "សំណុំ Mandelbrot ត្រូវបានបង្កើតឡើងដោយការគណនាស្វ័យគុណនិងបូកដដែលៗ z_{n+1} = z_n² + c។ ប្រសិនបើស៊េរីគណនា (គន្លងពណ៌ក្រហម) នៅតែកៀកគល់ជានិច្ច នោះចំណុច c ជាសមាជិកសំណុំនេះ។ បើវារត់បាត់ទៅរកអនន្ត នោះ c មិនមែនជាសមាជិកទេ! វាបង្ហាញពីភាពស្មុគស្មាញនៃប្រព័ន្ធធម្មជាតិ។"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
