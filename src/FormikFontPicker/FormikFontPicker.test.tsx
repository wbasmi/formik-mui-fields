import { type Mock } from "vitest";
import { render, act } from "@testing-library/react";
import { useField } from "formik";
import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import FormikFontPicker from "./FormikFontPicker";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Autocomplete: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormLabel: vi.fn(() => null),
  TextField: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockAutocomplete = Autocomplete as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockTextField = TextField as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "font",
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

const fakeFonts = [
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
];

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(fakeFonts),
  }) as unknown as typeof fetch;
});

describe("FormikFontPicker", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikFontPicker name="font" />);
      expect(mockUseField).toHaveBeenCalledWith("font");
    });
  });

  describe("when rendered", () => {
    it("fetches fonts from the API", () => {
      render(<FormikFontPicker name="font" />);
      expect(global.fetch).toHaveBeenCalledWith("/api/google/fonts");
    });

    it("renders Autocomplete with loading true initially", () => {
      render(<FormikFontPicker name="font" />);
      expect(MockAutocomplete).toHaveBeenCalledWith(
        expect.objectContaining({ loading: true }),
        undefined,
      );
    });
  });

  describe("when fonts are loaded", () => {
    it("passes the fetched fonts as options", async () => {
      await act(async () => {
        render(<FormikFontPicker name="font" />);
      });
      const lastCall =
        MockAutocomplete.mock.calls[MockAutocomplete.mock.calls.length - 1];
      expect(lastCall[0].options).toEqual(fakeFonts);
      expect(lastCall[0].loading).toBe(false);
    });
  });

  describe("when a font is selected", () => {
    it("calls helpers.setValue with the font value", async () => {
      await act(async () => {
        render(<FormikFontPicker name="font" />);
      });
      const lastCall =
        MockAutocomplete.mock.calls[MockAutocomplete.mock.calls.length - 1];
      lastCall[0].onChange(null, { value: "Roboto", label: "Roboto" });
      expect(mockHelpers.setValue).toHaveBeenCalledWith("Roboto");
    });
  });

  describe("when selection is cleared", () => {
    it("calls helpers.setValue with an empty string", async () => {
      await act(async () => {
        render(<FormikFontPicker name="font" />);
      });
      const lastCall =
        MockAutocomplete.mock.calls[MockAutocomplete.mock.calls.length - 1];
      lastCall[0].onChange(null, null);
      expect(mockHelpers.setValue).toHaveBeenCalledWith("");
    });
  });

  describe("when blurred", () => {
    it("calls helpers.setTouched with true", async () => {
      await act(async () => {
        render(<FormikFontPicker name="font" />);
      });
      const lastCall =
        MockAutocomplete.mock.calls[MockAutocomplete.mock.calls.length - 1];
      lastCall[0].onBlur();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikFontPicker name="font" label="Font family" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikFontPicker name="font" />);
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
      render(<FormikFontPicker name="font" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("passes error props to the renderInput TextField", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikFontPicker name="font" />);
      const renderInput = MockAutocomplete.mock.calls[0][0].renderInput;
      const element = renderInput({ inputProps: {} });
      expect(element.props).toEqual(
        expect.objectContaining({ error: true, helperText: "Required" }),
      );
    });
  });

  describe("when the fetch fails", () => {
    it("sets options to an empty array", async () => {
      (global.fetch as Mock).mockRejectedValue(new Error("fail"));
      await act(async () => {
        render(<FormikFontPicker name="font" />);
      });
      const lastCall =
        MockAutocomplete.mock.calls[MockAutocomplete.mock.calls.length - 1];
      expect(lastCall[0].options).toEqual([]);
    });
  });
});
