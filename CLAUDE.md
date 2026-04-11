# What's Healthy and Why

## Project Vision

A health research content site presenting peer-reviewed PubMed research in an accessible, progressively-disclosed format. Users browse health topics (supplements, foods, environmental health, household products, etc.), read a quick summary, and can expand to deeper scientific explanations and full study evidence — all with real PubMed citations.

The site covers: supplements, foods, oils, plastics/BPA/PFAS/microplastics, air filters, water filters, pesticides (Roundup etc.), anti-inflammatories, and anything related to living healthily from a naturalistic perspective.

## Architecture

- **Framework:** Astro 5.x — zero-JS static site generator with content collections
- **Hosting:** Azure Static Web Apps (resource group: whatshealthyandwhy, subscription: Intrepide)
- **DNS:** Cloudflare (whatshealthyandwhy.com)
- **Content:** Markdown files in `src/content/topics/` with PubMed citations in frontmatter
- **Styling:** Vanilla CSS with custom properties, self-hosted Lora + Inter fonts
- **Package manager:** Bun
- **No database, no CMS, no runtime dependencies**

## Content Structure

- Topics contain subtopics as markdown files
- Each subtopic has three detail levels separated by `<!-- more -->` and `<!-- research -->` markers:
  - **Simple:** 3-5 lines, always visible — what it is and why it matters
  - **Medium:** How the science works, mechanisms, dosage info
  - **Deep:** Full peer-reviewed evidence, study details, confidence assessment
- Every claim must have a real PubMed citation (PMID must resolve)

## Design Philosophy

- Simple and welcoming — not clinical or intimidating
- Credible research-platform aesthetic without feeling academic
- Lora for headings, Inter for body text
- Generous whitespace, comfortable reading experience
- Mobile-first responsive design

## Key Conventions

- Content authored as markdown with Zod-validated frontmatter schema
- Progressive disclosure via vanilla JS expand/collapse (no framework)
- JS-disabled fallback shows all content expanded
- All components are `.astro` files — no React/Vue/etc.
- Inline citations as superscript `[1]` linking to reference list at page bottom

## Commands

- `bun dev` — start dev server
- `bun run build` — build static site
- `bun run preview` — preview production build

## GitHub

- Repo: github.com/clyde-intrepide (to be made public eventually)
- Open source is a core value — transparency and auditability
