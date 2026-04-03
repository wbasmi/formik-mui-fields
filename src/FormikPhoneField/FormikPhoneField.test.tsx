import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormikPhoneField from "./FormikPhoneField";

vi.mock("country-codes-list", () => ({
  all: vi.fn(() => [
    {
      countryCode: "US",
      countryNameEn: "United States",
      countryCallingCode: "1",
    },
    {
      countryCode: "GB",
      countryNameEn: "United Kingdom",
      countryCallingCode: "44",
    },
    { countryCode: "DE", countryNameEn: "Germany", countryCallingCode: "49" },
  ]),
}));

vi.mock("country-flag-icons/react/3x2", () => ({
  US: vi.fn(() => null),
  GB: vi.fn(() => null),
  DE: vi.fn(() => null),
}));

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Box: vi.fn(({ children }: any) => children),
  FormControl: vi.fn(({ children }: any) => children),
  FormHelperText: vi.fn(() => null),
  FormLabel: vi.fn(() => null),
  InputAdornment: vi.fn(({ children }: any) => children),
  MenuItem: vi.fn(() => null),
  Select: vi.fn(() => null),
  TextField: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockTextField = TextField as unknown as Mock;
const MockSelect = Select as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "phone",
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

describe("FormikPhoneField", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikPhoneField name="phone" />);
      expect(mockUseField).toHaveBeenCalledWith("phone");
    });
  });

  describe("when rendered with default props", () => {
    it("passes value and error to TextField", () => {
      render(<FormikPhoneField name="phone" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          value: "",
          error: false,
        }),
        undefined,
      );
    });

    it("renders Select with default country US", () => {
      render(<FormikPhoneField name="phone" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      const adornment = slotProps.input.startAdornment;
      expect(adornment.props.children.props.value).toBe("US");
    });
  });

  describe("when rendered with an existing value", () => {
    it("detects the country from the dial code", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "+441234567890" },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikPhoneField name="phone" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      const adornment = slotProps.input.startAdornment;
      expect(adornment.props.children.props.value).toBe("GB");
    });

    it("displays the formatted local number", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "+12025551234" },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikPhoneField name="phone" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({
          value: "202-555-1234",
        }),
        undefined,
      );
    });
  });

  describe("when the phone number changes", () => {
    it("calls helpers.setValue with the full international format", () => {
      render(<FormikPhoneField name="phone" />);
      const onChangeProp = MockTextField.mock.calls[0][0].onChange;
      onChangeProp({ target: { value: "202-555" } });
      expect(mockHelpers.setValue).toHaveBeenCalledWith("+1202555");
    });
  });

  describe("when the country changes", () => {
    it("calls helpers.setValue with the new dial code", () => {
      render(<FormikPhoneField name="phone" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      const selectElement = slotProps.input.startAdornment.props.children;
      const onCountryChange = selectElement.props.onChange;
      onCountryChange({ target: { value: "GB" } });
      expect(mockHelpers.setValue).toHaveBeenCalledWith("+44");
    });
  });

  describe("when blurred", () => {
    it("calls helpers.setTouched with true", () => {
      render(<FormikPhoneField name="phone" />);
      const onBlurProp = MockTextField.mock.calls[0][0].onBlur;
      onBlurProp();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikPhoneField name="phone" label="Phone" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when label is not provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikPhoneField name="phone" />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    beforeEach(() => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
    });

    it("renders FormControl with error true", () => {
      render(<FormikPhoneField name="phone" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText with the error message", () => {
      render(<FormikPhoneField name="phone" />);
      expect(MockFormHelperText).toHaveBeenCalledWith(
        expect.objectContaining({ children: "Required" }),
        undefined,
      );
    });

    it("passes error true to TextField", () => {
      render(<FormikPhoneField name="phone" />);
      expect(MockTextField).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });
  });

  describe("when field has no errors", () => {
    it("renders FormControl with error false", () => {
      render(<FormikPhoneField name="phone" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: false }),
        undefined,
      );
    });

    it("does not render FormHelperText", () => {
      render(<FormikPhoneField name="phone" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when defaultCountry is provided", () => {
    it("uses the specified country as default", () => {
      render(<FormikPhoneField name="phone" defaultCountry="GB" />);
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      const adornment = slotProps.input.startAdornment;
      expect(adornment.props.children.props.value).toBe("GB");
    });
  });

  describe("when preferredCountries is provided", () => {
    it("renders preferred countries first in the Select", () => {
      render(
        <FormikPhoneField name="phone" preferredCountries={["GB", "DE"]} />,
      );
      const slotProps = MockTextField.mock.calls[0][0].slotProps;
      const selectElement = slotProps.input.startAdornment.props.children;
      const children = selectElement.props.children;
      expect(children[0].key).toBe("GB");
      expect(children[1].key).toBe("DE");
    });
  });
});
