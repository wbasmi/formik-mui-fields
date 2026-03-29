import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { InputAdornment, TextField } from "@mui/material";
import FormikCurrencyField from "./FormikCurrencyField";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  InputAdornment: vi.fn(({ children }: any) => children),
  TextField: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockTextField = TextField as unknown as Mock;
const MockInputAdornment = InputAdornment as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "price",
  value: 1234.56,
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: 1234.56,
  value: 1234.56,
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikCurrencyField", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikCurrencyField name="price" />);
      expect(mockUseField).toHaveBeenCalledWith("price");
    });
  });

  describe("when field has a numeric value", () => {
    it("renders TextField with formatted display value", () => {
      render(<FormikCurrencyField name="price" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "price",
          value: "1,234.56",
        }),
        undefined,
      );
    });
  });

  describe("when field value is null", () => {
    it("renders TextField with empty string value", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: null },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikCurrencyField name="price" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ value: "" }),
        undefined,
      );
    });
  });

  describe("when field has no errors", () => {
    it("renders TextField with error false and no helperText", () => {
      render(<FormikCurrencyField name="price" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          error: false,
          helperText: undefined,
        }),
        undefined,
      );
    });
  });

  describe("when field is touched with an error", () => {
    it("renders TextField with error true and the error message as helperText", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikCurrencyField name="price" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          error: true,
          helperText: "Required",
        }),
        undefined,
      );
    });
  });

  describe("when field is untouched with an error", () => {
    it("renders TextField with error false", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: false, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikCurrencyField name="price" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ error: false }),
        undefined,
      );
    });
  });

  describe("when a label is provided", () => {
    it("passes the label to TextField", () => {
      render(<FormikCurrencyField name="price" label="Price" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ label: "Price" }),
        undefined,
      );
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to TextField", () => {
      render(
        <FormikCurrencyField name="price" label="Price" variant="outlined" />,
      );
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          label: "Price",
          variant: "outlined",
        }),
        undefined,
      );
    });
  });

  describe("when onChange is triggered", () => {
    it("parses the input and calls setValue with a number", () => {
      render(<FormikCurrencyField name="price" />);
      const onChangeProp = MockTextField.mock.calls[0][0].onChange;
      onChangeProp({ target: { value: "5,678.90" } });
      expect(mockHelpers.setValue).toHaveBeenCalledWith(5678.9);
    });

    it("calls setValue with null for empty input", () => {
      render(<FormikCurrencyField name="price" />);
      const onChangeProp = MockTextField.mock.calls[0][0].onChange;
      onChangeProp({ target: { value: "" } });
      expect(mockHelpers.setValue).toHaveBeenCalledWith(null);
    });
  });

  describe("when onBlur is triggered", () => {
    it("calls setTouched with true", () => {
      render(<FormikCurrencyField name="price" />);
      const onBlurProp = MockTextField.mock.calls[0][0].onBlur;
      onBlurProp();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when currency symbol is rendered", () => {
    it("passes slotProps with startAdornment to TextField", () => {
      render(<FormikCurrencyField name="price" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      expect(slotProps).toBeDefined();
      expect(slotProps.input).toBeDefined();
      expect(slotProps.input.startAdornment).toBeDefined();
    });

    it("renders InputAdornment in the startAdornment element", () => {
      render(<FormikCurrencyField name="price" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      const adornment = slotProps.input.startAdornment;
      expect(adornment.type).toBe(MockInputAdornment);
      expect(adornment.props.position).toBe("start");
    });
  });

  describe("when custom decimalPlaces is provided", () => {
    it("formats value with the specified precision", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: 42.1 },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikCurrencyField name="price" decimalPlaces={4} />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ value: "42.1000" }),
        undefined,
      );
    });
  });
});
