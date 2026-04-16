# Real or AI?

A mobile web game where players guess which photo is AI-generated. Built with Bun + React.

## Setup

```bash
bun install
```

## Development

```bash
bun dev
```

## Build

```bash
bun run build
```

Static files are output to `docs/`.

## Deploy

Deploys to Cloudflare Pages (`real-or-ai.pages.dev`):

```bash
bun run deploy
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) to be installed and authenticated:

```bash
bun install -g wrangler
wrangler login
```

## Configuration

Edit `src/config.ts` to change:

- Game title and tagline
- Questions (photo paths + which is AI)
- Ending messages and photo

Photos are referenced as paths (e.g. `./images/q1-real.jpg`). Place image files in `docs/images/`.
