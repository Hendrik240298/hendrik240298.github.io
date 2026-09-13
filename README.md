# Hendrik Fischer

Personal website built with [Hugo](https://gohugo.io/) and the bundled [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

## Development

Use Hugo Extended 0.146.0 or newer.

```bash
hugo server
```

Build the production site with:

```bash
hugo --minify
```

Pushes to `master` are built and deployed to GitHub Pages by `.github/workflows/hugo.yml`.
The workflow overrides the localhost `baseURL` with the production Pages URL, so internal links stay local when previewing with `hugo server`.

## Writing From Obsidian

Create public notes in `content/writing/` with Hugo front matter:

```md
---
title: "Readable Note Title"
slug: "stable-url-name"
date: 2026-09-11
---
```

Use `[[Readable Note Title]]` to link to a published note. Wikilinks match another page's title or filename without `.md`; `slug` only controls the destination URL. Unmatched references remain styled text rather than broken links.

Copy public Obsidian attachments to `static/images/attachments/`. They can then be embedded with `![[image.png]]`; use `![[image.png|Description]]` to supply alt text. Hugo publishes attachments at `/images/attachments/image.png`.

Quote callouts use Obsidian syntax and render as a bordered quote panel:

```md
> [!quote] Title
> Quote text
```
