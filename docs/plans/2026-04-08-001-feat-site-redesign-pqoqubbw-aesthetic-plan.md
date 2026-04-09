---
title: "Redesign Site to Minimal Craft Aesthetic"
type: feat
status: active
date: 2026-04-08
---

# Redesign Site to Minimal Craft Aesthetic

## Overview

Redesign briandell.xyz from its current lavender-gray editorial aesthetic to a minimal, monochrome, craft-focused design inspired by pqoqubbw.dev. Stay on Jekyll. Adopt a warm stone color palette with dark mode, narrower column, Geist typography, simplified navigation (no nav bar — homepage is the hub), and a spotlight hover interaction. The homepage becomes a unified page: intro paragraph, projects list, and a writing section linking to Brian's Little Futures posts.

## Problem Statement / Motivation

The current site has a nice editorial feel but doesn't reflect Brian's current aesthetic preferences. The pqoqubbw.dev approach — extreme restraint, generous whitespace, warm monochrome, craft-obsessed minimalism — better represents the "before the big future, endless little futures" brand. The redesign should make the site feel intentional and quiet, with the work speaking for itself.

## Proposed Solution

A visual and structural redesign within the existing Jekyll framework. No tech stack migration. Zero-JS philosophy maintained.

### Design System Changes

**Color Palette (CSS Custom Properties)**

Light mode:
| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#fafaf9` (stone-50) | Page background |
| `--bg-secondary` | `#f5f5f4` (stone-100) | Card backgrounds, code blocks |
| `--text-primary` | `#1c1917` (stone-900) | Main text |
| `--text-secondary` | `#44403c` (stone-700) | Secondary text, bio |
| `--text-tertiary` | `#78716c` (stone-500) | Dates, meta, icons |
| `--accent` | `#1c1917` (stone-900) | Links (same as text — pqoqubbw.dev style) |
| `--accent-hover` | `#78716c` (stone-500) | Link hover (fade, not darken) |
| `--border-color` | `#e7e5e4` (stone-200) | Dividers, hr |

Dark mode (`@media (prefers-color-scheme: dark)`):
| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#0c0a09` (stone-950) | Page background |
| `--bg-secondary` | `#1c1917` (stone-900) | Card backgrounds, code blocks |
| `--text-primary` | `#fafaf9` (stone-50) | Main text |
| `--text-secondary` | `#d6d3d1` (stone-300) | Secondary text |
| `--text-tertiary` | `#78716c` (stone-500) | Dates, meta |
| `--accent` | `#fafaf9` (stone-50) | Links |
| `--accent-hover` | `#78716c` (stone-500) | Link hover |
| `--border-color` | `#292524` (stone-800) | Dividers |

**Typography**
- Primary: **Geist** (variable font, already at `/assets/fonts/GeistVF.woff2` — needs `@font-face` declaration)
- Monospace: **Geist Mono** (variable font, already at `/assets/fonts/GeistMonoVF.woff2` — already has `@font-face`)
- Remove Google Fonts `<link>` for Inter from `head.html`
- Keep normal casing (NOT all-lowercase)

**Layout**
- Narrow max-width from 720px to **576px** (`max-w-xl` equivalent)
- Generous vertical padding: `5rem` top, `3rem` bottom
- Single centered column, flexbox-based

### Homepage Restructure

The homepage becomes the site's navigation hub. Structure (top to bottom):

1. **Header**: Site name only (no social icons, no nav links)
2. **Intro paragraph**: Brief bio with inline links to `/now/` and `/library/` woven into the copy (not as a nav bar)
3. **Horizontal rule** (`<hr>`)
4. **Projects section**: Heading "Projects" + list of all 15 projects
   - Each item: title (left) + years (right, in Geist Mono) 
   - One-line description below title in `--text-tertiary`
   - Links to `/projects/<slug>/`
   - Border-bottom separators between items
   - **Spotlight hover**: siblings dim to 30% opacity on hover (CSS `:has()` with graceful degradation)
5. **Writing section**: Heading "Writing" + curated list of Brian's Little Futures posts
   - Each item: title (left) + date (right, in Geist Mono)
   - Links to specific Substack URLs (external links marked with arrow icon)
   - Same spotlight hover effect
   - Data source: new `_data/writing.yml` file with Brian's posts
6. **Footer**: Social icons (LinkedIn, X, email, RSS) + tagline

### Navigation Changes

