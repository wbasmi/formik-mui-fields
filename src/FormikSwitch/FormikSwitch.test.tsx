import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  Switch,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import FormikSwitch from "./FormikSwitch";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Switch: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormControlLabel: vi.fn(() => null),
  FormHelperText: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormControlLabel = FormControlLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const defaultField = {
  name: "darkMode",
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

describe("FormikSwitch", () => {
  describe("when rendered with a name", () => {
    it("calls useField with name and checkbox type", () => {
      render(<FormikSwitch name="darkMode" />);
      expect(mockUseField).toHaveBeenCalledWith({
        name: "darkMode",
        type: "checkbox",
      });
    });
  });

  describe("when field is not checked", () => {
    it("renders Switch with checked false", () => {
      render(<FormikSwitch name="darkMode" />);
      const controlProp = MockFormControlLabel.mock.calls[0][0].control;
      expect(controlProp.props.checked).toBe(false);
    });
  });

  describe("when field is checked", () => {
    it("renders Switch with checked true", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, checked: true },
        defaultMeta,
      ]);
      render(<FormikSwitch name="darkMode" />);
      const controlProp = MockFormControlLabel.mock.calls[0][0].control;
      expect(controlProp.props.checked).toBe(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormControlLabel with the label", () => {
      render(<FormikSwitch name="darkMode" label="Dark mode" />);
      expect(MockFormControlLabel).toHaveBeenCalledWith(
        expect.objectContaining({ label: "Dark mode" }),
        undefined,
      );
    });
  });

  describe("when no label is provided", () => {
    it("renders FormControlLabel with an empty string", () => {
      render(<FormikSwitch name="darkMode" />);
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
        { ...defaultMeta, touched: true, error: "Required" },
      ]);
      render(<FormikSwitch name="darkMode" />);
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
      render(<FormikSwitch name="darkMode" />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikSwitch name="darkMode" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });
});
