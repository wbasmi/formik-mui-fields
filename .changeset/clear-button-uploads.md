---
"formik-mui-fields": minor
---

Add a clear button to FormikFileUpload and FormikImageUpload

- `FormikFileUpload` now renders a clear `IconButton` (only when a file/files are selected) that resets the field to `null` for single uploads or `[]` for multiple, sets the field touched, and clears the native input.
- `FormikImageUpload` now renders a clear `IconButton` over the dropzone (only when an image is present) that resets the value to `""` and clears the internal crop source, without re-opening the file picker.
