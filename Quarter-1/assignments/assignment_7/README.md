# Claude Code Mastery: Skills, Agents & Orchestration

**Posted:** Feb 15, 2026
**Points:** TBD
**Due Date:** TBD
**Status:** ACTIVE

## Assignment Objective

Build a complete understanding of Claude Code's architecture by creating and orchestrating skills, agents, and subagents. This hands-on assignment will teach you:

1. **Skills** — User-invocable capabilities with `/skill-name`
2. **Agents** — Specialized AI personas Claude spawns automatically
3. **Subagents** — Task-specific agents for complex workflows
4. **Orchestration** — Coordinating multiple agents for multi-step tasks

By the end, you'll have built a working multi-agent system that demonstrates Claude Code's full potential.

---

## Prerequisites

- Claude Code installed and authenticated
- Completed Assignment 6 (basic skills understanding)
- Familiarity with Markdown and YAML

---

## Setup

### Step 1: Create Project Structure

```bash
mkdir assignment-7-agents
cd assignment-7-agents

# Create folder structure
mkdir -p skills agents workflows examples
```

### Step 2: Initialize Claude Code

```bash
claude
```

### Step 3: Verify Your Environment

Check your Claude Code directories exist:
```bash
ls ~/.claude/skills/
ls ~/.claude/agents/
```

If they don't exist, create them:
```bash
mkdir -p ~/.claude/skills ~/.claude/agents
```

---

# Part 1: Building Skills

## Understanding Skills

Skills are **user-invocable capabilities** that you trigger with `/skill-name`. They provide:
- Consistent, repeatable workflows
- Predefined instructions Claude follows
- Custom tools for your specific needs

### Skill vs Agent vs Subagent

| Component | Trigger | Purpose | Location |
|-----------|---------|---------|----------|
| **Skill** | User types `/skill-name` | Predefined workflows | `~/.claude/skills/` |
| **Agent** | Claude decides automatically | Specialized expertise | `~/.claude/agents/` |
| **Subagent** | Claude spawns via Task tool | Parallel/complex tasks | Built-in or custom |

---

## Task 1.1: Create a Code Review Skill

Create a skill that reviews code for quality, security, and best practices.

### File: `~/.claude/skills/code-review/SKILL.md`

```markdown
---
name: code-review
description: Review code for quality, security, and best practices
invocation: /code-review
tools: Read, Grep, Glob
---

# Code Review Skill

## Purpose
Perform comprehensive code review on files or directories.

## When to Use
- Before committing code
- When reviewing pull requests
- After implementing new features

## Review Checklist

### 1. Code Quality
- [ ] Functions are small (<50 lines)
- [ ] Clear, descriptive naming
- [ ] No deep nesting (>4 levels)
- [ ] DRY principle followed
- [ ] Proper error handling

### 2. Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Proper authentication checks

### 3. Best Practices
- [ ] Consistent code style
- [ ] Appropriate comments
- [ ] No console.log statements
- [ ] Proper TypeScript types (if applicable)
- [ ] Edge cases handled

## Output Format

Provide review in this structure:

### Summary
Brief overview of the code reviewed.

### Issues Found

#### CRITICAL (Must Fix)
- Issue description and location
- Suggested fix

#### HIGH (Should Fix)
- Issue description and location
- Suggested fix

#### MEDIUM (Consider Fixing)
- Issue description and location
- Suggested fix

### Positive Observations
What the code does well.

### Recommendations
Suggestions for improvement.
```

### Test Your Skill

```bash
claude
> /code-review src/app.js
```

---

## Task 1.2: Create a Git Commit Skill

Create a skill for standardized git commits.

### File: `~/.claude/skills/smart-commit/SKILL.md`

```markdown
---
name: smart-commit
description: Create standardized git commits with conventional commit format
invocation: /smart-commit
tools: Bash, Read, Grep
---

# Smart Commit Skill

## Purpose
Analyze staged changes and create a well-formatted conventional commit.

## Commit Message Format

```
<type>(<scope>): <description>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **refactor**: Code refactoring
- **docs**: Documentation changes
- **test**: Adding/updating tests
- **chore**: Maintenance tasks
- **perf**: Performance improvements
- **ci**: CI/CD changes

