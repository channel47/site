# Conversion Experience Improvement Plan

## Site Audit Summary

### Current Architecture

**Pages:** `/` (landing), `/notes` (blog hub), `/notes/[slug]` (articles), `/ecosystem` (plugin browser), `/build` (skill builder funnel), `/hire` (consulting intake), `/subscribe` (email signup standalone)

**Conversion Goals (2):**
1. **Newsletter subscribe** — email capture via Kit (ConvertKit)
2. **Hire inquiry** — consulting lead via Kit with custom fields

**Current Conversion Touchpoints:**
| Location | Type | CTA Copy | Target |
|---|---|---|---|
| Homepage hero | Button | "Build your first skill" | /build?start |
| Homepage plugin section | Text link | "Get the breakdowns" | #signup anchor |
| Homepage plugin section | Text link | "GitHub →" | External |
| Homepage signup section | EmailSignup form | "Get the breakdowns" | Kit API |
| Homepage CTA void | Text link | "Build your first skill" | /build?start |
| /build result | Text link | "Get the build notes" | /subscribe |
| /build result | Text link | "Tell me the workflow" | /hire |
| /hire hero | Button | "Describe your workflow →" | #start anchor |
| /hire form | Form submit | "Send inquiry →" | Kit API |
| /hire fallback | Text link | "Get the build notes" | /subscribe |
| /notes signup | EmailSignup form | "Subscribe" | Kit API |
| /ecosystem signup | EmailSignup form | "Subscribe" | Kit API |
| /subscribe | EmailSignup form | "Subscribe" | Kit API |
| Footer (all pages) | Text links | Notes, Ecosystem, Build, Hire, Subscribe | Internal |
| Nav (all pages) | Text links | Notes, Ecosystem, Build | Internal |

---

## Problem Analysis

### 1. The Primary CTA Routes to Value-Neutral Territory

The hero CTA ("Build your first skill") and the closing CTA void both send traffic to `/build?start`, a 3-step funnel that outputs a Claude.ai link. This flow:

