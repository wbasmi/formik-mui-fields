import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import FormikTextField from "./FormikTextField";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  TextField: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockTextField = TextField as unknown as Mock;

const defaultField = {
  name: "email",
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
  mockUseField.mockReturnValue([defaultField, defaultMeta]);
});

describe("FormikTextField", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikTextField name="email" />);
      expect(mockUseField).toHaveBeenCalledWith("email");
    });
  });

  describe("when field has no errors", () => {
    it("renders TextField with error false and no helperText", () => {
      render(<FormikTextField name="email" />);
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
      ]);
      render(<FormikTextField name="email" />);
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
      ]);
      render(<FormikTextField name="email" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ error: false }),
        undefined,
      );
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to TextField", () => {
      render(<FormikTextField name="email" label="Email" variant="outlined" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          label: "Email",
          variant: "outlined",
        }),
        undefined,
      );
    });
  });

  describe("when field has a value", () => {
    it("passes the value to TextField", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "test@test.com" },
        defaultMeta,
      ]);
      render(<FormikTextField name="email" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ value: "test@test.com" }),
        undefined,
      );
    });
  });
});
