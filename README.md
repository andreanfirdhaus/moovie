## Moovie - TMDB Clone

This project is a TMDB-inspired movie web app clone built to explore how movie data is fetched and displayed in a modern web application.
The interface adopts a dark-mode oriented design while maintaining the core concept of a movie discovery platform.

The project focuses on understanding API data fetching, state handling (loading, error, and data states), caching and building reusable UI components.

![app-preview](/docs/app-preview.jpg)

## Project Structure

```
root
├── .husky/               # Git hooks configuration.
├── public/               # Static assets.
└── src/
    ├── components/
    │   ├── composed/    # Multi-element components with interaction logic.
    │   ├── layout/      # layout components used across pages
    │   └── ui/          # Reusable UI building blocks.
    ├── config/          # App configuration.
    ├── constants/       # Static data.
    ├── features/        # Feature-based modules (core app domains).
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
VITE_TMDB_API_KEY=
VITE_TMDB_ACCESS_TOKEN=
```

> **Note:** this project authenticates using **Access Token (Bearer)**.  
> If you prefer to use API Key instead, switch the method in `config/api-client.ts`.

3. **Run development**

```bash
pnpm dev
```

## Using npm Instead of pnpm (Optional)

This project uses **pnpm**. If you prefer to use **npm**, follow these steps:

### 1. Remove the pnpm-only restriction

In `package.json`, remove the `preinstall` script:

```json
"scripts": {
    "preinstall": "npx only-allow pnpm",
    ...
}
```

### 2. Delete pnpm lock file

```bash
del pnpm-lock.yaml
```

### 3. Install dependencies using npm

```bash
npm install
```

### 4. Replace pnpm commands with npm equivalents

| pnpm                    | npm                       |
| ----------------------- | ------------------------- |
| `pnpm dev`              | `npm run dev`             |
| `pnpm build`            | `npm run build`           |
| `pnpm lint`             | `npm run lint`            |
| `pnpm format:write`     | `npm run format:write`    |
| `pnpm add <package>`    | `npm install <package>`   |
| `pnpm remove <package>` | `npm uninstall <package>` |

> ⚠️ **Note:** Do not commit `package-lock.json` alongside `pnpm-lock.yaml`.  
> Add `package-lock.json` to `.gitignore` if switching permanently to npm.
