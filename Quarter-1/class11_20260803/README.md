# Class 11 - Spec-Driven Development with Claude Code

**Date:** March 08, 2026  
**Course:** AI-101 - Fundamentals of AI-Driven and Spec-Driven Development  
**Reference:** [The AI Agent Factory](https://agentfactory.panaversity.org/)  
**Lecture Recording:** [Watch on YouTube](https://youtu.be/nkeoGxTqHoc)

---

## Table of Contents

1. [What is Spec-Driven Development?](#what-is-spec-driven-development)
2. [Why Specs Beat Vibe Coding](#why-specs-beat-vibe-coding)
3. [The Three Levels of SDD](#the-three-levels-of-sdd)
4. [Key Prompt Patterns](#key-prompt-patterns)
5. [Additional Resources](#additional-resources)

---

# What is Spec-Driven Development?

**Source:** [Chapter 5: Spec-Driven Development with Claude Code](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development)

Spec-Driven Development (SDD) is a **paradigm shift** in how software is created with AI assistance. Instead of treating AI coding agents as sophisticated autocomplete tools, SDD treats **specifications as the primary artifact** of software development—with code as a generated output derived from human-authored specs.

This chapter teaches SDD using **native Claude Code capabilities only**: Memory (CLAUDE.md), Subagents, Tasks, and Hooks. You learn the complete four-phase workflow that turns vibe-coding chaos into production-ready implementations.

## The Evolution from Vibe Coding

AI coding assistants changed how developers build software. Many started with **vibe coding**—describing what they want and getting code back. That works well for quick prototypes. As work moved from prototyping to production, the limits of vibe coding showed up: each iteration loses context, the agent makes reasonable-but-wrong assumptions, and the code may work but not match existing patterns or architecture.

**Spec-Driven Development** is the response: give comprehensive specifications upfront so the agent has a complete picture of what to build, why it matters, and—critically—what **not** to build.

## Prerequisites

- **Chapter 3** — Claude Code core capabilities: CLAUDE.md (memory), Subagent orchestration, foundational tools
- **Chapter 4** — Context engineering: why context quality drives reliability, context isolation, Tasks for persistent state

SDD is the **methodology** that ties these capabilities into production-ready workflows.

## SDD Tools Landscape

SDD is a methodology, not one tool. Different frameworks implement it:

| Tool                | Approach                              | Notable Feature                            |
| ------------------- | ------------------------------------- | ------------------------------------------ |
| **Amazon Kiro**     | Requirements → Design → Tasks         | Lightweight three-document workflow        |
| **GitHub Spec-Kit** | Constitution → Specify → Plan → Tasks | Open-source, multi-agent compatible        |
| **Tessl**           | Spec-as-Source                        | Radical: code regenerated from specs       |
| **CC-SDD**          | Cross-tool                            | Works with Claude Code, Cursor, Gemini CLI |

**This chapter uses native Claude Code only**—CLAUDE.md, Subagents, Tasks, Hooks. No external frameworks. The ideas apply to any SDD tool.

Claude Code has absorbed much of SDD natively: CLAUDE.md as project constitution, subagents for parallel research, the interview pattern (e.g. `ask_user_question`) for refinement, and the Tasks system for implementation with dependency ordering and atomic commits.

## What You'll Learn

By the end of this material you will be able to:

- **Explain** why vibe coding fails for production systems
- **Distinguish** the three SDD levels: Spec-First, Spec-Anchored, Spec-as-Source
- **Design** a project constitution that governs specs, sessions, and subagents
- **Run** the four-phase SDD workflow with native Claude Code
- **Write** specs that AI agents can implement reliably
- **Use** parallel research with subagents
- **Use** the Task system for dependency-aware work and atomic commits
- **Decide** when SDD is worth it vs when simpler approaches are enough

---

# Why Specs Beat Vibe Coding

**Source:** [Why Specs Beat Vibe Coding](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development/why-specs-beat-vibe-coding)

You ask Claude to write a report about personal AI employees. It generates a draft. You want more focus on business ROI, so you ask for that. Claude rewrites—and the technical details you liked disappear. You clarify; Claude adds them back but the structure changes. After many turns you have something that technically covers the topic but reads like several authors with conflicting views.

That’s **vibe coding**: you have a vague idea, you describe it, the AI generates something, and you refine by conversation. Sometimes it works; often you spend more time correcting than writing. The issue isn’t the AI—it’s the **workflow**. Vibe coding fails in predictable ways for substantial work.

## The Vibe Coding Pattern

Vibe coding follows a cycle:

```
Prompt → Output → "No, I meant..." → Output → "Actually..." → Output → Repeat
```

Each turn feels like progress, but something goes wrong under the surface.

**Turn 1:** “Write a report about personal AI employees in 2026.”  
Claude gives a broad overview: tools, use cases, predictions.

**Turn 5:** “Focus more on business ROI and cost savings.”  
Claude rewrites with heavy business focus and drops the tool comparisons you liked.

**Turn 9:** “Bring back the tool comparisons but keep the ROI focus.”  
Claude merges both; the structure becomes inconsistent.

**Turn 14:** “Why does this read like a blog post? I needed a research report with citations.”  
Claude restructures; the ROI analysis you refined ends up buried in an appendix.

**Turn 20:** You give up and start over.

No single turn is “wrong”—each reply is reasonable given the last message. The failure is **structural**.

## Three Failure Modes

Vibe coding fails in three recurring ways.

### 1. Context Loss: Each Iteration Loses Discoveries

When you ask for more ROI focus, the model focuses on that. Earlier decisions—which tools to compare, how technical to be, the structure that worked—get less weight. Not because the model “forgot” (they’re still in context), but because **newer information dominates**.

- **Mechanism:** Each new request shifts focus; earlier decisions become background.
- **What you see:** Good content gets rewritten after unrelated edits; early decisions are quietly reversed; you keep re-explaining the same constraints.

### 2. Assumption Drift: Reasonable Guesses Diverge from Intent

You said “report about personal AI employees.” The model might assume:

- Broad overview for general readers
- Blog-style, accessible format
- Future predictions are interesting

Each assumption is defensible. But you needed a **research report for technical decision-makers**: citations, evidence, specific tool comparisons. Without explicit constraints, the AI fills gaps with reasonable defaults that compound; by turn 10 you’re editing a document aimed at the wrong audience.

- **Mechanism:** Gaps are filled with plausible defaults that compound.
- **What you see:** Output addresses the topic but feels wrong; you find structural choices you didn’t ask for; fixing means understanding an approach you didn’t choose.

### 3. Pattern Violations: Output Ignores Your Standards

When you say “why does this read like a blog post?”, you’re pointing at the real issue: the model used a generic “report” pattern. Your standards are different: research reports have methodology, citations, academic structure. Without those standards in context, the AI follows **generic** best practices, which can conflict with your requirements.

- **Mechanism:** Your standards aren’t in context; the model follows general patterns.
- **What you see:** Output works but doesn’t match your standards; colleagues notice inconsistent format; “fixing” means big restructuring.

## The Compounding Problem

These three modes reinforce each other. Context loss means you stop re-stating constraints. Assumption drift fills the gaps with defaults. Pattern violations mean those defaults clash with your architecture. By turn 15 you’re not converging—you’re managing a diverging artifact.

| Turn  | Context Loss | Assumption Drift | Pattern Violations |
| ----- | ------------ | ---------------- | ------------------ |
| 1–5   | Minimal      | Beginning        | Undetected         |
| 6–10  | Noticeable   | Compounding      | Emerging           |
| 11–15 | Significant  | Structural       | Blocking           |
| 16+   | Critical     | Architectural    | Requires rewrite   |

The further you go, the harder it is to fix. That’s why vibe coding works for small tasks and fails for complex ones.

## The Context Engineering Connection

In Chapter 4 you learned that **context quality** drives agent reliability. The three vibe-coding failure modes are really **context engineering failures**:

| Failure Mode       | Context Engineering Problem                     |
| ------------------ | ----------------------------------------------- |
| Context loss       | Violates persistence (Ch 4, Lesson 7)           |
| Assumption drift   | Missing constraints in context (Ch 4, Lesson 5) |
| Pattern violations | Architecture not in working memory (Ch 4, L2)   |

Specifications address these by **front-loading** the context the agent needs instead of discovering it through iteration. The spec is the **persistent, high-signal context** you were taught to build in Chapter 4.

## The Insight: Claude Needs the Complete Picture Upfront

The fix is simple once the problem is clear. Claude can get it right on the first try if it has:

- **What exists:** Current tables, patterns, architecture
- **What to build:** Concrete requirements, not vague features
- **What NOT to build:** Explicit constraints and boundaries
- **How to validate:** Success criteria you can check

In all three failure modes, the same thing is missing: **information the agent needed but didn’t have**. Context loss happens when requirements aren’t written down. Assumption drift when constraints aren’t explicit. Pattern violations when existing architecture isn’t communicated.

**The specification captures this information once, upfront.**

| Failure Mode       | Prevented By                                     |
| ------------------ | ------------------------------------------------ |
| Context loss       | Written requirements that persist across turns   |
| Assumption drift   | Explicit constraints that remove guessing        |
| Pattern violations | Architecture documentation that defines patterns |

That’s the core of Spec-Driven Development: **front-load** the information the agent needs instead of discovering it through iteration.

---

# The Three Levels of SDD

**Source:** [The Three Levels of SDD](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development/three-levels-of-sdd)

Not all specifications are the same. Some are planning artifacts you discard after implementation. Others are living documentation that evolves with the code. At the experimental edge, some teams treat specs as the **only** artifact and regenerate code from them. Where you sit on this spectrum determines how much effort to invest.

## The Three Levels

| Level              | Creation                   | Maintenance                        | Use Case                            |
| ------------------ | -------------------------- | ---------------------------------- | ----------------------------------- |
| **Spec-First**     | Spec guides implementation | Spec discarded after               | Most common; quick tasks            |
| **Spec-Anchored**  | Spec written first         | Both spec + code maintained        | Team projects; living documentation |
| **Spec-as-Source** | Spec is primary artifact   | Only spec edited; code regenerated | Experimental (e.g. Tessl)           |

## Level 1: Spec-First (Most Common)

**You write the spec. Claude implements. You move on.**

For most tasks the spec has done its job once implementation is done. It avoided vibe coding, gave full context, and produced working code. After that the spec is history or throwaway.

### When Spec-First Works

- Single-session work you won’t revisit
- Personal projects without team coordination
- Prototypes and experiments
- Bug fixes where the spec is the fix description

### The Trade-off

- **Benefit:** No maintenance. Write once, implement once, done.
- **Cost:** Later, when you need to change the feature, there’s no spec; you infer intent from code—the same problem specs were meant to solve.

### Example: One-Time Report (Spec-First)

```markdown
# Personal AI Employees Report Specification

## Intent

One-time report on the 2026 landscape of AI tools as digital employees (Claude Code, Cowork, etc.).

## Requirements

- Executive summary for quick scanning
- Tool comparison (Claude Code, Cursor, Copilot)
- ROI analysis with concrete metrics
- Implementation risks and mitigations

## Constraints

- 2000 words max
- Audience: CTOs evaluating tools
- No speculation—only documented capabilities

## Success Criteria

- Reader can compare tools on key dimensions
- ROI section has specific cost/benefit numbers
- Risks are actionable, not vague
```

Claude writes it; you publish it; the spec is filed and rarely looked at again. That’s appropriate for a one-off deliverable.

## Level 2: Spec-Anchored (Team Standard)

**Both specification and code are maintained.**

With a team, specs become documentation. Someone joining later shouldn’t reverse-engineer methodology from the final document; they should read the spec and know how to update it.

### When Spec-Anchored Works

- Team projects with multiple contributors
- Systems that need compliance or audit documentation
- Long maintenance horizons
- Features that will be iterated many times

### The Trade-off

- **Benefit:** Specs are onboarding, ADRs, and implementation guides. When requirements change, you update the spec first, then the code, keeping them aligned.
- **Cost:** Double maintenance. Every code change may require a spec change; without discipline, spec and code drift.

### The Discipline Requirement

Spec-Anchored only works if you enforce:

1. **Spec changes before code changes.** Always.
2. **Code reviews check spec alignment.** Reviewers confirm the spec was updated.
3. **Specs live near code.** Not in a separate wiki nobody visits.

Without this, you get the worst of both: outdated specs that mislead, plus maintenance cost with little value.

### Example: The Same Report, Anchored

The one-time spec becomes a living document, updated as the landscape changes:

```
reports/
  personal-ai-employees/
    spec.md              # Living specification
    changelog.md         # History of updates
    decisions/           # Why we track these metrics
    2026-q1-report.md    # Generated from spec
```

To add a new tool: update `spec.md`, have Claude implement against it, commit spec and code together. New analysts read `spec.md` to understand methodology.

## Level 3: Spec-as-Source (Experimental)

**The spec is the primary artifact. Code is regenerated on demand.**

Companies like Tessl explore a world where you don’t edit code directly; you edit specs and AI regenerates the implementation. Code is a build artifact.

### The Appeal

If the agent can generate code reliably from specs, why maintain code? Code has bugs, refactors, and debt; specs express intent. In this model you edit the spec → AI regenerates code → tests verify → code is not manually edited.

### The Problem: Determinism

**The same spec does not yield identical code.** Implement the same spec twice and you get functionally similar but syntactically different code: different names, control flow, comments. For production this causes:

- Git diffs that are huge and hard to review
- Harder debugging (which run introduced the bug?)
- Unpredictable performance
- Third-party integrations that can break on regeneration

### The MDD Parallel

Model-Driven Development (MDD) in the 2000s promised the same: write models, generate code, don’t touch implementation. It didn’t go mainstream for similar reasons: generated code needed manual patches, models couldn’t express every concern, and the abstraction leaked. AI generation is more flexible, but **determinism is still unsolved**.

### When to Consider Spec-as-Source

- **Highly repetitive code:** CRUD, API clients, data transforms
- **Disposable code:** Scripts, one-off migrations, PoCs
- **Strong test coverage:** When tests define behavior, implementation variance matters less

For a long-lived production app, **Spec-Anchored** is usually the safer choice.

## Choosing Your Level

Default to **Spec-First**; move to **Spec-Anchored** when:

- Working with a team (2+ people)
- Maintenance horizon is 6+ months
- Compliance or documentation is required
- Features will be iterated many times

Reserve **Spec-as-Source** for:

- Personal projects with strong tests
- Well-understood, repetitive domains
- Cases where you accept regeneration variance

## The Maturity Spectrum

- **Week 1:** Spec-First. Write specs before implementation. Feel the improvement over vibe coding.
- **Month 1:** For things you’ll maintain, try Spec-Anchored. Keep specs with code; update specs when requirements change.
- **Later:** With good tests and clear trade-offs, experiment with Spec-as-Source where it fits.

You don’t have to pick one level for everything: weekend project = Spec-First; core product = Spec-Anchored; regenerated API client = Spec-as-Source.

---

# Key Prompt Patterns

| Pattern               | When to Use            | Example                                                       |
| --------------------- | ---------------------- | ------------------------------------------------------------- |
| **Parallel Research** | Starting investigation | "Spin up multiple subagents for your research task"           |
| **Spec-First**        | Force written artifact | "Your goal is to write a report/document"                     |
| **Interview**         | Surface ambiguities    | "Use ask_user_question tool before we implement"              |
| **Task Delegation**   | Complex implementation | "Use the task tool, each task by subagent, commit after each" |
| **Constitution**      | Setting up a project   | "Write a CLAUDE.md constitution for my [project type]"        |
| **Role Assignment**   | Set expectations       | "You are the main agent and your subagents are your devs"     |

Remember: **General Agents BUILD Custom Agents.** SDD is how you orchestrate complex projects with Claude Code to get production-quality systems.

---

# Additional Resources

- [Chapter 5: Spec-Driven Development](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development)
- [Why Specs Beat Vibe Coding](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development/why-specs-beat-vibe-coding)
- [The Three Levels of SDD](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development/three-levels-of-sdd)
- [AI Agent Factory Book](https://agentfactory.panaversity.org/)

---

_Class notes compiled from [The AI Agent Factory](https://agentfactory.panaversity.org/) — Chapter 5: Spec-Driven Development with Claude Code (updated Mar 9, 2026)._
