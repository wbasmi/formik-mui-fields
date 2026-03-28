import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import FormikToggleButtonGroup from "./FormikToggleButtonGroup";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  ToggleButtonGroup: vi.fn(({ children }: any) => children),
  ToggleButton: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormLabel: vi.fn(() => null),
  FormHelperText: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockToggleButtonGroup = ToggleButtonGroup as unknown as Mock;
const MockToggleButton = ToggleButton as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "alignment",
  value: "left",
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: "left",
  value: "left",
};

const options = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikToggleButtonGroup", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikToggleButtonGroup name="alignment" options={options} />);
      expect(mockUseField).toHaveBeenCalledWith("alignment");
    });
  });

  describe("when rendered with options", () => {
    it("renders a ToggleButton for each option", () => {
      render(<FormikToggleButtonGroup name="alignment" options={options} />);
      expect(MockToggleButton).toHaveBeenCalledTimes(3);
      expect(MockToggleButton).toHaveBeenCalledWith(
        expect.objectContaining({ value: "left" }),
        undefined,
      );
      expect(MockToggleButton).toHaveBeenCalledWith(
        expect.objectContaining({ value: "right" }),
        undefined,
      );
    });
  });

  describe("when the value changes to a new value", () => {
    it("calls helpers.setValue with the new value", () => {
      render(<FormikToggleButtonGroup name="alignment" options={options} />);
      const onChangeProp = MockToggleButtonGroup.mock.calls[0][0].onChange;
      onChangeProp(null, "center");
      expect(mockHelpers.setValue).toHaveBeenCalledWith("center");
    });
  });

  describe("when the value changes to null", () => {
    it("does not call helpers.setValue", () => {
      render(<FormikToggleButtonGroup name="alignment" options={options} />);
      const onChangeProp = MockToggleButtonGroup.mock.calls[0][0].onChange;
      onChangeProp(null, null);
      expect(mockHelpers.setValue).not.toHaveBeenCalled();
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(
        <FormikToggleButtonGroup
          name="alignment"
          label="Align"
          options={options}
        />,
      );
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikToggleButtonGroup name="alignment" options={options} />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikToggleButtonGroup name="alignment" options={options} />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikToggleButtonGroup name="alignment" options={options} />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikToggleButtonGroup name="alignment" options={options} />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });
});
