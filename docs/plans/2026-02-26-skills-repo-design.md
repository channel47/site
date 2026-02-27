# Skills Repo Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a standalone `ch47/skills/` repo to house marketing-focused Claude Code skills for public distribution. Compatible with skills.sh (`npx skillsadd`). Source of truth stays in `~/.claude/skills/`; repo gets sanitized copies via sync script.

**Inspiration:** skills.sh (flat directory, npx install, leaderboard), playbooks.com (curated, clean browsing). Directory-first. No build step.

---

## Repo Structure

```
ch47/skills/                          # Standalone git repo → github.com/channel47/skills
├── skills/
│   ├── gaql/                         # Google Ads Query Language
│   │   ├── SKILL.md
│   │   └── references/
│   ├── content-miner/                # Extract content from activity for distribution
│   │   ├── SKILL.md
│   │   ├── content-types.md
│   │   └── signal-tests.md
│   ├── kit-newsletter/               # Kit (ConvertKit) API operations
│   │   ├── SKILL.md
│   │   └── references/
│   ├── twitter-algorithm-optimizer/  # X algorithm optimization
│   │   └── SKILL.md
│   └── prompt-optimizer/             # Transform prompts into best-practice format
│       ├── SKILL.md
│       └── references/
├── scripts/
│   ├── sync.sh                       # Pull from ~/.claude/skills/ into repo
│   └── sanitize-check.sh             # Grep for personal details before push
├── CLAUDE.md
├── README.md
└── .gitignore
```

## Conventions

- Each skill: `skills/<kebab-case-name>/SKILL.md` (required entry point)
- Optional: `references/`, `scripts/` subdirs per skill
- No dependencies, no build step, no package.json
- Skills.sh compatible: `npx skillsadd channel47/skills`
- Individual install: `npx skillsadd channel47/skills --skill gaql`

## Initial Skills (5)

| Skill | Source | Notes |
|-------|--------|-------|
| gaql | ~/.claude/skills/gaql | GAQL grammar, operators, cookbook. No personal details. |
| content-miner | ~/.claude/skills/content-miner | Content extraction workflow. Strip any personal source paths. |
| kit-newsletter | ~/.claude/skills/kit | Renamed for clarity. Strip Kit account IDs, API key var names. |
| twitter-algorithm-optimizer | ~/.claude/skills/twitter-algorithm-optimizer | Algorithm rules and tweet optimization. Clean as-is. |
| prompt-optimizer | ~/.claude/skills/prompt-optimizer | Prompt structuring patterns. Clean as-is. |

## Sync Strategy

**Source of truth:** `~/.claude/skills/` — where skills are developed and iterated in daily use.

**Repo:** Sanitized public snapshot. Not a symlink — actual file copies.

**Workflow:**
1. Develop/iterate skills normally in `~/.claude/skills/`
2. Run `./scripts/sync.sh` to pull latest into repo
3. Run `./scripts/sanitize-check.sh` to flag personal details
4. Review `git diff`, fix any leaks
5. Commit and push

### sync.sh

Copies specified skills from `~/.claude/skills/` into `skills/`. Handles renames (e.g., `kit` → `kit-newsletter`). Outputs what changed. Does NOT auto-commit.

### sanitize-check.sh

Greps the `skills/` directory for known personal patterns:
- Name references (Jackson, Jackson Dean)
- Local paths (/Users/jackson)
- Private env var names (KIT_API_KEY_CH47)
- Employer references (4AM)
- Personal account IDs

Returns non-zero if any found. Can be wired as a pre-commit hook.

## Sanitization Rules

**Remove:**
- Personal name, employer, relationship references
- Local machine paths
- Private API key variable names and account IDs
- Personal workflow context ("Jackson's morning routine")

**Keep:**
- All technical content (API specs, grammar rules, patterns)
- Workflow descriptions and process steps
- Reference materials and examples
- Trigger descriptions in SKILL.md frontmatter

## README.md

Minimal, developer-first:
- Headline: "Marketing skills for Claude Code."
- Subline: "Built from real ad accounts and campaigns. By Channel 47."
- Install: `npx skillsadd channel47/skills`
- Skills table: name | what it does
- Manual install instructions (copy folder to `~/.claude/skills/`)
- Link to channel47.dev

## CLAUDE.md

Instructions for working in this repo:
- Skill file conventions
- How to add a new skill (create dir, add SKILL.md, update sync.sh list, run sync)
- Sanitization rules
- Sync workflow

## Integration with ch47/site

The homepage redesign plan already defines a tool card system with `type` badges (skill, mcp, subagent, plugin). Skills from this repo will be listed there as type `skill`. The site's `src/content/tools/` YAML entries will reference skills in this repo.

No changes to the site needed now — the homepage redesign handles the display layer.

## What This Is NOT

- Not a plugin (no `.claude-plugin/` manifest)
- Not replacing `ecosystem/` (that's for full plugins)
- Not replacing `mcps/` (that's for MCP servers)
- Not a monorepo — no shared dependencies, no workspace config
