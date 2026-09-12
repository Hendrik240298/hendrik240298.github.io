# Repository Guide

## Site Structure
- This is a Hugo site using the bundled PaperMod theme; `config.yml` is the site configuration and sets the production URL, menu anchors, and `writing` permalink format.
- Edit page content in `content/`: the home page is `content/_index.md`, publications are `content/publications.md`, and posts belong in `content/writing/`.
- `content/_index.md` deliberately contains raw HTML for the hero section. Hugo permits this through `markup.goldmark.renderer.unsafe: true`; keep that enabled while the markup remains.
- Files under `static/` are copied unchanged to the published site root. Use root-relative URLs such as `/images/...` and `/files/...` when referencing them.

## Customization Boundaries
- Prefer root-level customizations over changing `themes/PaperMod/`: site CSS is `assets/css/extended/custom.css`, `layouts/partials/extend_head.html` injects Umami, and `layouts/partials/extend_footer.html` renders Obsidian-style wikilinks.
- PaperMod automatically concatenates and minifies CSS matching `assets/css/extended/*.css`; add site-wide style overrides there.

## Build And Deploy
- Use Hugo Extended 0.146.0 or newer. CI installs exactly 0.146.0 and Dart Sass before building.
- Preview locally with `hugo server`; verify production output with `hugo --minify` (generated `public/` and `resources/` are ignored).
- `.github/workflows/hugo.yml` deploys pushes to `master` to GitHub Pages. Its production build overrides `baseURL` from `actions/configure-pages` and publishes `public/`.
- No repository lint or test command is configured; a successful Hugo production build is the focused verification.
