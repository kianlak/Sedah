# Frontend Architecture

This frontend is the React UI boundary for Sedah.

It should stay focused on:

- rendering user-facing application screens
- orchestrating UI state and interaction flow
- calling narrow frontend domain services
- managing presentation concerns such as routing, theming, and animation

It should not become the place for:

- backend or microservice logic
- desktop runtime concerns that belong in `../src-tauri`
- local machine processing that belongs in `../backend`
- transport details scattered across page components

## Current Structure

```text
frontend/
  src/
    app/
      App.tsx
      bootstrap.tsx
      hooks/
      providers/
      routes/
      store/
        hooks.ts
        store.ts
        slices/
    assets/
    domain/
      auth/
    features/
    navigation/
    pages/
      landing/
    settings/
    styles/
    themes/
```

## Boundary Rules

1. `app/` owns application composition.
   It should contain bootstrap, route composition, providers, top-level store wiring, and application-level hooks.

2. `app/store/` owns global client state wiring.
   It should contain store creation, typed Redux hooks, and only the slices that are truly application-wide.
   It should not become a dumping ground for every piece of page state.

3. `pages/` owns screen-level feature areas.
   Each page should keep its own UI, constants, hooks, interfaces, logic, and page-specific CSS close together.

4. `features/` owns reusable UI features that are not tied to a single page.
   Examples: title bar, future media controls, account menu, global overlays.

5. `domain/` owns frontend-facing business service boundaries.
   This is where the UI calls intent-based APIs such as auth, not raw network code.

6. Components should call hooks or domain services, not implement transport or business workflow themselves.

7. `settings/` owns frontend settings models, defaults, persistence helpers, and settings-related logic.

8. `navigation/` owns route-level types and navigation abstractions, not page behavior.

9. `styles/` and `themes/` own cross-app styling primitives.
   Page-specific styling should stay inside the page folder unless it is truly shared.

10. Interfaces should live near the boundary they describe.
   Page-specific interfaces belong inside that page area.
   App-wide or domain-wide interfaces belong in their respective app/domain folders.

11. Constants should live near the page or feature that owns them.
    Do not create a single global constants dump.

## App Layer

`app/` is the frontend composition root.

### `app/bootstrap.tsx`

This file should:

- create the React root
- create the app store
- attach top-level providers
- start the application

It should not contain feature logic.

### `app/App.tsx`

This file should be the top-level application shell for the frontend.
It should stay thin and mostly compose route rendering, global layout primitives, and app-wide hooks.

### `app/providers/`

This folder owns top-level providers such as:

- Redux provider
- future query/data providers
- future theme/runtime providers

Providers should be composed here, not scattered across bootstrap and page files.

### `app/routes/`

This folder owns route composition and route rendering.
It should decide which page is active, but it should not absorb page logic.

### `app/hooks/`

This folder is only for application-level hooks.
Examples:

- theme runtime coordination
- app startup runtime hooks
- global event listeners

Do not move page hooks here just because they are useful.

## Domain Layer

`domain/` is where frontend-facing business boundaries live.

The purpose of `domain/` is to give the UI an intent-based API.

Examples:

- `authService.beginEmailAuth()`
- future `libraryService.loadLibrary()`
- future `playbackService.togglePlayback()`

### Domain Rules

- components should not know transport details
- page hooks may call domain services, but should not become transport layers
- domain services should expose intent, not raw HTTP semantics
- domain services should remain replaceable as backend architecture changes

`domain/` is the correct place to absorb future API gateway or local-runtime adapters behind stable interfaces.

## Settings Layer

`settings/` owns settings-specific frontend concerns.

Examples:

- settings interfaces
- defaults
- persistence helpers
- settings merge/resolve logic

### Settings Rules

- settings persistence should live here, not inside random slices or components
- settings shape should be defined here first, then consumed by store or UI
- settings logic should stay separate from page rendering concerns

If Sedah later has playback preferences, visual preferences, or local behavior preferences, they should extend `settings/` instead of being invented ad hoc in unrelated folders.

## Features Layer

`features/` is for reusable, non-page-owned UI behavior.

Examples:

- title bar
- playback controls
- account menu
- global overlays

### Feature Rules

