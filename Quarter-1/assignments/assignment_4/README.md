# Setting Up Claude Code Router with Qwen and Creating Custom Agents

**Posted:** Jan 4, 2026  
**Points:** TBD  
**Due Date:** TBD

## 🎥 Video Tutorial

👉 [Setup Claude Code Router with Qwen](https://www.youtube.com/watch?v=VVaekyt-kEc)

## 🎯 Assignment Objective

In this assignment, you will:

1. Set up Claude Code Router with Qwen integration
2. Create a custom project with Claude.md (Project Brain File)
3. Create custom subagents using Claude Code CLI

## 📋 Prerequisites

- Node.js installed (from Assignment 1)
- VS Code installed
- Git Bash or Terminal ready
- Claude Code CLI installed (from Assignment 3)

## 📝 Task Instructions

### Step 1: Install Claude, Claude Code Router, and Qwen Code

Open your terminal (Command Prompt, PowerShell, or Git Bash) and run the following commands:

```bash
# Install Qwen Code
npm install -g @qwen-code/qwen-code@latest

# Install Claude Code and Claude Code Router
npm install -g @anthropic-ai/claude-code @musistudio/claude-code-router
```

### Step 2: Verify Qwen Installation and Authentication

After installation, verify and authenticate Qwen:

1. First, check the Qwen version to verify installation:

   ```bash
   qwen --version
   ```

2. Then, run Qwen in the terminal:

   ```bash
   qwen
   ```

3. You will see authentication options. Select **Qwen OAuth** (use arrow keys to select and press Enter)
4. Follow the prompts to complete authentication

### Step 4: Add the Config File

1. Update config file (`.claude-code-router.json`)
2. Paste the following configuration:

```json
{
  "LOG": true,
  "LOG_LEVEL": "info",
  "HOST": "127.0.0.1",
  "PORT": 3456,
  "API_TIMEOUT_MS": 600000,
  "Providers": [
    {
      "name": "qwen",
      "api_base_url": "https://portal.qwen.ai/v1/chat/completions",
      "api_key": "YOUR_QWEN_ACCESS_TOKEN_HERE",
      "models": ["qwen3-coder-plus", "qwen3-coder-plus", "qwen3-coder-plus"]
    }
  ],
  "Router": {
    "default": "qwen,qwen3-coder-plus",
    "background": "qwen,qwen3-coder-plus",
    "think": "qwen,qwen3-coder-plus",
    "longContext": "qwen,qwen3-coder-plus",
    "longContextThreshold": 60000,
    "webSearch": "qwen,qwen3-coder-plus"
  }
}
```

3. **Important:** Replace `YOUR_QWEN_ACCESS_TOKEN_HERE` with your actual Qwen access token (obtained from Qwen authentication)

### Step 3: Create Project Folder and Setup

1. Create a new folder anywhere on your computer (e.g., `my-claude-project`)
2. Open the folder in VS Code
3. Open the integrated terminal in VS Code (Terminal → New Terminal)

### Step 5: Start Claude Code Router

1. In the first terminal, run:

   ```bash
   ccr start
   ```

2. Wait for the router to start successfully
3. Keep this terminal running (do not close it)

### Step 6: Connect to Claude Code Router

1. Open a **new terminal** in VS Code (Terminal → New Terminal)
2. In the new terminal, run:

   ```bash
   ccr code
   ```

3. You should now be connected to Claude Code Router

### Step 7: Create Claude.md (Project Brain File)

In the `ccr code` terminal, use the following prompt to create a `Claude.md` file:

```
Create a Claude.md file for this project with the following specifications:
- This is a Next.js project
- Using App Router architecture
- Source code is located in the src directory
- Include project structure, technology stack, and development guidelines
```

**Expected Output:** A `Claude.md` file should be created in your project root with project specifications.

### Step 8: Create a Custom Subagent

1. In the `ccr code` terminal, use the `/agents` command:

   ```bash
   /agents
   ```

2. Follow the prompts to create a new agent, or use this prompt:

   ```
   Create a new subagent with the following specifications:
   - Agent Name: ProjectAssistant
   - Purpose: Help with Next.js project development and debugging
   - Capabilities: Code review, bug fixing, feature implementation
   - Instructions: Follow Next.js best practices, use TypeScript, maintain clean code structure
   ```

3. Complete the agent creation process
4. Verify the agent was created successfully

## 📸 Submission Requirements

Please submit the following screenshots:

1. **Screenshot 1:** Terminal showing successful installation of all packages (Qwen Code, Claude Code, Claude Code Router)
2. **Screenshot 2:** Terminal showing `ccr start` running successfully
3. **Screenshot 3:** Terminal showing `ccr code` connected
4. **Screenshot 4:** VS Code showing the created `Claude.md` file with its contents
5. **Screenshot 5:** Terminal showing the created subagent using `/agents` command

**Note:** All screenshots should clearly show:

- The commands executed
- The outputs/responses
- File contents where applicable

## 📖 Reference Links

- **Claude Code Setup Guide:** [Free Claude Setup](https://agentfactory.panaversity.org/docs/AI-Tool-Landscape/claude-code-features-and-workflows/free-claude-setup)
- **Qwen Code Documentation:** [Qwen Code GitHub](https://github.com/QwenLM/Qwen)
- **Claude Code Router:** [Claude Code Router Documentation](https://github.com/musistudio/claude-code-router)
- **Next.js App Router:** [Next.js App Router Documentation](https://nextjs.org/docs/app)

## 🔍 Verification Checklist

Before submitting, ensure:

- [ ] All packages installed successfully
- [ ] Qwen authentication completed
- [ ] `ccr start` is running without errors
- [ ] `ccr code` connects successfully
- [ ] `Claude.md` file created with proper content
- [ ] Custom subagent created using `/agents` command
- [ ] All required screenshots captured

---

_Assignment 4: Claude Code Router Setup with Qwen and Custom Agents_
