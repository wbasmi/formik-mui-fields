# formik-mui-fields

## 0.5.0

### Minor Changes

- 0c99cd8: Add a clear button to FormikFileUpload and FormikImageUpload
  - `FormikFileUpload` now renders a clear `IconButton` (only when a file/files are selected) that resets the field to `null` for single uploads or `[]` for multiple, sets the field touched, and clears the native input.
  - `FormikImageUpload` now renders a clear `IconButton` over the dropzone (only when an image is present) that resets the value to `""` and clears the internal crop source, without re-opening the file picker.

## 0.4.0

### Minor Changes

- - Add onChange property to all components
  - Add story example for Form usage

## 0.3.2

### Patch Changes

- Fix select label showing outside the select field in FormikSelect

## 0.3.0

### Minor Changes

- Add four new Formik-connected MUI components: FormikChipInput, FormikFileUpload, FormikRadioCards, and FormikSearchField.
  - **FormikChipInput**: Tag/chip input field with add/delete support, powered by MUI Chip and TextField
  - **FormikFileUpload**: File upload field with drag-and-drop, file type and size validation, and file list display
  - **FormikRadioCards**: Card-style radio selection with support for icons, titles, and descriptions
  - **FormikSearchField**: Search input with debounced value updates and a clear button

## 0.2.0

### Minor Changes

- - Implement FormikTimePicker; a time picker binding with formik with mui
  - Implement FormikDateTimePicker; a date time picker binding with formik and mui
  - Implement FormikMumberField; a number field binding with formik and mui
  - Implement FormikPasswordField; a password text field binding with formik and mui
  - Add changeset to the project
  -
