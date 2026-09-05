# Project Forge

## AI Project Idea Generator & Mentor for Final-Year Students

**Document Type:** Product Requirements Document
**Version:** 1.0
**Build Context:** 4-hour Hackathon MVP
**Primary Goal:** Help final-year students transform their skills, interests, and constraints into a practical, technically strong, and feasible project plan.

---

# 1. Product Overview

Project Forge is an AI-powered platform designed for final-year students who struggle to identify a suitable project idea or do not know how to turn an idea into a practical, complete project.

The platform collects the student's:

* Interests
* Technical skills
* Experience level
* Preferred domain
* Team size
* Available development time
* Difficulty preference

The AI then generates personalized project ideas and provides guidance on:

* Problem statement
* Proposed solution
* Core features
* Technology stack
* System architecture
* Development roadmap
* Datasets/resources
* Feasibility
* Innovation opportunities
* Potential improvements

The platform also acts as an AI mentor that understands the selected project and provides contextual guidance throughout the planning process.

---

# 2. Problem Statement

Final-year students frequently face three major problems:

### Problem 1 — "What should I build?"

Students may know technologies such as Python, Java, React, AI/ML, or cybersecurity but struggle to identify a project that matches their actual abilities and interests.

### Problem 2 — "Is this project actually feasible?"

Students often choose projects that sound impressive but are too complex for their available time, skills, or team size.

### Problem 3 — "I have an idea, but I don't know how to build it."

Even after selecting an idea, students may not know:

* What features are required
* Which technologies to use
* Which architecture to follow
* What datasets are needed
* What order to build the system
* How to improve the project's innovation

### Product Opportunity

Project Forge converts:

**Student Profile → Personalized Ideas → Evaluated Project → Complete Blueprint → AI Mentorship**

---

# 3. Product Vision

> **Turn "I don't know what to build" into "I know exactly what to build next."**

Project Forge should feel less like an AI chatbot and more like an intelligent **project discovery and planning experience**.

The product should visually communicate a journey:

**Discover → Generate → Choose → Build → Improve**

---

# 4. Target Users

## Primary User

Final-year college/university students who need a project for:

* Final-year submission
* Capstone projects
* Academic projects
* Hackathons
* Portfolio projects

## Secondary Users

Students looking for:

* AI/ML projects
* Web development projects
* Cybersecurity projects
* IoT projects
* Data science projects
* Robotics projects
* Research-oriented projects

---

# 5. User Goals

A student should be able to:

1. Describe their skills and interests.
2. Tell the platform about their constraints.
3. Generate several project ideas.
4. Compare the ideas.
5. Select the most suitable project.
6. Understand how the project works.
7. See the recommended technology stack.
8. See the system architecture.
9. Follow a development roadmap.
10. Understand project risks and weaknesses.
11. Improve the project using AI recommendations.
12. Ask an AI mentor project-specific questions.

---

# 6. Core Product Experience

The entire platform follows a narrative journey.

```text
LANDING
   ↓
DISCOVER YOURSELF
   ↓
SKILLS + INTERESTS
   ↓
PROJECT GENERATION
   ↓
3 PROJECT POSSIBILITIES
   ↓
PROJECT SELECTION
   ↓
PROJECT BLUEPRINT
   ↓
AI PROJECT REVIEW
   ↓
PROJECT IMPROVEMENT
   ↓
AI MENTOR
```

The UI should make this journey feel progressive rather than presenting everything at once.

---

# 7. Product Modules

## Module A — Landing Experience

### Objective

Immediately communicate the problem and the value of the product.

### Example messaging

**Headline:**

> You don't need another project idea.
> You need the right one.

Supporting text:

> Tell us what you know, what you care about, and what you want to build.

Primary CTA:

**Find My Project**

### Requirements

* Full-screen hero
* Strong typography
* Cinematic entrance
* Smooth scrolling
* Story-driven transitions
* Responsive layout

---

# 8. Module B — Student Discovery

The platform gathers information required to personalize recommendations.

## Inputs

### Interests

Examples:

* AI/ML
* Web Development
* Cybersecurity
* Data Science
* Healthcare
* FinTech
* Education
* Agriculture
* Robotics
* IoT

### Skills

Examples:

* Python
* C++
* Java
* JavaScript
* React
* Node.js
* SQL
* Machine Learning
* Deep Learning
* Computer Vision
* Cloud

### Experience Level

* Beginner
* Intermediate
* Advanced

### Team Size

* Individual
* 2 members
* 3 members
* 4+ members

### Available Time

Examples:

* 4 weeks
* 6 weeks
* 8 weeks
* 3 months
* 6 months

### Difficulty

* Safe / achievable
* Balanced
* Challenging
* Research-oriented

---

# 9. Module C — Skill & Interest Visualization

