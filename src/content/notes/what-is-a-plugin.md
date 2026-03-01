---
title: "What is a Claude Code plugin?"
description: "Plugins bundle the skills, API connections, and safety layers a profession needs into one install. Here's what's inside and how to get started."
date: 2026-02-14
tag: guide
featured: false
---

A Claude Code plugin is a folder that makes Claude better at a specific job. Instead of pasting instructions every session or configuring tools by hand, you install a plugin and everything is ready.

One command. Every skill, every API connection, every safety check — installed and configured.

## What's inside a plugin

Three layers, each doing a different job.

### Skills

Markdown files that tell Claude how to do something. Not vague prompts — structured instructions with decision trees, quality standards, and domain knowledge baked in.

A "Morning Brief" skill, for example, tells Claude exactly how to pull performance data across ad platforms, what anomalies to flag, and how to format the summary. It runs the same way every time, on every account.

Skills are the knowledge layer. They encode your expertise so Claude can follow your process.

### MCP servers

MCP (Model Context Protocol) servers are the API connections. They give Claude access to external platforms — Google Ads, Bing Ads, keyword research tools, image generators.

Plugins bundle these servers so you don't configure them separately. Install the paid-search plugin and Claude can already talk to Google Ads and Bing Ads. The connections are pre-wired.

### Hooks

The safety layer. Hooks intercept actions before they execute. Every mutation — every budget change, every keyword addition, every campaign edit — gets previewed and requires your approval.

You stay in control. Claude proposes, you approve.

## How plugins are organized

Each plugin targets one ad platform. The first is **Paid Search** — a plugin for practitioners managing Google Ads and Bing Ads accounts.

Inside the paid-search plugin:

- **Platform Setup** — Connect your ad accounts and verify access
- **Morning Brief** — Daily cross-platform performance summary with anomaly detection
- **Waste Detector** — Find spend leaks, quantify them in dollars, auto-remediate
- **Search Term Verdict** — Classify search terms: NEGATE, PROMOTE, INVESTIGATE, or KEEP
- **PMax Decoder** — Crack open Performance Max campaigns for transparency
- **Profile Review** — Periodic cleanup of your account context, watch list, and decision log

Six skills. Two platforms. One install.

## How to install

**In Claude Code:**

```
/plugin marketplace add channel47/plugins
/plugin install paid-search@channel47
```

**In Cowork:** Open the plugin browser with `/plugins`, add `channel47/plugins` as a marketplace, and select paid-search.

You'll need API keys for the ad platforms you want to connect. The plugin's setup skill walks you through it.

<aside class="note-cta">
<p class="note-cta__label">TRY IT</p>
<p class="note-cta__text"><a href="/plugins/paid-search">Install the paid-search plugin</a> — six skills, two platforms, one command.</p>
</aside>

## Why this matters

Most people use AI by typing instructions from scratch every time. That works for simple questions. It doesn't work for complex professional workflows where consistency, domain knowledge, and safety matter.

Plugins solve this by packaging expertise into something installable. You don't need to know how to write a skill or configure an MCP server. You install the plugin and start working.

And if you want to go deeper — remix a skill, contribute a new one, build something for your own profession — everything is [open source](https://github.com/channel47/plugins).

The ecosystem grows when practitioners contribute their knowledge. Your expertise could be the next plugin.

---

Ready to get started? [Install the paid-search plugin](/plugins/paid-search) or [learn how to build your own skill](/notes).
