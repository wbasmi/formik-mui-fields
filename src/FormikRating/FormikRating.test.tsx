import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { Rating, FormControl, FormLabel, FormHelperText } from "@mui/material";
import FormikRating from "./FormikRating";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Rating: vi.fn(() => null),
  FormControl: vi.fn(({ children }: any) => children),
  FormLabel: vi.fn(() => null),
  FormHelperText: vi.fn(() => null),
}));

const mockUseField = useField as Mock;
const MockRating = Rating as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "rating",
  value: 3,
  onChange: vi.fn(),
  onBlur: vi.fn(),
};
const defaultMeta = {
  touched: false,
  error: undefined,
  initialTouched: false,
  initialError: undefined,
  initialValue: 3,
  value: 3,
};

beforeEach(() => {
  vi.clearAllMocks();
  mockUseField.mockReturnValue([defaultField, defaultMeta, mockHelpers]);
});

describe("FormikRating", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikRating name="rating" />);
      expect(mockUseField).toHaveBeenCalledWith("rating");
    });
  });

  describe("when rendered with a value", () => {
    it("passes the value to Rating", () => {
      render(<FormikRating name="rating" />);
      expect(MockRating).toHaveBeenCalledWith(
        expect.objectContaining({ value: 3, name: "rating" }),
        undefined,
      );
    });
  });

  describe("when value is undefined", () => {
    it("passes null to Rating", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: undefined },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikRating name="rating" />);
      expect(MockRating).toHaveBeenCalledWith(
        expect.objectContaining({ value: null }),
        undefined,
      );
    });
  });

  describe("when the value changes", () => {
    it("calls helpers.setValue with the new value", () => {
      render(<FormikRating name="rating" />);
      const onChangeProp = MockRating.mock.calls[0][0].onChange;
      onChangeProp(null, 5);
      expect(mockHelpers.setValue).toHaveBeenCalledWith(5);
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikRating name="rating" label="Your rating" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when no label is provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikRating name="rating" />);
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
      render(<FormikRating name="rating" />);
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
      render(<FormikRating name="rating" />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikRating name="rating" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when additional props are passed", () => {
    it("forwards them to Rating", () => {
      render(<FormikRating name="rating" max={10} readOnly />);
      expect(MockRating).toHaveBeenCalledWith(
        expect.objectContaining({ max: 10, readOnly: true }),
        undefined,
      );
    });
  });
});
