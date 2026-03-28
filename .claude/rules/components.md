# Component Rules

## Naming

- Every component is named `Formik<MuiComponent>` (e.g. `FormikTextField`, `FormikSelect`).
- Each component lives in its own folder: `src/Formik<Name>/Formik<Name>.tsx`.
- Default export only; re-export as named from `src/index.ts`.

## Directive

Every component file starts with `"use client";` (Next.js RSC boundary).

## Props Pattern

```ts
type Props = {
  name: string; // required — Formik field name
  label?: string; // optional label rendered above / beside the input
} & Omit<
  MuiComponentProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText"
>;
```

- `name` is always required and always the first prop.
- MUI-managed props (`value`, `onChange`, `onBlur`, `error`, `helperText`, `checked`) are omitted from the public API via `Omit`.
- Remaining MUI props are spread onto the underlying component.

## Formik Integration

### Simple fields (TextField, Checkbox, Switch)

- Use `const [field, meta] = useField(name);` (or `useField({ name, type: "checkbox" })` for boolean fields).
- Spread `field` directly onto the MUI component.

### Complex fields (Select, Autocomplete, Slider, Rating, RadioGroup, ToggleButtonGroup, ColorPicker, FontPicker, ImageUpload)

- Use `const [field, meta, helpers] = useField(name);`.
- Set value via `helpers.setValue(...)` in a custom `onChange` handler.
- Set touched via `helpers.setTouched(true)` in `onBlur` (or use `field.onBlur`).

## Error Display

All components follow the same pattern:

```ts
const hasError = meta.touched && Boolean(meta.error);
```

- **TextField**: uses built-in `error` and `helperText` props.
- **All others**: wrap in `<FormControl error={hasError}>` with a conditional `<FormHelperText>{meta.error}</FormHelperText>`.

## Options-Based Components

`FormikSelect`, `FormikRadioGroup`, and `FormikToggleButtonGroup` accept:

```ts
options: {
  value: string;
  label: string;
}
[];
```

`FormikAutocomplete` accepts generic `options: T[]` with `getOptionLabel` and optional `isOptionEqualToValue`.

## Internal Components

`CropDialog` (`src/CropDialog/CropDialog.tsx`) is internal — used only by `FormikImageUpload`. It is NOT exported from the package index.

## Stories

- Every exported component has a `.stories.tsx` file colocated in its folder.
- Stories use the `withFormik` decorator from `.storybook/FormikDecorator.tsx` to provide Formik context.
- Each component should have at minimum: a `Default` story and an `Error` story (using `initialErrors` + `initialTouched`).

## Adding a New Component

1. Create `src/Formik<Name>/Formik<Name>.tsx` following the patterns above.
2. Add `export { default as Formik<Name> } from "./Formik<Name>/Formik<Name>";` to `src/index.ts`.
3. Create `src/Formik<Name>/Formik<Name>.stories.tsx` with Default and Error stories.
4. Create `src/Formik<Name>/Formik<Name>.test.tsx` with tests (see `.claude/rules/testing.md`).
