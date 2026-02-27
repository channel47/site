# Skills Repo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create `ch47/skills/` as a standalone git repo housing marketing-focused Claude Code skills, compatible with skills.sh for public distribution.

**Architecture:** Flat `skills/<name>/SKILL.md` directory per skills.sh convention. Sync script pulls from `~/.claude/skills/` (source of truth) into repo as sanitized copies. Sanitize-check script flags personal details before push.

**Tech Stack:** Bash scripts, SKILL.md open standard, git

---

### Task 1: Initialize the Git Repo

**Files:**
- Create: `/Users/jackson/Documents/a_projects/ch47/skills/.gitignore`

**Step 1: Create directory and init git**

Run:
```bash
mkdir -p /Users/jackson/Documents/a_projects/ch47/skills
cd /Users/jackson/Documents/a_projects/ch47/skills
git init
```
Expected: Initialized empty Git repository.

**Step 2: Create .gitignore**

Create `/Users/jackson/Documents/a_projects/ch47/skills/.gitignore`:

```
.DS_Store
__pycache__/
*.pyc
*.pyo
.env
```

**Step 3: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
git add .gitignore
git commit -m "init: skills repo"
```

---

### Task 2: Create Sync Script

**Files:**
- Create: `/Users/jackson/Documents/a_projects/ch47/skills/scripts/sync.sh`

**Step 1: Create scripts directory and sync.sh**

Create `/Users/jackson/Documents/a_projects/ch47/skills/scripts/sync.sh`:

```bash
#!/bin/bash
# Syncs specified skills from ~/.claude/skills/ into this repo.
# Copies files (not symlinks) so the repo is self-contained for git.
# Run from repo root: ./scripts/sync.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_DIR="$HOME/.claude/skills"
TARGET_DIR="$REPO_ROOT/skills"

# Skills to sync: source_name → repo_name
# Add new skills to this list as you publish them.
declare -A SKILLS=(
  ["gaql"]="gaql"
  ["content-miner"]="content-miner"
  ["kit"]="kit-newsletter"
  ["twitter-algorithm-optimizer"]="twitter-algorithm-optimizer"
  ["prompt-optimizer"]="prompt-optimizer"
)

# Files/dirs to exclude from copy
EXCLUDE=(
  "__pycache__"
  "*.pyc"
  "*.pyo"
  ".DS_Store"
)

mkdir -p "$TARGET_DIR"

for source_name in "${!SKILLS[@]}"; do
  repo_name="${SKILLS[$source_name]}"
  source="$SOURCE_DIR/$source_name"
  target="$TARGET_DIR/$repo_name"

  if [ ! -d "$source" ]; then
    echo "SKIP: $source_name not found in ~/.claude/skills/"
    continue
  fi

  # Clean target and copy fresh
  rm -rf "$target"
  mkdir -p "$target"

  # Build rsync exclude args
  exclude_args=""
  for pattern in "${EXCLUDE[@]}"; do
    exclude_args="$exclude_args --exclude=$pattern"
  done

  rsync -a $exclude_args "$source/" "$target/"

  echo "Synced: $source_name → $repo_name"
done

echo ""
echo "Done. Next steps:"
echo "  1. Run ./scripts/sanitize-check.sh"
echo "  2. Review changes: git diff"
echo "  3. Commit and push"
```

**Step 2: Make executable**

Run:
```bash
chmod +x /Users/jackson/Documents/a_projects/ch47/skills/scripts/sync.sh
```

**Step 3: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
git add scripts/sync.sh
git commit -m "feat: add sync script to pull skills from global profile"
```

---

### Task 3: Create Sanitize-Check Script

**Files:**
- Create: `/Users/jackson/Documents/a_projects/ch47/skills/scripts/sanitize-check.sh`

**Step 1: Create sanitize-check.sh**

Create `/Users/jackson/Documents/a_projects/ch47/skills/scripts/sanitize-check.sh`:

