import React, { useState, useEffect, useRef } from 'react'
import { gsap } from '../../lib/motion'
import { Badge } from '../ui/Badge'
import { useApiHealth } from '../../hooks/useApiHealth'

/**
 * Floating light navigation with minimal editorial styling.
 * Warm-white backdrop, bold black typography, and signature electric orange CTA.
 */
export const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const { status, latencyMs } = useApiHealth()

  // Detect scroll position for subtle shadow and background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate mobile menu panel
  useEffect(() => {
    if (!panelRef.current) return
    if (menuOpen) {
      gsap.to(panelRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.45,
        ease: 'power3.inOut',
      })
    } else {
      gsap.to(panelRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.35,
        ease: 'power3.inOut',
      })
    }
  }, [menuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          scrolled
            ? 'bg-[#F7F6F2]/90 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          {/* Brand Wordmark */}
          <a
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Project Forge — Home"
          >
            <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-fg group-hover:text-accent transition-colors">
              PROJECT FORGE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </a>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center gap-10">
            <a
              href="#inputs"
              className="font-mono text-xs uppercase tracking-widest text-fg-secondary hover:text-accent transition-colors"
            >
              DISCOVER
            </a>
            <a
              href="#forge"
              className="font-mono text-xs uppercase tracking-widest text-fg-secondary hover:text-accent transition-colors"
            >
              HOW IT WORKS
            </a>
            <a
              href="#delivers"
              className="font-mono text-xs uppercase tracking-widest text-fg-secondary hover:text-accent transition-colors"
            >
              MENTOR
            </a>
          </nav>

          {/* Desktop Right — Engine Status + Orange CTA */}
          <div className="flex items-center gap-5">
            <div className="hidden sm:block">
              <Badge
                variant={
                  status === 'success'
                    ? 'success'
                    : status === 'loading'
                    ? 'warning'
                    : 'error'
                }
                dot
              >
                {status === 'success'
                  ? `Engine Online${latencyMs ? ` · ${latencyMs}ms` : ''}`
                  : status === 'loading'
                  ? 'Connecting'
                  : 'Offline'}
              </Badge>
            </div>

            <a
              href="#discovery"
              className={[
                'hidden md:inline-flex items-center gap-2 px-6 py-2.5',
                'bg-accent text-white font-mono text-xs uppercase tracking-wider font-semibold',
                'transition-all duration-200 ease-out-expo shadow-[0_2px_12px_rgba(255,90,31,0.28)]',
                'hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
              ].join(' ')}
            >
              <span>START BUILDING</span>
              <span>→</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="relative flex lg:hidden h-10 w-10 items-center justify-center text-fg hover:text-accent transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={[
                    'block h-0.5 w-6 bg-current transition-transform duration-300',
                    menuOpen ? 'translate-y-2 rotate-45' : '',
                  ].join(' ')}
                />
                <span
                  className={[
                    'block h-0.5 w-6 bg-current transition-opacity duration-300',
                    menuOpen ? 'opacity-0' : '',
                  ].join(' ')}
                />
                <span
                  className={[
                    'block h-0.5 w-6 bg-current transition-transform duration-300',
                    menuOpen ? '-translate-y-2 -rotate-45' : '',
                  ].join(' ')}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Panel */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-40 bg-[#F7F6F2] lg:hidden flex flex-col justify-between"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-8 px-6 pt-28 pb-8">
          <div className="flex flex-col gap-6">
            <a
              href="#inputs"
              onClick={() => setMenuOpen(false)}
              className="font-display font-extrabold text-3xl text-fg hover:text-accent transition-colors"
            >
              Discover
            </a>
            <a
              href="#forge"
              onClick={() => setMenuOpen(false)}
              className="font-display font-extrabold text-3xl text-fg hover:text-accent transition-colors"
            >
              How It Works
            </a>
            <a
              href="#delivers"
              onClick={() => setMenuOpen(false)}
              className="font-display font-extrabold text-3xl text-fg hover:text-accent transition-colors"
            >
              AI Mentor
            </a>
            <a
              href="#discovery"
              onClick={() => setMenuOpen(false)}
              className="font-display font-extrabold text-3xl text-accent"
            >
              Start Building →
            </a>
          </div>

          <div className="divider-h my-2" />

          <div className="flex items-center gap-3">
            <Badge
              variant={
                status === 'success'
                  ? 'success'
                  : status === 'loading'
                  ? 'warning'
                  : 'error'
              }
              dot
            >
              {status === 'success'
                ? 'Engine Online'
                : status === 'loading'
                ? 'Connecting'
                : 'Offline'}
            </Badge>
          </div>
        </nav>

        <div className="px-6 pb-8 border-t border-border pt-4">
          <p className="type-meta text-fg-muted">
            PROJECT FORGE — DISCOVER POSSIBILITY
          </p>
        </div>
      </div>

      {/* Header height spacer */}
      <div className="h-16 md:h-20" />
    </>
  )
}
