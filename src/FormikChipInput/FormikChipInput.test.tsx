import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import FormikChipInput from "./FormikChipInput";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Autocomplete: vi.fn(() => null),
  Chip: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormHelperText: vi.fn(() => null),
  FormLabel: vi.fn(() => null),
  TextField: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockAutocomplete = Autocomplete as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "tags",
  value: [],
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: [],
  value: [],
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikChipInput", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikChipInput name="tags" />);
      expect(mockUseField).toHaveBeenCalledWith("tags");
    });
  });

  describe("when rendered with default props", () => {
    it("passes multiple and freeSolo to Autocomplete", () => {
      render(<FormikChipInput name="tags" />);
      expect(MockAutocomplete).toHaveBeenCalledWith(
        expect.objectContaining({
          multiple: true,
          freeSolo: true,
        }),
        undefined,
      );
    });

    it("passes the field value to Autocomplete", () => {
      render(<FormikChipInput name="tags" />);
      expect(MockAutocomplete).toHaveBeenCalledWith(
        expect.objectContaining({ value: [] }),
        undefined,
      );
    });

    it("passes empty options when none provided", () => {
      render(<FormikChipInput name="tags" />);
      expect(MockAutocomplete).toHaveBeenCalledWith(
        expect.objectContaining({ options: [] }),
        undefined,
      );
    });
  });

  describe("when rendered with options", () => {
    it("passes options to Autocomplete", () => {
      const options = ["React", "TypeScript"];
      render(<FormikChipInput name="tags" options={options} />);
      expect(MockAutocomplete).toHaveBeenCalledWith(
        expect.objectContaining({ options }),
        undefined,
      );
    });
  });

  describe("when the value changes", () => {
    it("calls helpers.setValue with the new array", () => {
      render(<FormikChipInput name="tags" />);
      const onChangeProp = MockAutocomplete.mock.calls[0][0].onChange;
      onChangeProp(null, ["react", "formik"]);
      expect(mockHelpers.setValue).toHaveBeenCalledWith(["react", "formik"]);
    });
  });

  describe("when blurred", () => {
    it("calls helpers.setTouched with true", () => {
      render(<FormikChipInput name="tags" />);
      const onBlurProp = MockAutocomplete.mock.calls[0][0].onBlur;
      onBlurProp();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikChipInput name="tags" label="Tags" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when label is not provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikChipInput name="tags" />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    beforeEach(() => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
    });

    it("renders FormControl with error true", () => {
      render(<FormikChipInput name="tags" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText with the error message", () => {
      render(<FormikChipInput name="tags" />);
      expect(MockFormHelperText).toHaveBeenCalledWith(
        expect.objectContaining({ children: "Required" }),
        undefined,
      );
    });
  });

  describe("when field has no errors", () => {
    it("renders FormControl with error false", () => {
      render(<FormikChipInput name="tags" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: false }),
        undefined,
      );
    });

    it("does not render FormHelperText", () => {
      render(<FormikChipInput name="tags" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when placeholder is provided", () => {
    it("passes placeholder to the renderInput TextField", () => {
      render(<FormikChipInput name="tags" placeholder="Add tags" />);
      const renderInput = MockAutocomplete.mock.calls[0][0].renderInput;
      const element = renderInput({ inputProps: {} });
      expect(element.props).toEqual(
        expect.objectContaining({ placeholder: "Add tags" }),
      );
    });
  });

  describe("when renderTags is called", () => {
    it("renders Chip components for each value", () => {
      render(<FormikChipInput name="tags" />);
      const renderTags = MockAutocomplete.mock.calls[0][0].renderTags;
      const mockGetTagProps = vi.fn(({ index }: { index: number }) => ({
        key: index,
        onDelete: vi.fn(),
      }));
      renderTags(["react", "formik"], mockGetTagProps);
      expect(mockGetTagProps).toHaveBeenCalledWith({ index: 0 });
      expect(mockGetTagProps).toHaveBeenCalledWith({ index: 1 });
    });
  });
});
