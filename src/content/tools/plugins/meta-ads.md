---
name: "Meta Ads"
description: "AI plugin for Facebook and Instagram ad management — creative analysis, audience building, waste detection, and daily reporting via MCP"
type: "plugin"
author: "Jackson Dean"
source: "channel47"
tags: ["meta-ads", "facebook", "instagram"]
featured: false
status: "dev"
compatibleWith: ["Claude Code"]
relatedTools: ["paid-search"]
---

## What it does

The Meta Ads plugin brings the same practitioner-built approach from Paid Search to Facebook and Instagram campaigns. Creative fatigue, audience overlap, frequency violations, placement bleed — the waste patterns that eat Meta budgets.

## Skills included

Six skills structured and awaiting MCP server build:

**platform-setup** — Configure Meta Business Manager credentials and verify API access.

**morning-brief** — Daily Meta account health: CPM trends, frequency, creative fatigue, budget pacing.

**waste-detector** — Find Meta-specific waste: audience overlap, creative fatigue, placement bleed, frequency violations.

**creative-analyzer** — Evaluate creative performance: hook rate, fatigue signals, winner/loser classification.

**audience-builder** — Design audience strategies: lookalikes, custom audiences, retargeting funnels.

**profile-review** — Periodic profile cleanup: audit watch list, active tests, and decision log.

## Status

In development. Skills are fully structured with workflows and decision trees. Waiting on `@channel47/meta-ads-mcp` to connect to the Meta Marketing API.