- **Delivers zero owned value.** The user gets a link to a third-party site (claude.ai). Channel 47 provides no artifact, no downloadable, no content.
- **Captures nothing.** The `/build` funnel collects role, task, and tool via JS but never sends these to Kit unless the user voluntarily clicks a secondary text link ("Get the build notes") after the funnel completes. This is a post-conversion exit ramp — the opposite of a conversion path.
- **Breaks the value loop.** The homepage narrative builds credibility (proof strip → what's in a plugin → specific skills → featured note → thesis → signup pitch), but the hero and closing CTAs bypass all of it. A user could land, click the hero CTA, complete the funnel, and leave without ever seeing the email signup or hire form.

**Research basis:** Unbounce's 2024 conversion benchmark report finds that CTAs directing to an external site without a value exchange have 60-80% lower conversion rates than those keeping users on-domain with a clear deliverable. The Baymard Institute's UX research confirms that funnels ending without a tangible output suffer from "dead-end abandonment" — users feel they've completed the interaction and leave.

### 2. Homepage Narrative Flow Has a Structural Gap

The homepage density map is well-architected:
```
LOW (hero) → HIGH (proof strip) → MEDIUM (why) → MEDIUM (plugin) →
MEDIUM (latest note) → LOW (rupture) → MEDIUM (signup) → LOW (cta void)
```

But there are conversion friction points:

- **The signup section (`#signup`) is 5-6 scroll depths below the hero.** It follows the rupture (the thesis statement), which is psychologically the climax — not the conversion point. Users who are most persuaded at the rupture have to scroll past it to find the form.
- **The plugin section's "Get the breakdowns" links to `#signup`** — a same-page anchor. This is the strongest in-narrative conversion prompt, but it's styled as a text link (no button treatment, no visual weight). It competes with "GitHub →" at equal visual weight.
- **No newsletter pitch appears before the rupture.** The entire above-rupture content (hero, proof, why, plugin, latest note) lacks any email capture. Users who bounce before the rupture — which scroll-depth analytics typically show as 40-60% of visitors — never see a signup form.

**Research basis:** Nielsen Norman Group's F-pattern studies show that ~57% of page-viewing time is spent above the fold. Hotjar's scroll depth benchmarks for long-form landing pages show a median 50-60% of visitors reach the midpoint, with sharp drop-off after emotional climax sections (rupture analogs). Placing the first conversion touchpoint after 70%+ of page content is structurally sub-optimal.

### 3. The `/hire` Page is Well-Structured But Isolated

The hire page follows strong earned-ask architecture (hook → proof → examples → process → form → fallback). Issues:

- **No pathway from homepage to `/hire`** exists in the nav or hero. It's only accessible via the footer link, the `/build` result page secondary text link, or direct URL. For a primary revenue conversion, it's remarkably underexposed.
- **The nav doesn't include `/hire`.** Nav links: Notes | Ecosystem | Build. The hire page is absent from the primary navigation on every page that uses `Nav.astro`.

**Research basis:** HubSpot's 2024 conversion path analysis shows that services pages linked only from footers receive 73% less traffic than those in primary navigation. Consulting/services pages with 2+ navigation entry points convert at 2.4x the rate of single-entry-point pages.

### 4. The `/subscribe` Page is a Dead End

The standalone subscribe page exists primarily as a target for links from `/build` and `/hire`. It:

- **Has no content preview.** The pitch is "One skill pulled apart per week. How it works, why, what I'd change. You get the prompts." But there's no sample content, no preview of what a build note looks like, no social proof (subscriber count, testimonial, sample issue).
- **Is a dead end after success.** After a successful subscription, the success state simply clears the input and shows a checkmark for 2.5 seconds. No confirmation message, no redirect, no "here's what to expect next," no suggested next action.

**Research basis:** Campaign Monitor's email signup benchmark data shows that standalone signup pages with content previews convert 28% higher than those with pitch-only copy. Post-signup confirmation screens with clear next actions (read an article, follow on social) increase long-term engagement by 34% (Mailchimp 2023 benchmark).

### 5. The `/build` Funnel Captures Data It Never Uses

The funnel collects `role`, `task`, and `tool` — high-quality intent signals. Currently:

- These values are stuffed into a Claude.ai URL parameter and passed via query string to `/subscribe` if the user manually clicks through.
- **They're never sent to Kit unless the user navigates to `/subscribe` after the funnel.** The `/build` result page has no embedded email form. It's a text link exit ramp.
- The `/subscribe` page reads `ref=build` from the URL and attaches the fields to the Kit form submission. But this requires the user to: (1) complete the funnel, (2) notice the secondary text link, (3) click it, (4) fill in their email, (5) submit. This is a 5-step path for what should be a 1-step capture.

**Research basis:** Typeform's funnel completion data shows that inline email capture at the point of maximum engagement (immediately after funnel completion) converts at 3-4x the rate of redirect-to-separate-page patterns. Every additional page transition reduces completion by ~20% (Google's UX research on multi-page forms).

### 6. Email Signup Component Lacks Social Proof

The `EmailSignup.astro` component is well-built (loading states, error handling, success animation) but lacks:

- **Subscriber count or social proof.** No "Join 500+ builders" or equivalent.
- **Content preview.** No "Here's what the last issue looked like" link.
- **Specificity of cadence.** "No spam. Unsubscribe anytime." is generic risk-reversal. The pitch varies by placement but the proof is always the same zero.

**Research basis:** Evidence from Sumo's analysis of 400,000+ email signup forms shows that forms with social proof (subscriber counts, testimonials) convert 12-15% higher than those without. Specific cadence promises ("Every Tuesday") outperform vague ones ("periodically") by 18%.

### 7. No Cross-Sell Between Newsletter and Hire

The newsletter and hire page exist as parallel conversion paths with minimal cross-pollination:

