import React, { useRef, useState, useEffect, useCallback } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

interface SignalNode {
  id: string
  label: string
  role: string
  category: 'core' | 'perception' | 'frontend' | 'domain' | 'secondary'
  desktop: {
    x: number // center x in 540x460 canvas
    y: number // center y in 540x460 canvas
    portX: number
    portY: number
    path: string
  }
}

/**
 * Technical Blueprint Signals Configuration.
 * 540x460 coordinate system ensures zero overlap and exact architectural line routing.
 */
const BLUEPRINT_SIGNALS: SignalNode[] = [
  // 1. Python (Top-Left / Lang)
  {
    id: 'python',
    label: 'PYTHON',
    role: 'LANG',
    category: 'core',
    desktop: {
      x: 75,
      y: 65,
      portX: 120,
      portY: 65,
      path: 'M 120 65 H 144 V 180 H 168',
    },
  },
  // 2. Computer Vision (Mid-Left / Perception)
  {
    id: 'cv',
    label: 'COMPUTER VISION',
    role: 'PERCEPTION',
    category: 'perception',
    desktop: {
      x: 82,
      y: 198,
      portX: 154,
      portY: 198,
      path: 'M 154 198 H 168',
    },
  },
  // 3. AI / ML (North-Center / Core)
  {
    id: 'aiml',
    label: 'AI / ML',
    role: 'CORE',
    category: 'core',
    desktop: {
      x: 270,
      y: 56,
      portX: 270,
      portY: 76,
      path: 'M 270 76 V 161',
    },
  },
  // 4. React (Top-Right / Frontend)
  {
    id: 'react',
    label: 'REACT',
    role: 'UI',
    category: 'frontend',
    desktop: {
      x: 465,
      y: 68,
      portX: 422,
      portY: 68,
      path: 'M 422 68 H 396 V 180 H 372',
    },
  },
  // 5. Healthcare (Bottom-Left / Domain)
  {
    id: 'healthcare',
    label: 'HEALTHCARE',
    role: 'DOMAIN',
    category: 'domain',
    desktop: {
      x: 78,
      y: 330,
      portX: 136,
      portY: 330,
      path: 'M 136 330 H 144 V 220 H 168',
    },
  },
  // 6. IoT & Embedded (Mid-Right / Edge - Secondary)
  {
    id: 'iot',
    label: 'IOT & EMBEDDED',
    role: 'EDGE',
    category: 'secondary',
    desktop: {
      x: 454,
      y: 198,
      portX: 382,
      portY: 198,
      path: 'M 382 198 H 372',
    },
  },
  // 7. Real-Time Data (Bottom-Right / Stream - Secondary)
  {
    id: 'realtime',
    label: 'REAL-TIME DATA',
    role: 'STREAM',
    category: 'secondary',
    desktop: {
      x: 456,
      y: 330,
      portX: 386,
      portY: 330,
      path: 'M 386 330 H 396 V 220 H 372',
    },
  },
]

/**
 * Output synthesis bus connecting Forge Assembly to Project Output
 */
const OUTPUT_BUS_PATH = 'M 270 239 V 364'

