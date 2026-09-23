# transetu-website

Marketing site for TranSetu — [transetu.com](https://transetu.com).

Next.js 16 (App Router), exported as a static site and served from GitHub Pages.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # static export into out/
npm run lint
```

To preview exactly what gets deployed:

```bash
npm run build && npx serve out
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
export and publishes `out/` to GitHub Pages. The custom domain is pinned by
`public/CNAME`; the workflow fails the build if that file goes missing from the
export, since losing it unsets the domain.

GitHub Pages must be set to **Build and deployment → Source: GitHub Actions**.
On the legacy "Deploy from a branch" setting Pages runs Jekyll against the repo
root instead, which serves this README as the homepage.

## Enquiry form

`src/app/api/fastag-enquiry/route.ts` is a Node route handler that emails
enquiries over SMTP. **A static export cannot run it** — `output: 'export'`
drops `src/app/api/*` from the build silently, with no error.

The form posts to `NEXT_PUBLIC_ENQUIRY_API_URL`, set as a repository variable
and read at build time. Until that points at a live endpoint on
`api.transetu.com`, the form has nowhere to submit. The route handler is kept
in the repo as the reference implementation to port to the backend.

## Known gaps

Several flows are UI-only — they show a success screen without sending
anything anywhere:

- `/signup` — OTP is never requested or verified
- `OnboardingModal` — agent onboarding
- `ProductOrderForm` — collects PAN/RC documents (currently unreachable)
- GPS application modal on `/product/gps-tracker` (currently unreachable)

Do not link users to these until they are wired to a backend.
