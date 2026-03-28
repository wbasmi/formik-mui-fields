import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormikPasswordField from "./FormikPasswordField";

let mockShowPassword = false;
const mockSetShowPassword = vi.fn((updater: (prev: boolean) => boolean) => {
  mockShowPassword = updater(mockShowPassword);
});

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useState: vi.fn(() => [mockShowPassword, mockSetShowPassword]),
  };
});

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  TextField: vi.fn(() => null),
  InputAdornment: vi.fn(({ children }: any) => children),
  IconButton: vi.fn(({ children }: any) => children),
}));

vi.mock("@mui/icons-material", () => ({
  Visibility: vi.fn(() => null),
  VisibilityOff: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockTextField = TextField as unknown as Mock;

const defaultField = {
  name: "password",
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
  mockShowPassword = false;
  mockUseField.mockReturnValue([defaultField, defaultMeta]);
});

describe("FormikPasswordField", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikPasswordField name="password" />);
      expect(mockUseField).toHaveBeenCalledWith("password");
    });
  });

  describe("when password is hidden", () => {
    it("renders TextField with type password", () => {
      render(<FormikPasswordField name="password" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ type: "password" }),
        undefined,
      );
    });
  });

  describe("when password is shown", () => {
    it("renders TextField with type text", () => {
      mockShowPassword = true;
      render(<FormikPasswordField name="password" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ type: "text" }),
        undefined,
      );
    });
  });

  describe("when toggle button is clicked", () => {
    it("calls setShowPassword to toggle visibility", () => {
      render(<FormikPasswordField name="password" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      const endAdornment = slotProps.input.endAdornment;
      // The endAdornment is an InputAdornment containing an IconButton
      const iconButton = endAdornment.props.children;
      iconButton.props.onClick();
      expect(mockSetShowPassword).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("renders TextField with error false and no helperText", () => {
      render(<FormikPasswordField name="password" />);
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
        { ...defaultMeta, touched: true, error: "Password is required" },
      ]);
      render(<FormikPasswordField name="password" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          error: true,
          helperText: "Password is required",
        }),
        undefined,
      );
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to TextField", () => {
      render(
        <FormikPasswordField
          name="password"
          label="Password"
          variant="outlined"
        />,
      );
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          label: "Password",
          variant: "outlined",
        }),
        undefined,
      );
    });
  });

  describe("when field has a value", () => {
    it("passes the value to TextField", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "secret123" },
        defaultMeta,
      ]);
      render(<FormikPasswordField name="password" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ value: "secret123" }),
        undefined,
      );
    });
  });
});
