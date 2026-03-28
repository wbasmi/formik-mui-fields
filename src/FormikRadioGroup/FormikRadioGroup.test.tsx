import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import FormikRadioGroup from "./FormikRadioGroup";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  RadioGroup: vi.fn(({ children }: any) => children),
  Radio: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormControlLabel: vi.fn(() => null),
  FormLabel: vi.fn(() => null),
  FormHelperText: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockRadioGroup = RadioGroup as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormControlLabel = FormControlLabel as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const defaultField = {
  name: "size",
  value: "",
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: "",
  value: "",
};

const options = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta]);
});

describe("FormikRadioGroup", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikRadioGroup name="size" options={options} />);
      expect(mockUseField).toHaveBeenCalledWith("size");
    });
  });

  describe("when rendered with options", () => {
    it("renders a FormControlLabel for each option", () => {
      render(<FormikRadioGroup name="size" options={options} />);
      expect(MockFormControlLabel).toHaveBeenCalledTimes(3);
      expect(MockFormControlLabel).toHaveBeenCalledWith(
        expect.objectContaining({ value: "sm", label: "Small" }),
        undefined,
      );
      expect(MockFormControlLabel).toHaveBeenCalledWith(
        expect.objectContaining({ value: "lg", label: "Large" }),
        undefined,
      );
    });
  });

  describe("when row is true", () => {
    it("passes row to RadioGroup", () => {
      render(<FormikRadioGroup name="size" options={options} row />);
      expect(MockRadioGroup).toHaveBeenCalledWith(
        expect.objectContaining({ row: true }),
        undefined,
      );
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikRadioGroup name="size" label="Size" options={options} />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikRadioGroup name="size" options={options} />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
      ]);
      render(<FormikRadioGroup name="size" options={options} />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
      ]);
      render(<FormikRadioGroup name="size" options={options} />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikRadioGroup name="size" options={options} />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });
});
