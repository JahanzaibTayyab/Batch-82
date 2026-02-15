# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **Batch 82** course repository for the **Certified Agentic AI & Robotics Engineer 2026** program by Panaversity. It contains course materials, class notes, and assignments for **AI-101: Fundamentals of AI-Driven and Spec-Driven Development (Quarter 1)**.

**Primary Reference:** [The AI Agent Factory](https://agentfactory.panaversity.org/)

## Repository Structure

```
Batch-82/
└── Quarter-1/
    ├── README.md           # Course syllabus and module breakdown
    ├── assignments/        # Weekly assignments (1-5)
    ├── class01-08_*/       # Class materials by date (YYYYMMDD format)
    └── class07_20260201/
        └── .agents/skills/ # Example Claude Code skills
```

## Course Focus Areas

- AI-Driven Development (AIDD) and the 9 pillars
- Claude Code CLI: agents, sub-agents, and skills
- Prompt Engineering: temperature, Top-K, Top-P, token management
- Spec-Driven Development (SDD) methodology
- AI-First IDEs: Zed, Cursor, Antigravity

## Key Technical Concepts

### Claude Code Agents vs Skills

| Concept | How It Works | Creation |
|---------|--------------|----------|
| **Agent** | Claude calls automatically for complex tasks | `/agents` command, `.md` file with YAML header |
| **Skill** | User invokes manually via `/skill-name` | `/skills` command, folder with `SKILL.md` |

### Agent YAML Configuration

```yaml
---
name: agent-name
description: When Claude should use this agent
tools: Read, Grep, Glob, Bash, Edit, Write
model: haiku | sonnet | opus
skills:
  - preloaded-skill-name
---
```

### Skill File Structure

```
~/.claude/skills/skill-name/
├── SKILL.md          # Required: YAML frontmatter + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation loaded as needed
└── assets/           # Optional: templates, images for output
```

## Development Workflow

**ALWAYS use `/responsive-qa-tester` agent after creating any HTML/CSS app or website** to test for mobile responsiveness, cross-device compatibility, and general quality assurance.

## Working with This Repository

- Class folders follow naming convention: `classNN_YYYYMMDD/`
- Assignment folders contain individual README.md with instructions
- The `.agents/skills/` directory in class07 contains example skill implementations
- Course assessments include quizzes, portfolio projects, and capstone (Next.js website, Docusaurus book)