Instead of displaying a traditional multi-step form, the platform visually represents the student's profile.

The selected skills and interests should visually converge into a central "AI understanding" state.

Concept:

```text
                 INTERESTS
                     ↘
                      ↘
SKILLS ────────────→  AI  ←──────── GOALS
                      ↗
                     ↗
                 CONSTRAINTS
```

### UX Goal

Make the user feel:

> "The platform understands me."

---

# 10. Module D — AI Project Generator

## Trigger

User selects:

**Generate My Projects**

## Backend endpoint

`POST /api/projects/generate`

## Request

```json
{
  "interests": [],
  "skills": [],
  "experience": "intermediate",
  "team_size": 3,
  "duration": "3 months",
  "difficulty": "balanced"
}
```

## AI Responsibilities

Generate **3 personalized projects**.

Each project must contain:

```json
{
  "title": "",
  "tagline": "",
  "problem": "",
  "solution": "",
  "why_it_fits": "",
  "innovation": 0,
  "feasibility": 0,
  "impact": 0,
  "technical_depth": 0,
  "difficulty": "",
  "features": [],
  "tech_stack": [],
  "architecture": [],
  "roadmap": [],
  "datasets": [],
  "risks": [],
  "improvements": []
}
```

---

# 11. AI Generation Experience

The application should not show a generic loading spinner.

Instead, use a cinematic generation sequence:

```text
ANALYZING YOUR SKILLS
        ↓
UNDERSTANDING YOUR INTERESTS
        ↓
CHECKING FEASIBILITY
        ↓
EXPLORING PROJECT POSSIBILITIES
        ↓
BUILDING YOUR PROJECTS
```

Then reveal:

> **3 projects found.**

### UX principle

The loading experience should communicate what the AI is doing without exposing hidden chain-of-thought or internal reasoning.

---

# 12. Module E — Project Discovery

Display three generated project directions.

Each should communicate:

* Project title
* Short description
* Difficulty
* Innovation
* Feasibility
* Impact
* Technical depth

Example:

```text
01

PROJECT TITLE

Short description

Innovation     91
Feasibility    84
Impact         88

EXPLORE PROJECT →
```

### Interaction

Hover:

* Typography shifts
* Supporting information appears
* Visual depth changes
* Project metadata becomes more prominent

Click:

The selected project transitions into the full Project Blueprint.

---

# 13. Module F — Project Blueprint

This is the primary value-delivery screen.

## Blueprint Sections

### 1. Problem

What real-world problem does the project solve?

### 2. Solution

How does the proposed system solve it?

### 3. Objectives

What should the project accomplish?

### 4. Core Features

List the essential features required for an MVP.

### 5. Advanced Features

Optional features that can increase project quality.

### 6. Technology Stack

Example:

```text
Frontend
React + TypeScript

Backend
FastAPI

AI
Python + ML/LLM

Database
PostgreSQL

Deployment
Cloud/Vercel/Render/etc.
```

### 7. System Architecture

Visual representation:

```text
USER
 ↓
FRONTEND
 ↓
API
 ↓
APPLICATION LOGIC
 ↓
AI / ML
 ↓
DATABASE
```

### 8. Development Roadmap

Example:

```text
WEEK 1
Research + Architecture

WEEK 2
Dataset / Data Layer

WEEK 3
AI / Core Logic

WEEK 4
Backend

WEEK 5
Frontend

WEEK 6
Integration + Testing

WEEK 7
Deployment

WEEK 8
Optimization + Documentation
```

---

# 14. Module G — Project Evaluation

The student can ask AI to evaluate the selected project.

## Endpoint

`POST /api/projects/evaluate`

## Evaluation criteria

* Innovation
* Feasibility
* Technical depth
* Impact
* Uniqueness
* Scope
* Complexity

Example:

```text
PROJECT POTENTIAL

Innovation        91
Feasibility       84
Technical Depth   93
Impact            88
Uniqueness        86

Overall Score     88
```

### AI Feedback

The system should identify:

* Strengths
* Weaknesses
* Risks
* Missing features
* Scope problems

Example:

> Your project has strong technical depth, but the current dataset strategy may be difficult for a three-person team within eight weeks.

---

# 15. Module H — Project Improvement

CTA:

**Improve My Project**

## Endpoint

`POST /api/projects/improve`

The AI proposes practical improvements.

Possible recommendations:

* Better architecture
* More useful feature
* Improved dataset strategy
* Better model
* More realistic scope
* Research component
* Explainability
* Deployment improvement
* Scalability improvement

The student should be able to compare:

**Current Project → Improved Project**

---

# 16. Module I — AI Project Mentor

The mentor understands the current project context.

## Endpoint

`POST /api/mentor`

The backend passes relevant project context to the AI.

### Example questions

> How can I make this project more innovative?

> Can my team finish this in eight weeks?

