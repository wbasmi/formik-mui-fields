import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { Slider, FormControl, FormLabel, FormHelperText } from "@mui/material";
import FormikSlider from "./FormikSlider";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Slider: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormLabel: vi.fn(() => null),
  FormHelperText: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockSlider = Slider as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "volume",
  value: 50,
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: 50,
  value: 50,
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikSlider", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikSlider name="volume" />);
      expect(mockUseField).toHaveBeenCalledWith("volume");
    });
  });

  describe("when rendered with a value", () => {
    it("passes the value to Slider", () => {
      render(<FormikSlider name="volume" />);
      expect(MockSlider).toHaveBeenCalledWith(
        expect.objectContaining({ value: 50 }),
        undefined,
      );
    });
  });

  describe("when the value changes", () => {
    it("calls helpers.setValue with the new value", () => {
      render(<FormikSlider name="volume" />);
      const onChangeProp = MockSlider.mock.calls[0][0].onChange;
      onChangeProp(null, 75);
      expect(mockHelpers.setValue).toHaveBeenCalledWith(75);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikSlider name="volume" label="Volume" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikSlider name="volume" />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Too low" },
        mockHelpers,
      ]);
      render(<FormikSlider name="volume" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Too low" },
        mockHelpers,
      ]);
      render(<FormikSlider name="volume" />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikSlider name="volume" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to Slider", () => {
      render(<FormikSlider name="volume" min={0} max={100} step={5} />);
      expect(MockSlider).toHaveBeenCalledWith(
        expect.objectContaining({ min: 0, max: 100, step: 5 }),
        undefined,
      );
    });
  });
});