- **Remove nav bar entirely** — no `_data/navigation.yml` rendering, no About/Writing/Projects/Library links in header
- **Header**: Just the site name, linking to `/`
- **Subpages** (project details, /now/, /library/): Back arrow link in top-left, pointing to `/`
- **Social icons**: Move from header to footer
- **Page discovery**: `/now/` and `/library/` are mentioned inline in bio copy, not in any nav

### Pages Inventory

| Page | Action | Notes |
|------|--------|-------|
| `/` (homepage) | **Rebuild** | Unified hub: intro + projects + writing |
| `/projects/<slug>/` | **Restyle** | Keep content, new aesthetic, back link → `/` |
| `/library/` | **Restyle** | Keep CSS-only toggle, stone palette, dark mode, back link → `/` |
| `/now/` | **Restyle** | Keep content, new aesthetic, back link → `/` |
| `/about/` | **Remove** | Fold bio into homepage intro |
| `/writing/` | **Remove** | Homepage replaces this |
| `/notes/` | **Remove** | Homepage replaces this |
| `/essays/` | **Remove** | Homepage replaces this |
| `/lists/` | **Keep as-is** | Already unpublished (`published: false`) |
| `/projects/` (index) | **Redirect or remove** | Homepage replaces this; update project detail back-links |

### Spotlight Hover Effect

CSS-only implementation using `:has()`:

```css
.project-list:has(.project-item:hover) .project-item:not(:hover) {
  opacity: 0.3;
}

.project-item {
  transition: opacity 0.15s ease;
}
```

Browser support: Chrome 105+, Safari 15.4+, Firefox 121+. Graceful degradation — older browsers simply don't get the dim effect (decorative, not functional).

### Dark Mode Implementation

- Add `<meta name="color-scheme" content="light dark">` to `head.html`
- Add `color-scheme: light dark` to `:root` CSS
- Define all color variables in `:root` (light) and `@media (prefers-color-scheme: dark)` (dark)
- **Remove** `background-color: inherit` from universal reset (`_main.scss` line 28) — this will cause cascading dark mode bugs
- Auto-detection only (no manual toggle — zero-JS constraint)
- Update `::selection` colors to use CSS variables
- Library cover images: add subtle border in dark mode to prevent floating on dark background

## Technical Considerations

### Files to Modify

| File | Changes |
|------|---------|
| `_sass/_main.scss` | Full restyle: colors, typography, layout, dark mode, spotlight hover, remove card styles |
| `_includes/head.html` | Remove Google Fonts link, add `@font-face` for Geist sans, add `color-scheme` meta tag |
| `_includes/navigation.html` | Simplify to site name only. Remove social icons, bio section |
| `_includes/footer.html` | Add social icons (moved from header), restyle |
| `_layouts/default.html` | Adjust main container for new max-width |
| `_layouts/project.html` | Update back-link from `/projects/` to `/`, restyle |
| `_layouts/post.html` | Update back-link, restyle |
| `index.md` | Complete rewrite: intro + projects list + writing list |
| `_pages/library.md` | Restyle, add back-link |
| `_pages/now.md` | Restyle, add back-link |

### New Files

| File | Purpose |
|------|---------|
| `_data/writing.yml` | Brian's Little Futures posts (title, url, date) |
| `_includes/project-list-item.html` | New list-style project item (replaces card) |
| `_includes/writing-list-item.html` | Writing list item with external link icon |

### Files to Remove/Deprecate

| File | Reason |
|------|--------|
| `_pages/about.md` | Folded into homepage |
| `_pages/writing.md` | Replaced by homepage |
| `_pages/notes.md` | Replaced by homepage |
| `_pages/essays.md` | Replaced by homepage |
| `_pages/projects.md` | Replaced by homepage (or redirect) |
| `_includes/project-card.html` | Replaced by list-style item |
| `_includes/stream-item.html` | Replaced by writing list item |

### Architecture Impacts

- **No JavaScript added** — all interactions remain CSS-only
- **Inline CSS stays** — styles still inlined via `scssify` in `<head>`
- **Font loading** simplifies — self-hosted only, no external CDN dependency
- **`compress.html`** layout preserved — test output after major CSS changes

### Performance Implications

- **Faster**: Removing Google Fonts CDN eliminates a render-blocking external request
- **Smaller**: Self-hosted Geist VF woff2 files are already in the repo
- **Simpler DOM**: List items instead of card grids = less HTML

