# Tata Steel — Headless Next.js

Next.js 16 frontend for a Drupal 11 headless CMS (JSON:API + GraphQL 5.x).

## Quick start

```bash
cp .env.example .env.local
# Set DRUPAL_USERNAME / DRUPAL_PASSWORD (quote passwords with special chars)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Architecture overview

Interactive canvas (open beside chat): [headless-architecture.canvas.tsx](/Users/abhishek.kumar/.cursor/projects/Users-abhishek-kumar-Library-CloudStorage-OneDrive-OneWorkplace-MyProject-NextJs-tata-steel-tatasteel/canvases/headless-architecture.canvas.tsx)

### System architecture

```mermaid
flowchart LR
  subgraph Client
    B[Browser]
  end

  subgraph NextJS["Next.js 16 App Router"]
    R["[[...slug]]/page.tsx"]
    V[DrupalPageView]
    P[ParagraphRenderer]
    L["lib/drupal"]
    R --> V --> P
    R --> L
  end

  subgraph Drupal["Drupal 11 — tata.thebetaweb.site"]
    AUTH["/user/login?_format=json"]
    JA["JSON:API /jsonapi/*\nACTIVE"]
    GQL["GraphQL 5.x /graphql\nREADY — no Compose schema"]
    CMS[(Nodes / Paragraphs / Media)]
    AUTH -.-> JA
    AUTH -.-> GQL
    JA --> CMS
    GQL -.-> CMS
  end

  B -->|HTML / RSC| R
  L -->|session cookie| AUTH
  L -->|fetchJsonApi — ACTIVE| JA
  L -.->|fetchGraphQL — not used yet| GQL
```

### Next.js internal layers

```mermaid
flowchart TB
  subgraph App["src/app"]
    PAGE["[[...slug]]/page.tsx\ngetPageByPath · generateMetadata"]
  end

  subgraph UI["src/components"]
    HEADER[SiteHeader]
    VIEW[DrupalPageView]
    RENDER[ParagraphRenderer]
    HERO[HeroBanner]
    HEAD[HeadingAndDescription]
    SEC[Section]
    RENDER --> HERO
    RENDER --> HEAD
    RENDER --> SEC
    SEC --> HEAD
    VIEW --> RENDER
  end

  subgraph DrupalLib["src/lib/drupal"]
    PAGES[pages.ts]
    AUTH[auth.ts]
    JSONAPI[jsonapi.ts]
    MEDIA[media.ts]
    GRAPHQL[graphql.ts]
    PAGES --> AUTH
    PAGES --> JSONAPI
    PAGES --> MEDIA
  end

  PAGE --> HEADER
  PAGE --> VIEW
  PAGE --> PAGES
  GRAPHQL -.->|unused by UI| PAGES
```

### Content composition

```mermaid
flowchart TB
  subgraph Homepage["node -- homepage"]
    H1[field_herobanneritem] --> HB1[paragraph -- herobanner]
    H2[field_heading_and_description] --> HD1[paragraph -- heading_and_description]
    HB1 --> IMG[media -- image → file]
  end

  subgraph AboutUs["node -- about_us"]
    A1[field_herobanneritem] --> HB2[paragraph -- herobanner]
    A2[field_section_wrapper] --> SEC[paragraph -- section]
    SEC --> SL[field_section_label]
    SL --> HD2[paragraph -- heading_and_description]
  end
