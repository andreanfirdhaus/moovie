## Moovie - TMDB Clone
This project is a TMDB-inspired movie web app clone built to explore how movie data is fetched and displayed in a modern web application.
The interface adopts a dark-mode oriented design while maintaining the core concept of a movie discovery platform.

The project focuses on understanding API data fetching, state handling (loading, error, and data states), caching and building reusable UI components. 

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
    ├── config/          # Application configuration and shared setup.
    ├── features/        # Feature-based modules (core app domains).
    ├── hooks/           # Shared custom React hooks.
    ├── lib/             # Utility functions and helper logic.
    ├── pages/           # Route-level page components.
    ├── services/        # API communication layer.
    ├── types/           # TypeScript type definitions
    ├── layout.tsx       # Global layout wrapper.
    ├── main.css         # Global styles.
    ├── main.tsx         # Application entry point.
    ├── not-found.tsx    # 404 page
    └── routes.tsx       # Route configuration.
```
