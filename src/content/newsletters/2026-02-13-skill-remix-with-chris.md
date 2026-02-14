---
title: "Remixed a skill with my boss yesterday"
date: 2026-02-13
status: draft
kit_broadcast_id: 22927212
---

You signed up through Channel 47. This is the first email. Short ones when something ships.

Yesterday after the workshop, Chris (my boss) sat down with me and we remixed one of the skills I'd demoed. An hour later we had a native ad generator that neither of us could have built from scratch.

Here's how.

## What we started with

The [Ad Creative Variant Generator](https://github.com/channel47/channel47/tree/main/plugins/media-buyer/skills/creative-variants). Feed it a winning ad image, it figures out what's working, generates variations at three divergence levels (subtle, moderate, dramatic). Runs on Google's Gemini image model. I built this a few weeks ago by remixing an image generation skill.

Chris wanted to reshape it for native ad platforms. Taboola, Outbrain. With headlines. Running inside Claude Cowork.

## The block

We loaded the skill in Cowork and ran it. Network restriction error. Claude couldn't reach Google's image API.

## The fix

Claude has an "allowed domains" list in settings. We added the Gemini API URL, restarted Claude, ran it again.

Worked.

30 seconds in settings. That was the whole difference between a blocked session and a working tool.

## What we ended up with

Two skills from one starting point.

The original generates ad variations you can split test across any platform. The remix produces native ads with headlines, tuned for that editorial look native platforms reward.

Chris isn't a developer. I'm barely one. We just had a clear picture of what we needed, and the existing skill gave us something to start from. That's what remixing is. You don't start from scratch every time you cook. You find a recipe that's close and adjust.

## Try it

If you want to build your own, there's a walkthrough at [channel47.dev/build](https://channel47.dev/build). If you hit the same network block we did, check your allowed domains in Claude settings.

More coming.

— Jackson

P.S. The native ad generator is rough. We built it yesterday. It works, but it'll get better.
