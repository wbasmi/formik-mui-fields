import { type Mock } from "vitest";
import { render } from "@testing-library/react";
import { useField } from "formik";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
} from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import FormikRichTextField from "./FormikRichTextField";

vi.mock("formik", () => ({
  useField: vi.fn(),
}));

vi.mock("@mui/material", () => ({
  Box: vi.fn(({ children }: any) => children),
  FormControl: vi.fn(({ children }: any) => children),
  FormHelperText: vi.fn(() => null),
  FormLabel: vi.fn(() => null),
  IconButton: vi.fn(() => null),
}));

vi.mock("@mui/icons-material", () => ({
  FormatBold: vi.fn(() => null),
  FormatItalic: vi.fn(() => null),
  Link: vi.fn(() => null),
  FormatListBulleted: vi.fn(() => null),
  FormatListNumbered: vi.fn(() => null),
}));

vi.mock("@tiptap/react", () => ({
  useEditor: vi.fn(),
  EditorContent: vi.fn(() => null),
}));

vi.mock("@tiptap/starter-kit", () => ({
  default: "StarterKit",
}));

vi.mock("@tiptap/extension-link", () => ({
  default: {
    configure: vi.fn(() => "LinkExtension"),
  },
}));

vi.mock("@tiptap/extension-placeholder", () => ({
  default: {
    configure: vi.fn(() => "PlaceholderExtension"),
  },
}));

const mockUseField = useField as Mock;
const MockFormControl = FormControl as unknown as Mock;
const MockFormHelperText = FormHelperText as unknown as Mock;
const MockFormLabel = FormLabel as unknown as Mock;
const MockIconButton = IconButton as unknown as Mock;
const mockUseEditor = useEditor as Mock;
const MockEditorContent = EditorContent as unknown as Mock;

const mockChain = {
  focus: vi.fn(),
  toggleBold: vi.fn(),
  toggleItalic: vi.fn(),
  toggleBulletList: vi.fn(),
  toggleOrderedList: vi.fn(),
  setLink: vi.fn(),
  unsetLink: vi.fn(),
  run: vi.fn(),
  setContent: vi.fn(),
};

// Make chain methods return the chain for chaining
mockChain.focus.mockReturnValue(mockChain);
mockChain.toggleBold.mockReturnValue(mockChain);
mockChain.toggleItalic.mockReturnValue(mockChain);
mockChain.toggleBulletList.mockReturnValue(mockChain);
mockChain.toggleOrderedList.mockReturnValue(mockChain);
mockChain.setLink.mockReturnValue(mockChain);
mockChain.unsetLink.mockReturnValue(mockChain);

const mockEditor = {
  getHTML: vi.fn(() => ""),
  isActive: vi.fn(() => false),
  chain: vi.fn(() => mockChain),
  commands: {
    setContent: vi.fn(),
  },
};

const mockHelpers = {
  setValue: vi.fn(),
  setTouched: vi.fn(),
  setError: vi.fn(),
};
const defaultField = {
  name: "content",
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
  mockUseEditor.mockReturnValue(mockEditor);
  mockChain.focus.mockReturnValue(mockChain);
  mockChain.toggleBold.mockReturnValue(mockChain);
  mockChain.toggleItalic.mockReturnValue(mockChain);
  mockChain.toggleBulletList.mockReturnValue(mockChain);
  mockChain.toggleOrderedList.mockReturnValue(mockChain);
  mockChain.setLink.mockReturnValue(mockChain);
  mockChain.unsetLink.mockReturnValue(mockChain);
  mockEditor.isActive.mockReturnValue(false);
  mockEditor.getHTML.mockReturnValue("");
});

