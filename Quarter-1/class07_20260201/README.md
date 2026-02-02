# Class Update – 1st February 2026

## Today's Lecture Recording

_Recording link will be added after class_

## Today's Class Topics

- Understanding Sub-Agents and Agent Orchestration
- How to Build Custom Skills for Claude Code
- Agents vs Skills: When to Use Which
- YAML Configuration for Agents (tools, model, skills)
- Preloading Skills into Agents
- Prompt Engineering Fundamentals
- Hands-On: Creating Your First Agent and Skill

## Reference Links

- **Agent Skills Guide:** [How to Build Your Own Skills](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/agent-skills)
- **Subagents & Orchestration:** [Subagents and Orchestration](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/subagents-and-orchestration)
- **Prompt Engineering:** [Complete Prompt Engineering Guide](https://github.com/panaversity/learn-low-code-agentic-ai/tree/main/00_prompt_engineering)
- **Agent Factory Textbook:** [agentfactory.panaversity.org](https://agentfactory.panaversity.org)

---

# Claude Code CLI: Agents & Skills Guide

A beginner-friendly guide to extending Claude Code with custom agents and skills.

---

## What is Claude Code?

Claude Code is an AI coding assistant that runs in your terminal. You chat with it, and it helps you write code, fix bugs, and build projects.

But here's the cool part: **you can teach Claude Code new tricks** by creating:
- **Agents** (sub-agents)
- **Skills** (slash commands)

---

## Part 1: Understanding Agents (Sub-Agents)

### What is an Agent?

Think of an agent as a **specialist helper**.

When you ask Claude Code something complex, it can call a specialist agent to handle that specific task. These specialists are called **sub-agents** because they work under the main Claude.

### Real-World Analogy

Imagine you're a manager (Claude Code). When someone asks you to:
- Review code → You call your **Code Review Specialist**
- Fix a bug → You call your **Bug Fixing Expert**
- Check security → You call your **Security Analyst**

Each specialist (agent) knows exactly what to do for their specific job.

### Why Use Agents?

| Without Agents | With Agents |
|----------------|-------------|
| You explain the same thing every time | Agent already knows what to do |
| Inconsistent results | Same quality every time |
| Generic responses | Specialized expertise |

### How Agents Work

```
You: "Review my code"
     ↓
Claude Code: "I'll call my code-reviewer agent"
     ↓
Code Reviewer Agent: Does the review, returns results
     ↓
Claude Code: Shows you the review
```

---

## Part 2: Understanding Skills

### What is a Skill?

A skill is a **slash command** you can type to trigger a specific action.

Example:
```
/commit      → Creates a git commit
/tdd         → Starts test-driven development
/my-skill    → Runs your custom skill
```

### Real-World Analogy

Skills are like **shortcuts on your phone**. Instead of opening an app, navigating menus, and clicking buttons, you just tap one shortcut.

---

## Part 3: Agents vs Skills - What's the Difference?

| Feature | Agents (Sub-Agents) | Skills (Slash Commands) |
|---------|---------------------|------------------------|
| **How to use** | Claude calls them automatically | You type `/skill-name` |
| **Who decides when to use** | Claude decides | You decide |
| **Best for** | Complex multi-step tasks | Quick actions you repeat often |
| **Example** | Code review, security analysis | `/commit`, `/tdd` |

### Simple Rule

- **Agent** = Claude's specialist helper (automatic)
- **Skill** = Your shortcut command (manual)

---

## Part 4: Creating Agents with /agents Command

The easiest way to create agents is using the `/agents` command.

### Step 1: Open the Agents Editor

In Claude Code, type:

```
/agents
```

This opens the agents configuration.

### Step 2: Create a New Agent

You'll create a markdown file with two parts:

**Part A: Configuration (YAML header)**
```yaml
---
name: my-agent-name
description: What this agent does
tools: Read, Grep, Glob, Bash
model: sonnet
---
```

**Part B: Instructions**
```markdown
You are a specialist for [specific task].

## What To Do

1. First step
2. Second step
3. Third step

## Rules

- Rule 1
- Rule 2
```

### Step 3: Save and Use

After saving, Claude Code will automatically use your agent when needed.

---

## Part 5: Agent Configuration Explained

### The YAML Header (All Fields)

```yaml
---
name: code-reviewer
description: Reviews code for bugs and quality issues
tools: Read, Grep, Glob, Bash
model: sonnet
skills:
  - coding-standards
  - security-patterns
---
```

### Complete Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique identifier (lowercase, hyphens) |
| `description` | Yes | When Claude should use this agent |
| `tools` | No | What tools the agent can use |
| `model` | No | Which AI model to use |
| `skills` | No | Skills to preload into agent |

---

### Field Details

**name** - The agent's identifier
- Use lowercase letters and hyphens
- Example: `code-reviewer`, `bug-fixer`, `tdd-guide`

**description** - When to use this agent
- Claude reads this to decide when to call the agent
- Be specific! "Reviews code" is better than "Helps with stuff"

**tools** - What the agent can do

| Tool | What It Does |
|------|--------------|
| `Read` | Read files |
| `Write` | Create new files |
| `Edit` | Change existing files |
| `Bash` | Run terminal commands |
| `Grep` | Search inside files |
| `Glob` | Find files by name pattern |

**model** - Which AI brain to use

| Model | Speed | Smarts | Cost | Best For |
|-------|-------|--------|------|----------|
| `haiku` | Fast | Good | $ | Simple tasks |
| `sonnet` | Medium | Great | $$ | Most coding |
| `opus` | Slow | Best | $$$ | Complex reasoning |

**skills** - Preload knowledge into the agent

This is powerful! You can give your agent pre-loaded knowledge from skills.

```yaml
skills:
  - coding-standards      # Your coding rules
  - security-patterns     # Security best practices
  - api-conventions       # API design guidelines
```

**Why use skills in agents?**
- Agent gets specialized knowledge at startup
- No need to repeat instructions
- Consistent behavior across sessions

**Example:** An API developer agent with preloaded skills:

```yaml
---
name: api-developer
description: Creates API endpoints following team conventions
tools: Read, Edit, Write, Bash
model: sonnet
skills:
  - api-conventions
  - error-handling
  - database-patterns
---

Build APIs using the patterns from your preloaded skills.
```

---

## Part 6: Example Agents

### Example 1: Code Reviewer (Basic)

```markdown
---
name: code-reviewer
description: Reviews code for bugs, quality, and best practices. Use after writing code.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a code reviewer.

## Your Job

1. Run `git diff` to see what changed
2. Read the changed files
3. Find problems

## Look For

- Bugs and errors
- Confusing code
- Missing error handling
- Security issues
- Code that repeats itself

## How To Report

For each problem:
- **File**: Where is it?
- **Problem**: What's wrong?
- **Fix**: How to fix it?

Rate each issue:
- 🔴 CRITICAL - Must fix now
- 🟡 WARNING - Should fix
- 🟢 SUGGESTION - Nice to have
```

### Example 2: Code Reviewer (With Skills)

Same agent, but with preloaded skills for consistent standards:

```markdown
---
name: code-reviewer-pro
description: Reviews code using team coding standards and security guidelines.
tools: Read, Grep, Glob, Bash
model: sonnet
skills:
  - coding-standards
  - security-review
---

You are a senior code reviewer.

Review code using the preloaded skills:
- Use `coding-standards` for style and quality checks
- Use `security-review` for vulnerability detection

## Process

1. Run `git diff` to see changes
2. Apply coding-standards rules
3. Run security-review checks
4. Report findings by priority
```

### Example 3: Bug Fixer

```markdown
---
name: bug-fixer
description: Finds and fixes bugs with minimal code changes.
tools: Read, Edit, Bash, Grep, Glob
model: sonnet
---

You fix bugs quickly and cleanly.

## Your Process

1. Understand what's broken
2. Find where the bug is
3. Fix it with the smallest change possible
4. Test that it works

## Rules

- Change as little code as possible
- Don't "improve" other code while you're there
- Explain what caused the bug
- Add a test so the bug doesn't come back
```

### Example 4: Security Checker

```markdown
---
name: security-checker
description: Checks code for security vulnerabilities before commits.
tools: Read, Grep, Glob
model: opus
---

You are a security expert.

## Check For These Issues

### 🔴 Critical

- Hardcoded passwords or API keys
- SQL injection (user input in database queries)
- Storing passwords without encryption

### 🟡 Warning

- Missing input validation
- Sensitive data in error messages
- Missing authentication checks

## Example Problems

BAD - Hardcoded secret:
\`\`\`javascript
const apiKey = "sk-12345"  // DANGER!
\`\`\`

GOOD - Use environment variable:
\`\`\`javascript
const apiKey = process.env.API_KEY
\`\`\`
```

### Example 5: API Developer (With Multiple Skills)

```markdown
---
name: api-developer
description: Creates REST API endpoints following team patterns.
tools: Read, Edit, Write, Bash, Grep
model: sonnet
skills:
  - api-conventions
  - error-handling-patterns
  - database-patterns
---

You are an API developer.

When creating endpoints:
1. Follow api-conventions for route naming
2. Use error-handling-patterns for responses
3. Apply database-patterns for queries

Always include:
- Input validation
- Error handling
- Response formatting
```

---

## Part 7: How Agents and Skills Work Together

### The Relationship

```
Skills = Knowledge files (your coding standards, patterns, guidelines)
Agents = Specialists that USE those skills

Skills + Agents = Powerful, consistent automation
```

### Visual Diagram

```
┌─────────────────────────────────────────────┐
│              YOUR SKILLS                     │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │ coding-      │  │ security-            │ │
│  │ standards    │  │ patterns             │ │
│  └──────────────┘  └──────────────────────┘ │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │ api-         │  │ error-handling       │ │
│  │ conventions  │  │                      │ │
│  └──────────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────┘
                      │
                      ▼ (preloaded via skills: field)
┌─────────────────────────────────────────────┐
│              YOUR AGENTS                     │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │ code-        │  │ api-                 │ │
│  │ reviewer     │  │ developer            │ │
│  │              │  │                      │ │
│  │ Uses:        │  │ Uses:                │ │
│  │ - coding-    │  │ - api-conventions    │ │
│  │   standards  │  │ - error-handling     │ │
│  │ - security-  │  │                      │ │
│  │   patterns   │  │                      │ │
│  └──────────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Why This Matters

**Without skills in agents:**
- Each agent needs all instructions written inside it
- Instructions get duplicated across agents
- Hard to maintain consistency

**With skills in agents:**
- Write standards once in a skill
- Multiple agents can use the same skill
- Update the skill = all agents get the update

### Example: Share Coding Standards

**Step 1:** Create a skill with your coding standards

```
~/.claude/skills/coding-standards/SKILL.md
```

```markdown
---
name: coding-standards
description: Team coding standards and conventions
---

# Coding Standards

## Naming
- Variables: camelCase
- Functions: camelCase
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE

## Files
- Max 400 lines per file
- One component per file

## Functions
- Max 50 lines per function
- Single responsibility
```

**Step 2:** Use that skill in multiple agents

```yaml
# code-reviewer agent
skills:
  - coding-standards

# bug-fixer agent
skills:
  - coding-standards

# api-developer agent
skills:
  - coding-standards
  - api-conventions
```

Now all your agents follow the same standards!

---

## Part 8: Creating Skills (Slash Commands)

Skills let you create your own `/commands`.

### Using /skills Command

Type in Claude Code:

```
/skills
```

This opens the skills configuration.

### Skill File Structure

Skills live in folders with a `SKILL.md` file:

```
~/.claude/skills/
└── my-skill/
    └── SKILL.md
```

### Skill Template

```markdown
---
name: my-skill
description: What this skill does when you type /my-skill
---

# My Skill

What should happen when someone types /my-skill

## Steps

1. Do this first
2. Then do this
3. Finally do this
```

### Example: Daily Standup Skill

```markdown
---
name: standup
description: Generates a daily standup summary from git history
---

# Daily Standup Generator

When invoked, create a standup summary.

## Steps

1. Run `git log --since="yesterday"` to see recent commits
2. Summarize what was done
3. Format as:
   - **Yesterday**: What I completed
   - **Today**: What I'm working on
   - **Blockers**: Any issues

## Output Format

Keep it short - 3-5 bullet points max.
```

Now you can type `/standup` anytime!

---

## Part 9: Common Slash Commands

These commands are built into Claude Code:

### Navigation & Control

| Command | What It Does |
|---------|--------------|
| `/help` | Show all commands |
| `/clear` | Clear chat history |
| `/quit` | Exit Claude Code |

### Context Management

| Command | What It Does |
|---------|--------------|
| `/compact` | Summarize conversation (saves memory) |
| `/cost` | Show how many tokens you've used |

### Git Commands

| Command | What It Does |
|---------|--------------|
| `/commit` | Create a commit with AI-generated message |
| `/pr` | Create a pull request |

### Development

| Command | What It Does |
|---------|--------------|
| `/plan` | Plan before coding (for complex tasks) |
| `/tdd` | Test-driven development mode |

### Configuration

| Command | What It Does |
|---------|--------------|
| `/agents` | Manage your agents |
| `/skills` | Manage your skills |

---

## Part 10: Where Files Live

```
~/.claude/
├── agents/              ← Your agent files go here
│   ├── code-reviewer.md
│   ├── bug-fixer.md
│   └── security-checker.md
│
├── skills/              ← Your skill folders go here
│   ├── standup/
│   │   └── SKILL.md
│   └── my-skill/
│       └── SKILL.md
│
└── settings.json        ← Global settings
```

The `~` means your home folder:
- Mac/Linux: `/Users/yourname/.claude/`
- Windows: `C:\Users\yourname\.claude\`

---

## Part 11: Quick Start Checklist

### Create Your First Agent

1. Type `/agents` in Claude Code
2. Create a new agent file
3. Add the YAML header (name, description, tools, model)
4. Write the instructions
5. Save it

### Create Your First Skill

1. Type `/skills` in Claude Code
2. Create a new skill folder
3. Add `SKILL.md` inside
4. Write the YAML header and instructions
5. Save it
6. Use it with `/your-skill-name`

---

## Part 12: Troubleshooting

### "My agent isn't working"

1. Check the YAML header has `---` at start AND end
2. Make sure `name` matches the filename
3. Restart Claude Code

### "My skill command doesn't exist"

1. Check folder structure: `~/.claude/skills/skill-name/SKILL.md`
2. File must be named exactly `SKILL.md` (capital letters!)
3. Restart Claude Code

### "YAML error"

If your description has colons or quotes, wrap it in quotes:

```yaml
# Wrong
description: This: won't work

# Right
description: "This: will work"
```

---

## Summary

| Concept | What Is It | How To Create | How To Use |
|---------|------------|---------------|------------|
| **Agent** | Specialist helper | `/agents` | Claude calls it automatically |
| **Skill** | Slash command | `/skills` | Type `/skill-name` |

**Start simple**: Create one agent that does one thing well. Then add more as you need them.

---

## Practice Exercises

1. **Create a "readme-writer" agent** that generates README files for projects

2. **Create a "test-writer" agent** that writes unit tests for functions

3. **Create a "/morning" skill** that shows your git status and today's tasks

---

## Need Help?

- Type `/help` in Claude Code
- Report issues: https://github.com/anthropics/claude-code/issues

---

## Key Takeaways

- **Sub-Agents** are specialist helpers that Claude calls automatically for complex tasks
- **Skills** are slash commands you invoke manually (`/skill-name`)
- **Skills can be preloaded into Agents** using the `skills:` field in YAML
- **Write once, use everywhere** - Create skills with your standards, share across multiple agents
- **Use `/agents`** to create and manage your agents
- **Use `/skills`** to create and manage your skills
- **Prompt Engineering** is the foundation - master it before building complex agents

---

_Class Date: February 1, 2026_
