# Prompt Engineering Guide - In-Depth Explanation

This guide explains the fundamental concepts of Prompt Engineering in simple, easy-to-understand language with practical examples.

## Table of Contents

1. [What is Prompt Engineering?](#what-is-prompt-engineering)
2. [Essential Configuration Settings](#essential-configuration-settings)
3. [Fundamental Prompting Techniques](#fundamental-prompting-techniques)
4. [LLM Configuration Parameters](#llm-configuration-parameters)
5. [Token Management](#token-management)

---

## What is Prompt Engineering?

**Prompt Engineering** is the art and science of crafting instructions (prompts) that help AI models understand exactly what you want them to do. Think of it like giving directions to someone - the clearer and more specific you are, the better the result.

### Why Does It Matter?

- **Better Results:** Well-crafted prompts produce more accurate and useful responses
- **Saves Time:** Clear prompts reduce the need for multiple attempts
- **Saves Money:** Efficient prompts use fewer tokens, reducing costs
- **Consistency:** Good prompts give predictable, reliable outputs

### Simple Analogy

Imagine you're asking a friend to write a story:

- **Bad Prompt:** "Write something"
- **Good Prompt:** "Write a 200-word science fiction story about a robot learning to paint, suitable for children aged 8-10"

The second prompt gives clear direction, length, genre, topic, and audience - resulting in exactly what you need!

---

## Essential Configuration Settings

These settings control how the AI "thinks" and responds. Understanding them helps you get the right type of output for your needs.

### Temperature (0-1)

**What it does:** Controls how creative or predictable the AI's responses are.

**Think of it like:** A creativity dial on a radio

- **Low (0-0.3):** Like a news reporter - factual, consistent, predictable
- **Medium (0.4-0.7):** Like a teacher - balanced, informative but friendly
- **High (0.8-1.0):** Like a poet - creative, varied, sometimes surprising

#### Examples:

**Temperature 0 (Math Problem):**

```
Prompt: "What is 15 × 23?"
Temperature: 0
Result: "345" (always the same, correct answer)
```

**Temperature 0.7 (Creative Writing):**

```
Prompt: "Write a short story about a cat"
Temperature: 0.7
Result: Varied stories each time, but still coherent and relevant
```

**Temperature 0.9 (Poetry):**

```
Prompt: "Write a haiku about rain"
Temperature: 0.9
Result: Very creative, different styles each time
```

#### When to Use Each:

| Temperature | Best For                                          | Example Use Cases                                |
| ----------- | ------------------------------------------------- | ------------------------------------------------ |
| 0.0-0.3     | Factual answers, code generation, data extraction | Math problems, API documentation, code debugging |
| 0.4-0.7     | General writing, explanations, balanced tasks     | Blog posts, emails, explanations, translations   |
| 0.8-1.0     | Creative content, brainstorming, diverse ideas    | Poetry, story writing, idea generation           |

---

### Top-K and Top-P (Nucleus Sampling)

These work together with Temperature to control which words the AI considers when generating responses.

#### Top-K

**What it does:** Limits the AI to only consider the top K most likely words.

**Simple explanation:** If Top-K is 20, the AI only looks at the 20 most probable next words, ignoring less likely options.

**Example:**

```
Sentence: "The weather today is..."
With Top-K = 5: AI considers only: sunny, rainy, cloudy, cold, warm
With Top-K = 50: AI considers many more options including: unpredictable, delightful, terrible, etc.
```

#### Top-P (Nucleus Sampling)

**What it does:** Limits choices based on cumulative probability - keeps only words that together make up P% of the probability.

**Simple explanation:** Instead of a fixed number (like Top-K), Top-P dynamically includes words until they reach a certain probability threshold.

**Why it's called "Nucleus Sampling":** The "nucleus" refers to the core set of most probable words that together represent the bulk of the probability mass.

---

### Understanding Top-P in Depth

#### The Core Concept

Top-P works by:

1. **Ranking words** by their probability (most likely first)
2. **Adding probabilities** from the top down
3. **Stopping** when the cumulative probability reaches the Top-P threshold
4. **Using only** those words for selection

#### Step-by-Step Example

Imagine the AI is trying to complete this sentence: "The weather today is..."

The model calculates probabilities for the next word:

| Word   | Probability | Cumulative Probability |
| ------ | ----------- | ---------------------- |
| sunny  | 0.35 (35%)  | 0.35 (35%)             |
| rainy  | 0.25 (25%)  | 0.60 (60%)             |
| cloudy | 0.15 (15%)  | 0.75 (75%)             |
| cold   | 0.10 (10%)  | 0.85 (85%)             |
| warm   | 0.05 (5%)   | 0.90 (90%)             |
| windy  | 0.03 (3%)   | 0.93 (93%)             |
| foggy  | 0.02 (2%)   | 0.95 (95%)             |
| ...    | ...         | ...                    |

**With Top-P = 0.9 (90%):**

- Includes: sunny, rainy, cloudy, cold, warm
- Stops at "warm" because cumulative = 90%
- Excludes: windy, foggy, and all less likely words
- **Result:** AI can choose from 5 words

**With Top-P = 0.75 (75%):**

- Includes: sunny, rainy, cloudy
- Stops at "cloudy" because cumulative = 75%
- Excludes: cold, warm, windy, foggy, etc.
- **Result:** AI can choose from 3 words (more focused)

**With Top-P = 0.95 (95%):**

- Includes: sunny, rainy, cloudy, cold, warm, windy
- Stops at "windy" because cumulative = 95%
- **Result:** AI can choose from 6 words (more diverse)

#### Real-World Scenario Example

**Scenario:** Writing a story continuation

**Sentence:** "The detective entered the room and saw..."

**Word Probabilities:**

- "a" = 0.40
- "the" = 0.25
- "something" = 0.15
- "blood" = 0.08
- "nothing" = 0.05
- "clues" = 0.03
- "evidence" = 0.02
- "furniture" = 0.01
- ... (many more with tiny probabilities)

**With Top-P = 0.9:**

- Includes: "a", "the", "something", "blood", "nothing"
- Cumulative: 0.40 + 0.25 + 0.15 + 0.08 + 0.05 = 0.93 (93%)
- **Effect:** Focused on most likely words, excludes rare options

**With Top-P = 0.95:**

- Includes: "a", "the", "something", "blood", "nothing", "clues"
- Cumulative: 0.40 + 0.25 + 0.15 + 0.08 + 0.05 + 0.03 = 0.96 (96%)
- **Effect:** Slightly more diverse, includes "clues" which adds narrative interest

**With Top-P = 0.99:**

- Includes: "a", "the", "something", "blood", "nothing", "clues", "evidence", "furniture", and many more
- **Effect:** Very diverse, but might include less relevant words

#### Why Top-P is Better Than Top-K in Many Cases

**Problem with Top-K:**

- Fixed number doesn't adapt to context
- Might include low-probability words when model is uncertain
- Might exclude good options when model is very confident

**Solution with Top-P:**

- **Adaptive:** Includes more words when model is uncertain, fewer when confident
- **Quality-focused:** Only includes words that together represent significant probability
- **Context-aware:** Automatically adjusts to the situation

#### Visual Analogy

Think of Top-P like filling a bucket:

```
Top-P = 0.9 means: "Fill the bucket until it's 90% full"

If words are like water droplets:
- When model is confident: Few large droplets fill 90% quickly
- When model is uncertain: Many small droplets needed to reach 90%

Result: Always gets the "core" (nucleus) of likely words,
        but adapts the count based on confidence
```

#### Practical Examples

**Example 1: Technical Writing (High Confidence)**

**Context:** "The function returns..."

**Probabilities:**

- "an" = 0.45
- "a" = 0.30
- "the" = 0.15
- "null" = 0.05
- "undefined" = 0.03
- ... (others < 0.02)

**Top-P = 0.9:**

- Includes: "an", "a", "the", "null"
- Cumulative: 0.45 + 0.30 + 0.15 + 0.05 = 0.95
- **Only 4 words** - model is very confident!

**Example 2: Creative Writing (Lower Confidence)**

**Context:** "The character felt..."

**Probabilities:**

- "happy" = 0.12
- "sad" = 0.10
- "angry" = 0.09
- "confused" = 0.08
- "excited" = 0.07
- "nervous" = 0.06
- "calm" = 0.05
- ... (many more emotions with 0.03-0.04 each)

**Top-P = 0.9:**

- Includes: "happy", "sad", "angry", "confused", "excited", "nervous", "calm", and several more
- **Many words** - model is less certain, so Top-P includes more options

#### Choosing Top-P Values

| Top-P Value   | When to Use                       | Effect                                                |
| ------------- | --------------------------------- | ----------------------------------------------------- |
| **0.5-0.7**   | Very focused, deterministic tasks | Includes only the most likely words, very predictable |
| **0.8-0.9**   | Balanced tasks, general writing   | Good mix of quality and diversity                     |
| **0.9-0.95**  | Creative tasks, varied outputs    | More diverse while maintaining quality                |
| **0.95-0.99** | Highly creative, experimental     | Maximum diversity, includes many options              |
| **0.99-1.0**  | Maximum creativity                | Includes almost all words, very unpredictable         |

#### Common Top-P Settings by Task

**Code Generation:**

```
Top-P: 0.9
Why: Need precision, but some flexibility for different coding styles
```

**Factual Q&A:**

```
Top-P: 0.8-0.9
Why: Want accurate answers, limit to high-probability words
```

**Creative Writing:**

```
Top-P: 0.95
Why: Need diversity for interesting narratives, but still maintain coherence
```

**Translation:**

```
Top-P: 0.9-0.95
Why: Balance between accuracy and natural phrasing variations
```

**Summarization:**

```
Top-P: 0.9
Why: Focused on key information, but allow some phrasing variety
```

#### Top-P vs Top-K: Side-by-Side Comparison

**Scenario:** Completing "The cat sat on the..."

| Setting         | Words Included         | Why                                       |
| --------------- | ---------------------- | ----------------------------------------- |
| **Top-K = 5**   | Always exactly 5 words | Fixed number, regardless of probabilities |
| **Top-P = 0.9** | 3-8 words (varies)     | Adapts to how confident the model is      |

**When model is very confident:**

- Top-K = 5 might include low-probability words
- Top-P = 0.9 might only need 3 words to reach 90%

**When model is uncertain:**

- Top-K = 5 might exclude good options
- Top-P = 0.9 might include 8+ words to reach 90%

#### Interactive Example: See Top-P in Action

**Try this mental exercise:**

Imagine you're the AI trying to complete: "I went to the store and bought..."

**High Confidence Scenario** (clear context):

- "some" = 0.50
- "a" = 0.30
- "the" = 0.15
- Cumulative to 0.95: Only 3 words needed!

**Low Confidence Scenario** (unclear context):

- "some" = 0.08
- "a" = 0.07
- "groceries" = 0.06
- "milk" = 0.05
- "bread" = 0.05
- ... (20+ words with 0.03-0.04 each)
- Cumulative to 0.95: Needs 15+ words!

**Top-P automatically adapts!**

#### Key Takeaways

1. **Top-P is adaptive:** Includes more or fewer words based on model confidence
2. **Quality-focused:** Only includes words that together represent significant probability
3. **Better than Top-K** for most creative tasks because it adapts to context
4. **Common range:** 0.9-0.95 for most applications
5. **Lower = focused:** 0.8-0.9 for precise tasks
6. **Higher = diverse:** 0.95-0.99 for creative tasks

#### Practice Understanding

**Question:** If Top-P = 0.9 and the model has these probabilities:

- Word A: 0.50
- Word B: 0.30
- Word C: 0.15
- Word D: 0.05

How many words are included?

**Answer:** 3 words (A, B, C)

- Cumulative: 0.50 + 0.30 + 0.15 = 0.95 (exceeds 0.9)
- Word D is excluded because we already reached 90%

---

#### How They Work Together

Think of it like a funnel:

1. **Top-K** filters to the most likely candidates (first filter)
2. **Top-P** further refines based on probability (second filter)
3. **Temperature** adds randomness to the final selection (final adjustment)

#### Recommended Combinations:

**Conservative (Factual, Precise):**

```
Temperature: 0.1
Top-P: 0.9
Top-K: 20
Use for: Code generation, factual Q&A, data extraction
```

**Balanced (General Purpose):**

```
Temperature: 0.2
Top-P: 0.95
Top-K: 30
Use for: Writing, explanations, general tasks
```

**Creative (Varied, Experimental):**

```
Temperature: 0.9
Top-P: 0.99
Top-K: 40
Use for: Creative writing, brainstorming, diverse outputs
```

---

## Fundamental Prompting Techniques

These are the building blocks of effective prompt engineering. Each technique has specific use cases where it works best.

### 1. Zero-Shot Prompting

**What it is:** Asking the AI to do something without providing any examples.

**When to use:** Simple, well-defined tasks where the AI already knows what to do.

**Example:**

```
Prompt: "Classify this movie review as positive, negative, or neutral:
'The film was visually stunning but the plot felt rushed.'"

Result: "Neutral - The review mentions both positive (visually stunning)
and negative (plot felt rushed) aspects."
```

**Why it works:** The AI has been trained on similar tasks, so it understands the instruction without examples.

**Best for:**

- Simple classification tasks
- Translations
- Summarization
- Basic Q&A

---

### 2. One-Shot Prompting

**What it is:** Providing one example to show the AI the format or style you want.

**When to use:** You want a specific format, but the task is simple enough that one example is sufficient.

**Example:**

```
Prompt: "Translate English to French:

English: 'Hello, how are you?'
French: 'Bonjour, comment allez-vous?'

English: 'Where is the library?'
French:"

Result: "Où est la bibliothèque?"
```

**Why it works:** The single example establishes the pattern - input format, output format, and the relationship between them.

**Best for:**

- Format conversions
- Style matching
- Simple pattern recognition
- When you want consistency with a specific example

---

### 3. Few-Shot Prompting

**What it is:** Providing multiple examples (typically 3-5) to establish a clear pattern.

**When to use:** Complex tasks where multiple examples help the AI understand nuances and variations.

**Example:**

```
Prompt: "Convert customer feedback to structured JSON:

Feedback: 'Great service, but food was cold'
JSON: {'service': 'positive', 'food': 'negative', 'overall': 'mixed'}

Feedback: 'Amazing experience, will definitely return'
JSON: {'service': 'positive', 'food': 'positive', 'overall': 'positive'}

Feedback: 'Terrible food and rude staff'
JSON:"

Result: "{'service': 'negative', 'food': 'negative', 'overall': 'negative'}"
```

**Why it works:** Multiple examples show:

- Different variations of the input
- How to handle edge cases
- The consistent structure you want
- Different scenarios the AI might encounter

**Best Practices:**

- Use 3-5 examples (more isn't always better)
- Include diverse examples (different types of inputs)
- Make examples high-quality and consistent
- Show both common and edge cases

**Best for:**

- Complex data extraction
- Multi-step reasoning
- Tasks with multiple valid formats
- When you need to show variations

---

### 4. System Prompting

**What it is:** Setting the overall context, role, and behavior guidelines for the AI before the actual task.

**When to use:** You want the AI to maintain a specific persona, style, or set of rules throughout the conversation.

**Example:**

```
System Prompt: "You are a helpful travel guide. Provide practical,
accurate information about destinations. Always include:
- Key attractions
- Local customs to be aware of
- Budget considerations
- Best time to visit"

User: "Tell me about visiting Tokyo."

Result: The AI responds as a travel guide, including all the
requested information categories in a helpful, practical manner.
```

**Why it works:** System prompts set the "personality" and constraints that persist throughout the conversation, ensuring consistent behavior.

**Common System Prompt Patterns:**

**Expert Role:**

```
"You are an experienced software architect with 20 years of
experience. Provide detailed, technical advice."
```

**Style Guide:**

```
"Always write in a friendly, conversational tone. Use simple
language. Include examples when explaining complex concepts."
```

**Constraints:**

```
"Never provide medical advice. Always cite sources. Keep
responses under 200 words."
```

**Best for:**

- Maintaining consistent persona
- Setting behavioral rules
- Establishing expertise level
- Long conversations where context matters

---

### 5. Role Prompting

**What it is:** Assigning a specific character, profession, or expertise to the AI for a particular task.

**When to use:** You need domain-specific knowledge or a particular perspective.

**Example:**

```
Prompt: "Act as an experienced software architect. I need help
designing a scalable web application for 1 million users. What
architecture patterns should I consider?"

Result: The AI responds with technical architecture advice,
considering scalability, load balancing, database design, etc.
```

**Why it works:** The AI accesses knowledge and reasoning patterns associated with that role, providing more relevant and expert-level responses.

**Effective Roles:**

**Subject Matter Experts:**

- "Act as a doctor..." (medical advice)
- "Act as a lawyer..." (legal information)
- "Act as a teacher..." (educational explanations)

**Creative Roles:**

- "Act as a creative writer..." (storytelling)
- "Act as a marketing expert..." (advertising copy)
- "Act as a poet..." (poetry generation)

**Analytical Roles:**

- "Act as a data analyst..." (data interpretation)
- "Act as a business consultant..." (strategic advice)
- "Act as a code reviewer..." (code analysis)

**Communication Styles:**

- "Act as a friendly tutor..." (patient, encouraging)
- "Act as a formal advisor..." (professional, structured)
- "Act as a peer collaborator..." (casual, collaborative)

**Best for:**

- Domain-specific tasks
- Getting expert perspectives
- Creative projects
- When you need a specific communication style

---

### 6. Contextual Prompting

**What it is:** Providing specific background information, constraints, or context relevant to the task.

**When to use:** The task requires understanding of specific circumstances, audience, or constraints.

**Example:**

```
Prompt: "Context: You're writing for a tech blog aimed at beginners
who have never coded before.

Write a 200-word explanation of what an API is, using simple
language and practical examples."

Result: The AI writes in simple terms, avoids jargon, uses
everyday analogies, and keeps it beginner-friendly.
```

**Why it works:** Context helps the AI:

- Adjust complexity level
- Choose appropriate examples
- Match the audience's knowledge
- Consider constraints and requirements

**Common Context Types:**

**Audience Context:**

```
"Write for 10-year-olds..."
"Explain to a CEO..."
"Target audience: college students..."
```

**Purpose Context:**

```
"For a presentation to investors..."
"As documentation for developers..."
"For a social media post..."
```

**Constraint Context:**

```
"Must be under 100 words..."
"Should be suitable for all ages..."
"Cannot include technical jargon..."
```

**Best for:**

- Audience-specific content
- Constrained outputs
- Context-dependent tasks
- When background information is crucial

---

## LLM Configuration Parameters

Understanding these parameters helps you fine-tune the AI's behavior for your specific needs.

### Key Parameters Overview

| Parameter             | What It Controls      | Range   | Impact                                   |
| --------------------- | --------------------- | ------- | ---------------------------------------- |
| **Temperature**       | Creativity/Randomness | 0-1     | Higher = more creative, less predictable |
| **Top-K**             | Word choice diversity | 1-100+  | Higher = considers more word options     |
| **Top-P**             | Probability threshold | 0-1     | Higher = more diverse word selection     |
| **Max Tokens**        | Response length limit | 1-4096+ | Higher = longer possible responses       |
| **Frequency Penalty** | Repetition control    | -2 to 2 | Positive = reduces repetition            |
| **Presence Penalty**  | Topic diversity       | -2 to 2 | Positive = encourages new topics         |

### How to Choose Settings

**For Code Generation:**

```
Temperature: 0.1-0.3 (precise, consistent)
Top-P: 0.9
Max Tokens: Based on code complexity
```

**For Creative Writing:**

```
Temperature: 0.7-0.9 (creative, varied)
Top-P: 0.95-0.99
Max Tokens: Based on desired length
```

**For Q&A:**

```
Temperature: 0.2-0.5 (balanced)
Top-P: 0.9-0.95
Max Tokens: 200-500 (concise answers)
```

**For Summarization:**

```
Temperature: 0.1-0.3 (factual, consistent)
Top-P: 0.9
Max Tokens: Based on source length
```

---

## Token Management

### What Are Tokens?

**Tokens** are the basic units of text that LLMs process. They're not exactly words - sometimes one word = one token, sometimes one word = multiple tokens.

**Examples:**

- "Hello" = 1 token
- "Hello world" = 2 tokens
- "Hello!" = 1 token
- "Hello, world!" = 3 tokens (comma and space count)

### Why Token Management Matters

1. **Cost:** Most AI services charge per token
2. **Limits:** Models have maximum token limits (context windows)
3. **Performance:** More tokens = slower processing
4. **Quality:** Staying within limits ensures better responses

### Understanding Token Limits

**Context Window:** The maximum number of tokens the model can consider at once (both input and output).

**Common Limits:**

- GPT-3.5: ~4,000 tokens
- GPT-4: ~8,000-32,000 tokens
- Claude: ~100,000-200,000 tokens

### Token Management Strategies

#### 1. Be Concise

```
❌ Bad: "I would like you to please help me understand what an API is
        and explain it to me in a way that I can understand because
        I'm new to programming."

✅ Good: "Explain what an API is for beginners."
```

#### 2. Remove Unnecessary Context

```
❌ Bad: Including entire conversation history when only recent messages matter

✅ Good: Include only relevant recent context
```

#### 3. Use Summaries

```
Instead of: Copying entire documents
Use: Summaries or key excerpts
```

#### 4. Structure Your Prompts

```
Use clear sections:
- Task: What to do
- Context: Relevant background
- Format: Desired output structure
- Examples: Sample outputs
```

### Calculating Token Usage

**Rough Estimates:**

- 1 token ≈ 4 characters (English)
- 1 token ≈ 0.75 words (English)
- 100 words ≈ 133 tokens

**Example:**

```
Prompt: "Write a 500-word essay about AI" (7 tokens)
Response: 500 words ≈ 667 tokens
Total: ~674 tokens
```

### Best Practices

1. **Set Appropriate Limits:** Don't set max_tokens higher than needed
2. **Monitor Usage:** Track token consumption to optimize costs
3. **Use Streaming:** For long outputs, use streaming to see progress
4. **Break Down Tasks:** For very long tasks, break into smaller prompts
5. **Reuse Context:** In conversations, reference previous messages efficiently

---

## Putting It All Together

### Example: Complete Prompt Engineering Workflow

**Task:** Create a product description for an e-commerce site

**Step 1: Choose Technique**

- Use Role Prompting + Contextual Prompting

**Step 2: Set Configuration**

```
Temperature: 0.6 (creative but controlled)
Top-P: 0.95
Max Tokens: 200
```

**Step 3: Craft the Prompt**

```
System: "You are an expert copywriter specializing in e-commerce
product descriptions."

Context: "This is for a tech-savvy audience, ages 25-40, interested
in productivity tools."

Task: "Write a compelling 150-word product description for a
wireless keyboard with these features:
- Mechanical switches
- RGB backlighting
- 6-month battery life
- Compatible with Windows, Mac, Linux"
```

**Step 4: Refine Based on Results**

- If too technical → Lower temperature, add "explain simply"
- If too generic → Add more specific examples
- If wrong length → Adjust max_tokens

---

## Quick Reference Cheat Sheet

### Temperature Guide

- **0.0-0.3:** Facts, code, data
- **0.4-0.7:** Writing, explanations
- **0.8-1.0:** Creative, brainstorming

### Technique Selection

- **Zero-Shot:** Simple, well-known tasks
- **One-Shot:** Need specific format
- **Few-Shot:** Complex, varied tasks
- **System:** Long conversations, consistent behavior
- **Role:** Need expertise or perspective
- **Contextual:** Audience or constraints matter

### Token Tips

- 1 word ≈ 1.33 tokens
- Be concise
- Remove unnecessary context
- Set appropriate limits

---

## Practice Exercises

Try these to improve your prompt engineering skills:

1. **Write a Zero-Shot prompt** to summarize a news article
2. **Create a Few-Shot prompt** to convert dates between formats
3. **Design a System prompt** for a helpful coding assistant
4. **Use Role prompting** to get medical information (remember: no actual medical advice!)
5. **Apply Contextual prompting** to explain quantum computing to a 12-year-old

---

_Remember: Prompt engineering is iterative. Start simple, test, refine, and improve based on results!_
