## Moovie

Movie and TV discovery app powered by real-time TMDB metadata, featuring instant search, dynamic filtering, and multi-language support.

![app-preview](/docs/app-preview.jpg)

## Project Structure

```
root
├── .husky/               # Git hooks configuration.
├── public/               # Static assets.
└── src/
    ├── components/      # Reusable UI components.
    ├── config/          # App configuration.
    ├── constants/       # Static data.
    ├── contexts/        # React context providers.
    ├── features/        # Feature-based modules (core app domains).
    ├── i18n/            # Internationalization setup.
    ├── services/        # API communication layer.
    ├── types/           # TypeScript type definitions
    ├── utils/           # Utility, helper.
    ├── layout.tsx       # Global layout wrapper.
    ├── main.css         # Global styles.
    ├── main.tsx         # Application entry point.
    ├── not-found.tsx    # 404 page
    └── routes.tsx       # Route configuration.
```

## Installation

1. **Clone & Install**

```bash
git clone https://github.com/andreanfirdhaus/moovie.git
cd moovie
pnpm install
```

2. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_TMDB_ACCESS_TOKEN=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```
