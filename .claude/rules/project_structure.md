# Project Structure

## Package manager

The project uses pnpm.

```
formik-mui-fields/
├── .claude/
│   └── rules/                   # Claude Code rule files (.claude scope)
├── .storybook/
│   ├── main.ts                  # Storybook config (Vite builder, addons)
│   ├── preview.ts               # Global Storybook parameters
│   └── FormikDecorator.tsx      # Shared Formik wrapper decorator for stories
├── claude/
│   └── rules/                   # Claude Code rule files (project scope)
├── src/
│   ├── index.ts                 # Package entry — named re-exports of all components
│   ├── FormikTextField/
│   │   ├── FormikTextField.tsx
│   │   ├── FormikTextField.test.tsx
│   │   └── FormikTextField.stories.tsx
│   ├── FormikCheckbox/          # Same structure for each component...
│   ├── FormikSwitch/
│   ├── FormikSlider/
│   ├── FormikRating/
│   ├── FormikSelect/
│   ├── FormikAutocomplete/
│   ├── FormikRadioGroup/
│   ├── FormikToggleButtonGroup/
│   ├── FormikColorPicker/
│   ├── FormikFontPicker/
│   ├── FormikImageUpload/
│   └── CropDialog/
│       └── CropDialog.tsx       # Internal component (not exported)
├── CLAUDE.md                    # Top-level Claude Code instructions
├── package.json                 # formik-mui-fields
├── vitest.config.ts             # Vitest config (jsdom, globals)
└── tsconfig.json                # TypeScript config (strict, noEmit, react-jsx)
```

## Key Conventions

- **Folder-per-component** — each component lives in `src/<ComponentName>/` alongside its test and stories files.
- **`src/index.ts`** is the single package entry point (`"exports": { ".": "./src/index.ts" }`). Every public component must be re-exported here.
- **Stories and tests are colocated** inside the component folder.
- **No build output checked in** — `tsconfig.json` has `noEmit: true`. Build scripts are stubs.

## Tech Stack

- **React 18+**, **TypeScript (strict)**, **MUI 7+**, **Formik 2+**
- Additional runtime deps: `react-color` (ChromePicker), `react-image-crop` (CropDialog)
- Dev deps: Storybook 10 with `@storybook/react-vite`, Vitest, `@testing-library/react`, `@emotion/react`, `@emotion/styled`
- Peer deps: `@mui/material`, `formik`, `react`, `react-dom`

## Scripts

```
npm test                 # Run unit tests (vitest run)
npm run storybook        # Launch Storybook dev server on port 6006
npm run build-storybook  # Build static Storybook
npx tsc --noEmit         # Type-check without emitting
```

`build` and `lint` scripts are stubs (not yet configured).
