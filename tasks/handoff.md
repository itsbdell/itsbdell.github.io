# Session Handoff

## Done
- **Font matching to kojo.blog**: Loaded Inter from Google Fonts (300, 400, 700). Matched every element's font size, weight, and family to kojo's CSS:
  - Site name / Subscribe / back link: 18px, weight 400 (Inter)
  - Bio: 16px, weight 300 (light)
  - "Writing" section heading: 18px, weight 400, normal case
  - Stream year/date: 14px, weight 300
  - Stream title: 16px, weight 400
  - Article title: 32px, weight 400, letter-spacing -0.5px
  - Article meta: 14px, weight 300, letter-spacing 0.5px
  - Article body paragraphs: 18px, weight 400, line-height 1.6
  - Body line-height: 1.5 (was 1.6)
  - Max-width: 720px (was 42rem/672px)
- **Blue-tinted background**: `#f0f2fa` (light mode), with matching secondary `#e8eaf5` and border `#d8dae8`
- **Text colors matched to kojo**: primary `#100f0f`, secondary `#343331`, tertiary `#6f6e69`
- **Header spacing**: Name-to-bio gap increased to 1.875rem (30px) desktop, 1.25rem (20px) mobile — matches kojo's `.intro { margin: 3rem 0 }`
- **Updated bio**: "I lead **new explorations** at the Lowe's Innovation Labs." + second paragraph with nav links (now, about, reading, projects)
- **"Writing" section heading** above posts on homepage
- **Footer tagline**: "Before the Big Future. Endless little futures." — 13px, italic, weight 300, tertiary color
- **AwAI badge**: "AwAI" in a 10px rounded-square capsule (4px radius, 1px border) at bottom of footer
- **Repo cleanup** (4,106 lines deleted): removed junk files, unused pages/layouts/includes/JS, dead CSS, stale vendor artifacts, updated .gitignore
- **Mobile sizing**: proportional scaling, no aggressive shrinking

## Pending
- No outstanding tasks

## Decisions
- Inter loaded from Google Fonts CDN (not self-hosted) — simpler, cached across sites
- Kojo overrides Ghost's default bold site name with `text-lg font-normal` (18px/400) — matched this, not the theme default (24px/700)
- "Writing" heading: initially tried kojo's exact style (18px/400 normal case), Brian preferred the uppercase label version, then reverted to match kojo exactly when doing the full font pass
- Bio uses `<p>` tags with 1rem gap between paragraphs
- Footer tagline is hardcoded in footer.html (not config-driven) since it's unlikely to change often
- AwAI badge: plain text in a rounded-square capsule, no icon — maximally minimal

## Open questions
- `_data/navigation.yml` may be stale — nav is now in bio paragraph, not a nav bar
- Images directory is 141M — could audit for unused images
- AwAI could link to an explanatory page (`/awai/`) in the future
- Dark mode colors unchanged from previous session — may want to audit against the new Inter font rendering
