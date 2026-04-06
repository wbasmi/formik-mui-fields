import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import FormikSelect from "./FormikSelect";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Select: vi.fn(({ children }: any) => children),
  MenuItem: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  InputLabel: vi.fn(() => null),
  FormHelperText: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockSelect = Select as unknown as Mock;
const MockMenuItem = MenuItem as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockInputLabel = InputLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const defaultField = {
  name: "fruit",
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
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta]);
});

describe("FormikSelect", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikSelect name="fruit" options={options} />);
      expect(mockUseField).toHaveBeenCalledWith("fruit");
    });
  });

  describe("when rendered with options", () => {
    it("renders a MenuItem for each option", () => {
      render(<FormikSelect name="fruit" options={options} />);
      expect(MockMenuItem).toHaveBeenCalledTimes(2);
      expect(MockMenuItem).toHaveBeenCalledWith(
        expect.objectContaining({ value: "apple" }),
        undefined,
      );
      expect(MockMenuItem).toHaveBeenCalledWith(
        expect.objectContaining({ value: "banana" }),
        undefined,
      );
    });
  });

  describe("when field has a value", () => {
    it("passes the value to Select", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "apple" },
        defaultMeta,
      ]);
      render(<FormikSelect name="fruit" options={options} />);
      expect(MockSelect).toHaveBeenCalledWith(
        expect.objectContaining({ value: "apple" }),
        undefined,
      );
    });
  });

  describe("when label is provided", () => {
    it("renders InputLabel", () => {
      render(<FormikSelect name="fruit" label="Fruit" options={options} />);
      expect(MockInputLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render InputLabel", () => {
      render(<FormikSelect name="fruit" options={options} />);
      expect(MockInputLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
      ]);
      render(<FormikSelect name="fruit" options={options} />);
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
      render(<FormikSelect name="fruit" options={options} />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikSelect name="fruit" options={options} />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });
});
