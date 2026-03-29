import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import FormikRadioCards from "./FormikRadioCards";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Box: vi.fn(({ children }: any) => children),
  FormControl: vi.fn(({ children }: any) => children),
  FormHelperText: vi.fn(() => null),
  FormLabel: vi.fn(() => null),
  Paper: vi.fn(({ children }: any) => children),
  Radio: vi.fn(() => null),
  RadioGroup: vi.fn(({ children }: any) => children),
  Typography: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockBox = Box as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockPaper = Paper as unknown as Mock;
const MockRadio = Radio as unknown as Mock;
const MockRadioGroup = RadioGroup as unknown as Mock;
const MockTypography = Typography as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "plan",
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

const options = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikRadioCards", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikRadioCards name="plan" options={options} />);
      expect(mockUseField).toHaveBeenCalledWith("plan");
    });
  });

  describe("when rendered with options", () => {
    it("renders a Paper for each option", () => {
      render(<FormikRadioCards name="plan" options={options} />);
      expect(MockPaper).toHaveBeenCalledTimes(3);
    });

    it("renders a Radio for each option", () => {
      render(<FormikRadioCards name="plan" options={options} />);
      expect(MockRadio).toHaveBeenCalledTimes(3);
      expect(MockRadio).toHaveBeenCalledWith(
        expect.objectContaining({ value: "free", checked: false }),
        undefined,
      );
    });
  });

  describe("when an option is selected", () => {
    it("renders the selected Radio as checked", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "pro" },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikRadioCards name="plan" options={options} />);
      expect(MockRadio).toHaveBeenCalledWith(
        expect.objectContaining({ value: "pro", checked: true }),
        undefined,
      );
    });
  });

  describe("when a card is clicked", () => {
    it("calls setValue with the option value", () => {
      render(<FormikRadioCards name="plan" options={options} />);
      const onClick = MockPaper.mock.calls[1][0].onClick;
      onClick();
      expect(mockHelpers.setValue).toHaveBeenCalledWith("pro");
    });
  });

  describe("when a card is blurred", () => {
    it("calls setTouched", () => {
      render(<FormikRadioCards name="plan" options={options} />);
      const onBlur = MockPaper.mock.calls[0][0].onBlur;
      onBlur();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when RadioGroup onChange fires", () => {
    it("calls setValue with the new value", () => {
      render(<FormikRadioCards name="plan" options={options} />);
      const onChange = MockRadioGroup.mock.calls[0][0].onChange;
      onChange(null, "enterprise");
      expect(mockHelpers.setValue).toHaveBeenCalledWith("enterprise");
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(
        <FormikRadioCards name="plan" label="Select Plan" options={options} />,
      );
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikRadioCards name="plan" options={options} />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when direction is row", () => {
    it("passes row direction to the Box container", () => {
      render(
        <FormikRadioCards name="plan" options={options} direction="row" />,
      );
      expect(MockBox).toHaveBeenCalledWith(
        expect.objectContaining({
          sx: expect.objectContaining({ flexDirection: "row" }),
        }),
        undefined,
      );
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikRadioCards name="plan" options={options} />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikRadioCards name="plan" options={options} />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikRadioCards name="plan" options={options} />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when options have descriptions", () => {
    it("renders description Typography", () => {
      const optionsWithDesc = [
        { value: "free", label: "Free", description: "Basic features" },
      ];
      render(<FormikRadioCards name="plan" options={optionsWithDesc} />);
      // Two Typography calls: one for label, one for description
      expect(MockTypography).toHaveBeenCalledTimes(2);
    });
  });
});