```bash
#!/bin/bash
# Checks skills/ directory for personal details that shouldn't be published.
# Run from repo root: ./scripts/sanitize-check.sh
# Returns non-zero if any matches found.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/skills"

if [ ! -d "$SKILLS_DIR" ]; then
  echo "No skills/ directory found. Run sync.sh first."
  exit 1
fi

# Patterns to flag (case-insensitive grep)
PATTERNS=(
  "Jackson Dean"
  "jackson dean"
  "Jackson's"
  "/Users/jackson"
  "KIT_API_KEY_CH47"
  "fouram"
  "4AM"
  "ctrlswing"
  "Chiara"
  "paidbriefs"
)

found=0

for pattern in "${PATTERNS[@]}"; do
  matches=$(grep -rl "$pattern" "$SKILLS_DIR" 2>/dev/null || true)
  if [ -n "$matches" ]; then
    echo "FOUND: \"$pattern\" in:"
    echo "$matches" | sed 's/^/  /'
    found=1
  fi
done

if [ "$found" -eq 1 ]; then
  echo ""
  echo "Personal details found. Sanitize before pushing."
  exit 1
else
  echo "Clean. No personal details found."
  exit 0
fi
```

**Step 2: Make executable**

Run:
```bash
chmod +x /Users/jackson/Documents/a_projects/ch47/skills/scripts/sanitize-check.sh
```

**Step 3: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
git add scripts/sanitize-check.sh
git commit -m "feat: add sanitize-check script to flag personal details"
```

---

### Task 4: Run Initial Sync

**Step 1: Run the sync script**

Run:
```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
./scripts/sync.sh
```

Expected: 5 skills synced (gaql, content-miner, kit-newsletter, twitter-algorithm-optimizer, prompt-optimizer).

**Step 2: Run the sanitize check**

Run:
```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
./scripts/sanitize-check.sh
```

Expected: FOUND flags for personal references. Note which files need fixing.

**Step 3: Verify directory structure**

Run:
```bash
find /Users/jackson/Documents/a_projects/ch47/skills/skills -type f | sort
```

Expected: SKILL.md files and reference files for each of the 5 skills.

**Step 4: Do NOT commit yet** — sanitization happens in the next task.

---

### Task 5: Sanitize Skills

This task requires reading each flagged file and replacing personal references. Apply these substitutions:

**In `skills/twitter-algorithm-optimizer/SKILL.md`:**
- Replace "Jackson" → "the user" (or "your" where grammatically appropriate)
- Replace "Jackson's" → "your"
- Remove the line about loading `personal-voice` skill (that's a private skill)
- Replace "Does it align with Jackson's established topics?" → "Does it align with your established topics?"

**In `skills/kit-newsletter/SKILL.md`:**
- The generic `KIT_API_KEY` references are fine (standard env var name, not the private `_CH47` variant)
- Verify no account-specific IDs leaked

**In `skills/kit-newsletter/scripts/kit-api.py`:**
- Generic `KIT_API_KEY` references are fine — that's the standard name
- Remove `__pycache__/` dir if sync didn't exclude it
- Remove `assets/example_asset.txt` if it contains personal content

**Step 1: Make the sanitization edits**

Read each flagged file and apply the substitutions above. Use the Edit tool.

**Step 2: Re-run sanitize check**

Run:
```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
./scripts/sanitize-check.sh
```

Expected: "Clean. No personal details found."

**Step 3: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
git add skills/
git commit -m "feat: add initial 5 marketing skills (sanitized for public)"
```

---

### Task 6: Create README.md

**Files:**
- Create: `/Users/jackson/Documents/a_projects/ch47/skills/README.md`

**Step 1: Write README.md**

Create `/Users/jackson/Documents/a_projects/ch47/skills/README.md`:

```markdown
# Channel 47 Skills

Marketing skills for Claude Code. Built from real ad accounts and campaigns.

## Install

All skills:

```
npx skillsadd channel47/skills
```

Single skill:

```
npx skillsadd channel47/skills --skill gaql
```

Or copy a skill folder to `~/.claude/skills/` manually.

## Skills

| Skill | What it does |
|-------|-------------|
| [gaql](skills/gaql) | Write, debug, and validate Google Ads Query Language queries |
| [content-miner](skills/content-miner) | Extract shareable content from recent activity |
| [kit-newsletter](skills/kit-newsletter) | Manage Kit (ConvertKit) newsletters from the CLI |
| [twitter-algorithm-optimizer](skills/twitter-algorithm-optimizer) | Optimize tweets against X's ranking algorithm |
| [prompt-optimizer](skills/prompt-optimizer) | Transform rough prompts into best-practice format |

## Compatible with

Claude Code, Cursor, Cline, Windsurf, Codex CLI, and any tool that reads SKILL.md files.

## By [Channel 47](https://channel47.dev)
```

