---
version: alpha
name: Moovie Design System
description: 'A dark, cinematic interface system for browsing movies and TV series with restrained surfaces, clear content hierarchy, and a blue primary action color.'

colors:
    primary: '#0957e1'
    primary-hover: '#4a8aff'
    on-primary: white
    background: '#000000'
    surface: '#0a0a0a'
    border: '#252525'
    text: zinc-100
    text-muted: zinc-400
    accent: yellow-400
    success: green-500
    warning: yellow-400
    danger: red-500

typography:
    fontFamily: "'Inter', sans-serif"
    display:
        tailwind: text-4xl
        fontWeight: 700
        lineHeight: 1.2
    heading-xl:
        tailwind: text-2xl
        fontWeight: 600
        lineHeight: 1.3
    heading-lg:
        tailwind: text-xl
        fontWeight: 600
        lineHeight: 1.35
    heading-md:
        tailwind: text-lg
        fontWeight: 600
        lineHeight: 1.4
    body:
        tailwind: text-base
        fontWeight: 400
        lineHeight: 1.5
    body-sm:
        tailwind: text-sm
        fontWeight: 400
        lineHeight: 1.45
    label:
        tailwind: text-xs
        fontWeight: 600
        lineHeight: 1.35
    metadata:
        tailwind: text-xs
        fontWeight: 500
        lineHeight: 1.4

spacing:
    base: 4px
    scale: [2, 4, 6, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96]
    page-padding:
        mobile: px-4
        tablet: sm:px-6
        desktop: lg:px-12
        wide: xl:px-24
    common-gap: [gap-2, gap-3, gap-4, gap-6]

radius:
    sm: rounded-sm
    md: rounded-md
    lg: rounded-lg
    xl: rounded-xl
    2xl: rounded-2xl
    pill: rounded-full

shadows:
    card: shadow-lg
    dropdown: shadow-xl
    modal: shadow-2xl
    overlay: backdrop-blur-md

motion:
    duration-fast: 150ms
    duration-base: 200ms
    duration-slow: 300ms
    easing: ease-out
    reduced-motion: required

breakpoints:
    sm: 640px
    md: 768px
    lg: 1024px
    xl: 1280px
    2xl: 1536px
---

# Moovie Design System

## Rationale

Moovie is a dark, media-first browsing experience. The visual system uses a black background, a layered surface scale, and a blue primary action color so posters, backdrops, ratings, and actions remain the visual focus.

This document is both a UI review reference and the source of truth for future component changes. The project uses Tailwind CSS 3 with a small, intentional custom `surface` and `primary` extension. Do not introduce additional colors outside the approved hex values below.

The system has two layers:

-   **Current implementation**: patterns already present in the project.
-   **Approved direction**: rules that future changes must follow and that existing components should gradually converge toward.

## 1. Visual Theme & Atmosphere

### Character

-   Dark, cinematic, content-first.
-   High contrast between media imagery and interface chrome.
-   Restrained surfaces; depth comes primarily from tonal changes and shadow.
-   Compact controls suitable for repeated browsing, filtering, and navigation.
-   Blue is reserved for primary actions and selected states.
-   Yellow is reserved for ratings and attention-oriented media signals.

### Surface hierarchy

| Role            | Tailwind            | Usage                                                 |
| --------------- | ------------------- | ----------------------------------------------------- |
| Page background | `bg-background`     | Body and full-page background                         |
| Main surface    | `bg-surface`        | Cards, dropdowns, search results, panels              |
| Raised surface  | `bg-surface-raised` | Secondary controls, selected controls, hover surfaces |
| Hover surface   | `bg-surface-hover`  | Hover feedback on neutral controls                    |
| Overlay         | `bg-black/80`       | Modal and mobile navigation backdrop                  |

Use surface contrast before adding borders. A solid surface should communicate its container without a border, outline, or ring.

## 2. Color System

The project uses Tailwind's default palette plus the approved `surface` and `primary` tokens in [tailwind.config.js](tailwind.config.js). The names below are semantic roles.

### Content colors

-   `text-zinc-100`: primary headings, titles, important values.
-   `text-zinc-200`: strong secondary content.
-   `text-zinc-300`: readable secondary labels and navigation.
-   `text-zinc-400`: metadata, descriptions, inactive controls.
-   `text-zinc-500`: subtle supporting text and placeholders.