## System-Wide Impact

- **Navigation architecture**: Major shift from multi-page nav to single-page hub. All internal links in bio copy, project detail back-links, and any hardcoded URLs need updating.
- **RSS/Atom feed**: Unchanged — feeds are based on `site.posts`, which is independent of the redesign.
- **SEO**: Page removals need consideration. `/about/` and `/writing/` may have external backlinks. Consider 301 redirects via `netlify.toml`.
- **Netlify headers**: `netlify.toml` cache rules remain valid. No new asset types introduced.

## Acceptance Criteria

### Visual
- [ ] Homepage displays intro paragraph, projects list (all 15), and writing list
- [ ] Warm stone monochrome palette applied consistently across all pages
- [ ] Dark mode activates automatically via `prefers-color-scheme`
- [ ] Geist (sans) and Geist Mono typography throughout
- [ ] 576px max-width centered column
- [ ] Generous whitespace (5rem top padding)
- [ ] No nav bar — header is just site name
- [ ] Social icons in footer

### Interaction
- [ ] Spotlight hover: hovering a project/writing item dims siblings to 30%
- [ ] 150ms transition on hover effects (fast, not sluggish)
- [ ] Back arrow on subpages (/projects/slug, /now/, /library/) links to `/`
- [ ] External links (Little Futures posts) marked with arrow icon

### Content
- [ ] All 15 projects displayed as list items (title, years, one-line description)
- [ ] Writing section populated with Brian's Little Futures posts (via `_data/writing.yml`)
- [ ] `/now/` and `/library/` linked inline in bio copy
- [ ] Library page restyled but functionally unchanged (CSS-only toggle preserved)

### Technical
- [ ] Zero JavaScript
- [ ] Google Fonts removed — all fonts self-hosted
- [ ] `color-scheme` meta tag and CSS property set
- [ ] `background-color: inherit` removed from universal reset
- [ ] Dark mode `::selection`, shadows, and borders all use CSS variables
- [ ] Removed pages get 301 redirects in `netlify.toml`
- [ ] Builds successfully with Jekyll 4.4.1

## Implementation Order

1. **Color variables + dark mode** on `:root` — foundation everything else builds on
2. **Typography swap** — add Geist sans `@font-face`, remove Inter, update font stacks
3. **Layout narrowing** — 720px → 576px, adjust padding
4. **Homepage restructure** — new template with intro + project list + writing list
5. **Navigation simplification** — strip header to name only, move social icons to footer
6. **Spotlight hover effect** — CSS `:has()` implementation
7. **Subpage restyling** — project details, /now/, library (new colors, typography, back-links)
8. **Page cleanup** — remove About/Writing/Notes/Essays, add redirects in `netlify.toml`

Each step can be visually verified before proceeding.

## Dependencies & Risks

| Risk | Mitigation |
|------|------------|
| `:has()` not supported in older Firefox | Graceful degradation — effect is decorative |
| `compress.html` mangles restyled CSS | Test built output after each major CSS change |
| Book cover images look jarring in dark mode | Add subtle `1px solid var(--border-color)` border |
| Removed pages break external links | Add 301 redirects in `netlify.toml` |
| Paper Mono unavailable | Resolved: using Geist Mono instead |
| `background-color: inherit` reset causes dark mode bugs | Remove it as first change, verify light theme still works |
| Ruby env issue (Ruby 2.6 vs bundle for 3.1) | Known from prior session — verify build separately |

## Data: Writing Section

A new `_data/writing.yml` file is needed with Brian's Little Futures posts. Structure:

```yaml
# Writing — Brian's Little Futures posts (not Tom's)
- title: "Post Title"
  url: "https://littlefutures.substack.com/p/post-slug"
  date: "2025-01-15"
```

Brian will need to curate this list with his specific posts from the newsletter.

## Sources & References

- **Reference site**: pqoqubbw.dev — Dmytro's minimal design engineer portfolio
- **Color palette**: Based on Tailwind CSS stone scale (stone-50 through stone-950)
- **Typography**: Geist by Vercel (already self-hosted), Geist Mono (already self-hosted)
- **CSS `:has()` support**: [caniuse.com/css-has](https://caniuse.com/css-has) — 93%+ global support
- **Existing assets**: `/assets/fonts/GeistVF.woff2`, `/assets/fonts/GeistMonoVF.woff2`
