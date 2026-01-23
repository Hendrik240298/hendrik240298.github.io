# AGENTS.md - Development Guidelines

## Build/Test Commands
- **No build process**: Static HTML/CSS/JS website - no compilation needed
- **Local development**: Open `index.html` in browser or use `python -m http.server`
- **Testing**: Manual browser testing across devices/screen sizes
- **Deployment**: Direct file upload to GitHub Pages via git push

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements (`<article>`, `<section>`, `<header>`)
- Maintain consistent indentation (2 spaces)
- Use data attributes for JavaScript selectors (`data-page`, `data-nav-link`)
- Keep accessibility attributes (ARIA labels, alt text)

### CSS
- Follow BEM-like naming: `.timeline-item`, `.hero-section`, `.contact-form`
- Use CSS custom properties (`:root` variables) for colors/spacing
- Mobile-first responsive design with `@media` queries
- Organize styles by component sections with comment headers

### JavaScript
- Use vanilla ES5+ JavaScript (no frameworks)
- Prefer `const`/`let` over `var`
- Use `querySelector` for DOM selection
- Add null checks before DOM manipulation
- Follow existing event delegation patterns

### File Structure
- Keep assets organized: `assets/css/`, `assets/js/`, `assets/images/`
- Single page application with section-based navigation
- Maintain separation between content, styling, and behavior