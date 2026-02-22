# TODO Tracker CLI — Research & Design Document

> Multi-perspective design exploration conducted 2026-02-22 with three parallel agents: UX Designer, Technical Architect, and Devil's Advocate.

---

## Table of Contents

- [Executive Summary](#executive-summary)
- [Competitive Analysis](#competitive-analysis)
- [UX Design](#ux-design)
- [Technical Architecture](#technical-architecture)
- [Risk Analysis](#risk-analysis)
- [Synthesis & Recommendations](#synthesis--recommendations)

---

## Executive Summary

**Verdict:** Viable, but only with sharp positioning.

Five SERIOUS risks identified, zero FATAL. The tool succeeds only if positioned as:

> **"CI-native TODO debt tracker with trend analysis — scan, measure, enforce."**

This sidesteps the crowded IDE extension market (TODO Tree has 6.8M installs) and targets the gap no tool fills well: CI enforcement with trend analysis.

---

## Competitive Analysis

### Existing Tools and Their Gaps

| Tool | Strengths | Weaknesses |
|------|-----------|------------|
| **leasot** | 49+ languages, multiple reporters (table/json/xml/markdown), CI-friendly | No git blame, no age tracking, no stats, flat output only, no interactive mode |
| **todo-tree** (VS Code) | Tree view, color coding, filtering by tag, click-to-navigate | Editor-locked (VS Code only), no CLI, no CI integration |
| **tickgit** | Git blame, age tracking, author stats, web UI | Limited language support, no configurable output, stale maintenance |
| **ianlewis/todos** | Smart comment parsing (ignores strings), git blame (experimental), Go-fast | Minimal output formatting, no stats, no CI helpers |
| **fixme** (npm) | Scans for 7 tag types, simple API | No color output, no grouping, no git integration, no JSON output |
| **grep/ripgrep** | Blazing fast, universal | False positives in strings/code, no semantic understanding, no metadata |
| **todocheck** | Links TODOs to Jira/GitHub issues, validates open tickets | Narrow scope, no trend analysis |
| **todo-to-issue** (GH Action) | Auto-creates GitHub issues from TODOs | No local dev experience, GitHub-only |
| **eslint-plugin-unicorn** | `expiring-todo-comments` with date/version triggers | JS/TS only, no git blame, limited to lint-time |

### Key Gap

No tool combines fast scanning + git blame + trend analysis + CI enforcement in one package.

---

## UX Design

### Command Structure

```
todo <command> [options]

Commands:
  todo scan [path]       Scan codebase for TODO comments (default command)
  todo list [path]       Alias for scan with table output
  todo stats [path]      Show statistics and summary dashboard
  todo blame [path]      Show TODOs with git blame info (author, date)
  todo age [path]        Show TODOs sorted by age (oldest first)
  todo diff              Show TODOs in uncommitted or staged changes only
  todo watch [path]      Watch for new TODOs in real-time (file watcher)
  todo init              Create .todorc config file interactively
  todo ci                CI mode: exit 1 if thresholds exceeded

Aliases:
  todo                   (no args) => todo scan .
  todo ls                => todo list
  todo s                 => todo stats
  todo b                 => todo blame
```

### Global Flags

```
--json                   Output as JSON (machine-readable)
--csv                    Output as CSV
--format <reporter>      Output format: table|json|csv|markdown|junit
--tags <tags>            Comma-separated tags: TODO,FIXME,HACK,BUG,XXX
--ignore <glob>          Glob patterns to ignore (repeatable)
--include <glob>         Only scan matching files
--no-color               Disable colored output
--verbose / -v           Verbose output with debug info
--quiet / -q             Minimal output (counts only)
--config <path>          Path to config file
--sort <field>           Sort by: file|line|tag|age|author|priority
--group-by <field>       Group by: file|tag|author|priority
--max-age <days>         Filter: only TODOs older than N days
--since <date>           Filter: only TODOs added after date
--author <name>          Filter: only TODOs by author
```

### Sample Output: `todo scan`

```
  TODO Tracker v1.0.0 -- Scanning ./src ...

  Found 23 TODOs across 8 files

  src/auth/login.ts
    17 | TODO   | Implement rate limiting for failed attempts
    42 | FIXME  | Token refresh race condition
    88 | HACK   | Temporary workaround for Safari cookie bug

  src/api/users.ts
    5  | TODO   | Add pagination to user list endpoint
    31 | TODO   | Validate email format before DB insert

  src/utils/cache.ts
    12 | FIXME  | Memory leak when cache exceeds 10k entries
    67 | BUG    | TTL calculation off by one

  Summary:  14 TODO  5 FIXME  2 HACK  2 BUG
```

Color scheme: TODO (yellow), FIXME (red), HACK (magenta), BUG (red bold), XXX (red), NOTE (cyan), file paths (bold white), line numbers (dim gray).

### Sample Output: `todo stats`

```
  TODO Tracker -- Statistics Dashboard

  Total: 23 comments across 8 files

  By Tag:
    TODO   ██████████████░░░░░░  14  (61%)
    FIXME  ██████░░░░░░░░░░░░░░   5  (22%)
    HACK   ███░░░░░░░░░░░░░░░░░   2  ( 9%)
    BUG    ███░░░░░░░░░░░░░░░░░   2  ( 9%)

  By File (top 5):
    src/auth/login.ts      ██████  6
    src/api/users.ts       ████    4
    src/utils/cache.ts     ███     3
    src/db/migrations.ts   ██      2
    src/routes/index.ts    ██      2

  Age Distribution:
    < 1 week       ████    4
    1-4 weeks      ██████  6
    1-3 months     ████    5
    3-6 months     ███     3
    > 6 months     █████   5  (stale!)

  Avg Age: 47 days | Oldest: 198 days (src/db/migrations.ts:12)
```

### Sample Output: `todo blame`

```
  TODO Tracker -- Blame View

  src/auth/login.ts
    17 | TODO  | zaib       | 3 days ago   | Implement rate limiting
    42 | FIXME | ahmed      | 2 months ago | Token refresh race condition
    88 | HACK  | zaib       | 6 months ago | Safari cookie workaround

  src/api/users.ts
    5  | TODO  | unassigned | 1 week ago   | Add pagination
    31 | TODO  | fatima     | 3 weeks ago  | Validate email format

  By Author:
    zaib       8 TODOs  (avg age: 34 days)
    ahmed      6 TODOs  (avg age: 52 days)
    fatima     5 TODOs  (avg age: 21 days)
    unassigned 4 TODOs  (avg age: 12 days)
```

### Sample Output: `todo diff`

```
  TODO Tracker -- Changes Only (unstaged + staged)

  + src/auth/login.ts:17    TODO  Implement rate limiting (new)
  + src/api/users.ts:5      TODO  Add pagination (new)
  ~ src/utils/cache.ts:12   FIXME Memory leak (modified context)
  - src/routes/old.ts:33    TODO  Removed: legacy route handler

  Net: +2 TODOs | 1 modified | 1 removed
```

### Sample Output: `todo --json`

```json
{
  "version": "1.0.0",
  "timestamp": "2026-02-22T10:30:00Z",
  "summary": {
    "total": 23,
    "byTag": { "TODO": 14, "FIXME": 5, "HACK": 2, "BUG": 2 },
    "files": 8
  },
  "items": [
    {
      "file": "src/auth/login.ts",
      "line": 17,
      "column": 5,
      "tag": "TODO",
      "text": "Implement rate limiting for failed attempts",
      "author": "zaib",
      "date": "2026-02-19",
      "age_days": 3,
      "priority": "medium",
      "ref": "abc1234"
    }
  ]
}
```

### Configuration: `.todorc.json`

```json
{
  "tags": ["TODO", "FIXME", "HACK", "BUG", "XXX", "NOTE", "OPTIMIZE"],
  "ignore": [
    "node_modules/**",
    "dist/**",
    "*.min.js",
    "coverage/**",
    ".git/**"
  ],
  "include": ["src/**", "lib/**", "tests/**"],
  "thresholds": {
    "maxTotal": 50,
    "maxPerFile": 10,
    "maxAge": 90,
    "failOnNew": false
  },
  "priority": {
    "BUG": "critical",
    "FIXME": "high",
    "HACK": "high",
    "TODO": "medium",
    "NOTE": "low",
    "OPTIMIZE": "low"
  },
  "output": {
    "format": "table",
    "groupBy": "file",
    "sort": "priority",
    "color": true
  },
  "git": {
    "blame": true,
    "diffOnly": false
  }
}
```

### Workflow Integration

#### Pre-commit Hook

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: todo-check
        name: Check TODO count
        entry: todo ci --diff-only --fail-on-new
        language: system
        pass_filenames: false
```

#### GitHub Actions

```yaml
# .github/workflows/todo-check.yml
name: TODO Tracker
on: [pull_request]

jobs:
  todo-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install todo-tracker
        run: npm install -g todo-tracker-cli

      - name: Check TODO thresholds
        run: todo ci --format=junit --max-total=50 --max-age=90

      - name: Comment PR with TODO summary
        if: always()
        run: todo diff --format=markdown >> $GITHUB_STEP_SUMMARY
```

#### PR Comment Output

```
## TODO Tracker Report

| Metric         | Value | Threshold | Status |
|---------------|-------|-----------|--------|
| Total TODOs    | 23    | 50        | PASS   |
| New in PR      | +2    | --        | INFO   |
| Oldest TODO    | 198d  | 90d       | WARN   |
| FIXME count    | 5     | --        | INFO   |

### New TODOs in this PR:
- `src/auth/login.ts:17` -- TODO: Implement rate limiting
- `src/api/users.ts:5` -- TODO: Add pagination
```

#### CI Exit Codes

```
Exit 0: All thresholds met
Exit 1: Threshold exceeded (total, age, per-file)
Exit 2: Configuration error
```

### DX Polish

#### Error Messages

```
Error: Could not read .todorc.json

  The config file at ./.todorc.json contains invalid JSON.
  Line 12: Unexpected token '}' (missing comma on line 11?)

  Hint: Run `todo init` to generate a valid config file.
```

```
Error: No files found matching pattern 'src/**/*.rs'

  The directory ./src/ exists but contains no .rs files.
  Did you mean: src/**/*.ts (found 42 files)

  Hint: Check your 'include' patterns in .todorc.json
```

### Design Principles

1. **Scan-first, zero-config**: `todo` with no args works immediately
2. **Progressive disclosure**: Simple defaults, deep configurability
3. **Git-native**: Blame, age, and diff are first-class citizens
4. **Machine-friendly**: Every command has `--json`, meaningful exit codes, pipeable output
5. **Human-friendly**: Colors, grouping, progress bars, helpful error suggestions
6. **CI-first**: `todo ci` is purpose-built for pipelines
7. **UNIX conventions**: stdin/stdout, exit codes, `--no-color`, compose with `|` and `jq`

---

## Technical Architecture

### Language Choice: Rust

| Criteria            | Rust   | Go     | Node.js | Python |
|---------------------|--------|--------|---------|--------|
| Raw scan speed      | A+     | A      | B       | C      |
| Startup time        | A+     | A      | C       | D      |
| Binary distribution | A+     | A+     | C       | D      |
| Memory efficiency   | A+     | A      | B       | C      |
| Ecosystem (CLI)     | A      | A      | A+      | B      |
| Contributor access  | B      | A      | A+      | A+     |
| Cross-platform      | A      | A      | A       | B      |
| Regex performance   | A+     | B      | B       | C      |

Rust wins because ripgrep proves the model: SIMD-accelerated regex, parallel directory walking, memory-mapped I/O, single static binary.

### Parsing Strategy: Hybrid (Regex-First + Optional Tree-Sitter)

#### Tier 1: Regex (Default, Fast Path)

```
Pattern: (?i)\b(TODO|FIXME|HACK|XXX|BUG|NOTE|WARN|PERF|SAFETY)\b[\s:]*(.*)
```

Language-specific comment prefix detection:

| Language Family | Comment Syntax |
|----------------|----------------|
| C-family | `// ...` , `/* ... */` |
| Python/Ruby | `# ...` |
| HTML/XML | `<!-- ... -->` |
| Haskell | `-- ...` |
| Lua | `-- ...` , `--[[ ... ]]` |
| SQL | `-- ...` , `/* ... */` |
| Shell/YAML | `# ...` |

#### Tier 2: Tree-Sitter AST (Opt-In, Precision Path)

```
todo scan --parser=tree-sitter
```

Only matches TODOs inside actual comment AST nodes. 3-10x slower than regex but eliminates false positives in strings/URLs.

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     todo-tracker CLI                             │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    CLI Interface (clap)                     │  │
│  │  scan | diff | stats | blame | ci | init | watch           │  │
│  └────────────────────────────┬──────────────────────────────┘  │
│                               │                                  │
│  ┌────────────────────────────▼──────────────────────────────┐  │
│  │                    Command Router                          │  │
│  └──┬──────────┬──────────┬──────────┬──────────┬───────────┘  │
│     │          │          │          │          │               │
│  ┌──▼───┐  ┌──▼───┐  ┌──▼───┐  ┌──▼───┐  ┌──▼──────────┐   │
│  │ Scan │  │Watch │  │Query │  │Stats │  │ Config/Init │   │
│  │Engine│  │Daemon│  │Engine│  │Aggr. │  │  Manager    │   │
│  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘  └─────────────┘   │
│     │         │         │         │                           │
│  ┌──▼─────────▼─────────▼─────────▼──────────────────────┐   │
│  │              Core Processing Pipeline                  │   │
│  │                                                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │  Walker  │  │  Parser  │  │ Enricher │            │   │
│  │  │ (ignore  │──│ (regex / │──│ (git     │            │   │
│  │  │  crate)  │  │ tree-sit)│  │  blame)  │            │   │
│  │  └──────────┘  └──────────┘  └──────────┘            │   │
│  └────────────────────────┬──────────────────────────────┘   │
│                           │                                   │
│  ┌────────────────────────▼──────────────────────────────┐   │
│  │                  Storage Layer                         │   │
│  │  ┌──────────────┐     ┌───────────────────────────┐   │   │
│  │  │  SQLite Cache │     │  Config (.todo-tracker.toml)│   │   │
│  │  │  (rusqlite)  │     │                           │   │   │
│  │  └──────────────┘     └───────────────────────────┘   │   │
│  └────────────────────────┬──────────────────────────────┘   │
│                           │                                   │
│  ┌────────────────────────▼──────────────────────────────┐   │
│  │                  Output Layer                          │   │
│  │  table | json | sarif | csv | markdown | count | tpl  │   │
│  └───────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Performance Architecture

**Target:** 100k+ files in under 5 seconds (cold), under 1 second (warm/incremental).

Key strategies:
- **Parallel directory walking** via the `ignore` crate (same as ripgrep)
- **Work stealing** with rayon for load balancing across threads
- **Memory-mapped I/O** for files > 64KB, buffered read for smaller files
- **SIMD-accelerated regex** (AVX2/SSE2/NEON) scanning 32 bytes at a time
- **Early termination** for binary files (detected via first 8KB)

### Incremental Scanning

```
1. Load cache (SQLite: file_path -> last_modified)
2. Walk directory tree
3. For each file:
   - mtime unchanged?     -> Use cached TODOs
   - mtime changed?
     - content hash same? -> Update mtime only
     - content hash diff? -> Re-scan, update cache
4. Remove entries for deleted files
5. Write updated cache in single transaction
```

### Data Model

```rust
struct TodoItem {
    // Identity
    id:           String,          // SHA256(file_path + line + text)[:16]

    // Location
    file_path:    String,          // Relative to project root
    line:         u32,             // 1-indexed
    column:       u32,             // 1-indexed
    end_line:     u32,
    end_column:   u32,

    // Content
    tag:          TodoTag,         // TODO | FIXME | HACK | XXX | BUG | NOTE | custom
    priority:     Priority,        // Critical | High | Medium | Low | None
    text:         String,          // The TODO message text
    context:      Vec<String>,     // N surrounding lines

    // Git Metadata (optional)
    author:       Option<String>,
    author_email: Option<String>,
    date_added:   Option<DateTime>,
    commit_sha:   Option<String>,

    // Classification
    tags:         Vec<String>,     // User-defined: #urgent, #api, #debt
    language:     String,

    // Tracking
    first_seen:   DateTime,
    last_seen:    DateTime,
    scan_id:      String,
}
```

### Tag Parsing Conventions

```
TODO: basic todo                          -> tag=Todo, priority=Medium
TODO(P0): critical thing                  -> tag=Todo, priority=Critical
TODO(@alice): assigned todo               -> tag=Todo, author hint="alice"
TODO(#api): tagged todo                   -> tag=Todo, tags=["api"]
TODO(P1, #backend, @bob): rich todo       -> tag=Todo, priority=High, tags=["backend"]
FIXME: broken thing                       -> tag=Fixme, priority=Medium
HACK: temporary workaround               -> tag=Hack, priority=Medium
```

### SQLite Schema

```sql
CREATE TABLE scans (
    id          TEXT PRIMARY KEY,
    started_at  TEXT NOT NULL,
    finished_at TEXT,
    root_path   TEXT NOT NULL,
    files_scanned INTEGER DEFAULT 0,
    todos_found   INTEGER DEFAULT 0,
    scan_type   TEXT NOT NULL        -- 'full' | 'incremental'
);

CREATE TABLE files (
    path         TEXT PRIMARY KEY,
    mtime        INTEGER NOT NULL,
    content_hash TEXT NOT NULL,       -- xxHash64
    language     TEXT,
    last_scan_id TEXT REFERENCES scans(id)
);

CREATE TABLE todos (
    id           TEXT PRIMARY KEY,
    file_path    TEXT NOT NULL REFERENCES files(path) ON DELETE CASCADE,
    line         INTEGER NOT NULL,
    column_start INTEGER NOT NULL,
    end_line     INTEGER NOT NULL,
    end_column   INTEGER NOT NULL,
    tag          TEXT NOT NULL,
    priority     TEXT DEFAULT 'medium',
    text         TEXT NOT NULL,
    context_before TEXT,              -- JSON array
    context_after  TEXT,              -- JSON array
    author       TEXT,
    author_email TEXT,
    date_added   TEXT,
    commit_sha   TEXT,
    user_tags    TEXT,                -- JSON array
    language     TEXT,
    first_seen   TEXT NOT NULL,
    last_seen    TEXT NOT NULL,
    scan_id      TEXT REFERENCES scans(id)
);

CREATE INDEX idx_todos_file ON todos(file_path);
CREATE INDEX idx_todos_tag ON todos(tag);
CREATE INDEX idx_todos_priority ON todos(priority);
CREATE INDEX idx_todos_author ON todos(author);
CREATE INDEX idx_todos_date ON todos(date_added);
CREATE INDEX idx_files_mtime ON files(mtime);
```

### Output Formats

| Format | Use Case |
|--------|----------|
| `table` | Human terminal output (default) |
| `json` | Machine-readable, piping to `jq` |
| `sarif` | GitHub Code Scanning integration |
| `csv` | Spreadsheet import |
| `markdown` | PR comments, docs embedding |
| `junit` | CI test reporters |
| `count` | Summary counts only |
| `template` | Custom Handlebars templates |

### Plugin System

**v1 (launch):** Config-driven only. Custom tags, patterns, ignore rules, language mappings via `.todo-tracker.toml`.

**v2 (post-launch):** WASM plugin runtime via `wasmtime` for custom parsers, reporters, and enrichers.

### Key Crate Dependencies

| Crate | Purpose |
|-------|---------|
| `clap` | CLI argument parsing with derive macros |
| `ignore` | Parallel directory walking + .gitignore (from ripgrep) |
| `regex` | SIMD-accelerated regex engine |
| `rayon` | Data parallelism for file processing |
| `rusqlite` | SQLite cache and query storage |
| `serde` | JSON/TOML serialization |
| `notify` | Cross-platform file system watching |
| `git2` | Git blame integration (libgit2) |
| `tree-sitter` | AST parsing (feature-gated, opt-in) |
| `xxhash-rust` | Fast content hashing for cache invalidation |
| `chrono` | Date/time handling |

### Distribution Strategy

| Channel | Command |
|---------|---------|
| Cargo | `cargo install todo-tracker` |
| Homebrew | `brew install todo-tracker` |
| npm | `npm install -g @todo-tracker/cli` |
| Binaries | GitHub Releases (linux-x64, linux-arm64, macos-x64, macos-arm64, windows-x64) |
| Docker | `ghcr.io/todo-tracker/todo-tracker` |
| Install script | `curl -fsSL install.todo-tracker.dev \| sh` |

npm distribution uses the esbuild/biome pattern: detect platform at install time, download correct native binary via `optionalDependencies`.

---

## Risk Analysis (Devil's Advocate)

### 1. Does This Need to Exist?

**Severity: SERIOUS**

`grep -rn "TODO" .` already works. The landscape is crowded: TODO Tree (6.8M installs), todocheck, todo-to-issue, eslint-plugin-unicorn's `expiring-todo-comments`, and more.

**Honest assessment:** For any single feature, a tool already exists. The 10x play is combining scanning + git blame + trend analysis + CI enforcement into one cohesive tool. But that is larger scope.

**Target audience:** Teams large enough to have TODO discipline problems but not large enough to have Jira/Linear workflows replacing inline TODOs. This is a narrow but real audience.

**Mitigation:** Define the unique value proposition precisely: "ripgrep + git blame + trend reporting + CI enforcement in one command."

### 2. Adoption Barriers

**Severity: SERIOUS**

- IDE extensions dominate developer mindshare (always-on vs occasional CLI)
- Teams using Jira/Linear see inline TODOs as an anti-pattern
- `grep` has zero learning curve; new tools must justify themselves in 30 seconds

**Mitigation:** Position as a CI/pre-commit tool. The "aha moment" should be a PR check saying "This PR adds 3 TODOs and resolves 0."

### 3. The TODO Graveyard Problem

**Severity: SERIOUS**

Real-world data:
- **Kubernetes:** 2,000+ TODOs, average age 2.3 years
- **Linux kernel:** 3,000+ TODOs, many over a decade old
- **Median TODO lifetime:** 246 days (heavily right-skewed)
- **ACM study (2022):** TODO bots encouraged MORE TODOs but did NOT speed up resolution

Tracking creates a beautifully organized graveyard. Developers feel productive seeing a dashboard, but resolution rate stays the same.

**Mitigation:** Build age-based warnings and staleness enforcement (`--max-age`). Consider expiration conditions. Without enforcement, tracking alone may be counterproductive.

### 4. Edge Cases That Break Parsing

**Severity: MANAGEABLE**

| Edge Case | Severity |
|-----------|----------|
| TODO in string literals | High |
| TODO in URLs | High |
| Multi-line TODOs | High |
| TODO in test fixtures | Medium |
| Comments-in-comments | Medium |
| Generated/vendored code | High |
| Non-UTF8 files | Medium |
| Symlinks | Medium |
| Git submodules | Medium |
| Polyglot files | Medium |
| TODO as variable name | Medium |
| Binary files | Low |
| Massive files (>100MB) | Low |

**Mitigation:** Word-boundary regex `\bTODO\b`, respect `.gitignore`, provide `--exclude`. Accept false positives in strings and document the limitation. Tree-sitter opt-in for precision.

### 5. Git Blame Limitations

**Severity: SERIOUS**

- Blame shows last modifier, not original author
- Squash merges (GitHub default) destroy intermediate history
- Rebases rewrite commit SHAs
- Shallow clones (`--depth 1`) have no blame data
- `.git-blame-ignore-revs` is not universally adopted

**Mitigation:**
- Document blame as "best effort"
- Detect shallow clones and warn/skip
- Use `git log -S "TODO"` (pickaxe) as alternative for finding original author
- Make blame optional; tool must work fully without git

### 6. Scope Creep — The Issue Tracker Trap

**Severity: SERIOUS**

Natural feature progression leads to reinventing Jira:
scan -> blame -> trends -> priorities -> assignees -> due dates -> dashboard -> Jira sync

**Features to explicitly NOT build:**
- No web UI / dashboard
- No issue tracker sync
- No assignee management beyond git blame
- No priority system beyond tag keywords
- No notifications or reminders
- No authentication or multi-user features

**Mitigation:** Define a v1 feature freeze. Follow Unix philosophy: JSON output piped to other tools, not monolithic.

### 7. Alternative Form Factors

**Severity: MANAGEABLE**

| Form Factor | Pros | Cons |
|-------------|------|------|
| CLI tool | Works everywhere, CI-friendly | Not always-on |
| LSP server | Real-time, any editor | Complex, duplicates built-in highlighting |
| ESLint/Biome plugin | Existing lint pipeline | JS/TS only, no git blame |
| GitHub Action | Zero install | No local experience, GitHub-only |
| VS Code extension | Richest UX | VS Code only, already exists (6.8M installs) |

**Verdict:** CLI is correct if the differentiator is CI integration. Design as library-first with CLI wrapper for future form factors.

### 8. Failure Modes

| Failure Mode | Likelihood | Impact | Mitigation |
|-------------|------------|--------|------------|
| Slow on monorepos | High | Medium | ripgrep-level perf (0.06s for Linux kernel), stream results |
| No git available | Medium | Low | Degrade gracefully, scan without blame/history |
| Stale cache | Medium | Medium | mtime + content hash invalidation |
| Non-UTF8 files | Low | Low | Detect encoding, skip binary, warn on errors |
| Permission errors | Low | Low | Skip inaccessible files with warning |
| Massive monorepo (>1M files) | Low | High | Streaming/pagination for output |

### Risk Summary Matrix

| Risk | Severity | Mitigatable? |
|------|----------|-------------|
| Crowded market / unclear value prop | SERIOUS | Yes, with precise niche |
| TODO graveyard (tracking != resolving) | SERIOUS | Partially — enforcement helps |
| Git blame unreliability | SERIOUS | Yes — make optional, use pickaxe |
| Scope creep toward issue tracker | SERIOUS | Yes — strict feature freeze |
| IDE extensions dominate | SERIOUS | Yes — target CI, not IDE |
| Parsing edge cases | MANAGEABLE | Yes — accept imperfection |
| Failure modes | MANAGEABLE | Yes — standard engineering |
| Alternative form factors | MANAGEABLE | CLI is fine if positioned correctly |

---

## Synthesis & Recommendations

### Convergence Points (All Three Perspectives Agreed)

| Decision | Rationale |
|----------|-----------|
| **Rust** | ripgrep proves the model — SIMD regex, parallel walking, single binary |
| **Regex-first parsing** | AST is overkill for v1; word-boundary regex covers 90% of cases |
| **Git blame is optional** | Shallow clones, squash merges, rebases make blame unreliable |
| **JSON output everywhere** | `--json` on every command enables Unix composability |
| **`todo diff` is the killer feature** | PR-level delta reporting is the gap no existing tool fills |
| **Strict scope fence** | No web dashboard, no Jira sync, no assignee management |

### Three Commands That Prove the Value

| Command | What It Does | Why It Matters |
|---------|-------------|----------------|
| `todo scan` | Find all TODOs with rich output | Table stakes — color, grouping, `--json` |
| `todo diff` | TODOs added/removed vs git HEAD | **Killer feature** — powers PR checks |
| `todo ci` | Enforce thresholds, exit codes | **Adoption driver** — `exit 1` when debt grows |

### Recommended Phases

**Phase 1 (MVP):** `scan` + `diff` + `ci` commands, regex parser, table/JSON output, SQLite cache, `.todo-tracker.toml` config

**Phase 2:** Git blame enrichment, SARIF output (GitHub Code Scanning), `stats` dashboard, `blame` command

**Phase 3:** `watch` daemon, tree-sitter opt-in, shell completions, GitHub Action wrapper

**Phase 4:** WASM plugin system, custom reporters, LSP server

### The Bottom Line

Without CI-first positioning and strict scope control, this joins the graveyard of TODO tools nobody adopts because `grep` is good enough. With those constraints, there is a real gap to fill: no tool today combines fast scanning + git-aware trend analysis + CI enforcement in one cohesive, cross-platform binary.

---

## Sources

- [leasot](https://github.com/pgilad/leasot) — npm TODO parser, 49+ languages
- [todo-tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) — VS Code extension (6.8M installs)
- [tickgit](https://github.com/augmentable-dev/tickgit) — Git-aware TODO tracker
- [ianlewis/todos](https://github.com/ianlewis/todos) — Go-based smart comment parser
- [todocheck](https://github.com/preslavmihaylov/todocheck) — TODO-to-issue linking
- [todoctor](https://github.com/azat-io/todoctor) — JS/TS TODO analyzer with git integration
- [todo-to-issue](https://github.com/alstr/todo-to-issue-action) — GitHub Action for auto-creating issues
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) — `expiring-todo-comments` rule
- [ripgrep](https://github.com/BurntSushi/ripgrep) — Architecture model for parallel file scanning
- [SARIF v2.1.0](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) — Static analysis output format
- [clig.dev](https://clig.dev/) — Command Line Interface Guidelines
- [Kubernetes TODO analysis](https://augmentable.medium.com/looking-at-kubernetes-2k-todo-comments-b2db42dc7fdb) — Real-world TODO graveyard data
- [Mohayeji et al., BotSE '22](https://dl.acm.org/doi/10.1145/3528228.3528408) — ACM study on TODO bot adoption
