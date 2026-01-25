# 📚 Class Update – 25th January 2026

## 🎥 Today's Lecture Recording

_https://youtu.be/Xpj93kYuCh0_

## Today's Class Topics

- Advanced Prompting Strategies
- Chain of Thought (CoT) Prompting
- Self-Consistency techniques
- Step-Back Prompting
- ReAct (Reasoning + Acting)
- Tree of Thoughts (ToT)
- Best Practices for Effective Prompts
- Common Pitfalls and How to Avoid Them
- Hands-On Examples and Practice
- Agent Skills in Claude: Understanding and Working with Skills

## 📖 Reference Links

- **Prompt Engineering Repository:** [learn-low-code-agentic-ai - Prompt Engineering](https://github.com/panaversity/learn-low-code-agentic-ai/tree/main/00_prompt_engineering)
- **Agent Skills Guide:** [The Concept Behind Skills](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/concept-behind-skills)
- **Skills.sh:** [skills.sh](https://skills.sh)
- **Agent Factory Textbook:** [agentfactory.panaversity.org](https://agentfactory.panaversity.org)

## 📊 Advanced Prompting Strategies Covered

### Chain of Thought (CoT) Prompting
- Encouraging step-by-step reasoning for complex problems
- Best for: Math problems, logical reasoning, complex analysis, multi-step processes
- Best practices: Use "Let's think step by step", set temperature to 0, extract final answers separately

### Self-Consistency
- Generating multiple reasoning paths and selecting the most common answer
- Process: Ask the same question multiple times with different phrasings, compare answers, choose most frequent result
- Reduces errors from single flawed reasoning paths

### Step-Back Prompting
- Asking a more general question first, then using that context for the specific question
- Establishes foundational principles before tackling specific tasks
- Ensures more informed and structured recommendations

### ReAct (Reasoning + Acting)
- Combining reasoning with tool use or actions
- Interleaves Thoughts, Actions, and Observations in iterative loops
- Ideal for tasks requiring real-time data or multi-step verification

### Tree of Thoughts (ToT)
- Exploring multiple reasoning branches simultaneously
- Best for: Creative problem solving, strategic planning, complex decision-making
- Process: Generate branches, evaluate each, synthesize best ideas

## 🛠️ Best Practices for Effective Prompts

1. **Be Specific and Clear** - Avoid vague requests
2. **Use Action Verbs** - Analyze, Compare, Create, Describe, Evaluate, etc.
3. **Provide Examples** - Most powerful way to communicate expectations
4. **Structure Your Prompts** - Use clear formatting (Task, Context, Format, Example)
5. **Use Instructions Over Constraints** - Focus on what you want, not what to avoid
6. **Control Output Format** - Specify exactly how you want responses structured
7. **Use Variables for Reusability** - Create templates for common tasks
8. **Iterate and Document** - Track what works, test variations

## ⚠️ Common Pitfalls and How to Avoid Them

1. **Ambiguous Instructions** → Be specific about what you want
2. **Contradictory Instructions** → Review prompts for internal consistency
3. **Too Many Constraints** → Focus on positive instructions
4. **Ignoring Token Limits** → Set appropriate limits and structure accordingly
5. **Not Testing Variations** → Test different phrasings and approaches

## 🎯 Agent Skills in Claude

### Understanding Skills
- Skills are organized collections of files (folders) that encode domain expertise
- They bridge the gap between intelligence + execution and actual expertise
- Skills work for ANY domain, not just software development
- The bottleneck isn't AI intelligence—it's access to specialized expertise

### Key Concepts
- **Skills are universal** - Finance, Legal, Marketing, Education, Healthcare, etc.
- **Three-level loading** - Keeps context efficient at scale
- **Skills + MCP** - Expertise (skills) + Connectivity (MCP)
- **Accessibility** - Non-technical users can create high-value skills
- **Strategic assets** - Skills compound across teams and organizations

### Skills vs. Subagents
- **Use Skills when:** Automatic or explicit invocation, shared context, lightweight, single-focus
- **Use Subagents when:** Explicit only, isolated context, multi-step complex workflows, guaranteed execution

## 📝 Key Takeaways

- **Advanced prompting** requires understanding when and how to use different strategies
- **Chain of Thought** enables step-by-step reasoning for complex problems
- **Self-Consistency** improves reliability by comparing multiple reasoning paths
- **Step-Back Prompting** establishes context before tackling specific tasks
- **ReAct** combines reasoning with tool use for dynamic problem-solving
- **Tree of Thoughts** explores multiple solution branches for complex decisions
- **Agent Skills** encode domain expertise in reusable, accessible formats
- **Skills are the "applications layer"** of the agent stack - where value creation happens

---

_Class Date: January 25, 2026_