## Process

1. Run `git status` to see staged changes
2. Run `git diff --staged` to analyze changes
3. Determine appropriate type and scope
4. Write concise description (imperative mood)
5. Add body if changes are complex
6. Show commit message for approval
7. Execute commit after user confirms

## Rules

- Description max 72 characters
- Use imperative mood ("Add feature" not "Added feature")
- Don't end description with period
- Body wraps at 72 characters
- Reference issues in footer (e.g., "Closes #123")

## Examples

### Simple Feature
```
feat(auth): add password reset functionality
```

### Bug Fix with Body
```
fix(api): handle null response from user service

The user service occasionally returns null when the user
is not found. Added null check to prevent crash.

Closes #456
```
```

### Test Your Skill

```bash
# Stage some changes first
git add .

# Then use the skill
claude
> /smart-commit
```

---

## Task 1.3: Create a Documentation Generator Skill

### File: `~/.claude/skills/doc-gen/SKILL.md`

```markdown
---
name: doc-gen
description: Generate documentation from code files
invocation: /doc-gen
tools: Read, Write, Glob, Grep
---

# Documentation Generator Skill

## Purpose
Automatically generate documentation from source code.

## Supported Outputs
- README.md
- API documentation
- Function/method documentation
- Type definitions

## Process

1. Scan specified files/directories
2. Extract:
   - Function signatures
   - Class definitions
   - Type definitions
   - Comments and JSDoc
3. Generate structured documentation
4. Save to specified location

## Output Format

### For Functions
```markdown
## `functionName(param1, param2)`

**Description:** What the function does

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| param1 | string | Description |
| param2 | number | Description |

**Returns:** `ReturnType` - Description

**Example:**
\`\`\`javascript
const result = functionName('hello', 42)
\`\`\`
```

### For Classes
```markdown
## Class: `ClassName`

**Description:** What the class represents

### Constructor
\`\`\`typescript
new ClassName(options: Options)
\`\`\`

### Methods
- `methodName()` - Description
- `anotherMethod()` - Description

### Properties
| Property | Type | Description |
|----------|------|-------------|
| prop1 | string | Description |
```

## Usage Examples

```
/doc-gen src/utils.ts
/doc-gen src/components/ --output docs/components.md
/doc-gen . --readme
```
```

---

# Part 2: Building Agents

## Understanding Agents

Agents are **specialized AI personas** that Claude automatically spawns when it detects tasks matching their expertise. Unlike skills (user-invoked), agents are triggered by context.

### Agent YAML Configuration

```yaml
---
name: agent-name
description: When Claude should use this agent
tools: Read, Write, Edit, Bash, Grep, Glob
model: sonnet  # haiku, sonnet, or opus
skills:
  - preloaded-skill-name
---
```

---

## Task 2.1: Create a Security Reviewer Agent

### File: `~/.claude/agents/security-reviewer.md`

```markdown
---
name: security-reviewer
description: Use this agent to review code for security vulnerabilities, OWASP Top 10 issues, and security best practices. Automatically triggered when reviewing authentication, API endpoints, user input handling, or sensitive data operations.
tools: Read, Grep, Glob, Bash
model: sonnet
---

# Security Reviewer Agent

You are a security-focused code reviewer specializing in identifying vulnerabilities and security anti-patterns.

## Expertise Areas

- OWASP Top 10 vulnerabilities
- Authentication and authorization flaws
- Input validation and sanitization
- SQL injection prevention
- XSS (Cross-Site Scripting) prevention
- CSRF protection
- Secrets management
- Secure API design

## Review Process

### 1. Scan for Hardcoded Secrets
Search for patterns like:
- API keys
- Passwords
- Tokens
- Connection strings
- Private keys

### 2. Check Input Validation
Verify all user inputs are:
- Validated on server-side
- Sanitized before use
- Type-checked
- Length-limited

### 3. Review Authentication
Check for:
- Proper password hashing (bcrypt, argon2)
- Secure session management
- JWT best practices
- Rate limiting on auth endpoints

### 4. Analyze Data Flow
Track sensitive data through:
- Input points
- Storage
- Processing
- Output/display

## Output Format

### Security Assessment Report