Do not use `text-zinc-500` for critical information, errors, or primary actions.

### Action colors

-   `primary` (`#0957e1`): primary action, selected page, selected filter, loading indicator.
-   `primary-hover` (`#4a8aff`): action links, selected text, active secondary indicators.
-   `primary/15` to `primary/20`: selected or soft action surface.

### Semantic colors

-   `yellow-400` or `yellow-500`: ratings and trending media signals.
-   `red-500` and red shades: danger, destructive actions, error status.
-   `green-500`: success state when introduced by a component.
-   `black` and white opacity values: image overlays and inverse content.

### Color rules

-   Prefer Tailwind classes over arbitrary hex values.
-   Do not add a new primary color for a single component.
-   Avoid using color as the only signal for selected, error, or loading states.
-   Keep text contrast readable against its surface.
-   Use opacity only to express hierarchy or overlay, not to create hidden token variants.

## 3. Typography

The global font is Inter with a `sans-serif` fallback, configured in [src/main.css](src/main.css).

### Type scale

| Role       | Recommended class        | Usage                                 |
| ---------- | ------------------------ | ------------------------------------- |
| Display    | `text-4xl font-bold`     | Hero or dominant page title only      |
| Heading XL | `text-2xl font-semibold` | Main feature heading                  |
| Heading LG | `text-xl font-semibold`  | Page and section headings             |
| Heading MD | `text-lg font-semibold`  | Panel headings and episode sections   |
| Body       | `text-base`              | Long descriptions and overview text   |
| Body small | `text-sm`                | Controls, supporting copy, modal text |
| Label      | `text-xs font-semibold`  | Filter headings, compact labels       |
| Metadata   | `text-xs font-medium`    | Year, cast role, date, rating details |

### Typography rules

-   Use `font-semibold` for headings; reserve `font-bold` for hero titles and high-emphasis values.
-   Use `leading-relaxed` or an explicit readable line height for long descriptions.
-   Avoid repeated arbitrary sizes such as `text-[15px]`, `text-[17px]`, and `text-[12.5px]` when a default size communicates the same hierarchy.
-   Use `truncate` for single-line media titles and `line-clamp` for descriptions.
-   Do not use negative letter spacing as a default rule.
-   Keep responsive heading changes intentional and limited.

## 4. Components & Patterns

### Button

The shared primitive is [src/components/ui/button.tsx](src/components/ui/button.tsx).

#### Variants

| Variant     | Background       | Text            | Usage                                    |
| ----------- | ---------------- | --------------- | ---------------------------------------- |
| `primary`   | `bg-primary`     | `text-white`    | Main conversion or watch action          |
| `secondary` | `bg-zinc-800`    | `text-zinc-100` | Selected tabs and secondary actions      |
| `ghost`     | `bg-surface`     | `text-zinc-300` | Neutral controls on a dark surface       |
| `outline`   | `bg-transparent` | `text-zinc-300` | Transparent control requiring separation |
| `danger`    | `bg-red-950`     | `text-red-400`  | Destructive or error action              |
| `link`      | `bg-transparent` | `text-zinc-200` | Text-only navigation                     |

#### Button rules

-   Solid variants must not use `border`, `outline`, or `ring` as decoration.
-   The `outline` variant is the explicit exception because it has a transparent background.
-   Use `size="icon"` for icon-only actions and provide an accessible `aria-label`.
-   Keep button text short and action-oriented.
-   Disabled buttons use reduced opacity and no pointer events.
-   Loading buttons replace the leading content with a spinner.

### Card

Media cards use a `2/3` poster ratio, `rounded-md`, and `bg-surface-raised`.

```tsx
<figure className='relative aspect-[2/3] overflow-hidden rounded-md bg-surface-raised'>...</figure>
```

Card rules:

-   Do not add a border or ring to a solid card.
-   Use `shadow-lg` only when the card needs elevation from its surrounding surface.
-   Titles use primary text; year and supporting metadata use muted text.
-   Poster images use `object-cover`.
-   Empty poster states use the same surface as the media frame.

### Rating badge and rating circle

-   Use `yellow-400` for rating icons and values.
-   Rating badges use a dark translucent background such as `bg-black/60`.
-   The rating circle uses `stroke-zinc-800` for its track and rating-specific stroke colors.
-   Keep rating information visually distinct from ordinary metadata.

