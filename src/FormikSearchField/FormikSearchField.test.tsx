import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import FormikSearchField from "./FormikSearchField";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  IconButton: vi.fn(() => null),
  InputAdornment: vi.fn(({ children }: any) => children),
  TextField: vi.fn(() => null),
}));

vi.mock("@mui/icons-material/Search", () => ({
  default: vi.fn(() => null),
}));

vi.mock("@mui/icons-material/Close", () => ({
  default: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockTextField = TextField as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "query",
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

describe("FormikSearchField", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikSearchField name="query" />);
      expect(mockUseField).toHaveBeenCalledWith("query");
    });
  });

  describe("when rendered", () => {
    it("passes field name and onBlur to TextField", () => {
      render(<FormikSearchField name="query" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "query",
          onBlur: defaultField.onBlur,
        }),
        undefined,
      );
    });

    it("renders with a search icon in start adornment", () => {
      render(<FormikSearchField name="query" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      expect(slotProps.input.startAdornment).toBeDefined();
    });
  });

  describe("when field has no errors", () => {
    it("renders TextField with error false and no helperText", () => {
      render(<FormikSearchField name="query" />);
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
    it("renders TextField with error true and the error message", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikSearchField name="query" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          error: true,
          helperText: "Required",
        }),
        undefined,
      );
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to TextField", () => {
      render(
        <FormikSearchField name="query" label="Search" placeholder="Type..." />,
      );
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          label: "Search",
          placeholder: "Type...",
        }),
        undefined,
      );
    });
  });

  describe("when field value is empty", () => {
    it("does not render end adornment", () => {
      render(<FormikSearchField name="query" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      expect(slotProps.input.endAdornment).toBeUndefined();
    });
  });

  describe("when field has a value", () => {
    it("renders end adornment with clear button", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "test" },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikSearchField name="query" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      expect(slotProps.input.endAdornment).toBeDefined();
    });
  });

  describe("when onChange is called", () => {
    it("updates the local value", () => {
      render(<FormikSearchField name="query" />);
      const onChange = MockTextField.mock.calls[0][0].onChange;
      expect(onChange).toBeTypeOf("function");
    });
  });

  describe("when clear button is clicked", () => {
    it("calls setValue with empty string", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "test" },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikSearchField name="query" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      const clearButton = slotProps.input.endAdornment;
      // The endAdornment contains an IconButton with onClick
      const iconButtonProps = clearButton.props.children.props;
      iconButtonProps.onClick();
      expect(mockHelpers.setValue).toHaveBeenCalledWith("");
    });
  });

  describe("when onChange triggers debounced setValue", () => {
    it("calls setValue after debounce", () => {
      vi.useFakeTimers();
      render(<FormikSearchField name="query" debounceMs={300} />);
      const onChange = MockTextField.mock.calls[0][0].onChange;
      onChange({ target: { value: "hello" } });
      expect(mockHelpers.setValue).not.toHaveBeenCalled();
      vi.advanceTimersByTime(300);
      expect(mockHelpers.setValue).toHaveBeenCalledWith("hello");
      vi.useRealTimers();
    });
  });
});