**Risk Level:** CRITICAL | HIGH | MEDIUM | LOW

#### Vulnerabilities Found

| ID | Severity | Type | Location | Description |
|----|----------|------|----------|-------------|
| V1 | CRITICAL | SQL Injection | db.js:45 | Unsanitized user input in query |

#### Recommendations

1. **[CRITICAL]** Issue description
   - Current code: `code snippet`
   - Recommended fix: `code snippet`

#### Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Output encoding implemented
- [ ] Authentication secure
- [ ] Authorization checks in place
- [ ] Error messages don't leak info
- [ ] Dependencies up to date
```

---

## Task 2.2: Create a Test Writer Agent

### File: `~/.claude/agents/test-writer.md`

```markdown
---
name: test-writer
description: Use this agent to write comprehensive tests for code. Automatically triggered when implementing new features, fixing bugs, or when test coverage is needed. Follows TDD principles.
tools: Read, Write, Edit, Bash, Grep, Glob
model: sonnet
skills:
  - code-review
---

# Test Writer Agent

You are a testing specialist who writes comprehensive, maintainable tests following TDD principles.

## Testing Philosophy

- Tests should be **FIRST**: Fast, Independent, Repeatable, Self-validating, Timely
- Write tests that document behavior
- Test behavior, not implementation
- Aim for 80%+ code coverage

## Test Types

### 1. Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Fast execution (<100ms each)

### 2. Integration Tests
- Test component interactions
- Use test databases
- Verify API contracts

### 3. E2E Tests
- Test critical user journeys
- Run in realistic environment
- Cover happy paths and error cases

## Process

1. **Analyze** the code to be tested
2. **Identify** test cases:
   - Happy path scenarios
   - Edge cases
   - Error conditions
   - Boundary values
3. **Write** tests following AAA pattern:
   - Arrange: Set up test data
   - Act: Execute the code
   - Assert: Verify results
4. **Run** tests to verify they pass
5. **Review** coverage and add missing tests

## Test Template

```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      const input = createTestInput()

      // Act
      const result = methodName(input)

      // Assert
      expect(result).toEqual(expectedOutput)
    })

    it('should throw error when [invalid condition]', () => {
      // Arrange
      const invalidInput = createInvalidInput()

      // Act & Assert
      expect(() => methodName(invalidInput)).toThrow('Expected error')
    })
  })
})
```

## Coverage Requirements

| Type | Minimum | Target |
|------|---------|--------|
| Statements | 70% | 85% |
| Branches | 70% | 80% |
| Functions | 80% | 90% |
| Lines | 70% | 85% |
```

---

## Task 2.3: Create a Refactoring Agent

### File: `~/.claude/agents/refactorer.md`

```markdown
---
name: refactorer
description: Use this agent to refactor code for better readability, maintainability, and performance. Triggered when code needs cleanup, optimization, or restructuring.
tools: Read, Write, Edit, Grep, Glob
model: sonnet
---

# Refactoring Agent

You are a code refactoring specialist focused on improving code quality without changing behavior.

## Refactoring Principles

- **Small steps**: Make incremental changes
- **Tests first**: Ensure tests pass before and after
- **One thing at a time**: Focus on single improvement
- **Preserve behavior**: Same inputs = same outputs

## Common Refactoring Patterns

### 1. Extract Function
When code block does one distinct thing:
```javascript
// Before
function processOrder(order) {
  // validate
  if (!order.items) throw new Error('No items')
  if (!order.customer) throw new Error('No customer')
  // ... more validation

  // calculate
  let total = 0
  for (const item of order.items) {
    total += item.price * item.quantity
  }
  // ... rest
}

// After
function processOrder(order) {
  validateOrder(order)
  const total = calculateTotal(order.items)
  // ... rest
}
```

### 2. Replace Magic Numbers
```javascript
// Before
if (password.length < 8) { ... }

// After
const MIN_PASSWORD_LENGTH = 8
if (password.length < MIN_PASSWORD_LENGTH) { ... }
```

### 3. Simplify Conditionals
```javascript
// Before
if (user.age >= 18 && user.hasLicense && !user.isBanned) {
  allowAccess()
}

// After
if (canAccessService(user)) {
  allowAccess()
}

function canAccessService(user) {
  return user.age >= 18 && user.hasLicense && !user.isBanned
}
```