describe("FormikRichTextField", () => {
  describe("when rendered with a name", () => {
    it("calls useField with the name", () => {
      render(<FormikRichTextField name="content" />);
      expect(mockUseField).toHaveBeenCalledWith("content");
    });
  });

  describe("when rendered with default props", () => {
    it("calls useEditor with extensions and configuration", () => {
      render(<FormikRichTextField name="content" />);
      expect(mockUseEditor).toHaveBeenCalledWith(
        expect.objectContaining({
          content: "",
        }),
      );
    });

    it("renders EditorContent with the editor", () => {
      render(<FormikRichTextField name="content" />);
      expect(MockEditorContent).toHaveBeenCalledWith(
        expect.objectContaining({ editor: mockEditor }),
        undefined,
      );
    });

    it("renders all toolbar buttons by default", () => {
      render(<FormikRichTextField name="content" />);
      expect(MockIconButton).toHaveBeenCalledTimes(5);
    });
  });

  describe("when rendered with a custom toolbar", () => {
    it("renders only the specified toolbar buttons", () => {
      render(
        <FormikRichTextField name="content" toolbar={["bold", "italic"]} />,
      );
      expect(MockIconButton).toHaveBeenCalledTimes(2);
    });
  });

  describe("when the editor content updates", () => {
    it("calls helpers.setValue with the HTML", () => {
      render(<FormikRichTextField name="content" />);
      const editorConfig = mockUseEditor.mock.calls[0][0];
      mockEditor.getHTML.mockReturnValue("<p>Hello</p>");
      editorConfig.onUpdate({ editor: mockEditor });
      expect(mockHelpers.setValue).toHaveBeenCalledWith("<p>Hello</p>");
    });
  });

  describe("when the editor loses focus", () => {
    it("calls helpers.setTouched with true", () => {
      render(<FormikRichTextField name="content" />);
      const editorConfig = mockUseEditor.mock.calls[0][0];
      editorConfig.onBlur();
      expect(mockHelpers.setTouched).toHaveBeenCalledWith(true);
    });
  });

  describe("when bold button is clicked", () => {
    it("toggles bold on the editor", () => {
      render(<FormikRichTextField name="content" />);
      const boldButton = MockIconButton.mock.calls.find(
        (call: unknown[]) => call[0].children?.type === vi.mocked(() => null),
      );
      // Find the bold button by checking onClick calls
      const boldOnClick = MockIconButton.mock.calls[0][0].onClick;
      boldOnClick();
      expect(mockEditor.chain).toHaveBeenCalled();
      expect(mockChain.focus).toHaveBeenCalled();
      expect(mockChain.toggleBold).toHaveBeenCalled();
      expect(mockChain.run).toHaveBeenCalled();
    });
  });

  describe("when italic button is clicked", () => {
    it("toggles italic on the editor", () => {
      render(<FormikRichTextField name="content" />);
      const italicOnClick = MockIconButton.mock.calls[1][0].onClick;
      italicOnClick();
      expect(mockEditor.chain).toHaveBeenCalled();
      expect(mockChain.focus).toHaveBeenCalled();
      expect(mockChain.toggleItalic).toHaveBeenCalled();
      expect(mockChain.run).toHaveBeenCalled();
    });
  });

  describe("when link button is clicked and link is not active", () => {
    it("prompts for URL and sets link", () => {
      const promptSpy = vi
        .spyOn(window, "prompt")
        .mockReturnValue("https://example.com");
      render(<FormikRichTextField name="content" />);
      const linkOnClick = MockIconButton.mock.calls[2][0].onClick;
      linkOnClick();
      expect(promptSpy).toHaveBeenCalledWith("Enter URL");
      expect(mockChain.setLink).toHaveBeenCalledWith({
        href: "https://example.com",
      });
      expect(mockChain.run).toHaveBeenCalled();
      promptSpy.mockRestore();
    });
  });

  describe("when link button is clicked and link is active", () => {
    it("unsets the link", () => {
      mockEditor.isActive.mockImplementation((type: string) => type === "link");
      render(<FormikRichTextField name="content" />);
      const linkOnClick = MockIconButton.mock.calls[2][0].onClick;
      linkOnClick();
      expect(mockChain.unsetLink).toHaveBeenCalled();
      expect(mockChain.run).toHaveBeenCalled();
    });
  });

  describe("when bullet list button is clicked", () => {
    it("toggles bullet list on the editor", () => {
      render(<FormikRichTextField name="content" />);
      const bulletOnClick = MockIconButton.mock.calls[3][0].onClick;
      bulletOnClick();
      expect(mockChain.toggleBulletList).toHaveBeenCalled();
      expect(mockChain.run).toHaveBeenCalled();
    });
  });

  describe("when ordered list button is clicked", () => {
    it("toggles ordered list on the editor", () => {
      render(<FormikRichTextField name="content" />);
      const orderedOnClick = MockIconButton.mock.calls[4][0].onClick;
      orderedOnClick();
      expect(mockChain.toggleOrderedList).toHaveBeenCalled();
      expect(mockChain.run).toHaveBeenCalled();
    });
  });

  describe("when label is provided", () => {
    it("renders FormLabel", () => {
      render(<FormikRichTextField name="content" label="Content" />);
      expect(MockFormLabel).toHaveBeenCalled();
    });
  });

  describe("when label is not provided", () => {
    it("does not render FormLabel", () => {
      render(<FormikRichTextField name="content" />);
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
      render(<FormikRichTextField name="content" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: true }),
        undefined,
      );
    });

    it("renders FormHelperText with the error message", () => {
      render(<FormikRichTextField name="content" />);
      expect(MockFormHelperText).toHaveBeenCalledWith(
        expect.objectContaining({ children: "Required" }),
        undefined,
      );
    });
  });

  describe("when field has no errors", () => {
    it("renders FormControl with error false", () => {
      render(<FormikRichTextField name="content" />);
      expect(MockFormControl).toHaveBeenCalledWith(
        expect.objectContaining({ error: false }),
        undefined,
      );
    });

    it("does not render FormHelperText", () => {
      render(<FormikRichTextField name="content" />);
      expect(MockFormHelperText).not.toHaveBeenCalled();
    });
  });

  describe("when placeholder is provided", () => {
    it("configures Placeholder extension with the placeholder text", () => {
      render(
        <FormikRichTextField name="content" placeholder="Start typing..." />,
      );
      expect(
        (Placeholder as unknown as { configure: Mock }).configure,
      ).toHaveBeenCalledWith({ placeholder: "Start typing..." });
    });
  });
});
