# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A library of Formik-connected MUI (Material UI) form field components. Each component wraps an MUI input, wires it to Formik via `useField`, and handles value/onChange/onBlur/error/helperText automatically. Published as `@repo/formik-fields` (private, used internally).

## Tech Stack

- React 18+, TypeScript (strict mode), MUI 7+, Formik 2+
- Additional deps: `react-color` (color picker), `react-image-crop` (image cropping)
- All components are marked `"use client"` for Next.js compatibility

## Build & Scripts

Build, test, and lint scripts are placeholder stubs — not yet configured:

```
npm run build   # stub
npm run test    # stub
npm run lint    # stub
```

TypeScript checking: `npx tsc --noEmit`

## Architecture

**Component pattern:** Each `Formik*` component follows the same structure:

1. Accept `name: string` + component-specific props (MUI props are spread via `Omit` to exclude Formik-managed fields)
2. Call `useField(name)` to get `[field, meta]` or `[field, meta, helpers]`
3. Render the MUI component with `field` spread and error display from `meta.touched && meta.error`
4. Export as default; re-exported from `src/index.ts`

**Two integration styles:**

- **Simple fields** (TextField, Checkbox, Switch, Slider, Rating): spread `field` directly onto the MUI component
- **Complex fields** (Select, Autocomplete, RadioGroup, ToggleButtonGroup, ColorPicker, FontPicker, ImageUpload): use `helpers.setValue`/`helpers.setTouched` for custom change handling, wrapped in `FormControl` with `FormHelperText` for errors

**CropDialog** (`src/CropDialog.tsx`): Internal component used only by `FormikImageUpload`. Provides image cropping with configurable aspect ratios (`1.91:1`, `1:1`, `3:1`) using `react-image-crop`. Not exported from the package.

## Adding a New Field Component

1. Create `src/FormikNewField.tsx` following the pattern above
2. Add `export { default as FormikNewField } from "./FormikNewField"` to `src/index.ts`