- if a UI element is reused across multiple pages, it should move toward `features/`
- if it only belongs to one screen, keep it inside that page
- a feature may have its own UI, hooks, constants, and interfaces if it is truly cross-page

## Navigation Layer

`navigation/` owns navigation models and route-level typing.

Examples:

- route identifiers
- route-related interfaces
- future route helper logic

### Navigation Rules

- navigation should describe where the app can go
- page folders should describe what happens on a screen
- navigation types may be used by the store, app routes, and features, but navigation should not absorb feature behavior

## Styling Layers

`styles/` and `themes/` should remain deliberate and small.

### `styles/`

This folder is for global styling primitives and app-wide style concerns.

### `themes/`

This folder is for theme definitions and cross-app visual tokens or theme runtime models.

### Styling Rules

- page-specific CSS belongs in the page folder
- feature-specific CSS belongs with the feature
- global styling layers should only contain styling that is truly shared

## Assets Layer

`assets/` owns static frontend assets that are not better owned by a page or feature.

Examples:

- shared images
- logos
- static artwork used across multiple screens

If an asset belongs only to one page or feature, prefer co-locating it there when practical.

## Store Rules

The current Redux store is application infrastructure, not general-purpose state storage.

Today it correctly owns:

- navigation state
- settings state
- typed Redux hooks
- store creation and persistence wiring

That is the right level of responsibility for `app/store/`.

### What belongs in the store

- cross-app state used by multiple distant parts of the UI
- persisted user preferences such as theme or future playback preferences
- app-level navigation state if routing is store-driven
- authenticated user/session state later, if it needs global access

### What does not belong in the store

- transient form fields
- page-local animation state
- one-screen-only view toggles
- temporary validation errors
- local component open/closed state unless it is globally coordinated

### Slice Rules

- slices should represent app-wide state domains, not arbitrary folders of reducers
- reducers should express intent such as `navigateTo` or `setThemePreference`
- selectors and typed hooks should be the normal way UI reads global state
- persistence should be centralized at the store boundary, not scattered through components

If a new state value is only needed by one page or one subtree, default to local React state or a page hook before promoting it to Redux.

## State Ownership

Use this decision model:

- local component state
  visual toggles, field values, animation flags, ephemeral UI details
- page hook state
  page orchestration, multi-component coordination inside a page, validation flow
- app store state
  cross-app settings, navigation, future authenticated identity, global player state if multiple screens depend on it
- domain service layer
  business operations and side-effect boundaries, not UI-owned state containers

The goal is to avoid both extremes:

- pushing everything into Redux
- burying genuinely global state inside page hooks

## Long-Term Shape

As the product grows, the target direction is:

```text
frontend/
  src/
    app/
      store/
    domain/
      auth/
      library/
      playback/
      settings/
    features/
      title-bar/
      playback-controls/
      account-menu/
    pages/
      landing/
      library/
      player/
      settings/
    shared/
      ui/
      hooks/
      utilities/
```

`shared/` should only be introduced when reuse is real. Do not create it just to move code around.

## Sedah Direction

For Sedah specifically:

- `frontend` should express user intent and UI state
- `src-tauri` should own desktop shell/runtime concerns
- `backend` should own local processing concerns
- `server` should own future network-facing service concerns

That means:

- page components should stay presentation-oriented
- hooks should orchestrate UI flow
- domain services should present intent-based APIs
- transport and infrastructure details should remain behind stable boundaries

## Landing Pattern

The current landing page is a useful structural example:

- `constants/`
  page-owned static values
- `hooks/`
  UI orchestration hooks
- `interfaces/`
  page-owned type boundaries
- `logic/`
  pure logic helpers such as validation
- `ui/`
  page components and page-local visual structure
- `css/`
  page-local styling

That pattern should be repeated for future screens when it still fits.

## Professional Standard

The frontend is considered healthy when:

- components are mostly presentational
- hooks expose intent-based actions instead of raw setters
- business/service boundaries are explicit
- global state is small, intentional, and owned by `app/store`
- Redux is used for cross-app state, not page-local convenience
- constants and interfaces are local to the feature that owns them
- page folders are self-contained and readable
- global folders stay small and intentional

If a new file does not clearly belong to one of these boundaries, stop and decide the boundary first before adding the code.
