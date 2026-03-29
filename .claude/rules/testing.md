# Testing Rules

## Framework

- Vitest with `jsdom` environment and `globals: true`
- `@testing-library/react` for rendering components
- Config: `vitest.config.ts`
- Run tests: `pnpm test`

## Philosophy

- **Mock all dependencies** — MUI components, Formik hooks, third-party libraries, internal modules. Tests verify the component's implementation by checking the props and function calls passed to its dependencies.
- **Do not mock browser events** — never use `fireEvent`, `userEvent`, or simulate DOM events. Instead, extract callback props from mocked components and invoke them directly:
  ```ts
  const onChangeProp = MockSlider.mock.calls[0][0].onChange;
  onChangeProp(null, 75);
  expect(mockHelpers.setValue).toHaveBeenCalledWith(75);
  ```
- **Do not test React internals** — do not assert on DOM structure or query rendered HTML. Assert on mock calls.

## Test File Structure

- Test files are colocated with their component in a folder: `src/FormikFoo/FormikFoo.test.tsx`
- Use the following describe/it nesting format:
  ```
  describe('ComponentName')
    describe('when ...')
      it('action name without using should')
  ```
- `it()` descriptions must **not** use the word "should".

## Mocking Patterns

### Imports

```ts
import { type Mock } from "vitest";
```

`vi` is available globally (via `globals: true`). The `Mock` type must be imported.

### Formik

```ts
vi.mock("formik", () => ({
  useField: vi.fn(),
}));
```

- Return `[field, meta]` for simple fields, `[field, meta, helpers]` for complex fields.

### MUI Components

- **Container components** (FormControl, RadioGroup, Select, Box, etc.) render their children:
  ```ts
  FormControl: vi.fn(({ children }: any) => children),
  ```
- **Leaf components** (TextField, Checkbox, Slider, etc.) return null:
  ```ts
  TextField: vi.fn(() => null),
  ```

### Internal modules (default exports)

```ts
vi.mock("../CropDialog/CropDialog", () => ({ default: vi.fn(() => null) }));
```

### React second argument

React passes `undefined` as the second argument to function components. Use `undefined` (not `expect.anything()`) when asserting on mock calls:

```ts
expect(MockTextField).toHaveBeenCalledWith(
  expect.objectContaining({ error: true }),
  undefined,
);
```

### renderInput callbacks

For components like Autocomplete that use `renderInput`, the callback returns JSX that is not rendered by React. Assert on the returned element's props instead of mock calls:

```ts
const element = renderInput({ inputProps: {} });
expect(element.props).toEqual(expect.objectContaining({ error: true }));
```

## What to Test

For each component, cover at minimum:

1. `useField` is called with the correct arguments
2. The main MUI component receives field values and additional props
3. Error state: `FormControl` gets `error: true` and `FormHelperText` renders when `meta.touched && meta.error`
4. No-error state: `FormHelperText` does not render
5. Label rendering: present when provided, absent when not
6. Callback behavior: onChange/onBlur handlers call the correct Formik helpers

## Adding Tests for a New Component

1. Create `src/FormikNewField/FormikNewField.test.tsx`
2. Add `import { type Mock } from "vitest"` at the top
3. Mock all imported dependencies with `vi.mock()`
4. Set up `useField` mock with `beforeEach` and `vi.clearAllMocks()`
5. Write describe/it blocks following the format and coverage list above
