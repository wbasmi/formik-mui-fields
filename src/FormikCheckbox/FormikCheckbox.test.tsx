import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import FormikCheckbox from "./FormikCheckbox";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Checkbox: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormControlLabel: vi.fn(() => null),
  FormHelperText: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockCheckbox = Checkbox as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormControlLabel = FormControlLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const defaultField = {
  name: "agree",
  value: "",
  checked: false,
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: false,
  value: false,
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta]);
});

describe("FormikCheckbox", () => {
  describe("when rendered with a name", () => {
    it("calls useField with name and checkbox type", () => {
      render(<FormikCheckbox name="agree" />);
      expect(mockUseField).toHaveBeenCalledWith({
        name: "agree",
        type: "checkbox",
      });
    });
  });

  describe("when field is not checked", () => {
    it("renders Checkbox with checked false", () => {
      render(<FormikCheckbox name="agree" />);
      const controlProp = MockFormControlLabel.mock.calls[0][0].control;
      expect(controlProp.props.checked).toBe(false);
    });
  });

  describe("when field is checked", () => {
    it("renders Checkbox with checked true", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, checked: true },
        defaultMeta,
      ]);
      render(<FormikCheckbox name="agree" />);
      const controlProp = MockFormControlLabel.mock.calls[0][0].control;
      expect(controlProp.props.checked).toBe(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormControlLabel with the label", () => {
      render(<FormikCheckbox name="agree" label="I agree" />);
      expect(MockFormControlLabel).toHaveBeenCalledWith(
        expect.objectContaining({ label: "I agree" }),
        undefined,
      );
    });
  });

  describe("when no label is provided", () => {
    it("renders FormControlLabel with an empty string", () => {
      render(<FormikCheckbox name="agree" />);
      expect(MockFormControlLabel).toHaveBeenCalledWith(
        expect.objectContaining({ label: "" }),
        undefined,
      );
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Must accept" },
      ]);
      render(<FormikCheckbox name="agree" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText with the error message", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Must accept" },
      ]);
      render(<FormikCheckbox name="agree" />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("renders FormControl with error false", () => {
      render(<FormikCheckbox name="agree" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: false }),
        undefined,
      );
    });

    it("does not render FormHelperText", () => {
      render(<FormikCheckbox name="agree" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });
});
