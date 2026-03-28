import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { Autocomplete, TextField, FormControl, FormLabel } from "@mui/material";
import FormikAutocomplete from "./FormikAutocomplete";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Autocomplete: vi.fn(() => null),
  TextField: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormLabel: vi.fn(() => null),
  FormHelperText: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockAutocomplete = Autocomplete as unknown as Mock;
const MockTextField = TextField as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;

type Option = { id: number; name: string };

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "country",
  value: null,
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: null,
  value: null,
};

const options: Option[] = [
  { id: 1, name: "France" },
  { id: 2, name: "Germany" },
];
const getOptionLabel = (o: Option) => o.name;

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikAutocomplete", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(
        <FormikAutocomplete
          name="country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      expect(mockUseField).toHaveBeenCalledWith("country");
    });
  });

  describe("when rendered with options", () => {
    it("passes options and getOptionLabel to Autocomplete", () => {
      render(
        <FormikAutocomplete
          name="country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      expect(MockAutocomplete).toHaveBeenCalledWith(
        expect.objectContaining({
          options,
          getOptionLabel,
        }),
        undefined,
      );
    });
  });

  describe("when value is null", () => {
    it("passes null to Autocomplete", () => {
      render(
        <FormikAutocomplete
          name="country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      expect(MockAutocomplete).toHaveBeenCalledWith(
        expect.objectContaining({ value: null }),
        undefined,
      );
    });
  });

  describe("when the value changes", () => {
    it("calls helpers.setValue with the new value", () => {
      render(
        <FormikAutocomplete
          name="country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      const onChangeProp = MockAutocomplete.mock.calls[0][0].onChange;
      onChangeProp(null, options[0]);
      expect(mockHelpers.setValue).toHaveBeenCalledWith(options[0]);
    });
  });

  describe("when blurred", () => {
    it("calls helpers.setTouched with true", () => {
      render(
        <FormikAutocomplete
          name="country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      const onBlurProp = MockAutocomplete.mock.calls[0][0].onBlur;
      onBlurProp();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(
        <FormikAutocomplete
          name="country"
          label="Country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(
        <FormikAutocomplete
          name="country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("passes error props to the renderInput TextField", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(
        <FormikAutocomplete
          name="country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      const renderInput = MockAutocomplete.mock.calls[0][0].renderInput;
      const element = renderInput({ inputProps: {} });
      expect(element.props).toEqual(
        expect.objectContaining({ error: true, helperText: "Required" }),
      );
    });
  });

  describe("when field has no errors", () => {
    it("passes error false to the renderInput TextField", () => {
      render(
        <FormikAutocomplete
          name="country"
          options={options}
          getOptionLabel={getOptionLabel}
        />,
      );
      const renderInput = MockAutocomplete.mock.calls[0][0].renderInput;
      const element = renderInput({ inputProps: {} });
      expect(element.props).toEqual(
        expect.objectContaining({ error: false, helperText: undefined }),
      );
    });
  });
});
