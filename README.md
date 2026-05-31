# Mamoyo Maids

Professional domestic cleaning services and trusted maid placement agency.

## Features

- **Cleaning Services** — Home cleaning, deep cleaning, laundry, organizing, move-in/move-out
- **Maid Placement** — Hire live-in, live-out, or part-time maids
- **WhatsApp Integration** — Direct chat for bookings and inquiries
- **Mobile-First Design** — Optimized for all devices
- **SEO Optimized** — Meta tags, schema, sitemap, robots.txt

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- TailwindCSS 4
- Framer Motion
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing

```bash
npm test           # Run all tests
npm run test:ui    # Open Playwright UI
npm run test:headed # Run tests in browser
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Deploy automatically

### Manual

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── services/             # Cleaning services
│   ├── employment/           # Hire a maid
│   ├── booking/              # Book a cleaning
│   ├── about/                # About & trust
│   ├── contact/              # Contact page
│   ├── sitemap.ts            # SEO sitemap
│   └── robots.ts             # SEO robots
├── components/               # Reusable components
└── lib/                      # Constants & utilities
```

## License

Private — Mamoyo Maids © 2026
