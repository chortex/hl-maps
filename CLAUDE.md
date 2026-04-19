# CLAUDE.md

## Project

- This repository is `hl-maps`, an Angular library of MapLibre-based UI components and map features.
- Treat this repo as a reusable library first, and a demo application second.
- Prioritize stable public APIs, maintainability, and predictable Angular integration.

## Stack

- Angular 19
- TypeScript 5.5
- RxJS 7
- MapLibre GL 5
- SCSS
- Angular CLI / ng-packagr

## Product direction

- `hl-maps` is inspired by `ngx-mapbox-gl`, but it should not be a 1:1 clone.
- Preserve the level of feature coverage and integration flexibility that Angular map developers expect.
- Improve on the reference through:
  - better performance,
  - cleaner Angular integration,
  - standalone component friendliness,
  - simpler maintenance,
  - more predictable APIs.

## Repository structure

- `lib` is the main library build target.
- `demo` is a playground/demo application for manual verification.
- Prefer changes that improve the library without coupling logic to the demo app.

## Commands

- Install deps: `npm install`
- Start demo: `npm run start`
- Build library: `npm run build`
- Production library build: `npm run build:lib`
- Build demo: `npm run build:demo`
- Run tests: `npm run test`
- Run Angular lint: `npm run lint`
- Run eslint check: `npm run lint-check`
- Run prettier check: `npm run format-check`
- Format code: `npm run pretty`
- Run repo verification: `npm run verify`

## Working style

- Prefer minimal, scoped diffs.
- Do not perform broad refactors unless explicitly requested.
- Before major changes, explain the plan briefly.
- For multi-file or architectural tasks, propose steps first and wait for confirmation.
- Follow existing patterns in the repository before introducing new abstractions.

## Angular rules

- Use modern Angular patterns that match the existing codebase.
- Keep APIs explicit and strongly typed.
- Avoid unnecessary dependency injection complexity.
- Do not introduce new state management libraries.
- Respect the existing balance between Angular patterns, signals, and RxJS.

## Library design rules

- This is a library, not an app. Avoid app-specific shortcuts.
- Keep public APIs small, clear, and consistent.
- Avoid breaking changes unless the task explicitly requires them.
- Do not rename exported/public symbols without a strong reason.
- Prefer composition over inheritance.
- Prefer clear config objects and typed inputs over hidden behavior.

## MapLibre rules

- Be careful with map lifecycle interactions.
- Clean up listeners, layers, sources, markers, controls, and subscriptions correctly.
- Watch for memory leaks and duplicate event registration.
- Prefer predictable setup/teardown flows.
- When changing rendering behavior, consider performance for frequent updates.

## Demo UI rules

- The demo application should prefer `@chortex/ui-kit-lib` for UI elements whenever practical.
- Reuse `@chortex/ui-kit-lib` components for buttons, inputs, panels, dialogs, layout primitives, and other general UI controls instead of creating ad hoc demo-only UI.
- Only build custom demo UI when the required component does not exist in `@chortex/ui-kit-lib` or when a custom UI is necessary to showcase `hl-maps` functionality clearly.
- Keep the demo visually consistent by aligning with `@chortex/ui-kit-lib` patterns and styling conventions.
- Avoid duplicating components that already belong in `@chortex/ui-kit-lib`.
- The map experience is the primary focus of the demo; supporting UI should stay clean, lightweight, and secondary.
- Use demo screens to showcase `hl-maps` capabilities, while using `@chortex/ui-kit-lib` to provide consistent surrounding UI.

## Validation rules

- Run the smallest relevant verification first.
- For code style issues, prefer `npm run format-check` and `npm run lint-check`.
- For final validation of meaningful changes, prefer `npm run verify`.
- If a change affects the library build, run `npm run build` or `npm run build:lib`.
- If a change affects demo behavior, use `npm run start` or `npm run build:demo`.
- Do not run expensive or broad commands if a targeted check is enough.
- If tests are missing or unclear, state what should be manually verified.

## Output expectations

- In summaries, mention:
  - what changed,
  - any public API impact,
  - what commands were run,
  - what still needs manual verification.

## Avoid

- Do not add dependencies without clear justification.
- Do not move files or rename modules just for style.
- Do not convert library code into demo-only code.
- Do not leave dead code or speculative abstractions.
- Do not assume undocumented commands; use the commands listed above.