export const ForgeBlueprintVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const parallaxGroupRef = useRef<HTMLDivElement>(null)
  const [activeSignal, setActiveSignal] = useState<string | null>(null)
  const [pulseSignalId, setPulseSignalId] = useState<string | null>(null)
  const [isAssemblyHovered, setIsAssemblyHovered] = useState(false)

  // Register GSAP living blueprint assembly timeline & pulses
  useEffect(() => {
    if (prefersReducedMotion()) {
      // In reduced-motion mode, show everything immediately
      gsap.set(
        [
          '.bp-signal',
          '.bp-connector-path',
          '.bp-assembly',
          '.bp-output-bus-path',
          '.bp-output',
          '.bp-grid',
        ],
        { opacity: 1, clearProps: 'transform' }
      )
      return
    }

    const ctx = gsap.context(() => {
      // 1. Initial State: faint grid, hidden elements
      gsap.set('.bp-signal', { opacity: 0, scale: 0.94 })
      gsap.set('.bp-assembly', { opacity: 0, scale: 0.96 })
      gsap.set('.bp-output', { opacity: 0, y: 8 })
      gsap.set('.bp-grid', { opacity: 0 })

      // Set up stroke-dasharray on connector lines for draw-in
      const connectorPaths = gsap.utils.toArray<SVGPathElement>('.bp-connector-path')
      connectorPaths.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 200
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.85,
        })
      })

      const outputPath = document.querySelector<SVGPathElement>('.bp-output-bus-path')
      if (outputPath) {
        const len = outputPath.getTotalLength ? outputPath.getTotalLength() : 130
        gsap.set(outputPath, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 0.9,
        })
      }

      // LIVING BLUEPRINT ASSEMBLY TIMELINE (2.8s - 3.4s total)
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        delay: 0.2,
      })

      // Step 0: Grid lines appear faintly
      tl.to('.bp-grid', { opacity: 1, duration: 0.6 })

      // Step 1: PYTHON appears
      tl.to('.bp-signal-python', { opacity: 1, scale: 1, duration: 0.4 }, 0.2)

      // Step 2: REACT appears
      tl.to('.bp-signal-react', { opacity: 1, scale: 1, duration: 0.4 }, 0.45)

      // Step 3: AI / ML appears
      tl.to('.bp-signal-aiml', { opacity: 1, scale: 1, duration: 0.4 }, 0.7)

      // Step 4: COMPUTER VISION appears
      tl.to('.bp-signal-cv', { opacity: 1, scale: 1, duration: 0.4 }, 0.95)

      // Step 5: Connector lines draw toward the center
      tl.to(
        '.bp-connector-path',
        {
          strokeDashoffset: 0,
          duration: 0.85,
          stagger: 0.06,
          ease: 'power1.inOut',
        },
        1.1
      )

      // Step 6: Healthcare & secondary signals appear
      tl.to(
        ['.bp-signal-healthcare', '.bp-signal-iot', '.bp-signal-realtime'],
        {
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.4,
        },
        1.4
      )

      // Step 7: The Forge Assembly activates
      tl.to(
        '.bp-assembly',
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.2)',
        },
        1.9
      )

      // Step 8: The center pulses once (subtle glow & micro-pulse)
      tl.to(
        '.bp-assembly-pulse-target',
        {
          boxShadow: '0 0 24px rgba(255, 90, 31, 0.25)',
          borderColor: 'rgba(255, 90, 31, 0.5)',
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        2.3
      )

      // Step 9: Output line forms from center down to blueprint
      tl.to(
        '.bp-output-bus-path',
        {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        2.6
      )

      // Step 10: "PROJECT BLUEPRINT" appears
      tl.to(
        '.bp-output',
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        2.9
      )

      // Ambient Motion Post-Intro
      // Subtle micro-breathing on the Forge Assembly (5.5s cycle)
      gsap.to('.bp-assembly', {
        y: -3,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 3.4,
      })

      // Very subtle floating on individual signals (differential 2-3px)
      gsap.utils.toArray<HTMLElement>('.bp-signal').forEach((sig, idx) => {
        gsap.to(sig, {
          y: idx % 2 === 0 ? -2.5 : 2,
          duration: 5 + (idx % 3) * 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3.4 + idx * 0.2,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Sparse Periodic Signal Pulse (Occurs every 5.5s, sends an orange pulse along one connector)
  useEffect(() => {
    if (prefersReducedMotion()) return

    const signalKeys = ['python', 'aiml', 'react', 'cv', 'healthcare']
    let signalIdx = 0

    const interval = setInterval(() => {
      const target = signalKeys[signalIdx % signalKeys.length]
      setPulseSignalId(target)
      signalIdx++

      // Turn off pulse after 1.2s travel time
      setTimeout(() => {
        setPulseSignalId(null)
      }, 1200)
    }, 5200)

    return () => clearInterval(interval)
  }, [])

  // Controlled Pointer Parallax on Desktop (±4px max, zero aggressive movement)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return
    const container = containerRef.current
    const target = parallaxGroupRef.current
    if (!container || !target) return

    const rect = container.getBoundingClientRect()
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

    const clampedX = Math.max(-1, Math.min(1, relX))
    const clampedY = Math.max(-1, Math.min(1, relY))

    gsap.to(target, {
      x: clampedX * 4.5,
      y: clampedY * 3.5,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  const handlePointerLeave = useCallback(() => {
    if (prefersReducedMotion()) return
    const target = parallaxGroupRef.current
    if (!target) return
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="forge-blueprint-root relative w-full select-none"
      aria-label="Interactive Living Blueprint and Forge Assembly Technical Visualization"
    >
      {/* =========================================================================
          DESKTOP & TABLET VIEWPORT (md:block)
          Full 540x460 Architectural Schematic Blueprint
          ========================================================================= */}
      <div className="hidden md:block relative w-full max-w-[500px] lg:max-w-[540px] mx-auto aspect-[540/460]">
        {/* Ambient Subtle Peach/Orange Glow (Deep Background Layer) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-[#FF5A1F]/10 via-[#FF8A50]/5 to-transparent blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Parallax Group for Subtle Depth Reaction */}
        <div ref={parallaxGroupRef} className="relative w-full h-full">
          {/* MIDGROUND LAYER: SVG Vector Architectural Blueprint Lines & Grid */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 540 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Architectural Registration Corner Crosshairs & Subtle Grid */}
            <g className="bp-grid opacity-40">
              {/* Corner crosshairs */}
              <path d="M 16 12 H 24 M 20 8 V 16" stroke="#D3CFCA" strokeWidth="1" />
              <path d="M 516 12 H 524 M 520 8 V 16" stroke="#D3CFCA" strokeWidth="1" />
              <path d="M 16 448 H 24 M 20 444 V 452" stroke="#D3CFCA" strokeWidth="1" />
              <path d="M 516 448 H 524 M 520 444 V 452" stroke="#D3CFCA" strokeWidth="1" />

              {/* Center axis guide hairlines */}
              <line
                x1="270"
                y1="16"
                x2="270"
                y2="444"
                stroke="#E9E6E0"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <line
                x1="20"
                y1="200"
                x2="520"
                y2="200"
                stroke="#E9E6E0"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </g>

            {/* Static Guide Connector Hairlines (Faint 0.5px background traces) */}
            <g className="bp-guide-traces opacity-30">
              {BLUEPRINT_SIGNALS.map((sig) => (
                <path
                  key={`guide-${sig.id}`}
                  d={sig.desktop.path}
                  stroke="#E2DFD8"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
              <path d={OUTPUT_BUS_PATH} stroke="#E2DFD8" strokeWidth="1" fill="none" />
            </g>

            {/* Living Architectural Connector Paths (Draw-in + Interactive Highlights) */}
            <g className="bp-living-connectors">
              {BLUEPRINT_SIGNALS.map((sig) => {
                const isActive = activeSignal === sig.id || isAssemblyHovered
                const isPulsing = pulseSignalId === sig.id
                return (
                  <g key={`connector-${sig.id}`}>
                    {/* Main Architectural Line */}
                    <path
                      d={sig.desktop.path}
                      className="bp-connector-path"
                      stroke={isActive ? '#FF5A1F' : '#D1CDC5'}
                      strokeWidth={isActive ? '1.5' : '1'}
                      strokeLinecap="square"
                      fill="none"
                      style={{
                        transition: 'stroke 0.25s ease, stroke-width 0.25s ease',
                      }}
                    />

                    {/* Terminal Port Junction Pin on Forge Assembly */}
                    <circle
                      cx={sig.desktop.portX}
                      cy={sig.desktop.portY}
                      r="2"
                      fill={isActive ? '#FF5A1F' : '#A3A099'}
                      style={{ transition: 'fill 0.25s ease' }}
                    />

                    {/* Rare Traveling Pulse Dot */}
                    {isPulsing && (
                      <circle
                        r="3"
                        fill="#FF5A1F"
                        className="animate-pulse shadow-[0_0_8px_#FF5A1F]"
                      >
                        <animateMotion
                          path={sig.desktop.path}
                          dur="1.1s"
                          repeatCount="1"
                          fill="freeze"
                        />
                      </circle>
                    )}
                  </g>
                )
              })}

              {/* Output Synthesis Bus Line */}
              <path
                d={OUTPUT_BUS_PATH}
                className="bp-output-bus-path"
                stroke={isAssemblyHovered ? '#FF5A1F' : '#FF5A1F'}
                strokeWidth="1.25"
                strokeDasharray="2 2"
                fill="none"
              />

              {/* Output Bus Downward Architectural Chevron / Terminal Indicator */}
              <g transform="translate(270, 302)">
                <path
                  d="M -4 -3 L 0 2 L 4 -3"
                  stroke="#FF5A1F"
                  strokeWidth="1.25"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>

          {/* FOREGROUND LAYER 1: Technology Signal Nodes (Accessible, Clickable/Focusable) */}
          <div className="absolute inset-0 pointer-events-none z-10" aria-label="Input Signals">
            {BLUEPRINT_SIGNALS.map((sig) => {
              const isHovered = activeSignal === sig.id
              const isPulsing = pulseSignalId === sig.id
              return (
                <div
                  key={sig.id}
                  className={`bp-signal bp-signal-${sig.id} absolute pointer-events-auto`}
                  style={{
                    left: `${(sig.desktop.x / 540) * 100}%`,
                    top: `${(sig.desktop.y / 460) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveSignal(sig.id)}
                    onMouseLeave={() => setActiveSignal(null)}
                    onFocus={() => setActiveSignal(sig.id)}
                    onBlur={() => setActiveSignal(null)}
                    className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/95 border transition-all duration-200 cursor-default outline-hidden focus-visible:ring-1 focus-visible:ring-accent ${
                      isHovered
                        ? 'border-[#FF5A1F] shadow-[0_4px_16px_rgba(255,90,31,0.16)] scale-105'
                        : 'border-[#E2DFD8] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#D0CDC5]'
                    }`}
                    aria-label={`${sig.label} - ${sig.role}`}
                  >
                    {/* Micro Terminal Indicator Pip */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 shrink-0 ${
                        isHovered || isPulsing
                          ? 'bg-[#FF5A1F] shadow-[0_0_8px_#FF5A1F] scale-125'
                          : 'bg-[#FF5A1F]/70'
                      }`}
                    />

                    {/* Signal Label */}
                    <span className="font-mono text-[10px] font-bold text-[#111111] tracking-wider uppercase whitespace-nowrap">
                      {sig.label}
                    </span>

                    {/* Technical Micro Tag */}
                    <span className="font-mono text-[8px] font-medium text-[#8C8B87] tracking-widest uppercase hidden lg:inline">
                      {sig.role}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          {/* FOREGROUND LAYER 2: Central Forge Assembly Object */}
          <div
            className="bp-assembly absolute z-20 pointer-events-auto"
            style={{
              left: `${(270 / 540) * 100}%`,
              top: `${(200 / 460) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              onMouseEnter={() => setIsAssemblyHovered(true)}
              onMouseLeave={() => setIsAssemblyHovered(false)}
              onFocus={() => setIsAssemblyHovered(true)}
              onBlur={() => setIsAssemblyHovered(false)}
              tabIndex={0}
              className={`bp-assembly-pulse-target relative w-[208px] rounded-xl bg-white/95 backdrop-blur-md border p-3 transition-all duration-300 outline-hidden focus-visible:ring-1 focus-visible:ring-accent cursor-default ${
                isAssemblyHovered
                  ? 'border-[#FF5A1F]/70 shadow-[0_6px_28px_rgba(255,90,31,0.14)] -translate-y-0.5'
                  : 'border-[#E2DFD8] shadow-[0_4px_24px_rgba(0,0,0,0.05)]'
              }`}
            >
              {/* Technical Corner Tick Accents */}
              <span className="absolute -top-1 -left-1 text-[8px] font-mono text-[#C5C1BA] leading-none">
                +
              </span>
              <span className="absolute -top-1 -right-1 text-[8px] font-mono text-[#C5C1BA] leading-none">
                +
              </span>
              <span className="absolute -bottom-1 -left-1 text-[8px] font-mono text-[#C5C1BA] leading-none">
                +
              </span>
              <span className="absolute -bottom-1 -right-1 text-[8px] font-mono text-[#C5C1BA] leading-none">
                +
              </span>

              {/* Header: Project Forge Identity + Live Node Indicator */}
              <div className="flex items-center justify-between pb-1.5 border-b border-[#F0EDE6]">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#111111]">
                    PROJECT FORGE
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse shadow-[0_0_6px_rgba(255,90,31,0.8)]" />
                  <span className="font-mono text-[7.5px] font-bold text-[#FF5A1F] uppercase tracking-wider">
                    SYS.01
                  </span>
                </div>
              </div>

              {/* Core Node Title */}
              <div className="py-2 flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[10.5px] font-bold tracking-[0.14em] text-[#111111] uppercase">
                    SPEC SYNTHESIS
                  </span>
                  <span className="block font-mono text-[7.5px] tracking-wider text-[#8A8883] uppercase mt-0.5">
                    MULTI-SIGNAL ENGINE
                  </span>
                </div>
                <div className="h-4 w-px bg-[#E8E5DF]" />
                <div className="text-right">
                  <span className="font-mono text-[7.5px] text-[#8A8883] uppercase block">
                    STATE
                  </span>
                  <span className="font-mono text-[8.5px] font-bold text-[#FF5A1F] uppercase block">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Telemetry Status Bar */}
              <div className="pt-1.5 border-t border-[#F0EDE6] flex items-center justify-between text-[#767571] font-mono text-[8px]">
                <div className="flex items-center gap-1">
                  <span className="text-[#A3A099]">SIGNALS</span>
                  <span className="font-bold text-[#111111]">07</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#A3A099]">OUTPUT</span>
                  <span className="font-bold text-[#FF5A1F]">READY</span>
                </div>
              </div>
            </div>
          </div>

          {/* FOREGROUND LAYER 3: Project Output Terminal Node */}
          <div
            className="bp-output absolute z-20 pointer-events-auto"
            style={{
              left: `${(270 / 540) * 100}%`,
              top: `${(390 / 460) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-[184px] rounded-lg bg-[#FCFBF9] border border-[#E2DFD8] px-3 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-[#FF5A1F]/50 transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] font-bold tracking-[0.18em] text-[#FF5A1F] uppercase">
                  PROJECT BLUEPRINT
                </span>
                <span className="font-mono text-[8px] text-[#A3A099]">01</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono text-[10.5px] font-black tracking-wider text-[#111111] uppercase">
                  READY TO BUILD
                </span>
                <span className="font-mono text-[11px] text-[#FF5A1F] font-bold">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEWPORT (block md:hidden)
          Simplified Vertical Architectural Composition
          Strictly prevents horizontal scrolling or small unreadable text
          ========================================================================= */}
      <div className="block md:hidden w-full max-w-[360px] mx-auto pt-2 pb-4">
        {/* Mobile Assembly Card */}
        <div className="rounded-xl bg-white/95 border border-[#E2DFD8] p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#F0EDE6]">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#111111]">
              PROJECT FORGE
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
              <span className="font-mono text-[8px] font-bold text-[#FF5A1F]">ACTIVE</span>
            </div>
          </div>
          <div className="py-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-[#111111] tracking-wider uppercase">
              SPEC SYNTHESIS ENGINE
            </span>
            <span className="font-mono text-[8px] text-[#8C8B87]">07 SIGNALS</span>
          </div>
        </div>

        {/* Mobile Connector Hairline */}
        <div className="w-px h-5 bg-[#FF5A1F] mx-auto my-1 relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
        </div>

        {/* Mobile Core Input Signals (Balanced 2-Column Grid) */}
        <div className="grid grid-cols-2 gap-2 my-2">
          {BLUEPRINT_SIGNALS.slice(0, 4).map((sig) => (
            <div
              key={`m-${sig.id}`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white border border-[#E2DFD8] shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shrink-0" />
              <span className="font-mono text-[9.5px] font-bold text-[#111111] tracking-wider truncate">
                {sig.label}
              </span>
            </div>
          ))}
        </div>

        {/* Secondary Mobile Row */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#F7F6F2] border border-[#E2DFD8]">
            <span className="w-1 h-1 rounded-full bg-[#FF5A1F]" />
            <span className="font-mono text-[8.5px] font-medium text-[#5F5F5A]">HEALTHCARE</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#F7F6F2] border border-[#E2DFD8]">
            <span className="w-1 h-1 rounded-full bg-[#767571]" />
            <span className="font-mono text-[8.5px] font-medium text-[#767571]">+2 SIGNALS</span>
          </div>
        </div>

        {/* Mobile Output Bus Hairline */}
        <div className="w-px h-5 bg-[#FF5A1F] mx-auto my-2 relative">
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-solid border-t-[#FF5A1F] border-t-4 border-x-transparent border-x-3 border-b-0" />
        </div>

        {/* Mobile Blueprint Output Terminal */}
        <div className="rounded-lg bg-[#FCFBF9] border border-[#E2DFD8] px-3 py-2 text-center shadow-xs">
          <span className="font-mono text-[8px] font-bold tracking-widest text-[#FF5A1F] uppercase block">
            PROJECT BLUEPRINT
          </span>
          <span className="font-mono text-[10px] font-black tracking-wider text-[#111111] uppercase block mt-0.5">
            READY TO BUILD →
          </span>
        </div>
      </div>
    </div>
  )
}
