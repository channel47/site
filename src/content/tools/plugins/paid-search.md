---
name: "Paid Search"
description: "Claude Code plugin for Google Ads and Bing Ads — six skills for daily briefs, waste detection, search term verdicts, and Performance Max transparency, powered by live API connections"
type: "plugin"
author: "Jackson Dean"
source: "channel47"
tags: ["google-ads", "bing-ads", "paid-search", "plugin"]
featured: true
status: "live"
install: "/plugin install paid-search@channel47"
compatibleWith: ["Claude Code"]
relatedTools: ["meta-ads"]
---

## What it does

The Paid Search plugin gives Claude direct access to your Google Ads and Bing Ads accounts. Not through screenshots or copy-pasted data. Through live API connections that pull real numbers, run real queries, and return structured results you can act on.

Built from managing 25+ ad accounts daily. Every skill in this plugin exists because the manual version was eating hours.

## Skills included

Six skills, each handling a distinct piece of the paid search workflow:

**platform-setup** — Configure and verify your Google Ads and Bing Ads credentials. Walks through OAuth, tests connections, confirms API access before you touch anything else.

**morning-brief** — Daily cross-platform health check. Pulls performance data from both Google and Bing, runs anomaly detection, checks pacing against budget, and writes a unified narrative. Replaces the 20-minute tab-switching ritual.

**waste-detector** — Finds high-impact spend leaks across both platforms. Surfaces the campaigns, ad groups, and keywords burning budget with nothing to show for it. Prioritizes by dollar impact, not just bad metrics.

**search-term-verdict** — Classifies search terms into four buckets: NEGATE, PROMOTE, INVESTIGATE, or KEEP. Pulls the search term reports, applies your account context, and returns actionable verdicts instead of a spreadsheet to stare at.

**pmax-decoder** — Transparency for Performance Max campaigns (Google only). PMax is a black box by design. This skill pulls what Google will actually surface and structures it so you can see what's happening inside.

**profile-review** — Periodic profile cleanup. Audits your watch list, active tests, and decision log to keep your account context current and prevent stale data from drifting into other skills.

## MCP integration

Powered by two MCP servers built specifically for this plugin:

- **@channel47/google-ads-mcp** — Live Google Ads API access. GAQL queries, account hierarchy traversal, campaign and keyword data.
- **@channel47/bing-ads-mcp** — Live Bing Ads API access. Reporting, campaign management, search term data.

The MCP servers handle authentication, rate limiting, and query construction. The skills handle the thinking. Together, Claude can pull your actual account data and do something useful with it.

## What people have caught with it

- **~$3K/month in wasted spend** across two accounts, flagged by waste-detector in the first run
- **Budget pacing issue** flagged 4 days before the client noticed
- **Daily briefings** that replaced manual morning checks across 25+ accounts

## Getting started

Install the plugin:

```
/plugin install paid-search@channel47
```

Run platform-setup first to configure your credentials. It'll walk you through Google OAuth and Bing API key setup, then verify everything connects.

After that, try morning-brief. It's the fastest way to see what the plugin actually does with your live data.
