# 🛒 বাজার দর / BazarDor

A responsive Bangla market-price app built for **assignment-07**. Browse essential groceries, track daily price changes, and compare prices across markets in Bangladesh.

## Features

- **Live market data:** eight categories and all products from the assignment API.
- **Daily price movers:** the top six risers and fallers ranked by percentage change.
- **Bangla presentation:** Bengali digits, grouped prices, units, and the current date in the Asia/Dhaka timezone.
- **Category browsing:** active navigation, numeric ascending/descending sorting, and empty states.
- **Protected product details:** minimum, maximum, average, and all market price ranges, with server-validated sessions.
- **Better Auth:** email/password registration and login, Google/GitHub OAuth, logout, validation messages, and toast feedback.
- **My profile:** protected profile and a separate route to update the user's name.
- **Responsive layouts:** mobile, tablet, and desktop grids; a scrolling ticker; stacked mobile hero.
- **Loading and recovery:** skeletons, friendly invalid-route pages, and retryable API errors.

## Technology

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4 · DaisyUI 5 · Better Auth · MongoDB · react-hot-toast

## Run locally

Use **Node.js 22.18+** (Node 24 recommended) and npm. The Node version also supports the TypeScript utility tests without an additional test package.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). Public market pages work without authentication credentials. Until authentication is configured, the navbar shows sign-in/sign-up links, protected routes redirect to sign-in, and authentication submissions show a service-unavailable error.

## Configure authentication

Fill `.env.local` using `.env.example`; never commit real credentials.

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas or local connection string |
| `MONGODB_DB` | Database name; defaults to `bazardor` |
| `MONGODB_TRANSACTIONS` | `true` for Atlas/replica sets; `false` for standalone MongoDB |
| `BETTER_AUTH_SECRET` | High-entropy secret of at least 32 characters |
| `BETTER_AUTH_URL` | App origin, e.g. `http://localhost:3000` |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |

Generate your secret locally:

```bash
openssl rand -base64 32
```

Better Auth creates its MongoDB collections without a SQL migration. Configure database network access and credentials for the machine or hosting provider running the server. MongoDB clients are reused across requests.

Register OAuth redirect URLs with the providers:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

Replace the origin with your deployed domain for production. A provider is enabled when both its ID and secret are present. Email verification and password reset are intentionally absent. Email/password registration redirects to sign-in; sign-in returns to the homepage or the protected page originally requested.

Implementation follows the official [Next.js integration](https://better-auth.com/docs/integrations/next), [MongoDB adapter](https://better-auth.com/docs/adapters/mongo), and [update-user documentation](https://better-auth.com/docs/concepts/users-accounts#update-user).

## Routes

| Route | Behavior |
| --- | --- |
| `/` | Hero, price movers, and all products |
| `/category/[slug]` | Category products and numeric sorting |
| `/product/[slug]` | Protected product and market details |
| `/signin`, `/signup` | Email/password and social authentication |
| `/profile` | Protected account information |
| `/profile/edit` | Protected name update |
| `/api/auth/[...all]` | Better Auth handlers |

Unknown routes and unknown category/product slugs show a friendly 404 page. App Router pages run on the server and support direct visits and refreshes; this app is not a static export.

## API and calculations

Base URL: `https://api.api-store.workers.dev/api/bazardor`

- `GET /categories`
- `GET /products`
- `GET /products?category=chal`
- `GET /products/1`

Product links use slugs; the data layer resolves a slug to the API's numeric ID. API calls check HTTP status and time out after 15 seconds. React request memoization shares repeated reads within one render. No persistent fetch-cache policy is configured.

Sorting uses the API's numeric `today` values, never formatted Bengali strings. Movers rank by absolute percentage within the requested direction. The summary minimum and maximum are the extrema across markets; the average is the mean of each market's midpoint `(min + max) / 2`. If no market entries exist, the daily price is used. Badges follow the assignment text: green up, red down, gray flat.

## Checks

```bash
npm run lint
npx tsc --noEmit --incremental false
npm test
npm run build
npm start
```

Verified during implementation:

- TypeScript, ESLint, and the production build.
- Six tests covering Bengali numbers, Dhaka dates, numeric sorting, mover selection, and safe local post-login redirects.
- Production HTTP checks for home, category, auth, invalid routes, protected redirects, and unconfigured-auth responses.
- Browser checks at desktop, 440px mobile, and 768px tablet widths; category sorting, protected redirect toast, and form validation.

Real registration/login, OAuth callbacks, logout, and persisted profile updates still require MongoDB and OAuth credentials and must be tested after configuration.

## Deploy to Vercel

1. Push the committed project to GitHub and import it into Vercel as a Next.js project.
2. Add the environment variables from the table above. Set `BETTER_AUTH_URL` to the final HTTPS domain.
3. Update Google/GitHub callback URLs to that domain and permit the deployment environment to reach MongoDB.
4. Deploy with `npm run build`; use the standard Next.js output, not static export.
5. Check registration, sign-in, both social providers, logout, profile updates, and direct refreshes of category/product routes.

Deployment and service provisioning are deferred until credentials and a hosting project are available. No deployment is claimed here.

## Design and known limitations

Reference: [BazarDor assignment Figma](https://www.figma.com/design/TsYoDEvdKs1lyO5feo0I68/Bazardor-_-Assignment-07?node-id=0-1).

The Figma integration exposed page structure and a reference render, then hit the Starter-plan tool limit before detailed node context or asset export was available. The app implements the written requirements with an original local basket illustration. Exact Figma fidelity and use of its original hero asset remain pending access to detailed design exports.

`npm audit` reports five high-severity findings in the existing ESLint development dependency chain, originating in `braces` 3.0.3. The registry offered no patched `braces` version during implementation; the suggested automatic fix would downgrade the Next.js ESLint configuration to version 14. No forced downgrade was applied. Review this advisory again when a compatible fix is available.