```

### JSON:API vs GraphQL — where each is used

| Concern | API | Status | Code |
| --- | --- | --- | --- |
| Page/node loading | **JSON:API** | **Active** | `src/lib/drupal/pages.ts` → `fetchJsonApi()` |
| Paragraph includes (hero, section, heading) | **JSON:API** | **Active** | `include=` in `pages.ts` |
| Media / file URLs | **JSON:API** | **Active** | `src/lib/drupal/media.ts` |
| Auth for restricted entities | Session cookie (not GraphQL-specific) | **Active** | `src/lib/drupal/auth.ts` |
| Dynamic routes / metadata | Built on JSON:API page map | **Active** | `src/app/[[...slug]]/page.tsx` |
| Typed queries / Compose schema | **GraphQL** | **Client ready only** | `src/lib/drupal/graphql.ts` |

**JSON:API (in use today)**  
All live page rendering goes through JSON:API. The catch-all route calls `getPageByPath()` / `getAllPages()`, which request:

```http
GET /jsonapi/node/{bundle}?include=...&filter[status]=1
```

Bundle-specific includes:

| Bundle | Include path |
| --- | --- |
| `homepage` | `field_herobanneritem` (+ image media), `field_heading_and_description` |
| `about_us` | `field_herobanneritem` (+ image media), `field_section_wrapper.field_section_label` |
| `article` / `page` | hero include base only (no content yet) |

**GraphQL (prepared, not driving UI)**  
`fetchGraphQL()` in `src/lib/drupal/graphql.ts` can POST to `/graphql` with the same session auth headers. Drupal GraphQL 5.x is installed, but the exposed Query schema is currently empty (no GraphQL Compose / custom schema fields yet).

When GraphQL is configured, intended split:

| Use JSON:API when… | Use GraphQL when… |
| --- | --- |
| Simple CRUD-style resource reads | Nested page trees in one typed query |
| Standard Drupal entity REST shape is enough | Frontend needs precise field selection |
| Debugging via `/jsonapi/` browser links | Menus, route-by-path, or Compose fragments |

Until then, **do not call GraphQL from pages** — keep rendering on JSON:API.

### Request flow (current)

```mermaid
sequenceDiagram
  participant Browser
  participant Page as [[...slug]]/page.tsx
  participant Pages as pages.ts
  participant Auth as auth.ts
  participant JSONAPI as jsonapi.ts
  participant Drupal

  Browser->>Page: GET / or /about-us
  Page->>Pages: getPageByPath(slug)
  Pages->>Auth: getDrupalSession()
  Auth->>Drupal: POST /user/login?_format=json
  Drupal-->>Auth: session cookie + CSRF
  Pages->>JSONAPI: fetchJsonApi(/node/{bundle}?include=...)
  JSONAPI->>Drupal: GET /jsonapi/... (Cookie)
  Drupal-->>JSONAPI: node + paragraphs + media
  JSONAPI-->>Pages: JSON:API document
  Pages-->>Page: DrupalPage (ParagraphItem tree)
  Page-->>Browser: HTML (HeroBanner / Section / Heading…)
```

### Auth model

Drupal HTTP Basic Auth is **not** enabled on this site. The app logs in with:

```http
POST /user/login?_format=json
{ "name": "…", "pass": "…" }
```

Session cookie + CSRF token are cached in memory (`auth.ts`) and attached to JSON:API (and GraphQL) requests. Required because paragraph/media entities are not anonymously readable.

---

## Project structure

```
tatasteel/
├── .env.example
├── .env.local
├── next.config.ts              # Allows Drupal host for next/image
├── package.json
├── public/
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── not-found.tsx
    │   └── [[...slug]]/        # Dynamic CMS routes
    │       ├── page.tsx
    │       └── page.module.css
    ├── components/
    │   ├── SiteHeader.tsx
    │   ├── DrupalPageView.tsx
    │   └── paragraphs/
    │       ├── ParagraphRenderer.tsx       # Dispatches paragraph tree
    │       ├── HeroBanner.tsx              # herobanner + media
    │       ├── HeadingAndDescription.tsx   # heading + rich text
    │       └── Section.tsx                 # Parent wrapper (nested children)
    └── lib/drupal/
        ├── index.ts            # Public exports
        ├── config.ts           # Env + content type list
        ├── types.ts            # JSON:API + ParagraphItem types
        ├── auth.ts             # Session cookie login
        ├── jsonapi.ts          # ACTIVE data client
        ├── graphql.ts          # READY client (unused by UI)
        ├── media.ts            # field_image → file URL
        └── pages.ts            # Nodes, includes, path map, tree build
