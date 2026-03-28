# formik-mui-fields

Formik-connected [MUI](https://mui.com/) form field components. Each component wraps an MUI input, wires it to Formik via `useField`, and automatically handles value binding, change/blur events, and validation error display.

## Installation

This is a private internal package. Install peer dependencies in your consuming app:

```bash
npm install @mui/material formik react react-dom
```

## Components

### FormikTextField

Text input bound to Formik. Passes through all MUI `TextFieldProps`.

```tsx
<FormikTextField name="email" label="Email" type="email" />
```

### FormikSelect

Dropdown select with an `options` array. Passes through MUI `SelectProps`.

```tsx
<FormikSelect
  name="country"
  label="Country"
  options={[
    { value: "us", label: "United States" },
    { value: "fr", label: "France" },
  ]}
/>
```

### FormikAutocomplete

Generic autocomplete. Accepts a type parameter for option shape.

```tsx
<FormikAutocomplete
  name="user"
  label="User"
  options={users}
  getOptionLabel={(u) => u.name}
  isOptionEqualToValue={(a, b) => a.id === b.id}
/>
```

### FormikRadioGroup

Radio button group with an `options` array.

```tsx
<FormikRadioGroup
  name="plan"
  label="Plan"
  options={[
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ]}
  row
/>
```

### FormikCheckbox

Checkbox bound to a boolean Formik field. Passes through MUI `CheckboxProps`.

```tsx
<FormikCheckbox name="agree" label="I agree to the terms" />
```

### FormikSwitch

Toggle switch bound to a boolean Formik field. Passes through MUI `SwitchProps`.

```tsx
<FormikSwitch name="notifications" label="Enable notifications" />
```

### FormikSlider

Range slider. Passes through MUI `SliderProps`.

```tsx
<FormikSlider name="volume" label="Volume" min={0} max={100} />
```

### FormikRating

Star rating input. Passes through MUI `RatingProps`.

```tsx
<FormikRating name="score" label="Rating" max={5} />
```

### FormikToggleButtonGroup

Exclusive toggle button group with an `options` array. Passes through MUI `ToggleButtonGroupProps`.

```tsx
<FormikToggleButtonGroup
  name="alignment"
  label="Text Alignment"
  options={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
  exclusive
/>
```

### FormikColorPicker

Color picker using a circular swatch that opens a Chrome-style color picker (via `react-color`).

```tsx
<FormikColorPicker name="brandColor" label="Brand Color" />
```

### FormikFontPicker

Google Fonts autocomplete. Fetches font list from `/api/google/fonts` and injects a preview stylesheet for the selected font.

```tsx
<FormikFontPicker name="fontFamily" label="Font" />
```

### FormikNumberField

Numeric input that stores actual `number` values (not strings). Supports `min`, `max`, and `step`.

```tsx
<FormikNumberField
  name="quantity"
  label="Quantity"
  min={1}
  max={100}
  step={1}
/>
```

### FormikPasswordField

Password input with a show/hide visibility toggle. Accepts optional custom icons via `visiblePasswordIcon` and `hiddenPasswordIcon`.

```tsx
<FormikPasswordField name="password" label="Password" />
```

### FormikImageUpload

Drag-and-drop style image upload with optional cropping dialog. Supports configurable aspect ratios (`1.91:1`, `1:1`, `3:1`).

```tsx
<FormikImageUpload name="avatar" label="Profile Picture" height={150} />;

{
  /* With cropping enabled */
}
<FormikImageUpload
  name="banner"
  label="Banner"
  cropEnabled
  cropOptions={["1.91:1", "1:1"]}
/>;
```

### Date & Time Pickers

Imported separately from `formik-mui-fields/date-picker`. Requires `@mui/x-date-pickers` and `dayjs` as peer dependencies.

```tsx
import {
  FormikDatePicker,
  FormikTimePicker,
  FormikDateTimePicker,
} from "formik-mui-fields/date-picker";

<FormikDatePicker name="date" label="Date" />
<FormikTimePicker name="time" label="Time" />
<FormikDateTimePicker name="datetime" label="Date & Time" />
```

## Usage

All components are designed to be used inside a Formik `<Form>` or `<Formik>` context:

```tsx
import { Formik, Form } from "formik";
import {
  FormikTextField,
  FormikSelect,
  FormikCheckbox,
} from "formik-mui-fields";

const MyForm = () => (
  <Formik
    initialValues={{ name: "", role: "", agree: false }}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <FormikTextField name="name" label="Name" />
      <FormikSelect
        name="role"
        label="Role"
        options={[
          { value: "admin", label: "Admin" },
          { value: "user", label: "User" },
        ]}
      />
      <FormikCheckbox name="agree" label="I agree" />
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);
```

## Peer Dependencies

| Package               | Version | Required                           |
| --------------------- | ------- | ---------------------------------- |
| `@mui/material`       | >= 7    | Yes                                |
| `formik`              | >= 2    | Yes                                |
| `react`               | >= 18   | Yes                                |
| `react-dom`           | >= 18   | Yes                                |
| `@mui/x-date-pickers` | >= 7    | Optional — for date/time pickers   |
| `dayjs`               | >= 1    | Optional — for date/time pickers   |
| `@mui/icons-material` | >= 7    | Optional — for FormikPasswordField |