> Which feature should I build first?

> Should I use CNN or Vision Transformer?

> How should I explain this project to my professor?

> What should I remove if we are running out of time?

### Important UX Requirement

This must not feel like a generic ChatGPT clone.

The mentor should be deeply contextual to:

* Selected project
* Student skills
* Team size
* Timeline
* Architecture
* Project risks

---

# 17. AI Architecture

For the 4-hour MVP, use a single capable LLM rather than training a custom model.

```text
                 FRONTEND
                    │
                    ▼
                FASTAPI
                    │
          ┌─────────┴─────────┐
          │                   │
       Generator          Evaluator
          │                   │
          └─────────┬─────────┘
                    │
                 LLM API
                    │
                    ▼
             Structured JSON
                    │
                    ▼
                FRONTEND
```

---

# 18. Backend Requirements

## Technology

* Python
* FastAPI
* Pydantic
* Environment variables for API keys
* CORS
* Async API requests where appropriate

## Required endpoints

### Health

`GET /api/health`

### Generate

`POST /api/projects/generate`

### Evaluate

`POST /api/projects/evaluate`

### Improve

`POST /api/projects/improve`

### Mentor

`POST /api/mentor`

---

# 19. Frontend Requirements

## Technology

* React
* TypeScript
* Vite
* Tailwind CSS
* GSAP
* GSAP ScrollTrigger
* Lenis

Optional:

* Framer Motion
* React Three Fiber
* Three.js

Only use additional technologies where they improve the experience.

---

# 20. Visual Design Direction

The platform must **not look like a generic AI-generated SaaS website**.

## Avoid

* Excessive gradients
* Purple/blue "AI" gradients
* Excessive glassmorphism
* Generic floating cards
* AI robot illustrations
* Repetitive rounded rectangles
* Huge number of meaningless effects
* Template-like dashboards

## Target

**Premium editorial + cinematic + technical**

Characteristics:

* Strong typography
* Large display text
* Editorial layouts
* Asymmetric compositions
* Generous whitespace
* Thin borders
* Restrained color palette
* Technical labels
* Large numbers
* Intentional micro-interactions

---

# 21. Motion Design System

Animation must support the product story.

## Lenis

Used for:

* Smooth scrolling
* Overall scrolling experience

## GSAP

Used for:

* Hero animation
* Text reveals
* ScrollTrigger
* Pinning
* Horizontal scrolling
* Section transformations
* Card transitions
* Progress animations
* Project reveal

## Clip-path / masking

Used for:

* Image transitions
* Full-screen section transitions
* Project selection transition

## Micro-interactions

Used for:

* Buttons
* Cards
* Navigation
* Inputs
* Selection states

---

# 22. Storytelling Scroll Experience

The site should communicate:

```text
YOU
 ↓
YOUR SKILLS
 ↓
YOUR INTERESTS
 ↓
YOUR POSSIBILITIES
 ↓
YOUR PROJECT
 ↓
YOUR BLUEPRINT
 ↓
YOUR IMPROVEMENT
 ↓
YOUR NEXT STEP
```

Example transformation:

```text
"WHAT DO I BUILD?"
        ↓
"LET'S UNDERSTAND YOU."
        ↓
"WE FOUND POSSIBILITIES."
        ↓
"CHOOSE YOUR DIRECTION."
        ↓
"NOW LET'S BUILD IT."
```

The visual story should evolve as the user progresses.

---

# 23. UX Principles

### Principle 1 — Progressive disclosure

Don't reveal everything at once.

### Principle 2 — One decision at a time

The interface should guide the student through the process.

### Principle 3 — AI should explain value, not internal reasoning

Show useful status updates, not fabricated chain-of-thought.

### Principle 4 — Every animation should have a purpose

Animation must improve:

* Understanding
* Feedback
* Navigation
* Emotional impact

### Principle 5 — Mobile responsive

The experience must remain functional on:

* Desktop
* Tablet
* Mobile

---

# 24. MVP Scope

## Must Have

* Landing page
* Student discovery
* Skills/interests input
* AI generation
* 3 project recommendations
* Project selection
* Project blueprint
* Technology stack
* Features
* Roadmap
* Working FastAPI backend
* LLM integration
* Premium UI
* GSAP/Lenis motion

## Should Have

* Project evaluation
* Project score
* Improvement recommendations
* Interactive architecture

## Nice to Have

* Contextual AI mentor
* Export project plan
* Advanced project comparison
* 3D interactions
* Persistent user profile

---

# 25. Explicitly Out of Scope for Hackathon MVP

Do not spend hackathon time on:

* User authentication
* Payment
* Admin dashboard
* Complex database architecture
* Social networking
* Community system
* Model training
* Fine-tuning
* Complex RAG
* Multi-agent architecture
* Voice assistant
* Full production analytics system

