import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import FormikNumberField from "./FormikNumberField";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  TextField: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockTextField = TextField as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "quantity",
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

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikNumberField", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikNumberField name="quantity" />);
      expect(mockUseField).toHaveBeenCalledWith("quantity");
    });
  });

  describe("when rendered", () => {
    it("renders TextField with type number", () => {
      render(<FormikNumberField name="quantity" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ type: "number" }),
        undefined,
      );
    });
  });

  describe("when field has no errors", () => {
    it("renders TextField with error false and no helperText", () => {
      render(<FormikNumberField name="quantity" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          error: false,
          helperText: false,
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
      render(<FormikNumberField name="quantity" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          error: true,
          helperText: "Required",
        }),
        undefined,
      );
    });
  });

  describe("when min, max, and step are provided", () => {
    it("passes them through slotProps.htmlInput", () => {
      render(<FormikNumberField name="quantity" min={0} max={100} step={5} />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          slotProps: expect.objectContaining({
            htmlInput: { min: 0, max: 100, step: 5 },
          }),
        }),
        undefined,
      );
    });
  });

  describe("when onChange is triggered with a numeric value", () => {
    it("calls helpers.setValue with a number", () => {
      render(<FormikNumberField name="quantity" />);
      const onChangeProp = MockTextField.mock.calls[0][0].onChange;
      onChangeProp({ target: { value: "42" } });
      expect(mockHelpers.setValue).toHaveBeenCalledWith(42);
    });
  });

  describe("when onChange is triggered with an empty value", () => {
    it("calls helpers.setValue with empty string", () => {
      render(<FormikNumberField name="quantity" />);
      const onChangeProp = MockTextField.mock.calls[0][0].onChange;
      onChangeProp({ target: { value: "" } });
      expect(mockHelpers.setValue).toHaveBeenCalledWith("");
    });
  });

  describe("when field has a numeric value", () => {
    it("passes the value to TextField", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: 42 },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikNumberField name="quantity" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ value: 42 }),
        undefined,
      );
    });
  });

  describe("when value is undefined", () => {
    it("passes empty string to TextField", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: undefined },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikNumberField name="quantity" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ value: "" }),
        undefined,
      );
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to TextField", () => {
      render(
        <FormikNumberField
          name="quantity"
          label="Quantity"
          variant="outlined"
        />,
      );
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          label: "Quantity",
          variant: "outlined",
        }),
        undefined,
      );
    });
  });
});
