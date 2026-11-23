# Barkdale & Co.

Static site for Barkdale & Co. (Brookdale, CA). Site files live in `public/`.

## Deploy (Cloudflare Workers static assets)

    npx wrangler deploy

Configuration is in `wrangler.jsonc`. Pretty URLs (`/services`) work through Cloudflare's default HTML handling.
