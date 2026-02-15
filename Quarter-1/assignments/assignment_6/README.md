# Claude Code Practical Exercises & Skills Building

**Posted:** Feb 15, 2026
**Points:** TBD
**Due Date:** TBD
**Status:** ACTIVE

## Assignment Objective

Master Claude Code through hands-on practice with problem-solving exercises and skill building. This assignment focuses on three core competencies:

1. **Problem Decomposition** — Breaking vague challenges into clear steps
2. **Specification Writing** — Describing outcomes with sufficient precision
3. **Quality Verification** — Checking output against stated requirements

## Setup

### Step 1: Create Project Folder

```bash
mkdir assignment-6-exercises
cd assignment-6-exercises
```

### Step 2: Download Exercise Files

Download the starter files from:
- **Problem-Solving Exercises:** [GitHub Repository](https://github.com/panaversity/claude-code-basic-exercises/releases)

### Step 3: Initialize Claude Code

```bash
claude
```

Or if using Claude Code Router:
```bash
ccr code
```

---

# Part A: Practical Problem-Solving Exercises

**Reference:** [Basics Exercises](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/basics-exercises)

## Core Framework: Problem-Solving Cycle

1. **Define** the problem and success criteria
2. **Gather** required context and files
3. **Write** the specification
4. **Execute** with Claude
5. **Verify** against requirements
6. **Iterate** based on findings
7. **Reflect** on communication clarity

---

## Required Exercises (Complete at least 3)

### Exercise 1: The Messy Downloads Folder

**Module:** File Organization & Digital Housekeeping

**Objective:** Transform chaotic file collections into logical structures by writing clear organizational instructions.

**Setup:** Create a `messy-downloads/` directory with 35+ mixed-type files (PDFs, images, documents, spreadsheets) with inconsistent naming.

**Task:**
- Create a single, unambiguous instruction that tells Claude how to organize files
- The instruction should describe the *desired outcome* rather than prescribing the method

**Learning Goals:**
- Vague instructions produce unpredictable results
- Specificity in outcome description directly correlates with result quality
- Claude makes reasonable assumptions that may differ from yours

**Reflection Questions:**
- Did organization match your expectations? What diverged?
- What specifications did you overlook initially?
- Does a second iteration produce better results?

---

### Exercise 2: Photo Album Builder

**Module:** File Organization & Digital Housekeeping

**Objective:** Handle multi-step image management tasks and compare instruction approaches.

**Setup:** Create a `photos/` folder with 24 images (mixed orientations, some duplicates).

**Tasks:**
- Sort by orientation (portrait vs. landscape)
- Identify and flag potential duplicates
- Generate an HTML gallery with thumbnails
- Produce a summary report

**Dual Approach Experiment:**
1. Write outcome-focused instructions emphasizing desired results
2. Write step-by-step instructions with sequential sub-tasks

**Deliverable:** Compare both approaches and document which worked better and why.

---

### Exercise 3: The Comparison Matrix

**Module:** Research & Information Synthesis

**Objective:** Structure comparative analysis with clear, consistent criteria.

**Scenario:** Choose 3-4 options to compare (programming languages, frameworks, tools, or any topic you're researching).

**Tasks:**
1. Research each option thoroughly
2. Create a comparison table with consistent evaluation criteria
3. Write a one-page recommendation memo addressing pros/cons
4. Save all outputs to the working folder

**Critical Insight:** Frame your context (team size, experience, project type) and define 5-7 specific comparison factors *before* Claude begins researching.

---

### Exercise 4: The Literature Review

**Module:** Research & Information Synthesis

**Objective:** Transform raw information into synthesized knowledge.

**Setup:** Choose a topic you're genuinely interested in.

**Deliverables:**
- Executive summary (3-4 sentences)
- Key findings organized thematically
- Consensus areas vs. debate areas
- "What remains unknown" section
- Properly cited sources

**Two-Round Process:**
1. First attempt: topic only, minimal specification
2. Second attempt: refined prompt specifying depth, audience level, and desired angles

**Deliverable:** Compare both outputs and document how specification depth transforms quality.

---

### Exercise 5: The Messy Spreadsheet

**Module:** Data Wrangling & Analysis

**Objective:** Establish data quality standards and document transformation decisions.

**Setup:** Create `customer_data_messy.csv` with deliberately messy data:
- Inconsistent date formats (01/15/2025, Jan 15 2025, 2025-01-15)
- Mixed-case names (john smith, JANE DOE, Bob Jones)
- Missing critical values
- Duplicate entries
- Multiple phone number formats

**Tasks:**
1. Standardize and clean all data
2. Remove duplicate records
3. Flag rows with missing critical information
4. Export cleaned data AND transformation report

**Critical Practice:** Require Claude to "show me the plan before executing changes"

---

### Exercise 6: The Meeting Notes Transformer

**Module:** Document Creation & Transformation

**Objective:** Convert unstructured notes into multiple professional formats.

**Setup:** Create `raw_meeting_notes.txt` with messy notes (fragments, abbreviations, incomplete sentences, embedded action items).

**Deliverables — Three Formats:**
1. **Clean meeting minutes** — formal, topic-organized, decisions listed
2. **Action items list** — owner, task, deadline format
3. **Executive summary email** — 3-paragraph overview for absentees

**Constraint:** All three outputs must remain internally consistent.

---

## Part A Assessment Rubric

| Criteria | Beginner (1) | Developing (2) | Proficient (3) | Advanced (4) |
|----------|--------------|----------------|----------------|--------------|
| **Problem Clarity** | Used starter prompt unchanged | Added some specifics | Defined clear success criteria | Anticipated edge cases |
| **Specification Quality** | Vague, single-sentence | Multiple requirements listed | Structured, unambiguous | Reusable, parameterized |
| **Output Verification** | Accepted first result | Checked surface appearance | Verified against requirements | Tested edge cases, refined |
| **Iteration** | Single attempt | One revision | Multiple refinements | Systematic approach developed |
| **Reflection** | None | Noted what occurred | Explained causation | Derived principles for future |

---

# Part B: Agent Skills Exercises

**Reference:** [Skills Exercises](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/skills-exercises)

## Core Framework: 6-Step Skill Development Cycle

1. **DEFINE** — Identify the problem and success criteria
2. **DRAFT** — Create initial SKILL.md with structure
3. **TEST** — Run against 2-3 normal cases
4. **EVALUATE** — Score output against rubric
5. **IMPROVE** — Add examples, rules, refinements
6. **REPEAT** — Iterate until consistent quality

---

## Required Exercises (Complete at least 3)

### Exercise 1: Anatomy of a Skill

**Module:** Understanding Skills

**Objective:** Understand skill structure by dissecting existing skills.

**Tasks:**
1. Find 2-3 sample skills (from `~/.claude/skills/` or online examples)
2. Identify the five components in each:
   - YAML frontmatter
   - Description/purpose
   - Instructions/steps
   - Examples
   - Edge case handling
3. Predict what output each skill will produce
4. Run the skills and compare predictions to reality

**Deliverable:** Analysis document comparing your predictions vs. actual outputs.

---

### Exercise 2: When to Build a Skill

**Module:** Understanding Skills

**Objective:** Learn when skills are appropriate vs. raw prompts.

**Task:** Classify 15 scenarios using four criteria:
- Is it a repeatable task?
- Does it need consistent output?
- Are there clear rules?
- Is background context required?

**Scenarios to Classify:**
1. Write a one-time blog post
2. Format weekly meeting notes
3. Review code for security issues
4. Generate a unique poem
5. Create standardized invoice PDFs
6. Summarize research papers
7. Write personalized thank-you notes
8. Clean CSV data files
9. Brainstorm product names
10. Generate test data
11. Create git commit messages
12. Draft email responses
13. Analyze survey results
14. Plan a surprise party
15. Generate API documentation

**Deliverable:** Table with your classifications and reasoning.

---

### Exercise 3: Email Style Guide Skill

**Module:** Your First Skills

**Objective:** Create a skill that matches your personal writing voice.

**Tasks:**
1. Collect 5 emails you've written
2. Analyze voice patterns (tone, vocabulary, structure)
3. Create a skill that generates emails in your style
4. Test with 3 different email scenarios

**Skill Structure:**
```
~/.claude/skills/my-email-style/
├── SKILL.md
└── examples/
    └── sample-emails.md
```

---

### Exercise 4: File Organization Skill

**Module:** Your First Skills

**Objective:** Build a reusable file organization skill.

**Tasks:**
1. Define your folder structure rules
2. Handle edge cases:
   - Duplicate filenames
   - Special characters
   - Unknown file types
   - Empty files
3. Create preview mode (show plan before executing)
4. Test with messy folder from Part A

---

### Exercise 5: Data Cleaning Skill

**Module:** Your First Skills

**Objective:** Build a CSV cleaning skill with transformations.

**Required Transformations:**
- Date standardization (to ISO format)
- Name capitalization (Title Case)
- Phone number formatting
- Email validation
- Duplicate detection

**Features:**
- Preview mode (show changes before applying)
- Transformation report
- Error logging

---

### Exercise 6: Report Formatter Skill

**Module:** Skills with Examples

**Objective:** Compare rules-only vs. example-rich skill versions.

**Experiment:**
1. Create Version A: Rules-only (no examples)
2. Create Version B: Example-rich (3+ examples)
3. Run both on identical input
4. Measure quality improvement

**Deliverable:** Comparison document with quality scores.

---

## Skill File Structure Reminder

```
~/.claude/skills/skill-name/
├── SKILL.md          # Required: YAML frontmatter + instructions
├── scripts/          # Optional: Executable code
├── references/       # Optional: Documentation
└── assets/           # Optional: Templates, examples
```

## SKILL.md Template

```markdown
---
name: skill-name
description: What this skill does
invocation: /skill-name
tools: Read, Write, Bash, Edit
---

# Skill Name

## Purpose
Describe what problem this skill solves.

## When to Use
- Scenario 1
- Scenario 2

## Instructions
1. First step
2. Second step
3. Third step

## Examples

### Example 1: [Scenario]
**Input:** Description of input
**Output:** Expected output

## Edge Cases
- How to handle edge case 1
- How to handle edge case 2
```

---

## Part B Self-Assessment Rubric (24-point scale)

| Criteria | Score (0-4) |
|----------|-------------|
| Trigger description clarity | ___ |
| Instructions completeness | ___ |
| Examples quality | ___ |
| Edge case handling | ___ |
| Testing thoroughness | ___ |
| Iteration evidence | ___ |
| **Total** | ___/24 |

**Scoring Guide:**
- 0 = Missing
- 1 = Basic/Incomplete
- 2 = Adequate
- 3 = Good
- 4 = Excellent

**18+ = Production-ready skill**

---

# Deliverables

## Required Submissions

### Part A: Problem-Solving Exercises
- [ ] Complete at least **3 exercises** from Part A
- [ ] Document your specifications and iterations
- [ ] Include reflection notes for each exercise
- [ ] Save all outputs in organized folders

### Part B: Skills Exercises
- [ ] Complete at least **3 exercises** from Part B
- [ ] Create at least **1 production-ready skill** (score 18+)
- [ ] Include SKILL.md and any supporting files
- [ ] Document your 6-step development cycle

### Documentation
- [ ] `README.md` summarizing your work
- [ ] Reflection document: What you learned about specification writing
- [ ] Self-assessment scores for each skill

### Demo Video (90-120 seconds)
Record a demonstration showing:
- One problem-solving exercise (before/after)
- One skill you created (invocation and output)
- Key learnings

**Recording Tool:** Use [Loom](https://www.loom.com/) or screen recorder

---

# Reference Materials

- **AI Agent Factory Book:** [agentfactory.panaversity.org](https://agentfactory.panaversity.org)
- **Basics Exercises:** [Problem-Solving Exercises](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/basics-exercises)
- **Skills Exercises:** [Skills Building](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/skills-exercises)
- **Skills.sh:** [skills.sh](https://skills.sh)

---

# Tips for Success

1. **Start Simple:** Begin with exercises that match real problems you face
2. **Iterate:** Your first specification won't be perfect — refine it
3. **Document Everything:** Record what worked and what didn't
4. **Test Edge Cases:** Good specifications handle unusual inputs
5. **Reflect:** The learning is in understanding *why* things worked or failed
6. **Be Specific:** Vague instructions = unpredictable results
7. **Preview First:** Always ask Claude to show the plan before executing

---

# Submission Checklist

Before submitting, verify:

- [ ] Project folder organized (`assignment-6-exercises/`)
- [ ] At least 3 Part A exercises completed with documentation
- [ ] At least 3 Part B exercises completed
- [ ] At least 1 production-ready skill created (18+ score)
- [ ] All specifications saved
- [ ] Reflection notes included
- [ ] Self-assessment rubrics filled out
- [ ] README.md summarizes all work
- [ ] Demo video recorded (90-120 seconds)

---

_Assignment 6: Claude Code Practical Exercises & Skills Building_
