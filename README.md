# Caster Comms — your Cloudflare account

This package contains the same built app as the live version, its database setup, and an editable source snapshot. Deploy the included build first; no app build is required.

## First deployment (Windows, macOS, or Linux)

1. Install Node.js 22 LTS or newer from https://nodejs.org if you do not have it.
2. Extract this ZIP fully. Open a terminal in the `caster-comms-cloudflare` folder (the folder containing this README and `package.json`). On Windows, open that folder in File Explorer, right-click a blank area and choose **Open in Terminal**. If PowerShell blocks npm scripts, use Command Prompt.
3. Run these commands, one at a time:

```sh
npm install
npm run login
npm run create-db
```

The login command opens your browser. Authorize Wrangler for your Cloudflare account. If prompted to choose an account, choose the account that should own the app.

The create-db command prints a `database_id`, a UUID. Copy it. It is an identifier, not a password. If asked to update the configuration automatically, choose **No** and use the command below. If the database already exists, use `npx wrangler d1 list` to find its ID rather than creating it again.

4. Replace `YOUR_DATABASE_ID` below with that UUID (do not include angle brackets), then run:

```sh
node configure-db.mjs YOUR_DATABASE_ID
npm run setup-db
npm run deploy
```

Confirm applying the database migration when asked. After deployment, Wrangler prints your public `workers.dev` URL. Open it and share that exact URL with both co-casters. No domain purchase or ChatGPT login is required. This creates a separate room from the existing ChatGPT-hosted site.

## Check it together

- Join from three browsers or devices with different names.
- Press Space while the app tab is focused, or click the signal button.
- Check all browsers see that caster turn green, with updates approximately every 0.6 seconds.
- Press again to cancel; activate again and check it clears after 10 seconds.
- A fourth visitor should get the room-full message.
- Leaving clears a seat; abrupt disconnections may take up to 20 seconds to clear.

## How to find it in Cloudflare

In the Cloudflare dashboard, open **Workers & Pages**, then the `caster-comms` Worker. Your database appears under **D1** as `caster-comms-db`. If you want a custom domain, configure it on the Worker's settings page after the workers.dev URL works.

## Editable source

`source/` contains the original project source, dependencies, database schema, and build scripts with its previous Site identity removed. It contains no credentials or node_modules. The files for your app are `source/app/page.tsx`, `source/app/globals.css`, and `source/app/api/room/route.ts`.

For future edits, install dependencies in `source/` and run its `npm run build` using Node.js 22.13 or newer. Replace this package's `dist/client` and `dist/server` with the new build output, then run `npm run deploy` from the outer folder. Keep using the outer `wrangler.json`; the build-generated configuration uses a placeholder database. Database schema changes also require adding and applying new SQL migrations before deployment.

## Usage and costs

The app polls the database regularly while open. Cloudflare plan limits and charges depend on usage. Watch Workers and D1 usage in your dashboard; this package does not assume unlimited free hosting. No paid plan or domain is purchased by these instructions.

## Verification

The original app passed its production build, TypeScript checks, and SQL capacity and signaling checks. This export is checked with Wrangler's deployment dry-run. Deployment to your account and a live multi-person browser check must happen after your login and database creation.

Official references:
- https://developers.cloudflare.com/workers/wrangler/commands/
- https://developers.cloudflare.com/workers/wrangler/commands/d1/
- https://developers.cloudflare.com/workers/wrangler/configuration/
