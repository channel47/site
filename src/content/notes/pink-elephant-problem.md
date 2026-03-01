---
title: "The Pink Elephant Problem in AI Voice Skills"
description: "Telling AI what NOT to write backfires. Here's why kill lists make your voice skill worse, and how positive-first architecture fixes it."
date: 2026-02-21
tag: guide
featured: true
---

My voice skill kept generating the exact phrases I'd explicitly banned. "The part that surprised me..." "But what I didn't expect..." "The thing people don't understand..." All on the kill list. All showing up in every other output.

Turns out I was making the problem worse every time I added another phrase.

## Ironic process theory, but for token prediction

Psychologists call it ironic process theory. Tell someone "don't think about a pink elephant" and the brain has to activate the concept to know what to suppress. The suppression requires the very activation you're trying to prevent.

LLMs have it worse. They don't have a suppression mechanism at all. Token prediction only selects forward. The model scans the context window, sees a phrase with high attention weight, and generates something related to it. Doesn't matter that "NEVER" comes before it. The phrase itself hooks the model.

So when my SKILL.md said "NEVER use phrases like 'The part that surprised me...'" the model saw that phrase, heavily weighted in context, and produced variations. Not the exact banned phrase. But the patterns. The cadence. Close enough to sound like every other AI output.

## The kill list paradox

I'd accumulated over 30 banned items in my voice skill. Phrases, words, patterns, structural tics. Each one added because I'd noticed it in a previous output. Each one making the next output slightly more likely to contain something similar.

That's the paradox. The more carefully you catalog what you don't want, the more material the model works with. You're creating a detailed map of AI-sounding patterns and handing it directly to the thing you're trying to steer away from them.

If you hired a ghostwriter and gave them a 30-item list of phrases to avoid, they'd probably write something stiff and self-conscious. So focused on not sounding wrong that they'd forget to sound right. LLMs do the same thing, except they don't actually process the "don't" part the way a human would.

## Three techniques that replaced 30 prohibitions

The fix isn't better ban lists. It's replacing them entirely.

**Exemplar pairs beat rules.** Before/after pairs showing generic AI writing next to the target voice are the single most effective technique for voice adherence. The model learns the pattern from contrast, not from a rule.

My skill now has 11 calibration pairs. Here's one.

> *Generic:* "I'm excited to announce that after extensive development, we've launched a new feature that will transform your workflow."
>
> *Jackson:* "Shipped something. Took longer than it should have. There's one detail nobody will notice but it was worth getting right."

The model reads both, understands the gap, and writes toward the target. No suppression required.

**Positive direction instead of prohibition.** Instead of listing 30 phrases to avoid, describe the voice you want. I replaced my entire kill list with a Voice Compass. Six directional markers that tell the model where to aim instead of what to dodge.

Register. Authority. Surprise. Emotion. Transitions. Endings. Each one described in positive terms. "A sharp friend recounting what he built last Tuesday" tells the model more about the target register than "NEVER sound like a press release" ever could.

**Your skill files are patterns too.** This one's subtle. The model doesn't just follow the instructions in your skill. It mimics the writing patterns of the skill itself. If your SKILL.md uses em dashes, the output uses em dashes. If it leans on balanced antithesis ("Without X, you get Y. With X, you get Z"), the output mirrors that shape.

I found em dashes in three places in my own skill files. Removed them. The outputs cleaned up immediately. Your skill is the first sample of writing the model sees. Make it look like what you want back.

<aside class="note-cta">
<p class="note-cta__label">BUILD NOTES</p>
<p class="note-cta__text">I send one of these a week. <a href="/subscribe">Subscribe</a></p>
</aside>

## Punctuation rules still need explicit bans

One nuance. Binary formatting rules still need direct statements. Punctuation constraints like "no em dashes" aren't stylistic preferences you can guide toward with positive framing. They're mechanical substitutions.

"Commas, periods, and parentheses only. No em dashes, no en dashes, no colons mid-sentence." That's blunt. It's also the only framing that stuck.

The principle still holds though. Three characters to avoid is different from 30 phrases. The model handles a short, explicit prohibition. It can't handle a catalog.

## The rebuild sequence

If you're building a voice skill (or rebuilding one), here's the order that worked.

Start with 5-10 exemplar pairs. Generic AI output on the left, your actual voice on the right. Pull from real things you've written. These do more work than any single instruction.

Write a Voice Compass. Five to seven positive directional markers. Not "don't sound corporate." Describe how the voice actually sounds. Register, authority, emotional temperature, how transitions connect, how pieces end. Aim the model at a target instead of away from a wall.

Keep binary rules short and explicit. Specific characters or formats you never want. Two or three lines. No explanation needed.

Audit your skill files for the patterns you don't want reflected back. Read your SKILL.md out loud. If it doesn't sound like the voice you're targeting, the model is already getting mixed signals.

Delete your kill list. If you've done the steps above, the kill list is actively hurting your output. The exemplar pairs and Voice Compass replace it.

If you want to try building one from scratch, the [What is a Claude Code plugin?](/notes/what-is-a-plugin) guide walks through the basics.

## The instruction budget

LLMs have a reliable instruction budget. Roughly 150-200 instructions before adherence drops. Every "NEVER do X" counts against it. A 30-item kill list burns 15-20% of your budget on instructions that actively work against you.

I rebuilt my voice skill from scratch using this approach. Still testing. But the kill list phrases stopped appearing in the first draft.
