# Sammarco Frontend

Frontend SPA for the Sammarco sports association management system.

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite** as build tool
- **Ant Design 6** for UI components
- **Apollo Client 4** for GraphQL communication
- **React Router 7** for routing
- **i18next** for internationalization (Italian only)
- **pdfmake** for PDF generation (receipts)
- **date-fns** for date manipulation

## Prerequisites

- Node.js >= 18
- Yarn
- Backend running on `localhost:4000` (for GraphQL codegen and development)

## Getting Started

1. Copy the environment file and configure it:

   ```sh
   cp .env.example .env
   ```

2. Install dependencies:

   ```sh
   yarn
   ```

3. Start the development server:
   ```sh
   yarn start
   ```
   Opens at [http://localhost:5173](http://localhost:5173)

## Scripts

| Command                | Description                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `yarn start`           | Start Vite dev server                                                                          |
| `yarn build`           | TypeScript check + production build                                                            |
| `yarn preview`         | Preview the production build locally                                                           |
| `yarn lint`            | Run ESLint on `src/`                                                                           |
| `yarn lint:fix`        | Run ESLint with auto-fix                                                                       |
| `yarn graphql:codegen` | Generate TypeScript types and hooks from GraphQL schema (requires backend on `localhost:4000`) |

## Environment Variables

| Variable                     | Description                  | Example                                |
| ---------------------------- | ---------------------------- | -------------------------------------- |
| `VITE_GRAPHQLURI`            | Backend GraphQL endpoint     | `https://asdsammarco.ddns.net/graphql` |
| `VITE_RECAPTCHA_V3_SITE_KEY` | Google reCAPTCHA v3 site key |                                        |
| `VITE_RECAPTCHA_V2_SITE_KEY` | Google reCAPTCHA v2 site key |                                        |

## Project Structure

```
src/
├── commons/          # Shared components (headers, action buttons, filters)
├── components/       # Generic reusable components
├── contexts/         # React contexts (auth, theme, settings)
├── core/             # Feature modules
│   ├── attendances/  # Attendance management
│   ├── communications/ # Mass communications
│   ├── courses/      # Course management
│   ├── emails/       # Email history
│   ├── fees/         # Fee management
│   ├── members/      # Member management
│   ├── payments/     # Payment management
│   ├── registration/ # Public registration page
│   └── seasonRenewal/ # Season renewal wizard
├── gql/              # Generated GraphQL types
├── hooks/            # Custom React hooks
├── locales/          # i18n translations (it-IT)
├── settings/         # Settings page
└── utils/            # Pure utility functions
```

Each feature module contains:

- `*ListPage.tsx`, `*CreatePage.tsx`, `*EditPage.tsx` — page components
- `queries.graphql.ts` — GraphQL fragments, queries, and mutations
- `components/` — feature-specific components (Form, Picker, Searcher)

## reCAPTCHA

The public registration page (`/registration/:socialYear`) uses Google reCAPTCHA with a **v3 + v2 fallback** strategy:

1. First attempt uses reCAPTCHA **v3** (invisible, score-based)
2. If the score is too low (< 0.5), the user is shown a reCAPTCHA **v2** checkbox ("Non sono un robot")
3. The user completes the challenge and the form is resubmitted with the v2 token

### Setup

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin) and create **two separate sites**:
   - One with type **reCAPTCHA v3** — copy the **Site Key** and **Secret Key**
   - One with type **reCAPTCHA v2** ("I'm not a robot" Checkbox) — copy the **Site Key** and **Secret Key**

2. Configure the **frontend** environment variables (`.env`):

   ```
   VITE_RECAPTCHA_V3_SITE_KEY=<v3 site key>
   VITE_RECAPTCHA_V2_SITE_KEY=<v2 site key>
   ```

3. Configure the **backend** environment variables (`.env`):
   ```
   RECAPTCHA_V3_SECRET_KEY=<v3 secret key>
   RECAPTCHA_V2_SECRET_KEY=<v2 secret key>
   ```

reCAPTCHA is required — both key pairs must be configured.

## GraphQL Codegen

When modifying queries, mutations, or fragments:

1. Update `queries.graphql.ts` in the relevant feature folder
2. Ensure the backend is running on `localhost:4000`
3. Run `yarn graphql:codegen`
4. Use the freshly generated hooks and types in your components

**Never write component code using generated hooks before running codegen.**

## Code Style

- ESLint + Prettier (single quotes, trailing commas ES5, 120 print width, 2-space indent, semicolons)
- Husky pre-commit hooks with lint-staged
- Arrow functions for React components
- Functional components only, no class components
