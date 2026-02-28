---
title: "$0.14"
date: 2026-02-28
status: draft
---

**$2.50 per account.** That was the cost of the first automated audit I ran.

A Claude agent wakes up, connects to Google Ads through an MCP server I built, pulls the last seven days of data, looks for anomalies, checks how recent changes are performing, and writes up a summary. Interesting as a demo. *Not something I'd run every morning across a dozen accounts.*

So I started cutting.

The first version used multiple agents in a chain. An explorer agent to pull data, an analyst to interpret it, a writer to format the brief. Each handoff meant another API call. Each call meant more tokens. The architecture was elegant and expensive.

I ripped out the chain. One agent. Two predefined tool calls on either end, one to fetch and one to format. Routed the heavy lifting through a cheaper model for data exploration. Kept Opus for the actual analysis where judgment matters.

**$0.14.**

Same output quality. **Seventeen times cheaper.** The difference wasn't a breakthrough in prompting or some clever hack. It was realizing that most of the token spend was in the plumbing, not the thinking.

That agent now runs on a Mac Mini sitting in my office. Every morning at 4am it wakes up, queries the accounts I manage across Google and Bing, and sends me a Discord message before I've finished my first glass of water. Seven-day lookback. Anomaly detection. Change tracking against a journal that logs what I did and when.

The part I'm still figuring out is the journal. Each day's audit gets stored. Over time the agent should learn what *"normal"* looks like for each account and get sharper about what's actually worth flagging versus what's just Tuesday noise. That's the piece that turns a daily report into something genuinely useful. *Not there yet.*

This is what I'm building **PaidBrief** into. A service where you install read-only access, and every morning you get a brief on your accounts. No login required. No dashboard to check. Just a message that says here's what happened, here's what to look at.

The economics had to work first. $2.50 per account per day is a hobby project. **$0.14 is a product.**

— Jackson

P.S. PaidBrief is getting close to launch. If you run Google or Bing campaigns and want to be one of the first to try it, **reply to this email.** I'm looking for five people to test with.

P.P.S. Skills Lab #2 is March 5th. Building a voice skill live. [Details and signup here.](https://channel47.dev/labs)
