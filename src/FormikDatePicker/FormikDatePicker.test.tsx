import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormikDatePicker from "./FormikDatePicker";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  FormControl: vi.fn(({ children }: any) => children),
  FormHelperText: vi.fn(() => null),
  FormLabel: vi.fn(() => null),
}));

vi.mock("@mui/x-date-pickers/DatePicker", () => ({
  DatePicker: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockDatePicker = DatePicker as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "date",
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

describe("FormikDatePicker", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikDatePicker name="date" />);
      expect(mockUseField).toHaveBeenCalledWith("date");
    });
  });

  describe("when rendered with a value", () => {
    it("passes the value to DatePicker", () => {
      const dateValue = "2026-01-01";
      mockUseField.mockReturnValue([
        { ...defaultField, value: dateValue },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikDatePicker name="date" />);
      expect(MockDatePicker).toHaveBeenCalledWith(
        expect.objectContaining({ value: dateValue }),
        undefined,
      );
    });
  });

  describe("when value is undefined", () => {
    it("passes null to DatePicker", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: undefined },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikDatePicker name="date" />);
      expect(MockDatePicker).toHaveBeenCalledWith(
        expect.objectContaining({ value: null }),
        undefined,
      );
    });
  });

  describe("when the value changes", () => {
    it("calls helpers.setValue with the new value", () => {
      render(<FormikDatePicker name="date" />);
      const onChangeProp = MockDatePicker.mock.calls[0][0].onChange;
      const newDate = "2026-03-28";
      onChangeProp(newDate);
      expect(mockHelpers.setValue).toHaveBeenCalledWith(newDate);
    });
  });

  describe("when the text field is blurred", () => {
    it("calls helpers.setTouched with true", () => {
      render(<FormikDatePicker name="date" />);
      const slotProps = MockDatePicker.mock.calls[0][0].slotProps;
      slotProps.textField.onBlur();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikDatePicker name="date" label="Pick a date" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikDatePicker name="date" />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Date is required" },
        mockHelpers,
      ]);
      render(<FormikDatePicker name="date" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Date is required" },
        mockHelpers,
      ]);
      render(<FormikDatePicker name="date" />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });

    it("passes error to textField slotProps", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Date is required" },
        mockHelpers,
      ]);
      render(<FormikDatePicker name="date" />);
      const slotProps = MockDatePicker.mock.calls[0][0].slotProps;
      expect(slotProps.textField.error).toBe(true);
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikDatePicker name="date" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to DatePicker", () => {
      render(<FormikDatePicker name="date" disableFuture />);
      expect(MockDatePicker).toHaveBeenCalledWith(
        expect.objectContaining({ disableFuture: true }),
        undefined,
      );
    });
  });
});
