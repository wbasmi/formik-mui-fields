import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import { Box, FormControl, FormHelperText, Typography } from "@mui/material";
import FormikImageUpload from "./FormikImageUpload";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Box: vi.fn(({ children }: any) => children ?? null),
  FormControl: vi.fn(({ children }: any) => children),
  FormHelperText: vi.fn(() => null),
  Typography: vi.fn(() => null),
}));

vi.mock("../CropDialog/CropDialog", () => ({ default: vi.fn(() => null) }));

import CropDialog from "../CropDialog/CropDialog";

const mockUseField = useField as Mock;
const MockBox = Box as unknown as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;
const MockTypography = Typography as unknown as Mock;
const MockCropDialog = CropDialog as unknown as Mock;

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "avatar",
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
  global.URL.createObjectURL = vi.fn(() => "blob:test");
});

describe("FormikImageUpload", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikImageUpload name="avatar" />);
      expect(mockUseField).toHaveBeenCalledWith("avatar");
    });
  });

  describe("when label is provided", () => {
    it("renders Typography with the label", () => {
      render(<FormikImageUpload name="avatar" label="Upload avatar" />);
      expect(MockTypography).toHaveBeenCalledWith(
        expect.objectContaining({
          children: "Upload avatar",
          sx: { mb: 1 },
        }),
        undefined,
      );
    });
  });

  describe("when no label is provided", () => {
    it("does not render Typography label", () => {
      render(<FormikImageUpload name="avatar" />);
      expect(MockTypography).not.toHaveBeenCalledWith(
        expect.objectContaining({ sx: { mb: 1 } }),
        undefined,
      );
    });
  });

  describe("when no image is uploaded", () => {
    it("renders the upload placeholder text", () => {
      render(<FormikImageUpload name="avatar" />);
      expect(MockTypography).toHaveBeenCalledWith(
        expect.objectContaining({
          children: "Upload image",
        }),
        undefined,
      );
    });
  });

  describe("when an image is uploaded", () => {
    it("does not render the placeholder text", () => {
      mockUseField.mockReturnValue([
        { ...defaultField, value: "blob:uploaded" },
        defaultMeta,
        mockHelpers,
      ]);
      render(<FormikImageUpload name="avatar" />);
      expect(MockTypography).not.toHaveBeenCalledWith(
        expect.objectContaining({
          children: "Upload image",
        }),
        undefined,
      );
    });
  });

  describe("when height is provided", () => {
    it("renders the dropzone Box with the custom height", () => {
      render(<FormikImageUpload name="avatar" height={200} />);
      expect(MockBox).toHaveBeenCalledWith(
        expect.objectContaining({
          sx: expect.objectContaining({ height: 200 }),
        }),
        undefined,
      );
    });
  });

  describe("when cropEnabled is false", () => {
    it("does not render CropDialog", () => {
      render(<FormikImageUpload name="avatar" />);
      expect(MockCropDialog).not.toHaveBeenCalled();
    });
  });

  describe("when field is touched with an error", () => {
    it("renders FormControl with error true", () => {
      mockUseField.mockReturnValue([
        defaultField,
        { ...defaultMeta, touched: true, error: "Required" },
        mockHelpers,
      ]);
      render(<FormikImageUpload name="avatar" />);
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
      render(<FormikImageUpload name="avatar" />);
      expect(MockFormHelperText).toHaveBeenCalled();
    });
  });

  describe("when field has no errors", () => {
    it("does not render FormHelperText", () => {
      render(<FormikImageUpload name="avatar" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when rendered with default height", () => {
    it("uses 120 as the dropzone height", () => {
      render(<FormikImageUpload name="avatar" />);
      expect(MockBox).toHaveBeenCalledWith(
        expect.objectContaining({
          sx: expect.objectContaining({ height: 120 }),
        }),
        undefined,
      );
    });
  });
});
