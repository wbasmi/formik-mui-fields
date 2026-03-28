import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import FormikTimePicker from "./FormikTimePicker";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  FormControl: vi.fn(({ children }: any) => children),
  FormHelperText: vi.fn(() => null),
  FormLabel: vi.fn(() => null),
}));

vi.mock("@mui/x-date-pickers/TimePicker", () => ({
  TimePicker: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockTimePicker = TimePicker as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "time",
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

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikTimePicker", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikTimePicker name="time" />);
      expect(mockUseField).toHaveBeenCalledWith("time");
    });
  });

  describe("when rendered with a value", () => {
    it("passes the value to TimePicker", () => {
      const timeValue = "10:30";
      mockUseField.mockReturnValue([
        { ...defaultField, value: timeValue },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikTimePicker name="time" />);
      expect(MockTimePicker).toHaveBeenCalledWith(
        expect.objectContaining({ value: timeValue }),
        undefined,
      );
    });
  });

  describe("when value is undefined", () => {
    it("passes null to TimePicker", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: undefined },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikTimePicker name="time" />);
      expect(MockTimePicker).toHaveBeenCalledWith(
        expect.objectContaining({ value: null }),
        undefined,
      );
    });
  });

  describe("when the value changes", () => {
    it("calls helpers.setValue with the new value", () => {
      render(<FormikTimePicker name="time" />);
      const onChangeProp = MockTimePicker.mock.calls[0][0].onChange;
      const newTime = "14:00";
      onChangeProp(newTime);
      expect(mockHelpers.setValue).toHaveBeenCalledWith(newTime);
    });
  });

  describe("when the text field is blurred", () => {
    it("calls helpers.setTouched with true", () => {
      render(<FormikTimePicker name="time" />);
      const slotProps = MockTimePicker.mock.calls[0][0].slotProps;
      slotProps.textField.onBlur();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikTimePicker name="time" label="Pick a time" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikTimePicker name="time" />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Time is required" },
        mockHelpers,
      ]);
      render(<FormikTimePicker name="time" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Time is required" },
        mockHelpers,
      ]);
      render(<FormikTimePicker name="time" />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });

    it("passes error to textField slotProps", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Time is required" },
        mockHelpers,
      ]);
      render(<FormikTimePicker name="time" />);
      const slotProps = MockTimePicker.mock.calls[0][0].slotProps;
      expect(slotProps.textField.error).toBe(true);
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikTimePicker name="time" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to TimePicker", () => {
      render(<FormikTimePicker name="time" ampm={false} />);
      expect(MockTimePicker).toHaveBeenCalledWith(
        expect.objectContaining({ ampm: false }),
        undefined,
      );
    });
  });
});