---

# 26. Non-Functional Requirements

## Performance

* Fast initial page load
* Avoid unnecessary JavaScript
* Lazy-load expensive visual components
* Avoid heavy 3D unless required
* Maintain smooth scrolling and animation

## Reliability

* API errors should have graceful UI states
* AI failures should display useful recovery messages
* Loading states must always exist
* No broken navigation

## Security

* Never expose API keys in the frontend
* Store secrets in backend environment variables
* Validate all API requests
* Limit excessive requests during the hackathon demo

---

# 27. Error & Empty States

## AI generation failure

Message:

> We couldn't generate your projects right now. Check the connection and try again.

CTA:

**Try Again**

## Missing input

The interface should clearly identify what information is still required.

## Mentor unavailable

Provide useful fallback:

> Your project context is ready. The mentor connection is temporarily unavailable.

---

# 28. Success Metrics

For the hackathon MVP:

### Product success

A judge should be able to complete the core journey without assistance.

### Technical success

```text
Frontend ✅
Backend ✅
LLM integration ✅
End-to-end flow ✅
```

### UX success

A user should understand the purpose of the platform within **30 seconds**.

### Demo success

The platform should demonstrate:

**Student profile → AI generation → project selection → project blueprint → project improvement**

within a few minutes.

---

# 29. 4-Hour Implementation Plan

## Phase 1 — Foundation

**0:00–0:15**

* Repository
* Frontend
* Backend
* CORS
* Health endpoint
* GSAP
* Lenis

## Phase 2 — AI Engine

**0:15–0:50**

* Generate endpoint
* Pydantic schemas
* LLM integration
* Structured response

## Phase 3 — Design System

**0:50–1:10**

* Typography
* Colors
* Layout
* Components
* Motion rules

## Phase 4 — Hero + Story

**1:10–1:40**

* Hero
* Scroll story
* GSAP
* Lenis

## Phase 5 — Student Discovery

**1:40–2:15**

* Skills
* Interests
* Experience
* Constraints
* API connection

## Phase 6 — AI Generation

**2:15–2:30**

* Generation transition
* Loading sequence
* AI result reveal

## Phase 7 — Project Discovery

**2:30–2:55**

* 3 project cards
* Interaction
* Selection

## Phase 8 — Project Blueprint

**2:55–3:20**

* Problem
* Solution
* Features
* Tech stack
* Architecture
* Roadmap

## Phase 9 — AI Evaluation

**3:20–3:35**

* Score
* Strengths
* Weaknesses
* Improvements

## Phase 10 — Mentor + Polish

**3:35–4:00**

* Mentor if time allows
* Animations
* Error states
* Responsive checks
* Final demo flow

---

# 30. Priority Matrix

| Feature                  | Priority |
| ------------------------ | -------- |
| AI Project Generation    | P0       |
| Project Blueprint        | P0       |
| Student Discovery        | P0       |
| FastAPI Backend          | P0       |
| LLM Integration          | P0       |
| Premium UI/UX            | P0       |
| GSAP + Lenis             | P0       |
| Project Evaluation       | P1       |
| Project Improvement      | P1       |
| AI Mentor                | P1       |
| Interactive Architecture | P2       |
| Export                   | P2       |
| Authentication           | P3       |
| Database                 | P3       |

---

# 31. Suggested Demo Script

### Opening

> "Most students don't struggle because they can't code. They struggle because they don't know what is worth building."

### Step 1

Enter:

* AI/ML
* Python
* React
* Intermediate
* 3-person team
* 8 weeks

### Step 2

Click:

**Generate My Projects**

### Step 3

AI produces three project directions.

### Step 4

Select one.

### Step 5

Show:

* Problem
* Solution
* Features
* Technology
* Architecture
* Roadmap

### Step 6

Run:

**Review My Project**

AI identifies a weakness.

### Step 7

Run:

**Improve My Project**

### Closing

> **"Project Forge doesn't just give students another idea. It gives them a path to build it."**

---

# 32. Definition of Done

The hackathon MVP is considered complete when a user can:

```text
OPEN WEBSITE
   ↓
ENTER PROFILE
   ↓
GENERATE PROJECTS
   ↓
RECEIVE 3 PROJECTS
   ↓
SELECT ONE
   ↓
VIEW COMPLETE BLUEPRINT
   ↓
EVALUATE PROJECT
   ↓
GET IMPROVEMENTS
```

And the entire flow works through the real frontend, backend, and AI integration.

---

# 33. Final Product Positioning

### Product Name

**Project Forge**

### Tagline

> **From "What should I build?" to "Here's exactly how."**

### Alternative positioning

> **Your idea generator. Your project planner. Your AI mentor.**

### Core promise

**Project Forge transforms a student's skills and interests into a practical project they can actually build.**
