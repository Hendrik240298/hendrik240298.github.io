# AGENTS.md - Development Guidelines

## Project Overview
- Static personal website with plain HTML/CSS/JS
- No build tooling or dependency manager in use
- Single-page layout with section navigation (`data-page`, `data-nav-link`)
- Styling and behavior live in `assets/css/` and `assets/js/`

## Build / Lint / Test Commands
- **Build**: None. Static site; no compilation step.
- **Lint**: None configured. Keep formatting consistent with existing files.
- **Tests**: None. Manual testing only.
- **Single test**: Not applicable (no test runner).
- **Local development**:
  - Open `index.html` directly in the browser, or
  - Serve locally: `python -m http.server` and visit `http://localhost:8000`
- **Deployment**: GitHub Pages via git push (no CI build step)

## Repository-Specific Rules
- There are no Cursor rules in `.cursor/rules/` or `.cursorrules`.
- There are no Copilot instructions in `.github/copilot-instructions.md`.

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements (`<main>`, `<article>`, `<section>`, `<header>`)
- Keep 2-space indentation and consistent blank lines between sections
- Use data attributes for JS hooks: `data-page`, `data-nav-link`, `data-*`
- Preserve accessibility: `alt`, `aria-*`, descriptive `title` attributes
- Prefer lowercase attribute values and consistent quoting
- Keep long text content wrapped for readability; avoid single-line paragraphs
- Avoid inline styles unless a quick, isolated override is required
- Comment headers follow the existing style (`<!--
  - #SECTION
-->`)

### CSS
- Follow BEM-like naming already in use: `.timeline-item`, `.hero-section`
- Use CSS custom properties in `:root` for colors, spacing, typography
- Keep component blocks grouped under comment headers
- Mobile-first approach with `@media (min-width: ...)` breakpoints
- Use descriptive utility classes sparingly (`.text-vegas-gold` exists)
- Avoid !important unless there is no alternative
- Prefer `var(--token)` for colors/spacing; do not hardcode duplicates
- Keep declarations ordered: layout -> box model -> typography -> visuals
- Use consistent spacing: one blank line between major sections

### JavaScript
- Vanilla JS only; no frameworks or bundlers
- Use `const`/`let`, never `var`
- Use `querySelector`/`querySelectorAll` with data attributes
- Always null-check DOM nodes before attaching listeners or modifying
- Keep functions small and single-purpose; reuse helper functions
- Use event listeners, not inline handlers
- Prefer `textContent` for user-visible strings; use `innerHTML` only when needed
- Guard against missing nodes in dynamically optional sections
- Avoid heavy logging in production; keep debug logs minimal

### Formatting Conventions
- Use single quotes in JS strings (matches current `script.js`)
- End files with a newline
- Keep line lengths readable; wrap long HTML text lines
- Use consistent spacing around operators and after commas

### Naming Conventions
- CSS class names: kebab-case (`.hero-description`)
- Data attributes: kebab-case (`data-filter-item`)
- JS variables: camelCase (`formInputs`, `modalCloseBtn`)
- Functions: camelCase verbs (`initTimelineCollapsible`)
- DOM nodes: include a semantic suffix (`Btn`, `Link`, `Item`, `Container`)

### Error Handling and Guards
- Guard against missing DOM nodes before using them
- If a section is optional, keep its logic wrapped in a presence check
- Prefer early returns to reduce nested conditionals

### Assets and File Structure
- HTML: `index.html` at repo root
- CSS: `assets/css/style.css`
- JS: `assets/js/script.js`
- Images: `assets/images/`
- Keep content, styling, and behavior separated; no inline scripts

## Manual Testing Checklist
- Open the site at multiple widths (mobile, tablet, desktop)
- Verify navigation toggles sections correctly
- Verify form enable/disable behavior
- Check images and icons load (Ionicons + custom images)
- Inspect for layout regressions when toggling timeline collapse
