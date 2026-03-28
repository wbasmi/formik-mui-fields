import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormikDateTimePicker from "./FormikDateTimePicker";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  FormControl: vi.fn(({ children }: any) => children),
  FormHelperText: vi.fn(() => null),
  FormLabel: vi.fn(() => null),
}));

vi.mock("@mui/x-date-pickers/DateTimePicker", () => ({
  DateTimePicker: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockDateTimePicker = DateTimePicker as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "datetime",
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

describe("FormikDateTimePicker", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikDateTimePicker name="datetime" />);
      expect(mockUseField).toHaveBeenCalledWith("datetime");
    });
  });

  describe("when rendered with a value", () => {
    it("passes the value to DateTimePicker", () => {
      const dateTimeValue = "2026-01-01T10:30";
      mockUseField.mockReturnValue([
        { ...defaultField, value: dateTimeValue },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikDateTimePicker name="datetime" />);
      expect(MockDateTimePicker).toHaveBeenCalledWith(
        expect.objectContaining({ value: dateTimeValue }),
        undefined,
      );
    });
  });

  describe("when value is undefined", () => {
    it("passes null to DateTimePicker", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: undefined },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikDateTimePicker name="datetime" />);
      expect(MockDateTimePicker).toHaveBeenCalledWith(
        expect.objectContaining({ value: null }),
        undefined,
      );
    });
  });

  describe("when the value changes", () => {
    it("calls helpers.setValue with the new value", () => {
      render(<FormikDateTimePicker name="datetime" />);
      const onChangeProp = MockDateTimePicker.mock.calls[0][0].onChange;
      const newDateTime = "2026-03-28T14:00";
      onChangeProp(newDateTime);
      expect(mockHelpers.setValue).toHaveBeenCalledWith(newDateTime);
    });
  });

  describe("when the text field is blurred", () => {
    it("calls helpers.setTouched with true", () => {
      render(<FormikDateTimePicker name="datetime" />);
      const slotProps = MockDateTimePicker.mock.calls[0][0].slotProps;
      slotProps.textField.onBlur();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(
        <FormikDateTimePicker name="datetime" label="Pick date and time" />,
      );
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikDateTimePicker name="datetime" />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Date and time is required" },
        mockHelpers,
      ]);
      render(<FormikDateTimePicker name="datetime" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Date and time is required" },
        mockHelpers,
      ]);
      render(<FormikDateTimePicker name="datetime" />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });

    it("passes error to textField slotProps", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Date and time is required" },
        mockHelpers,
      ]);
      render(<FormikDateTimePicker name="datetime" />);
      const slotProps = MockDateTimePicker.mock.calls[0][0].slotProps;
      expect(slotProps.textField.error).toBe(true);
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikDateTimePicker name="datetime" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to DateTimePicker", () => {
      render(<FormikDateTimePicker name="datetime" disableFuture />);
      expect(MockDateTimePicker).toHaveBeenCalledWith(
        expect.objectContaining({ disableFuture: true }),
        undefined,
      );
    });
  });
});
