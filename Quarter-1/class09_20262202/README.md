# Class 09 - Agent Teams, MCP Integration & Settings Hierarchy

**Date:** February 22, 2026
**Course:** AI-101 - Fundamentals of AI-Driven and Spec-Driven Development
**Reference:** [The AI Agent Factory](https://agentfactory.panaversity.org/)
**Skills Lab:** [Claude Code Skills Lab](https://github.com/panaversity/claude-code-skills-lab/tree/main)
**Lecture Recordings:** [Part 1 - Watch on YouTube](https://youtu.be/jamUv5EldOE) | [Part 2 - Watch on YouTube](https://youtu.be/Bp4_n2OiQCM)

---

## Table of Contents

1. [Agent Teams - Orchestrating Multiple Claude Code Sessions](#agent-teams---orchestrating-multiple-claude-code-sessions)
2. [MCP Integration - Connecting Claude to External Systems](#mcp-integration---connecting-claude-to-external-systems)
3. [Compiling MCP to Skills - Token Optimization](#compiling-mcp-to-skills---token-optimization)
4. [Settings Hierarchy - Configuration Management](#settings-hierarchy---configuration-management)

---

# Agent Teams - Orchestrating Multiple Claude Code Sessions

**Reference:** [Agent Teams Documentation](https://code.claude.com/docs/en/agent-teams)

Agent Teams let you coordinate **multiple Claude Code instances** working together. One session acts as the **team lead**, coordinating work, assigning tasks, and synthesizing results. Teammates work independently, each in its own context window, and communicate directly with each other.

## Agent Teams vs Subagents

Understanding the difference is critical for choosing the right approach:

| Feature | Subagents | Agent Teams |
|---------|-----------|-------------|
| **Context** | Own context window; results return to the caller | Own context window; fully independent |
| **Communication** | Report results back to the main agent only | Teammates message each other directly |
| **Coordination** | Main agent manages all work | Shared task list with self-coordination |
| **Best for** | Focused tasks where only the result matters | Complex work requiring discussion and collaboration |
| **Token cost** | Lower: results summarized back to main context | Higher: each teammate is a separate Claude instance |

**Simple Rule:**
- **Subagents** = Quick, focused workers that report back
- **Agent Teams** = Collaborative teammates that coordinate on their own

---

## When to Use Agent Teams

Agent Teams are most effective for tasks where **parallel exploration** adds real value:

- **Research and Review**: Multiple teammates investigate different aspects simultaneously, then share and challenge each other's findings
- **New Modules or Features**: Teammates each own a separate piece without stepping on each other
- **Debugging with Competing Hypotheses**: Teammates test different theories in parallel and converge on the answer faster
- **Cross-Layer Coordination**: Changes that span frontend, backend, and tests, each owned by a different teammate

> Agent Teams add coordination overhead and use significantly more tokens than a single session. For sequential tasks, same-file edits, or work with many dependencies, a single session or subagents are more effective.

---

## Enabling Agent Teams

Agent Teams are **experimental** and disabled by default. Enable them in your `settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## Starting an Agent Team

Tell Claude to create a team and describe the task and structure in natural language:

```
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Create an agent team to explore this from different angles: one
teammate on UX, one on technical architecture, one playing devil's advocate.
```

Claude will:
1. Create a team with a shared task list
2. Spawn teammates for each perspective
3. Have them explore the problem
4. Synthesize findings
5. Clean up the team when finished

---

## Agent Team Architecture

An agent team consists of four components:

| Component | Role |
|-----------|------|
| **Team Lead** | The main Claude Code session that creates the team, spawns teammates, and coordinates work |
| **Teammates** | Separate Claude Code instances that each work on assigned tasks |
| **Task List** | Shared list of work items that teammates claim and complete |
| **Mailbox** | Messaging system for communication between agents |

### Storage Locations

- **Team config**: `~/.claude/teams/{team-name}/config.json`
- **Task list**: `~/.claude/tasks/{team-name}/`

---

## Display Modes

| Mode | Description | Requirements |
|------|-------------|--------------|
| **In-process** | All teammates run inside your main terminal | Any terminal (default) |
| **Split panes** | Each teammate gets its own pane | Requires tmux or iTerm2 |

Navigate between teammates using **Shift+Down** in in-process mode.

Configure in `settings.json`:
```json
{
  "teammateMode": "in-process"
}
```

Or via CLI flag:
```bash
claude --teammate-mode in-process
```

---

## Task Management in Teams

Tasks have three states: **pending**, **in progress**, and **completed**. Tasks can also depend on other tasks.

### Task Assignment Approaches

- **Lead assigns**: Tell the lead which task to give to which teammate
- **Self-claim**: After finishing a task, a teammate picks up the next unassigned, unblocked task

### Plan Approval for Teammates

For complex or risky tasks, require teammates to plan before implementing:

```
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

The lead reviews and approves/rejects plans autonomously.

---

## Team Communication

- **message**: Send to one specific teammate
- **broadcast**: Send to all teammates simultaneously (use sparingly - costs scale with team size)
- **Automatic message delivery**: Messages from teammates are delivered automatically
- **Idle notifications**: When a teammate finishes, they automatically notify the lead

---

## Quality Gates with Hooks

Use hooks to enforce rules when teammates finish work:

- **TeammateIdle**: Runs when a teammate is about to go idle. Exit with code 2 to send feedback and keep the teammate working
- **TaskCompleted**: Runs when a task is being marked complete. Exit with code 2 to prevent completion and send feedback

---

## Use Case Examples

### Parallel Code Review

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

### Investigating with Competing Hypotheses

```
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk
to each other to try to disprove each other's theories, like a scientific
debate. Update the findings doc with whatever consensus emerges.
```

---

## Best Practices for Agent Teams

1. **Give teammates enough context** - They don't inherit the lead's conversation history
2. **Size tasks appropriately** - Not too small (overhead exceeds benefit), not too large (risk of wasted effort)
3. **Avoid file conflicts** - Break work so each teammate owns different files
4. **Monitor and steer** - Check in on progress and redirect approaches that aren't working
5. **Start with research and review** - Before attempting parallel implementation

---

## Current Limitations

- No session resumption with in-process teammates
- Task status can lag
- One team per session
- No nested teams (teammates cannot spawn their own teams)
- Lead is fixed for lifetime of team
- Split panes require tmux or iTerm2

---

# MCP Integration - Connecting Claude to External Systems

**Reference:** [MCP Integration](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/mcp-integration)

## What is MCP?

**Model Context Protocol (MCP)** enables Claude Code to safely access external systems beyond local files. It functions as a standardized, secure bridge connecting AI agents to external tools and data sources.

> "MCP teaches Claude where to find outside information."

---

## The Three-Pillar Foundation

AI-native development requires three pillars working together:

| Pillar | Purpose | Analogy |
|--------|---------|---------|
| **CLAUDE.md** | Project context | The "who" and "what" |
| **Skills** | Procedural knowledge (How-To) | The "how" |
| **MCP** | External system access (With-What) | The "with what" |

**Skills** = "How-To" expertise packs (procedures and workflows)
**MCP** = "With-What" data pipes (external information access)

Together they enable autonomous AI agents: procedures combined with real-world data access.

---

## What MCP Enables

MCP eliminates bottlenecks by allowing Claude autonomous access to:

- **Real-time web data** - Amazon product research, competitor analysis
- **Current documentation** - Avoiding outdated training data
- **Database queries** - Direct data access and API interactions
- **GitHub repositories** - Code analysis and repository management
- **Slack messaging** - Team communications

---

## Installing MCP Servers

```bash
# Install Playwright MCP for web browsing
claude mcp add --transport stdio playwright npx @playwright/mcp@latest

# Install Context7 MCP for current documentation
claude mcp add --transport stdio context7 npx @upstash/context7-mcp
```

### Common MCP Servers

| Server | Purpose |
|--------|---------|
| **Playwright MCP** | Web browsing, navigation, data extraction |
| **Context7 MCP** | Fetch current documentation across 200+ library sources |

---

## MCP Tool Search (Claude Code 2.1.7+)

A performance optimization that automatically defers tool definition loading until needed:

- Reduces context overhead by **~85%**
- Activates when tool definitions exceed **10% of context**
- Configurable via `ENABLE_TOOL_SEARCH` environment variable

---

## Security Considerations

### Safe Practices

- Use only trusted MCP servers from verified sources
- Store secrets in system keychain, never plaintext files
- Implement permission allow-lists per server
- Never trust unknown MCP packages

### High-Risk Scenarios to Avoid

- Accessing confidential company data or personal credentials
- High-frequency queries (prefer direct API connections)
- Untrusted or unverified MCP server sources

---

# Compiling MCP to Skills - Token Optimization

**Reference:** [Compiling MCP to Skills](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/compiling-mcp-to-skills)

## The Problem

MCP servers load **all tool definitions upfront**, consuming massive tokens. A single Playwright MCP consumes **5,000-8,000 tokens** before any work begins.

> "Tool descriptions occupy more context window space, increasing response time and costs."

---

## The Solution: Code Execution Pattern

Instead of calling MCP tools through Claude's context, **compile them into skills** with executable scripts that run locally. This separates heavy operations from the conversation window.

### Architecture

- **SKILL.md**: High-level procedures (~150 tokens)
- **Scripts**: Bash/Python files executing MCP locally via HTTP
- **References**: Cached documentation

---

## Token Savings

| Approach | Tokens | Savings |
|----------|--------|---------|
| Direct MCP | 9,500-12,500 | Baseline |
| Compiled Skill | ~250 | **97-98% reduction** |

---

## Progressive Disclosure (3-Stage Loading)

1. **Discovery**: Load description only (~30 tokens)
2. **Activation**: Load full SKILL.md (~150 tokens)
3. **Execution**: Run scripts locally (0 context tokens)

This approach ensures only the minimum necessary tokens are consumed at each stage.

---

## Decision Framework

### Compile to Skill When:

- High token overhead (>5,000 tokens)
- Frequent use (3+ times per session)
- Large datasets requiring filtering
- Multi-step workflows

### Use Direct MCP When:

- Low token overhead (<1,500 tokens)
- Infrequent use
- Small, well-formatted results
- Rapidly changing APIs

---

## Example: Browsing with Playwright Skill

Instead of loading the entire Playwright MCP tool definitions, create a compiled skill:

```
~/.claude/skills/browsing-with-playwright/
├── SKILL.md          # High-level procedures (~150 tokens)
├── scripts/          # Local browser automation scripts
└── references/       # Cached documentation
```

The skill handles browser automation with local filtering, consuming a fraction of the tokens compared to direct MCP usage.

---

# Settings Hierarchy - Configuration Management

**Reference:** [Settings Hierarchy](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/settings-hierarchy)

## The Three Configuration Levels

Claude Code employs a three-tier configuration system that balances personal preferences with team standards and temporary experimentation.

### Level 1: User Settings

**Location:** `~/.claude/settings.json`

- Broadest scope - applies across **all projects** on your machine
- Purpose: Personal defaults (model preference, output style, formatting choices)

```json
{
  "model": "claude-sonnet-4-5-20250929",
  "outputStyle": "Concise"
}
```

### Level 2: Project Settings

**Location:** `.claude/settings.json`

- Mid-scope - affects only the **specific project**
- Purpose: Shared team standards, framework-specific customizations
- **Committed to version control** for team alignment

```json
{
  "permissions": {
    "deny": [".env"]
  },
  "env": {
    "NODE_ENV": "development"
  }
}
```

### Level 3: Local Settings

**Location:** `.claude/settings.local.json`

- Narrowest scope - your machine only, **this project only**
- Purpose: Temporary overrides, personal experiments, machine-specific configs
- **Should be gitignored** to remain private

---

## Precedence Rules

Settings follow a strict hierarchy where more specific configurations override general ones:

```
Local > Project > User
```

| Priority | Level | Scope | Version Control |
|----------|-------|-------|-----------------|
| Highest | **Local** (`.claude/settings.local.json`) | This machine, this project | Gitignored |
| Medium | **Project** (`.claude/settings.json`) | All team members, this project | Committed |
| Lowest | **User** (`~/.claude/settings.json`) | All projects on this machine | Personal |

---

## Why the Hierarchy Matters

This design solves fundamental coordination challenges:

- **Teams can enforce security policies** through project settings committed to version control
- **Individuals maintain personal workflows** through user settings without conflicting with the team
- **Temporary experiments** stay local and private through local settings
- **No conflicts** between shared agreements and personal customization

---

## Key Principle

> The `.claude/` directory is essential project infrastructure - treat it like `.gitignore`. Commit `settings.json` for team consistency, but gitignore the local variant for privacy.

---

# Summary

## Key Takeaways

### Agent Teams
- Coordinate **multiple Claude Code instances** working as a team
- Team lead manages work, teammates operate independently with their own context windows
- Use a **shared task list** and **messaging system** for coordination
- Best for research, review, new features, and debugging with competing hypotheses
- Higher token cost than subagents but enables true collaboration

### MCP Integration
- **Model Context Protocol** connects Claude to external systems safely
- Three pillars: **CLAUDE.md** (context) + **Skills** (procedures) + **MCP** (data access)
- Install with `claude mcp add` command
- Always use **trusted MCP servers** and proper secret management

### Compiling MCP to Skills
- MCP tool definitions consume massive tokens (5,000-8,000 per server)
- Compiling to skills achieves **97-98% token reduction**
- Use **progressive disclosure** (Discovery, Activation, Execution)
- Compile when overhead is high and usage is frequent

### Settings Hierarchy
- Three levels: **User** > **Project** > **Local**
- Precedence: **Local > Project > User** (most specific wins)
- Commit project settings, gitignore local settings
- Enables team standards without sacrificing personal preferences

---

## Additional Resources

- [Agent Teams Documentation](https://code.claude.com/docs/en/agent-teams)
- [MCP Integration Guide](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/mcp-integration)
- [Compiling MCP to Skills](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/compiling-mcp-to-skills)
- [Settings Hierarchy](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/settings-hierarchy)
- [AI Agent Factory Book](https://agentfactory.panaversity.org/)

---

*Class notes compiled from [The AI Agent Factory](https://agentfactory.panaversity.org/) and [Claude Code Documentation](https://code.claude.com/docs/en/agent-teams)*
