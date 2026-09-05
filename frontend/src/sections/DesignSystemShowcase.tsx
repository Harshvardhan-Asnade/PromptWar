import React, { useState } from 'react'
import { Container } from '../components/layout/Container'
import {
  Button,
  Input,
  Chip,
  Card,
  ProjectCard,
  Badge,
  Divider,
  Typography,
  DisplayHeading,
  SectionHeading,
  TechLabel,
} from '../components/ui'
import { Reveal, StaggerReveal } from '../components/motion'

/**
 * Design System — Internal showcase section.
 * Renders all base components for visual and interaction validation.
 */
export const DesignSystemShowcase: React.FC = () => {
  const [selectedChips, setSelectedChips] = useState<string[]>(['Python', 'React'])
  const [selectedCard, setSelectedCard] = useState<number | null>(0)
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('Machine Learning')

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    )
  }

  return (
    <section id="design-system" className="section-spacing border-b border-border">
      <Container>
        <Reveal>
          <SectionHeading index="[DS]" label="INTERNAL DESIGN SYSTEM">
            System Primitives & Components
          </SectionHeading>
        </Reveal>

        <div className="mt-12 space-y-16">
          {/* ---- Typography ---- */}
          <Reveal>
            <div className="space-y-6">
              <TechLabel dot>01 / Typography Hierarchy</TechLabel>
              <Divider />
              <div className="space-y-4">
                <DisplayHeading>Display Heading</DisplayHeading>
                <Typography variant="h1" className="text-fg">
                  Heading One — Editorial Serif
                </Typography>
                <Typography variant="h2" className="text-fg">
                  Heading Two — Section Level
                </Typography>
                <Typography variant="h3" className="text-fg">
                  Heading Three — Sub-section Level
                </Typography>
                <Typography variant="body">
                  Body text — Plus Jakarta Sans, light weight, generous line height for
                  readability. Designed for editorial reading columns and descriptions.
                </Typography>
                <Typography variant="small">
                  Small text — used for secondary information and supporting copy.
                </Typography>
                <TechLabel>Technical Label — Monospace Uppercase</TechLabel>
                <div>
                  <Typography variant="meta" as="span">
                    Metadata — smallest mono annotation
                  </Typography>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---- Buttons ---- */}
          <Reveal>
            <div className="space-y-6">
              <TechLabel dot>02 / Button Variants & States</TechLabel>
              <Divider />
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary Action</Button>
                <Button variant="primary" size="lg">
                  Large Primary
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link" href="#explore">Text / Link Button</Button>
                <Button
                  variant="icon"
                  aria-label="Settings"
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
                <Button variant="primary" loading>
                  Loading
                </Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
                <Button variant="primary" size="sm">
                  Small
                </Button>
              </div>
            </div>
          </Reveal>

          {/* ---- Inputs ---- */}
          <Reveal>
            <div className="space-y-6">
              <TechLabel dot>03 / Form Inputs & Search</TechLabel>
              <Divider />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Input
                  label="Standard Text Input"
                  placeholder="Enter project title..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  hint="Standard text field with floating outline"
                />
                <Input
                  variant="search"
                  label="Search-Style Input"
                  placeholder="Search domains or tech stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClear={() => setSearchQuery('')}
                  hint="With search icon and clear trigger"
                />
                <Input
                  label="Error State Input"
                  placeholder="Required field..."
                  error
                  hint="Validation error: field cannot be blank"
                  defaultValue="Invalid Parameter"
                />
              </div>
            </div>
          </Reveal>

          {/* ---- Chips / Selection ---- */}
          <Reveal>
            <div className="space-y-6">
              <TechLabel dot>04 / Selectable Chips</TechLabel>
              <Divider />
              <div className="flex flex-wrap gap-2">
                {[
                  'Python',
                  'React',
                  'Machine Learning',
                  'FastAPI',
                  'TypeScript',
                  'TensorFlow',
                  'Edge AI',
                  'PostgreSQL',
                ].map((chip) => (
                  <Chip
                    key={chip}
                    selected={selectedChips.includes(chip)}
                    onToggle={() => toggleChip(chip)}
                  >
                    {chip}
                  </Chip>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---- Badges ---- */}
          <Reveal>
            <div className="space-y-6">
              <TechLabel dot>05 / Badges & Status Indicators</TechLabel>
              <Divider />
              <div className="flex flex-wrap items-center gap-3">
                <Badge>Default</Badge>
                <Badge variant="success" dot>
                  API Online
                </Badge>
                <Badge variant="error" dot>
                  Failed Check
                </Badge>
                <Badge variant="warning" dot>
                  Evaluating
                </Badge>
                <Badge variant="accent">Innovation: 94</Badge>
                <Badge variant="accent" dot>
                  Recommended
                </Badge>
              </div>
            </div>
          </Reveal>

          {/* ---- Cards ---- */}
          <Reveal>
            <div className="space-y-6">
              <TechLabel dot>06 / Card Foundations & Selection</TechLabel>
              <Divider />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    index: '01',
                    title: 'Adaptive Intelligence Engine',
                    tagline:
                      'High-throughput decision engine with real-time auditability and explainability.',
                    score: 92,
                    difficulty: 'Advanced',
                  },
                  {
                    index: '02',
                    title: 'Distributed Verification Network',
                    tagline:
                      'Cryptographically verified tracking and artifact consensus framework.',
                    score: 88,
                    difficulty: 'Intermediate',
                  },
                  {
                    index: '03',
                    title: 'Edge Predictive Monitor',
                    tagline:
                      'Ultra-lightweight embedded telemetry analyzer for hardware diagnostics.',
                    score: 95,
                    difficulty: 'Balanced',
                  },
                ].map((project, i) => (
                  <ProjectCard
                    key={i}
                    index={project.index}
                    title={project.title}
                    tagline={project.tagline}
                    selected={selectedCard === i}
                    onClick={() => setSelectedCard(selectedCard === i ? null : i)}
                  >
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="accent">Score: {project.score}</Badge>
                      <Badge>{project.difficulty}</Badge>
                    </div>
                  </ProjectCard>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---- Dividers & Separators ---- */}
          <Reveal>
            <div className="space-y-6">
              <TechLabel dot>07 / Dividers & Separators</TechLabel>
              <div className="space-y-6 mt-4">
                <div>
                  <Typography variant="meta" className="mb-2 block">Standard Horizontal</Typography>
                  <Divider />
                </div>
                <div>
                  <Typography variant="meta" className="mb-2 block">Accent Gradient</Typography>
                  <Divider accent />
                </div>
                <div>
                  <Typography variant="meta" className="mb-2 block">Labeled Separator</Typography>
                  <Divider label="PROJECT FORGE MILESTONE" />
                </div>
                <div className="pt-2">
                  <Typography variant="meta" className="mb-2 block">Vertical Separator Demo</Typography>
                  <div className="flex items-center gap-6 h-10 p-3 bg-surface border border-border">
                    <span className="type-meta text-fg">Column A</span>
                    <Divider orientation="vertical" />
                    <span className="type-meta text-fg">Column B</span>
                    <Divider orientation="vertical" accent />
                    <span className="type-meta text-accent">Column C</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---- Stagger Animation Demo ---- */}
          <div className="space-y-6">
            <TechLabel dot>08 / Staggered Motion</TechLabel>
            <Divider />
            <StaggerReveal
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              selector=":scope > div"
            >
              {[1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <Card className="p-6">
                    <span className="type-label text-accent">{String(n).padStart(2, '0')}</span>
                    <Typography variant="small" className="mt-2">
                      Sequenced Stagger Item {n}
                    </Typography>
                  </Card>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