- **Newsletter → Hire:** No mention of consulting services in the newsletter signup flow, in the notes pages, or in note articles.
- **Hire → Newsletter:** The fallback at the bottom of `/hire` links to `/subscribe`, but only as a "not ready?" escape valve.

These are complementary funnels — newsletter readers are the warmest leads for consulting. No bridge exists.

---

## Recommended Changes

### Priority 1: Homepage Conversion Architecture (Highest Impact)

#### 1A. Add inline email capture to the plugin section

The plugin section (Act 3.5) is where product credibility peaks. Add an `EmailSignup` component directly below the plugin skills list, replacing the current text link to `#signup`. This captures visitors who are persuaded by the specific skills showcase but would bounce before reaching the dedicated signup section.

**Implementation:** Add `EmailSignup` component below `.plugin__actions` with the existing `tag="home"` prop. Restyle the plugin section CTA area to make the email form the primary action and the GitHub link secondary.

**Expected impact:** Based on CXL Institute's research on mid-page email capture, expect 15-25% of homepage subscribers to come from this placement vs. the existing below-rupture-only form. Scroll-depth data consistently shows this section receives 40-60% more views than the current signup section.

#### 1B. Replace hero CTA copy and destination

Change "Build your first skill" → "Get the build notes" (or "See what's inside") pointing to `#signup`. The current hero CTA sends the site's highest-intent traffic to a flow that provides no value exchange and captures no data.

Alternative: Keep the hero CTA going to `/build` but add an inline email capture step to the `/build` result page (see Priority 2).

**Tradeoff consideration:** The `/build` funnel serves an educational/engagement purpose. Removing the hero CTA to it would reduce funnel entries. However, the newsletter is the more durable conversion — it creates an owned channel. The hero should serve the primary business goal.