## Process

1. **Identify** code smells:
   - Long functions (>50 lines)
   - Deep nesting (>4 levels)
   - Duplicate code
   - Magic numbers/strings
   - God classes

2. **Plan** refactoring steps

3. **Execute** one change at a time

4. **Verify** tests still pass

5. **Document** changes made

## Output Format

### Refactoring Report

**Files Modified:** list of files

#### Changes Made

| Change | Type | Location | Reason |
|--------|------|----------|--------|
| Extracted validateOrder() | Extract Function | order.js:15 | Separate concerns |

#### Before/After Comparison

**Before:**
```javascript
// old code
```

**After:**
```javascript
// new code
```

#### Tests Status
- [ ] All existing tests pass
- [ ] No behavior changes
```

---

# Part 3: Orchestrating Agents

## Understanding Orchestration

Orchestration is coordinating multiple agents to complete complex tasks. Claude can spawn subagents in parallel or sequence to maximize efficiency.

### Orchestration Patterns

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Parallel** | Independent tasks | Review security + Write tests simultaneously |
| **Sequential** | Dependent tasks | Analyze → Plan → Implement → Test |
| **Hierarchical** | Complex workflows | Main agent coordinates specialists |

---

## Task 3.1: Create an Orchestration Workflow

Create a workflow that coordinates multiple agents for a complete feature implementation.

### File: `workflows/feature-implementation.md`

```markdown
# Feature Implementation Workflow

## Overview
This workflow orchestrates multiple agents to implement a new feature from start to finish.

## Agents Involved
1. **Explore Agent** — Understand existing codebase
2. **Plan Agent** — Design implementation approach
3. **Test Writer Agent** — Write tests first (TDD)
4. **Code Writer** — Implement the feature
5. **Security Reviewer Agent** — Check for vulnerabilities
6. **Refactorer Agent** — Clean up and optimize

## Workflow Steps

### Phase 1: Discovery (Parallel)
```
┌─────────────────┐     ┌─────────────────┐
│  Explore Agent  │     │  Analyze Reqs   │
│  (codebase)     │     │  (feature spec) │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
              [Understanding]
```

### Phase 2: Planning (Sequential)
```
[Understanding] → Plan Agent → [Implementation Plan]
```

### Phase 3: Test-Driven Development (Sequential)
```
[Plan] → Test Writer → [Tests] → Implement → [Code]
```

### Phase 4: Quality Assurance (Parallel)
```
         ┌─────────────────┐
         │ Security Review │
[Code] ──┤                 ├──► [Issues]
         │ Code Review     │
         └─────────────────┘
```

### Phase 5: Refinement (Sequential)
```
[Issues] → Refactorer → [Clean Code] → Final Tests → [Done]
```

## Example Prompt

```
Implement a user authentication feature with the following requirements:
- Email/password login
- JWT token generation
- Password reset functionality
- Rate limiting

Use the feature implementation workflow:
1. First, explore the existing codebase to understand patterns
2. Create a detailed implementation plan
3. Write tests for all requirements
4. Implement the feature
5. Review for security issues
6. Refactor for quality
```

## Expected Agent Delegation

Claude will automatically:
1. Spawn Explore agent to understand codebase
2. Use Plan agent to design approach
3. Spawn Test Writer to create test suite
4. Implement code following the plan
5. Spawn Security Reviewer in parallel with Code Reviewer
6. Use Refactorer for final cleanup
```

---

## Task 3.2: Build a Multi-Agent Code Review System

### File: `workflows/comprehensive-review.md`

```markdown
# Comprehensive Code Review Workflow

## Purpose
Perform thorough code review using specialized agents in parallel.

## Agents

### 1. Quality Reviewer
Focus: Code quality, readability, maintainability

### 2. Security Reviewer
Focus: Vulnerabilities, OWASP issues

### 3. Performance Reviewer
Focus: Efficiency, optimization opportunities

### 4. Test Coverage Reviewer
Focus: Test completeness, edge cases

## Orchestration