Note: The nested code fences in the actual file should use proper markdown (the triple backticks above are literal).

**Step 2: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
git add README.md
git commit -m "docs: add README with install instructions and skill table"
```

---

### Task 7: Create CLAUDE.md

**Files:**
- Create: `/Users/jackson/Documents/a_projects/ch47/skills/CLAUDE.md`

**Step 1: Write CLAUDE.md**

Create `/Users/jackson/Documents/a_projects/ch47/skills/CLAUDE.md`:

```markdown
# Channel 47 Skills

Public repo of marketing-focused Claude Code skills. Compatible with skills.sh.

## Structure

```
skills/
├── <skill-name>/
│   ├── SKILL.md          # Required — agent instructions
│   ├── references/       # Optional — supporting docs
│   └── scripts/          # Optional — helper scripts
├── scripts/
│   ├── sync.sh           # Pull from ~/.claude/skills/ into repo
│   └── sanitize-check.sh # Flag personal details before push
```

## Commands

```bash
./scripts/sync.sh            # Sync skills from ~/.claude/skills/
./scripts/sanitize-check.sh  # Check for personal details
```

## Adding a New Skill

1. Create and iterate the skill in `~/.claude/skills/<name>/`
2. Add the skill to the `SKILLS` map in `scripts/sync.sh`
3. Run `./scripts/sync.sh`
4. Run `./scripts/sanitize-check.sh` — fix any flags
5. Update `README.md` skills table
6. Commit and push

## Conventions

- Skill dirs: kebab-case names
- `SKILL.md` is the required entry point (agent skills standard)
- `references/` for supporting docs, `scripts/` for helpers
- No build step, no dependencies, no package.json
- Install: `npx skillsadd channel47/skills`

## Sanitization Rules

This is a PUBLIC repo. Before pushing, ensure NO personal details:

- No real names, employer references, or relationship details
- No local machine paths (`/Users/...`)
- No private env var names or account IDs
- No references to private skills (personal-voice, weekly-reflection, etc.)

Generic references like `KIT_API_KEY` are fine — that's a standard env var name.

Run `./scripts/sanitize-check.sh` to verify. It checks for known patterns.
```

**Step 2: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md with conventions and workflow"
```

---

### Task 8: Update Parent ch47/CLAUDE.md

**Files:**
- Modify: `/Users/jackson/Documents/a_projects/ch47/CLAUDE.md`

**Step 1: Add skills/ to the directory table**

In the table at the top of `ch47/CLAUDE.md`, add a row for `skills/`:

| Directory | What | Stack |
|-----------|------|-------|
| `skills/` | Marketing skills for Claude Code — public via skills.sh | SKILL.md, Bash |

**Step 2: Add to "Where to Work" table**

| Task | Directory | Why |
|------|-----------|-----|
| Edit/add public skills | `skills/` | skills.sh-compatible repo |

**Step 3: Add to Ecosystem Structure section**

```
skills/                               # Standalone repo (github.com/channel47/skills)
├── gaql/                             # Google Ads Query Language
├── content-miner/                    # Content extraction from activity
├── kit-newsletter/                   # Kit (ConvertKit) newsletter management
├── twitter-algorithm-optimizer/      # X algorithm optimization
└── prompt-optimizer/                 # Prompt structuring
```

**Step 4: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47
git add CLAUDE.md
git commit -m "docs: add skills/ repo to ch47 CLAUDE.md"
```

Note: This is the ch47 root repo, NOT the skills repo or site repo.

---

### Task 9: Create GitHub Remote

**Step 1: Create the GitHub repo**

Run:
```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
gh repo create channel47/skills --public --source=. --description "Marketing skills for Claude Code. Built from real ad accounts and campaigns."
```

Expected: Repo created at github.com/channel47/skills.

**Step 2: Push**

Run:
```bash
cd /Users/jackson/Documents/a_projects/ch47/skills
git push -u origin main
```

Expected: All commits pushed to remote.

**Step 3: Verify**

Run:
```bash
gh repo view channel47/skills --web
```

Expected: Opens the repo page. README renders with skill table and install commands.