### Labels, chips, and filters

Genre filters, search tabs, and selected sort items are compact controls, not generic badges.

-   Selected state: `bg-primary` or `bg-primary/15` with `text-primary-hover`.
-   Unselected state: `bg-surface` or `bg-surface-raised` with `text-zinc-300`.
-   Use `rounded-full` for filter chips and genre selectors.
-   Solid chips do not use borders or rings.
-   Keep labels short and prevent wrapping where horizontal scrolling is expected.

### Input and search

-   Transparent search input may use a subtle border because the background is transparent.
-   Solid mobile search input should rely on `bg-surface-raised` and surface contrast rather than a border.
-   Placeholder text uses `text-zinc-500`.
-   Search controls must have a visible accessible label or `aria-label`.
-   Focus must remain keyboard-visible; do not remove focus indication without replacing it with an accessible alternative.

### Dropdown and menu

Dropdown menus use `bg-surface`, `rounded-xl`, and `shadow-xl`.

-   Menu items use `text-zinc-400` by default.
-   Hover and focus surfaces use `bg-zinc-800`.
-   Selected items use `bg-primary/15` and `text-primary-hover`.
-   Solid dropdown panels do not use borders, outlines, or rings.

### Modal and overlay

-   Overlay: `bg-black/80 backdrop-blur-md`.
-   Modal panel: `bg-surface`, rounded corners, and `shadow-2xl`.
-   Solid modal panels do not use borders or rings.
-   Close controls use a compact circular solid surface.
-   Modal entrance uses fade plus a small scale/translate transition.

### Navigation

-   Navigation is transparent or layered over the hero when possible.
-   Dropdown panels use `bg-surface` and `shadow-xl`.
-   Navigation text uses `text-zinc-200` to `text-zinc-400` depending on emphasis.
-   Mobile navigation uses a full-screen dark overlay.
-   Icon-only navigation actions require `aria-label`.

### Loading and skeleton

-   Spinner color: `text-primary`.
-   Skeleton surfaces: `bg-zinc-800` and `bg-zinc-700`.
-   Skeleton shape should match the final component shape.
-   The spinner border is an indicator mechanism and is an allowed exception to the no-border rule.

### Media player

The iframe container may use a border because it is a transparent media viewport and needs a clear functional boundary. Keep it rounded and use `overflow-hidden`.

## 5. Spacing & Layout

### Page container

The established horizontal rhythm is:

```text
px-4 sm:px-6 lg:px-12 xl:px-24
```

Use this pattern for major page-level content unless a feature has a clear content-width requirement.

### Layout spacing

-   `gap-2`: tightly related controls and icon groups.
-   `gap-3`: standard control groups.
-   `gap-4`: card and content groups.
-   `gap-6`: major columns and sections.
-   `py-8` to `py-12`: standard section vertical spacing.
-   `mb-4` to `mb-8`: heading-to-content spacing.

### Responsive behavior

-   `sm`: wider mobile and compact tablet adjustments.
-   `md`: desktop navigation and medium layout changes.
-   `lg`: sidebar and desktop content layout.
-   `xl`: wide page padding and larger content grid.
-   `2xl`: additional grid density for discover views.

Prefer stable dimensions for poster frames, icon buttons, inputs, and pagination controls.

## 6. Radius, Elevation & Boundaries

### Radius

-   `rounded-sm`: small thumbnails and compact media images.
-   `rounded-md`: media cards and standard media frames.
-   `rounded-lg`: controls, input-like panels, and inline tools.
-   `rounded-xl`: dropdowns and larger panels.
-   `rounded-2xl`: large modal or mobile search panel.
-   `rounded-full`: pills, avatars, circular icon buttons, and genre chips.

### Border, outline, and ring rule

This is a project-level rule:

> Do not use `border`, `outline`, or `ring` on an element with a solid background, except when required for accessibility or a functional indicator.

Allowed cases:

-   Transparent input or search field.
-   Transparent `outline` button.
-   Transparent iframe/media viewport.
-   `hr` divider.
-   Loading spinner border.
-   A future accessible focus indicator, if it replaces the removed browser focus indication.

Not allowed:

