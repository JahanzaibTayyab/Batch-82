# Class 08 - Markdown & Claude Code Fundamentals

**Date:** February 15, 2026
**Course:** AI-101 - Fundamentals of AI-Driven and Spec-Driven Development
**Reference:** [The AI Agent Factory](https://agentfactory.panaversity.org/)
**Lecture Recording:** [Watch on YouTube](https://youtu.be/hRz2eV5wnhk)

---

## Table of Contents

1. [Chapter 2: Markdown - Writing Instructions](#chapter-2-markdown---writing-instructions)
2. [Chapter 3: Working with General Agents - Claude Code](#chapter-3-working-with-general-agents---claude-code)

---

# Chapter 2: Markdown - Writing Instructions

**Book Reference:** [Markdown Writing Instructions](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/markdown-writing-instructions)

Markdown is **the specification language that lets you tell AI agents what to build**. It's foundational to AI-native development, enabling clear communication between humans and AI systems.

## Why Markdown Matters for AI Communication?

Markdown serves as the **Intent Layer** - the bridge between human intentions and AI execution. It provides:

- **Universal Readability**: Both humans and AI can parse markdown easily
- **Structured Communication**: Clear hierarchy and organization
- **Platform Independence**: Works everywhere (GitHub, docs, chat, IDEs)
- **Version Control Friendly**: Plain text that diffs cleanly

### Key Principle
> "Collaboration with AI, not memorization" - Focus on writing parseable specifications that agents can implement, not memorizing syntax.

---

## Headings - Creating Document Hierarchy

Headings structure your specifications so AI agents can parse them effectively. Use hash symbols (`#`) to create different levels.

### Syntax

```markdown
# H1 - Main Title (Document Level)
## H2 - Major Section
### H3 - Subsection
#### H4 - Sub-subsection
##### H5 - Minor heading
###### H6 - Smallest heading
```

### Best Practices for AI Specifications

1. **Use H1 for project/document name** - Only one per document
2. **Use H2 for major sections** - Installation, Features, API
3. **Use H3 for subsections** - Individual feature descriptions
4. **Maintain hierarchy** - Don't skip levels (H1 → H3)

### Example: Project Documentation Structure

```markdown
# Project Documentation

## Installation Guide
Instructions for setting up the project.

### Step 1: Install Dependencies
Run npm install to get started.

### Step 2: Configure Settings
Edit the config.json file.

## User Guide
How to use the application.
```

---

## Lists - Organizing Ideas

Lists help organize features, requirements, and sequential steps for AI agents to process.

### Unordered Lists (Bullet Points)

Use `-`, `*`, or `+` for bullet points:

```markdown
- Feature A
- Feature B
- Feature C
* Alternative bullet
```

### Ordered Lists (Numbered)

Use numbers followed by a period:

```markdown
1. First step
2. Second step
3. Third step
```

### Nested Lists

Indent with 4 spaces or a tab to create hierarchy:

```markdown
- Level 1
    - Level 2
        - Level 3
            - Level 4
```

### Text Formatting in Lists

```markdown
- **Bold** text for emphasis
- *Italic* text for subtle emphasis
- `Inline code` for technical terms
- ~~Strikethrough~~ for removed items
```

---

## Code Blocks - Showing Examples

Code blocks demonstrate syntax clearly to AI agents with language-specific highlighting.

### Inline Code

Use single backticks for inline code:

```markdown
Use `npm install` to install dependencies.
Set the variable with `let a = 2`
```

### Fenced Code Blocks

Use triple backticks with optional language identifier:

````markdown
```python
def hello():
    print("Hello, World!")
```
````

### Supported Languages

Specify the language after the opening backticks:

| Language | Identifier |
|----------|------------|
| JavaScript | `javascript` or `js` |
| TypeScript | `typescript` or `ts` |
| Python | `python` |
| Bash/Shell | `bash` or `shell` |
| JSON | `json` |
| HTML | `html` |
| CSS | `css` |
| Markdown | `markdown` or `md` |

### Examples

**JavaScript:**
```javascript
const greet = (name) => {
  console.log(`Hello, ${name}!`)
}
```

**Bash:**
```bash
npm install
npm run dev
```

**JSON:**
```json
{
  "name": "my-project",
  "version": "1.0.0"
}
```

---

## Links and Images

### Links

**Basic Link Syntax:**
```markdown
[Display Text](URL)
```

**Examples:**
```markdown
[Panaversity](https://panaversity.org/)
[AI Agent Factory](https://agentfactory.panaversity.org/)
```

**Raw URL (Auto-linked):**
```markdown
https://panaversity.org/
```

### Images

**Basic Image Syntax:**
```markdown
![Alt Text](image-url)
```

**Examples:**
```markdown
![Project Logo](./images/logo.png)
![Screenshot](./Screenshot%202026-02-15%20at%2011.09.53%20AM.png)
```

**Image with Link:**
```markdown
[![Alt Text](image-url)](link-url)
```

---

## Chapter 2: Markdown - Writing Instructions Quiz

Test your understanding of Markdown fundamentals:

1. **What symbol creates headings in Markdown?**
   - Answer: `#` (hash symbol)

2. **How many H1 headings should a document have?**
   - Answer: Only one (for the main title)

3. **What's the difference between `-` and `1.` in lists?**
   - Answer: `-` creates unordered (bullet) lists, `1.` creates ordered (numbered) lists

4. **How do you create inline code?**
   - Answer: Use single backticks: `` `code` ``

5. **What's the syntax for a fenced code block with Python?**
   - Answer: Three backticks followed by `python`, code, then three closing backticks

6. **How do you create a link?**
   - Answer: `[Text](URL)`

7. **How do you add an image?**
   - Answer: `![Alt text](image-path)`

---

# Chapter 3: Working with General Agents - Claude Code

**Book Reference:** [General Agents](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents)

## What is a General Agent?

> A General Agent is "An AI that observes, orients, decides, and acts—the OODA loop—executing actions rather than just generating text."

Claude Code is Anthropic's agentic AI system that can:
- Reason through problems
- Make plans
- Take action across domains
- Execute file operations
- Run commands
- Build software

---

## Claude Code Origin Story

Claude Code emerged from Anthropic's vision of creating AI tools that don't just answer questions but actively assist with real work. Key milestones:

- **Initial Concept**: AI that can interact with your codebase directly
- **CLI-First Design**: Terminal-based for maximum flexibility
- **Tool Integration**: Read, write, edit files; run commands; search code
- **Agentic Capabilities**: Multi-step reasoning and autonomous task completion

Claude Code represents a shift from **chat-based AI** to **action-oriented AI agents**.

---

## Installing and Authenticating Claude Code

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install globally via npm
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Authentication

```bash
# Start Claude and authenticate
claude

# You'll be prompted to:
# 1. Create an Anthropic account (or log in)
# 2. Choose a plan (Pro or API-based)
# 3. Enter API key if using API billing
```

### Authentication Methods

| Method | Description |
|--------|-------------|
| **Claude Pro** | $20/month subscription with usage limits |
| **API Key** | Pay-per-use with Anthropic API credits |
| **Free Tier** | Limited free usage for evaluation |

---

## Free Claude Code Setup

For users wanting free or low-cost options:

### Option 1: Anthropic Free Tier
- Limited messages per day
- Good for learning and exploration

### Option 2: Alternative Providers
Configure alternative API providers in `~/.claude.json`:

```json
{
  "apiProvider": "openrouter",
  "apiKey": "your-openrouter-key"
}
```

### Option 3: Local Models (Advanced)
Use local LLM providers with compatible APIs.

---

## Hello Claude: Your First Conversation

### Starting a Session

```bash
# Start Claude in current directory
claude

# Start with a specific prompt
claude "explain this codebase"

# Resume last session
claude --resume
```

### First Interaction

```
You: Hello Claude, what can you do?

Claude: I can help you with software engineering tasks:
- Read and understand your codebase
- Write and edit code files
- Run terminal commands
- Debug issues
- Explain code logic
- Refactor and improve code
```

### Basic Commands

| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/clear` | Clear conversation history |
| `/compact` | Compress context |
| `/cost` | Show session cost |
| `Ctrl+C` | Cancel current operation |

---

## CLAUDE.md Context Files

CLAUDE.md files provide persistent instructions that Claude reads automatically.

### File Locations

| Location | Scope | Purpose |
|----------|-------|---------|
| `./CLAUDE.md` | Project | Project-specific instructions |
| `~/.claude/CLAUDE.md` | Global | User preferences across all projects |
| `~/.claude/rules/*.md` | Global | Organized rule files |

### Example CLAUDE.md

```markdown
# CLAUDE.md

## Project Overview
This is a Next.js e-commerce application.

## Coding Standards
- Use TypeScript strict mode
- Follow functional programming patterns
- Test all new features with Jest

## Commands
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run build` - Production build

## File Structure
- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/lib` - Utility functions
```

### Best Practices

1. **Keep it focused** - Only essential information
2. **Update regularly** - Reflect current project state
3. **Be specific** - Include actual commands and paths
4. **Version control it** - Commit with your project

---

## Practical Problem-Solving Exercises

### Exercise 1: File Exploration
```
Prompt: "What files are in this project and what do they do?"
```

### Exercise 2: Bug Investigation
```
Prompt: "I'm getting an error in login.ts on line 45. Help me debug it."
```

### Exercise 3: Feature Implementation
```
Prompt: "Add a dark mode toggle to the header component."
```

### Exercise 4: Code Review
```
Prompt: "Review my latest changes and suggest improvements."
```

### Exercise 5: Documentation
```
Prompt: "Generate API documentation for the user service."
```

---

## Teach Claude Your Way of Working

Claude learns from your instructions. Customize behavior through:

### 1. CLAUDE.md Rules
Define coding standards, preferences, and project context.

### 2. Custom Agents
Create `.md` files in `~/.claude/agents/` with specific expertise.

### 3. Settings Configuration
Edit `~/.claude/settings.json` for behavior preferences:

```json
{
  "theme": "dark",
  "autoCompact": true,
  "confirmDestructive": true
}
```

### 4. Hooks
Automate actions with pre/post hooks:
- **PreToolUse**: Validate before tool execution
- **PostToolUse**: Auto-format after edits
- **Stop**: Final checks when session ends

---

## The Concept Behind Skills

Skills are **user-invocable capabilities** that extend Claude's functionality.

### Key Differences: Agents vs Skills

| Aspect | Agent | Skill |
|--------|-------|-------|
| **Invocation** | Claude decides automatically | User invokes with `/skill-name` |
| **Purpose** | Complex task delegation | Predefined workflows |
| **Location** | `~/.claude/agents/` | `~/.claude/skills/` |
| **Trigger** | Context-based | Explicit command |

### Built-in Skills

- `/help` - Show help information
- `/clear` - Clear conversation
- `/compact` - Compress context
- `/commit` - Create git commit

### Custom Skills

User-created skills for:
- Project-specific workflows
- Code generation templates
- Testing pipelines
- Deployment automation

---

## Building Your Own Skills

### Skill File Structure

```
~/.claude/skills/my-skill/
├── SKILL.md          # Required: Instructions + YAML frontmatter
├── scripts/          # Optional: Executable code
├── references/       # Optional: Documentation
└── assets/           # Optional: Templates
```

### SKILL.md Format

```markdown
---
name: my-skill
description: What this skill does
invocation: /my-skill
tools: Read, Write, Bash
---

# My Skill Instructions

## When to Use
Use this skill when...

## Steps
1. First, do this
2. Then, do that
3. Finally, verify

## Examples
User: /my-skill create login page
Action: Generate a login page component
```

### Example: Test Runner Skill

```markdown
---
name: test-runner
description: Run project tests with coverage
invocation: /test
tools: Bash, Read
---

# Test Runner

1. Detect test framework (Jest, Vitest, pytest)
2. Run tests with coverage
3. Report failures clearly
4. Suggest fixes for failing tests
```

---

## Agent Skills Exercises

### Exercise 1: Create a Commit Skill
Build a skill that creates standardized git commits.

### Exercise 2: Create a Review Skill
Build a skill that reviews code for common issues.

### Exercise 3: Create a Deploy Skill
Build a skill that handles deployment workflows.

### Exercise 4: Create a Doc Generator
Build a skill that generates documentation from code.

---

## Subagents and Orchestration

### What are Subagents?

Subagents are **specialized agents** that Claude spawns to handle complex tasks.

### Types of Subagents

| Agent Type | Purpose | Tools |
|------------|---------|-------|
| `Explore` | Codebase exploration | Read, Grep, Glob |
| `Bash` | Command execution | Bash |
| `Plan` | Implementation planning | All read tools |
| `code-reviewer` | Code quality | Read, Grep, Glob |
| `security-reviewer` | Security analysis | Read, Write, Bash |

### Using Subagents

```markdown
# Claude automatically delegates:
"Review all authentication code for security issues"
→ Spawns security-reviewer agent

"Search the codebase for all API endpoints"
→ Spawns Explore agent
```

### Orchestration Patterns

1. **Parallel Execution**: Multiple independent agents simultaneously
2. **Sequential Pipeline**: Output of one feeds into next
3. **Hierarchical**: Main agent coordinates specialized sub-agents

### Example: Multi-Agent Workflow

```markdown
Task: "Implement user authentication"

Orchestration:
1. Explore agent → Understand existing auth patterns
2. Plan agent → Design implementation approach
3. Code agent → Write the implementation
4. Test agent → Create and run tests
5. Review agent → Check for issues
```

---

## Summary

### Chapter 2 Takeaways
- Markdown is the specification language for AI communication
- Master headings, lists, code blocks, links, and images
- Structure documents for AI parseability
- Focus on collaboration, not memorization

### Chapter 3 Takeaways
- Claude Code is an agentic AI that takes action
- CLAUDE.md provides persistent project context
- Skills extend functionality with custom workflows
- Agents and subagents handle specialized tasks
- Orchestration enables complex multi-step automation

---

## Additional Resources

- [AI Agent Factory Book](https://agentfactory.panaversity.org/)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Panaversity](https://panaversity.org/)

---

## Class Exercises

### Markdown Practice
Create a `README.md` for a project with:
- Project title and description
- Installation steps (numbered list)
- Features (bullet list)
- Code example with syntax highlighting
- Links to documentation

### Claude Code Practice
1. Start a Claude session in your project
2. Create a `CLAUDE.md` file with project instructions
3. Ask Claude to explain your codebase
4. Have Claude create a new feature
5. Use the `/commit` skill to commit changes

---

---

# Assignments

## Assignment 1: Practical Problem-Solving Exercises

**Reference:** [Basics Exercises](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/basics-exercises)

This module contains **27 exercises** organized into **8 modules** plus **3 capstone projects**. Focus on problem decomposition, specification writing, and quality verification.

### Core Framework: Problem-Solving Cycle

1. **Define** the problem and success criteria
2. **Gather** required context and files
3. **Write** the specification
4. **Execute** with Claude
5. **Verify** against requirements
6. **Iterate** based on findings
7. **Reflect** on communication clarity

### Required Exercises

#### Module 1: File Organization & Digital Housekeeping

**Exercise 1.1 — The Messy Downloads Folder**
- **Objective:** Transform chaotic file collections into logical structures
- **Task:** Create unambiguous instructions for Claude to organize mixed-type files
- **Learning:** Vague instructions produce unpredictable results; specificity correlates with quality

**Exercise 1.2 — Photo Album Builder**
- **Objective:** Handle multi-step image management tasks
- **Tasks:** Sort by orientation, identify duplicates, generate HTML gallery, produce summary
- **Experiment:** Compare outcome-focused vs. step-by-step instructions

#### Module 2: Research & Information Synthesis

**Exercise 2.1 — The Comparison Matrix**
- **Objective:** Structure comparative analysis with consistent criteria
- **Tasks:** Research 3-4 options, create comparison table, write recommendation memo
- **Key:** Define 5-7 comparison factors *before* Claude begins researching

**Exercise 2.2 — The Literature Review**
- **Objective:** Transform raw information into synthesized knowledge
- **Deliverables:** Executive summary, key findings, consensus vs. debate areas, unknown areas, citations

#### Module 3: Data Wrangling & Analysis

**Exercise 3.1 — The Messy Spreadsheet**
- **Objective:** Establish data quality standards
- **Tasks:** Standardize dates, clean names, remove duplicates, flag missing values
- **Critical Practice:** Require Claude to "show me the plan before executing changes"

### Assessment Rubric

| Criteria | Beginner (1) | Developing (2) | Proficient (3) | Advanced (4) |
|----------|--------------|----------------|----------------|--------------|
| **Problem Clarity** | Used starter prompt unchanged | Added some specifics | Defined clear success criteria | Anticipated edge cases |
| **Specification Quality** | Vague, single-sentence | Multiple requirements listed | Structured, unambiguous | Reusable, parameterized |
| **Output Verification** | Accepted first result | Checked surface appearance | Verified against requirements | Tested edge cases, refined |
| **Iteration** | Single attempt | One revision | Multiple refinements | Systematic approach developed |

---

## Assignment 2: Agent Skills Exercises

**Reference:** [Skills Exercises](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/skills-exercises)

This module contains **24 exercises** across **8 modules** for building production-ready Claude Code skills.

### Core Framework: 6-Step Skill Development Cycle

1. **DEFINE** — Identify the problem and success criteria
2. **DRAFT** — Create initial SKILL.md with structure
3. **TEST** — Run against 2-3 normal cases
4. **EVALUATE** — Score output against rubric
5. **IMPROVE** — Add examples, rules, refinements
6. **REPEAT** — Iterate until consistent quality

### Required Exercises

#### Module 1: Understanding Skills

**Exercise 1.1 — Anatomy of a Skill**
- Dissect sample skills
- Identify five components
- Predict outputs before running

**Exercise 1.2 — When to Build a Skill**
- Classify 15 scenarios using four criteria:
  - Repeatable task
  - Consistent output needed
  - Clear rules exist
  - Background context required

**Exercise 1.3 — Skill vs. Raw Prompt**
- Compare prompted vs. skilled output
- Measure improvement using rubric

#### Module 2: Your First Skills

**Exercise 2.1 — Email Style Guide**
- Analyze 5 personal emails
- Extract voice patterns
- Create matching skill

**Exercise 2.2 — File Organization Skill**
- Define folder structure rules
- Handle edge cases (duplicates, special characters)

**Exercise 2.3 — Data Cleaning Skill**
- Build CSV cleaning skill
- Include date/name/phone transformations
- Add preview mode

#### Module 3: Skills with Examples

**Exercise 3.1 — Report Formatter**
- Compare rules-only vs. example-rich versions
- Measure improvement quantitatively

**Exercise 3.2 — Meeting Minutes Skill**
- Build multi-file skill with template and examples
- Add Slack summary output format

### Skill File Structure Reminder

```
~/.claude/skills/my-skill/
├── SKILL.md          # Required: Instructions + YAML frontmatter
├── scripts/          # Optional: Executable code
├── references/       # Optional: Documentation
└── assets/           # Optional: Templates
```

### Self-Assessment Rubric (24-point scale)

| Criteria | Points |
|----------|--------|
| Trigger description clarity | 0-4 |
| Instructions completeness | 0-4 |
| Examples quality | 0-4 |
| Edge case handling | 0-4 |
| Testing thoroughness | 0-4 |
| Iteration evidence | 0-4 |

**Score 18+ = Production-ready skill**

---

## Assignment Submission

1. Complete at least **3 exercises** from Assignment 1
2. Complete at least **3 exercises** from Assignment 2
3. Document your learnings and reflections
4. Create at least **1 custom skill** and share the SKILL.md file

---

*Class notes compiled from [The AI Agent Factory](https://agentfactory.panaversity.org/) - Chapters 2 & 3*