```
                    ┌──────────────────┐
                    │   Code to Review │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Quality     │  │   Security    │  │  Performance  │
│   Reviewer    │  │   Reviewer    │  │   Reviewer    │
└───────┬───────┘  └───────┬───────┘  └───────┬───────┘
        │                  │                  │
        └────────────────┬─┴──────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  Consolidated Report │
              └─────────────────────┘
```

## Invocation

```
Please perform a comprehensive code review of the src/auth/ directory.

Run these reviews in parallel:
1. Quality review - check code quality and maintainability
2. Security review - identify vulnerabilities
3. Performance review - find optimization opportunities

Then consolidate findings into a single report with prioritized issues.
```

## Output Format

### Comprehensive Code Review Report

**Files Reviewed:** [list]
**Review Date:** [date]

#### Executive Summary
Brief overview of overall code health.

#### Critical Issues (Must Fix)
Combined critical issues from all reviewers.

#### Quality Assessment
| Metric | Score | Notes |
|--------|-------|-------|
| Readability | 8/10 | Clear naming conventions |
| Maintainability | 7/10 | Some large functions |
| Security | 6/10 | Input validation needed |
| Performance | 8/10 | Efficient algorithms |

#### Detailed Findings

**From Quality Reviewer:**
- Finding 1
- Finding 2

**From Security Reviewer:**
- Finding 1
- Finding 2

**From Performance Reviewer:**
- Finding 1
- Finding 2

#### Action Items
Prioritized list of improvements.
```

---

## Task 3.3: Create a Full Development Pipeline

### File: `workflows/dev-pipeline.md`

```markdown
# Full Development Pipeline

## Overview
End-to-end development workflow from idea to deployment-ready code.

## Pipeline Stages

```
[Idea] → [Spec] → [Plan] → [Tests] → [Code] → [Review] → [Refactor] → [Done]
```

## Stage Details

### Stage 1: Specification
**Agent:** None (User provides)
**Input:** Feature idea/requirements
**Output:** Detailed specification document

### Stage 2: Planning
**Agent:** Plan Agent
**Input:** Specification
**Output:** Implementation plan with:
- Architecture decisions
- File structure
- API design
- Database schema (if needed)

### Stage 3: Test Writing (TDD)
**Agent:** Test Writer Agent
**Input:** Implementation plan
**Output:**
- Unit tests
- Integration tests
- Test fixtures

### Stage 4: Implementation
**Agent:** Code Writer (Claude)
**Input:** Plan + Tests
**Output:** Working code that passes tests

### Stage 5: Review (Parallel)
**Agents:**
- Security Reviewer
- Code Reviewer
- Test Coverage Checker
**Input:** Implemented code
**Output:** Review reports with issues

### Stage 6: Refinement
**Agent:** Refactorer Agent
**Input:** Code + Review feedback
**Output:** Clean, optimized code

### Stage 7: Final Verification
**Agent:** Test Writer Agent
**Input:** Refactored code
**Output:**
- All tests passing
- Coverage report
- Ready for deployment

## Example Usage

```
I want to build a REST API for a todo application with:
- CRUD operations for todos
- User authentication
- Due date reminders
- Tags/categories

Please use the full development pipeline:
1. Help me write the specification
2. Create an implementation plan
3. Write tests first (TDD)
4. Implement the code
5. Review for security and quality
6. Refactor and optimize
7. Verify everything works
```

## Success Criteria