```

### App Router

| Path | Role |
| --- | --- |
| `layout.tsx` | Root HTML, fonts, metadata |
| `[[...slug]]/page.tsx` | Resolves all CMS pages; `generateStaticParams` + `generateMetadata` |
| `not-found.tsx` | No matching Drupal node |

### Components

| Component | Role |
| --- | --- |
| `SiteHeader` | Nav from Drupal page list |
| `DrupalPageView` | Title + paragraph tree + optional body |
| `ParagraphRenderer` | Recursively maps `ParagraphItem` → UI |
| `HeroBanner` | `field_header` + `field_image` |
| `HeadingAndDescription` | `field_header` + `field_description` |
| `Section` | Parent for nested paragraphs (`field_section_label`) |

### Drupal layer

| Module | API | Role |
| --- | --- | --- |
| `jsonapi.ts` | JSON:API | Fetch + auth headers + absolute URLs |
| `graphql.ts` | GraphQL | POST helper; not used by routes yet |
| `pages.ts` | JSON:API | Bundle fetches, includes, path aliases, paragraph tree |
| `media.ts` | JSON:API includes | Resolve hero image file URL |
| `auth.ts` | Drupal login | Session for both clients |

---

## Content model (Drupal)

### Content types

| Bundle | Used on | Fields |
| --- | --- | --- |
| `homepage` | `/`, `/homepage` | `field_herobanneritem`, `field_heading_and_description` |
| `about_us` | `/about-us` | `field_herobanneritem`, `field_section_wrapper` |
| `article`, `page` | — | Supported in code; empty in CMS |

### Paragraph types

| Paragraph | Parent field | Fields / children |
| --- | --- | --- |
| `herobanner` | `field_herobanneritem` | `field_header`, `field_image` → media → file |
| `heading_and_description` | `field_heading_and_description` (homepage) or nested under section | `field_header`, `field_description` |
| `section` | `field_section_wrapper` (about us) | `field_section_label` → nested `heading_and_description` |

### Nesting (About Us)

```
node--about_us
 ├─ field_herobanneritem[] → paragraph--herobanner
 └─ field_section_wrapper[] → paragraph--section
        └─ field_section_label[] → paragraph--heading_and_description
```

Frontend model: `ParagraphItem { resource, children[] }` built in `pages.ts`, rendered recursively by `ParagraphRenderer`.

---

## Routes

| URL | Source |
| --- | --- |
| `/` | Homepage (also `/homepage`) |
| `/about-us` | About Us (title slug if no Drupal path alias) |
| `/node/{nid}` | Canonical node fallback |

---

## Environment

| Variable | Purpose |
| --- | --- |
| `DRUPAL_BASE_URL` | Drupal origin |
| `DRUPAL_JSONAPI_PREFIX` | Default `/jsonapi` |
| `DRUPAL_GRAPHQL_PATH` | Default `/graphql` |
| `DRUPAL_USERNAME` / `DRUPAL_PASSWORD` | Session auth (required for paragraphs/media) |
| `DRUPAL_HOMEPAGE_ALIAS` | Default `/homepage` |

Endpoints:

- JSON:API: https://tata.thebetaweb.site/jsonapi/
- GraphQL: https://tata.thebetaweb.site/graphql

---

## Scripts

```bash
npm run dev                   # Development server
npm run build                 # Production build
npm run start                 # Serve production build
npm run lint                  # ESLint
npm run paragraphs:generate  # Generate types, registry, mapping from paragraphs/*.yaml
npm run paragraphs:watch      # Watch paragraphs/*.yaml and regenerate
npm run paragraphs:check     # CI: fail if generated files are stale
```

---

## Adding a new paragraph type

YAML in `/paragraphs` is the source of truth. Generated files must not be edited by hand.

```bash
# 1. Add paragraphs/your_type.yaml (see existing files)
# 2. Generate Next.js wiring + optional Drupal config artifacts
npm run paragraphs:generate
```

Then implement the UI in the scaffolded component (existing component files are never overwritten).

If the paragraph is new in Drupal, set `drupalConfig: true` in the YAML, copy `generated/drupal-config/<id>/` into the Drupal config sync directory, merge the type into the parent field’s allowed bundles, and run `drush cim`. This Next.js repo does not write to Drupal’s database.

Invalid JSON:API include paths still break every page fetch. The generator builds includes from YAML `parents` + relationship fields. Keep those accurate.

See `paragraphs/README.md` for the full workflow.

## Switching a feature to GraphQL later

1. Configure GraphQL Compose (or custom schema) on Drupal so `/graphql` exposes queries
2. Add a query module (e.g. `src/lib/drupal/queries/page.ts`) using `fetchGraphQL()`
3. Swap `getPageByPath` / `getAllPages` implementations (keep the same return types)
4. Leave JSON:API available for media debugging and fallbacks