-   Border around solid cards, modals, dropdowns, buttons, badges, or filters.
-   Decorative ring around solid avatars or media.
-   Border used to compensate for unclear surface hierarchy.

## 7. Motion & Interaction

Motion is functional and should clarify state changes.

### Current motion patterns

-   Button transitions use `duration-300`.
-   Poster cards use a small hover scale through Framer Motion.
-   Dropdowns use opacity, scale, and vertical translation.
-   Modals use fade, scale, and small vertical movement.
-   Loading uses a rotating Lucide loader.
-   Hero slides use a slower fade transition.

### Guidance

-   Fast feedback: 150ms to 200ms.
-   Component transitions: 200ms to 300ms.
-   Hero or page transitions: up to 900ms when tied to media presentation.
-   Avoid animating layout properties unnecessarily.
-   Every motion must have a clear state or content purpose.
-   Add reduced-motion handling before expanding animation coverage.

## 8. States

### Default

Use the component's base surface and content token without added decoration.

### Hover

Use the next surface token, for example `surface` to `surface-raised`, or `primary` to `primary-hover` where appropriate.

### Active / selected

Use `bg-primary` for strong selection or `bg-primary/15 text-primary-hover` for a soft selection.

### Disabled

Use `disabled:opacity-50` and disable pointer interaction. Disabled content should not be communicated only through a low-contrast color.

### Loading

Preserve layout dimensions and replace content with a spinner or skeleton. Avoid content shifting.

### Empty and error states

-   Use `text-zinc-400` for explanatory copy.
-   Use `text-zinc-100` for the state heading.
-   Use semantic status colors only for actual status, not decoration.

## Accessibility

### Required behavior

-   Every icon-only button needs an accessible label.
-   Images need descriptive `alt` text; decorative icons should be hidden from assistive technology when appropriate.
-   Interactive controls must remain keyboard accessible.
-   Do not remove focus visibility without providing an equivalent accessible indicator.
-   Preserve at least a usable touch target for mobile controls.
-   Do not rely on color alone for selected, loading, error, or disabled states.

### Focus exception

The current visual direction avoids decorative outlines and rings. This does not override keyboard accessibility. If a focus indicator is needed, use it as a functional focus treatment, not as a general component border, and validate it against the component background.

### Reduced motion

Future motion changes should support `prefers-reduced-motion: reduce`. At minimum, reduce scale and slide effects and keep state changes understandable without animation.

## 9. Implementation Rules

1. Use the approved `surface` and `primary` hex tokens; do not add additional custom colors without explicit design approval.
2. Prefer semantic component variants over repeating long class strings.
3. Reuse [Button](src/components/ui/button.tsx) for button behavior and states.
4. Keep solid surfaces borderless unless a documented functional exception applies.
5. Prefer standard Tailwind text sizes over repeated arbitrary values.
6. Keep card media ratios and control dimensions stable across breakpoints.
7. Use `cn` and `tailwind-merge` when combining conditional classes.
8. Keep visual changes scoped to the owning component.
9. Do not introduce a new component variant for a one-off color or spacing value.
10. When a new pattern repeats in two or more places, promote it to a shared UI primitive.

## 10. Source Map

| Area                             | Source                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Tailwind scan and palette policy | [tailwind.config.js](tailwind.config.js)                                                                 |
| Global font, body, and scrollbar | [src/main.css](src/main.css)                                                                             |
| Button variants and sizes        | [src/components/ui/button.tsx](src/components/ui/button.tsx)                                             |
| Media card and rating badge      | [src/components/ui/card.tsx](src/components/ui/card.tsx)                                                 |
| Dropdown primitive               | [src/components/ui/dropdown.tsx](src/components/ui/dropdown.tsx)                                         |
| Rating circle                    | [src/components/ui/rating.tsx](src/components/ui/rating.tsx)                                             |
| Search and navigation            | [src/components/layout/navbar/navbar.tsx](src/components/layout/navbar/navbar.tsx)                       |
| Discover filters and grids       | [src/features/discover/components/discover-view.tsx](src/features/discover/components/discover-view.tsx) |
| Detail actions and media player  | [src/features/detail/components/detail-hero.tsx](src/features/detail/components/detail-hero.tsx)         |
| Home hero and popular media      | [src/features/home/components/home-hero.tsx](src/features/home/components/home-hero.tsx)                 |
