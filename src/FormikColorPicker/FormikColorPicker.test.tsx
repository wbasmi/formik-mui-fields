import { type Mock } from "vitest";
import { render, act } from "@testing-library/react";
import { useField } from "formik";
import {
  Box,
  ClickAwayListener,
  FormControl,
  FormLabel,
  Popper,
} from "@mui/material";
import { ChromePicker } from "react-color";
import FormikColorPicker from "./FormikColorPicker";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Box: vi.fn(({ children }: any) => children ?? null),
  ClickAwayListener: vi.fn(({ children }: any) => children),
  FormControl: vi.fn(({ children }: any) => children),
  FormLabel: vi.fn(() => null),
  Popper: vi.fn(({ children }: any) => children),
}));

vi.mock("react-color", () => ({
  ChromePicker: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockBox = Box as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockPopper = Popper as unknown as Mock;
const MockChromePicker = ChromePicker as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "color",
  value: "#1976d2",
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: "#1976d2",
  value: "#1976d2",
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikColorPicker", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikColorPicker name="color" />);
      expect(mockUseField).toHaveBeenCalledWith("color");
    });
  });

  describe("when rendered", () => {
    it("renders the color swatch Box with the field value as backgroundColor", () => {
      render(<FormikColorPicker name="color" />);
      const swatchCall = MockBox.mock.calls.find(
        (call: any[]) => call[0].sx?.backgroundColor === "#1976d2",
      );
      expect(swatchCall).toBeDefined();
    });

    it("renders Popper with open false initially", () => {
      render(<FormikColorPicker name="color" />);
      expect(MockPopper).toHaveBeenCalledWith(
        expect.objectContaining({ open: false }),
        undefined,
      );
    });
  });

  describe("when the swatch is clicked", () => {
    it("opens the Popper", () => {
      render(<FormikColorPicker name="color" />);
      const swatchCall = MockBox.mock.calls.find(
        (call: any[]) => call[0].onClick,
      );
      act(() => {
        swatchCall![0].onClick();
      });
      const lastPopperCall =
        MockPopper.mock.calls[MockPopper.mock.calls.length - 1];
      expect(lastPopperCall[0].open).toBe(true);
    });
  });

  describe("when a color is selected", () => {
    it("calls helpers.setValue with the hex value", () => {
      render(<FormikColorPicker name="color" />);
      const chromePickerProps = MockChromePicker.mock.calls[0][0];
      chromePickerProps.onChange({ hex: "#ff0000" });
      expect(mockHelpers.setValue).toHaveBeenCalledWith("#ff0000");
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikColorPicker name="color" label="Brand colour" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikColorPicker name="color" />);
      expect(MockFormLabel).not.toHaveBeenCalled();
    });
  });

  describe("when ChromePicker is rendered", () => {
    it("passes the current color value", () => {
      render(<FormikColorPicker name="color" />);
      expect(MockChromePicker).toHaveBeenCalledWith(
        expect.objectContaining({ color: "#1976d2", disableAlpha: true }),
        undefined,
      );
    });
  });
});
