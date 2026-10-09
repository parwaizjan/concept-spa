# Deployment

Static Astro build served as a Cloudflare Worker with static assets. No SSR, no
database, no paid services.

## Worker config — `wrangler.jsonc`

```jsonc
{
  "name": "concept-spa",
  "workers_dev": false,
  "compatibility_date": "2026-10-06",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@astrojs/cloudflare/entrypoints/server",
  "assets": { "not_found_handling": "404-page" },
  "observability": { "enabled": true },
}
```

- `compatibility_date` must be **≤ the date supported by the installed workerd**.
  If a build fails with "requires compatibility date … newest date supported", lower
  it.
- For a client clone, rename `name` to the client's Worker (e.g. `client-<slug>`).

## Local

```sh
corepack pnpm install
corepack pnpm dev
corepack pnpm check && corepack pnpm lint && corepack pnpm build
corepack pnpm exec wrangler deploy --dry-run   # verify bundling without deploying
```

## Workers Builds

Connect the GitHub repo to Cloudflare Workers Builds:

- Build command: `npx astro build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Production branch: `main`

No Cloudflare token is committed; access is granted through the Workers Builds
connection.

## Custom domain

Attach `demo-spa.zuvo.lk` (demo) or the client's domain to the Worker. The demo keeps
`workers_dev: false` so only the custom domain serves it.

## Indexing

The demo is `noindex`:

- `indexable: false` in `src/data/site.ts`
- `X-Robots-Tag: noindex, nofollow` in `public/_headers`
- `robots.txt` disallows all (generated from `indexable`)

For a real clone, change all three together (`docs/CUSTOMIZATION.md` §7). With
`indexable: true`, `@astrojs/sitemap` is enabled and `robots.txt` allows crawling
and points at the sitemap.

## Post-deploy checks

1. Home page loads at 375px.
2. **Book on WhatsApp** opens the right number with a pre-filled message.
3. **Get directions** opens the right pin.
4. Map embed and hours render.
5. `robots.txt` and the `X-Robots-Tag` header match the intended indexing state.
6. Custom domain resolves over HTTPS.