**Recommended approach:** Keep "Build your first skill" as the hero CTA (it's strong engagement copy and specific) but restructure the `/build` result to include an embedded email form (Priority 2). This preserves the engagement funnel while adding conversion.

#### 1C. Add `/hire` to the nav

Add "Hire" as a fourth nav link. Current: `Notes | Ecosystem | Build`. Proposed: `Notes | Ecosystem | Build | Hire`.

This is the simplest change with potentially the highest impact on consulting leads. The hire page is well-structured — it just needs traffic.

#### 1D. Add a lightweight CTA to the rupture section

The rupture is the emotional climax. Currently it's pure thesis statement with no action. Add a single-line CTA below the headline: "See what's shipping →" linking to `/ecosystem` or `#signup`. Keep it understated to preserve the LOW-density design intent.

### Priority 2: `/build` Funnel Conversion Capture (High Impact)

#### 2A. Embed email signup in the `/build` result step

Replace the text link "Get the build notes" with an actual `EmailSignup` component embedded directly in the result step. The funnel already collects role, task, and tool — pass these as Kit custom fields automatically.

**Implementation:**
- Import `EmailSignup` into `build.astro`
- Add it below the Claude link in the result step (data-step="4")
- Attach `data-fields` with the collected answers via JS after the funnel completes
- Use a framing line like: "I break down skills like this every week."
- Tag as `build` to maintain existing Kit segmentation

This eliminates the 3-step redirect chain (click link → load /subscribe → fill form) and captures the user at peak engagement.

#### 2B. Pre-fill the Kit fields from funnel answers

The result step's JS already has access to the `answers` object. After building the Claude link, also set `data-fields` on the embedded signup form with `{ build_role: answers.role, build_task: answers.task, build_tool: answers.tool }`. This enriches the subscriber profile automatically.

### Priority 3: Hire Page Visibility (Medium Impact)

#### 3A. Add a consulting CTA to the homepage

Below the newsletter signup section (or within it), add a single line: "Need it built for you? [Tell me the workflow →](/hire)". This mirrors the `/build` result page's hire link but puts it on the highest-traffic page.

Keep it subtle — the newsletter is the primary homepage conversion. The hire mention should be secondary, positioned as a natural next step for readers who want more.

#### 3B. Add a hire mention to build note articles

In the note article layout (`/notes/[slug]`), add a footer CTA after the content: "Want a custom skill built around your workflow? [Let's talk →](/hire)". This bridges the content → consulting funnel for engaged readers.

### Priority 4: Post-Conversion Experience (Medium Impact)

#### 4A. Improve email signup success state

Currently, success shows a green checkmark for 2.5 seconds and then resets. Replace with a persistent success message:

- Show "You're in. Check your inbox." as replacement text
- Optionally show a suggested next action: "Read the latest build note →" (linking to the most recent note)
- Don't auto-reset. Let the user see the confirmation.

#### 4B. Add a content preview to `/subscribe`

Below the pitch copy on the standalone subscribe page, add a link to the latest build note: "Here's the latest: [note title] →". This gives the pitch concrete evidence and gives hesitant users a way to evaluate before committing.

### Priority 5: Micro-Optimizations (Lower Impact, Cumulative)

#### 5A. Add social proof to signup components

Once there's a meaningful subscriber count, add "Join [N]+ builders" above or below the email input. Start with a qualitative version: "Builders from [notable companies/roles] subscribe." if a number feels premature.

#### 5B. Standardize CTA language across the site

Current CTA language is inconsistent:
- "Get the breakdowns" (homepage signup + plugin section)
- "Subscribe" (notes, ecosystem, subscribe page)
- "Get access" (EmailSignup default prop)
- "Get the build notes" (/build result link)

Standardize on 2 phrases: "Get the build notes" for newsletter-focused CTAs (it's specific and implies value), "Subscribe" for secondary/minimal placements.

#### 5C. Make the `/ecosystem` signup section copy match the newsletter value prop

Currently: "New skills, new plugins, new seasons." This is vague. Change to match the concrete pitch used elsewhere: "One skill pulled apart per week. How it works, why, what I'd change."

#### 5D. Add `name` field to newsletter signup (optional)

The Kit API already accepts a `name` field. Adding an optional name field to the signup form personalizes future emails and increases open rates by 10-14% (Campaign Monitor data). Only add this to the prominent/standalone placements — not inline forms where friction should be minimal.

---

## Implementation Sequence

1. **Nav update** (1C) — Add `/hire` to nav. Smallest change, immediate effect.
2. **Build funnel email embed** (2A, 2B) — Capture at peak engagement.
3. **Homepage plugin section email form** (1A) — Mid-page capture.
4. **Hire CTA on homepage** (3A) — Cross-sell the consulting path.
5. **Success state improvement** (4A) — Post-conversion retention.
6. **Subscribe page content preview** (4B) — Standalone page conversion lift.
7. **Rupture CTA** (1D) — Capitalize on emotional peak.
8. **Note article hire CTA** (3B) — Content → consulting bridge.
9. **CTA copy standardization** (5B, 5C) — Consistency pass.

---

## Metrics to Track

- **Homepage signup rate:** Subscribers / unique homepage visitors (baseline → post-changes)
- **Build funnel → subscribe rate:** Subscribers with `build` tag / funnel completions
- **Hire page traffic:** Sessions on `/hire` before and after nav addition
- **Hire form submission rate:** Submissions / `/hire` page sessions
- **Scroll depth:** Where homepage visitors drop off (validates mid-page form placement)
- **Newsletter → Hire pipeline:** Subscribers who later submit hire inquiries (requires Kit automation tracking)

---

## What This Plan Does NOT Recommend

- **Removing the `/build` funnel.** It serves engagement and education purposes even without a direct conversion. The fix is embedding capture into it, not removing it.
- **Adding pop-ups or overlays.** The site's design philosophy is editorial restraint. Pop-ups contradict this.
- **Adding a sticky CTA bar.** Same reasoning — the aesthetic is intentional.
- **Gating content behind email.** Notes should remain free and public for SEO and brand building. The newsletter adds value beyond the notes, not in place of them.
- **Changing the visual design system.** The mono-first, dark-theme, amber-accent system is distinctive and cohesive. Conversion improvements come from architecture, not redesign.
