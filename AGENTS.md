# AGENTS.md — Operating Principles

This file governs how AI coding agents (including opencode) should behave in this project. Every prompt must be interpreted through these principles.

## The Four Principles

### 1. Think Before Coding
**Addresses:** Wrong assumptions, hidden confusion, missing tradeoffs

- State assumptions explicitly — if uncertain, ask rather than guess
- Present multiple interpretations — don't pick silently when ambiguity exists
- Push back when warranted — if a simpler approach exists, say so
- Stop when confused — name what's unclear and ask for clarification

### 2. Simplicity First
**Addresses:** Overcomplication, bloated abstractions

- No features beyond what was asked
- No abstractions for single-use code
- No "flexibility" or "configurability" that wasn't requested
- No error handling for impossible scenarios
- If 200 lines could be 50, rewrite it

> The test: Would a senior engineer say this is overcomplicated? If yes, simplify.

### 3. Surgical Changes
**Addresses:** Orthogonal edits, touching code you shouldn't

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting
- Don't refactor things that aren't broken
- Match existing style, even if you'd do it differently
- If you notice unrelated dead code, mention it — don't delete it

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused
- Don't remove pre-existing dead code unless asked

> The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution
**Addresses:** Leverage through tests-first, verifiable success criteria

Transform imperative tasks into verifiable goals:

| Instead of... | Transform to... |
|---|---|
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug" | "Write a test that reproduces it, then make it pass" |
| "Refactor X" | "Ensure tests pass before and after" |

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

> Strong success criteria let the LLM loop independently. Weak criteria ("make it work") require constant clarification.

---

## Deployment Safety

### NEVER add `postinstall` scripts that download large binaries
**Incident:** `postinstall: "npx playwright install"` was added to `package.json`. On Vercel, `npm install` triggers `postinstall`, which downloads Chromium + Firefox + WebKit (~400MB). This hung every deployment and broke the live site.

**Rule:** Before adding ANY `postinstall` or lifecycle script to `package.json`:
- Ask: "Will this run on the deployment server (Vercel)?"
- If yes: NEVER use it to download binaries, run heavy processes, or do anything beyond symlink fixing
- Playwright browsers, Puppeteer, native modules — install locally only, never via postinstall
- Test: `npm install --ignore-scripts` should still produce a working build

---

### Never add `outputFileTracingExcludes` or `serverExternalPackages` to next.config.ts
**Incident:** Added `serverExternalPackages: ["playwright"]` and `outputFileTracingExcludes` to exclude Playwright from the bundle. This broke the Vercel deployment — all pages became 843 kB serverless functions instead of static HTML, and the site returned ERR_CONNECTION_TIMED_OUT.

**Rule:** Keep `next.config.ts` minimal. Never add config options to "fix" dev/test dependencies leaking into production — fix the root cause instead (remove the dependency from production builds, or use `.vercelignore`).

---

## Application

These principles apply to **every task** in this project. If a prompt conflicts with these principles, the principles take precedence. When in doubt, refer to the principle that best matches the situation and follow its guidance.

---

## Low-End Android Constraints (Zimbabwe Market)

### Target Device Baseline
- **OS**: Android 8–10 (Go Edition common), system WebView 70–90
- **Hardware**: 1–2 GB RAM, 8–16 GB storage, Cortex-A53/A55 CPUs
- **Screen**: 320–360px width, 480–720px height, 2–3x DPR
- **Network**: 3G/EDGE common, 4G intermittent, data $15–20/GB
- **Browser**: Chrome WebView (no auto-update), Opera Mini (proxy), UC Browser

### Observed Failure Modes

| Symptom | Root Cause | Fix |
|---------|------------|-----|
| Janky scroll, 10–15 fps | Framer Motion `animate` on mount + large images | Reduce motion, `will-change`, native CSS scroll |
| White flash on nav | No skeleton, heavy JS bundle | Static HTML shell + streaming, critical CSS inline |
| Touch delay 300ms | Missing `touch-action: manipulation` | Add globally on interactive elements |
| Images don't load | AVIF/WebP unsupported on WebView <70 | `<picture>` with JPEG fallback, `loading="lazy"` |
| Layout shift on font load | `display: swap` without size-adjust | `size-adjust`, `ascent-override`, fallback font metrics |
| Memory crash on gallery | Multiple 2MB+ JPGs decoded simultaneously | Downsample server-side, `decoding="async"`, limit DOM nodes |
| WhatsApp WebView breaks | `target="_blank"` opens external browser | `href="whatsapp://"` with `data-action="share"` fallback |
| Form submission fails | JS disabled/blocked by data saver | Native `<form action="/api/...">` + progressive enhancement |

### Progressive Enhancement Rules

1. **HTML-first**: Every page works without JS (forms, links, content visible)
2. **CSS baseline**: Layout works on Flexbox/Grid with float fallback; no `gap` without fallback
3. **JS as enhancement**: IntersectionObserver, smooth scroll, animations — all `if ('feature' in window)`
4. **Images**: `<picture><source type="image/avif"><source type="image/webp"><img src="jpg"></picture>` + explicit `width`/`height`
5. **Fonts**: Subset WOFF2, preload, `font-display: optional` for body, `swap` only for headings
6. **Motion**: `@media (prefers-reduced-motion: reduce)` disables ALL transitions/animations
7. **Bundle**: Target <50 KB gzipped JS for initial load; code-split by route
8. **Caching**: Service Worker with `stale-while-revalidate` for static assets; `network-first` for API

### Test Matrix Additions (playwright.config.ts)

```typescript
// Add these projects for Zim-realistic coverage
{ name: "low-end-android", use: { ...devices["Galaxy A10"] } },      // 320px, 2GB RAM
{ name: "android-go", use: { ...devices["Galaxy J4 Core"] } },       // 1GB RAM, Go Edition
{ name: "opera-mini", use: { userAgent: "Opera/9.80...", viewport: { width: 360, height: 640 }, isMobile: true } },
{ name: "throttled-3g", use: { ...devices["Galaxy A10"], offline: false, downloadThroughput: 400*1024/8, uploadThroughput: 400*1024/8, latency: 300 } },
```

### CI Gates
- `npm test` must pass on `low-end-android` + `throttled-3g`
- Lighthouse CI: Performance ≥ 85 on 3G throttle, Accessibility ≥ 95
- Bundle analyzer: `next build && npx @next/bundle-analyzer` — main chunk < 50 KB gzip

### Design Token Adjustments for Low-End
- Reduce `box-shadow` depth (expensive paint)
- Avoid `backdrop-filter` (no support on WebView <80)
- Limit `border-radius` on large elements (corner rasterization cost)
- Prefer `transform: translateZ(0)` only where measured necessary
- Static gradients over animated ones