- [ ] All tests pass
- [ ] 80%+ code coverage
- [ ] No critical security issues
- [ ] Code quality score 8+/10
- [ ] Documentation complete
```

---

# Part 4: Practical Project

## Final Project: Build Your Own Agent System

Create a complete agent ecosystem for a real-world use case of your choice.

### Requirements

1. **Create 3 Skills**
   - Each skill must be invocable with `/skill-name`
   - Include examples and edge case handling
   - Score 18+ on self-assessment rubric

2. **Create 2 Agents**
   - Each agent must have clear expertise area
   - Include proper YAML configuration
   - Define when Claude should use them

3. **Create 1 Orchestration Workflow**
   - Coordinate at least 2 agents
   - Use parallel or sequential pattern
   - Document the workflow visually

4. **Demonstrate the System**
   - Show skills being invoked
   - Show agents being triggered
   - Show orchestration in action

### Suggested Project Ideas

#### Option A: Content Creation Pipeline
- **Skills:** `/blog-outline`, `/social-post`, `/seo-optimize`
- **Agents:** Content Researcher, Editor Agent
- **Workflow:** Research → Draft → Edit → Optimize → Publish

#### Option B: Code Quality System
- **Skills:** `/lint-fix`, `/type-check`, `/doc-gen`
- **Agents:** Security Reviewer, Performance Analyst
- **Workflow:** Analyze → Fix → Review → Document

#### Option C: Data Processing Pipeline
- **Skills:** `/csv-clean`, `/data-validate`, `/report-gen`
- **Agents:** Data Analyst, Visualization Expert
- **Workflow:** Clean → Validate → Analyze → Report

#### Option D: DevOps Assistant
- **Skills:** `/deploy-check`, `/env-setup`, `/log-analyze`
- **Agents:** Infrastructure Reviewer, Incident Responder
- **Workflow:** Check → Deploy → Monitor → Respond

---

# Deliverables

## Required Submissions

### Part 1: Skills (3 skills)
- [ ] `~/.claude/skills/skill-1/SKILL.md`
- [ ] `~/.claude/skills/skill-2/SKILL.md`
- [ ] `~/.claude/skills/skill-3/SKILL.md`
- [ ] Screenshots of each skill being invoked

### Part 2: Agents (2 agents)
- [ ] `~/.claude/agents/agent-1.md`
- [ ] `~/.claude/agents/agent-2.md`
- [ ] Examples of agents being triggered

### Part 3: Orchestration (1 workflow)
- [ ] `workflows/your-workflow.md`
- [ ] Visual diagram of the workflow
- [ ] Demonstration of orchestration

### Part 4: Documentation
- [ ] `README.md` explaining your system
- [ ] Use cases and examples
- [ ] Lessons learned

### Demo Video (3-5 minutes)
Show your complete system in action:
1. Invoke each skill (30 sec each)
2. Trigger agents (1 min)
3. Run orchestration workflow (2 min)
4. Explain learnings (1 min)

---

# Assessment Rubric

| Criteria | Points |
|----------|--------|
| **Skills Quality** (3 skills × 10 pts) | 30 |
| **Agents Quality** (2 agents × 15 pts) | 30 |
| **Orchestration Design** | 20 |
| **Documentation** | 10 |
| **Demo Video** | 10 |
| **Total** | 100 |

### Skills Scoring (per skill)
- Structure and YAML (2 pts)
- Instructions clarity (2 pts)
- Examples provided (2 pts)
- Edge cases handled (2 pts)
- Working demonstration (2 pts)

### Agents Scoring (per agent)
- YAML configuration (3 pts)
- Clear expertise area (3 pts)
- Detailed instructions (3 pts)
- Trigger conditions defined (3 pts)
- Integration with system (3 pts)

---

# Reference Materials

- **AI Agent Factory:** [agentfactory.panaversity.org](https://agentfactory.panaversity.org)
- **Skills Guide:** [The Concept Behind Skills](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/concept-behind-skills)
- **Building Skills:** [Building Your Own Skills](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/building-your-own-skills)
- **Subagents:** [Subagents and Orchestration](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/subagents-and-orchestration)
- **Skills.sh:** [skills.sh](https://skills.sh)

---

# Tips for Success

1. **Start Simple:** Build one working skill before adding complexity
2. **Test Frequently:** Invoke skills and trigger agents often
3. **Iterate:** Refine based on actual usage
4. **Document as You Go:** Don't leave documentation for the end
5. **Think Workflows:** How do your skills and agents work together?
6. **Real Problems:** Build for tasks you actually do
7. **Ask Claude:** Use Claude to help build skills and agents!

---

# Submission Checklist

- [ ] 3 skills created and working
- [ ] 2 agents created and triggerable
- [ ] 1 orchestration workflow documented
- [ ] All files in correct locations
- [ ] README.md complete
- [ ] Screenshots/examples included
- [ ] Demo video recorded (3-5 min)
- [ ] Self-assessment completed

---

_Assignment 7: Claude Code Mastery - Skills, Agents & Orchestration_
