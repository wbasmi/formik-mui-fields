"use client";

import { useEffect } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  Link,
  FormatListBulleted,
  FormatListNumbered,
} from "@mui/icons-material";
import { useField } from "formik";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

type ToolbarAction = "bold" | "italic" | "link" | "bulletList" | "orderedList";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  toolbar?: ToolbarAction[];
};

const defaultToolbar: ToolbarAction[] = [
  "bold",
  "italic",
  "link",
  "bulletList",
  "orderedList",
];

const FormikRichTextField = ({
  name,
  label,
  placeholder,
  toolbar = defaultToolbar,
}: Props) => {
  const [field, meta, helpers] = useField<string>(name);
  const hasError = meta.touched && Boolean(meta.error);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder ?? "" }),
    ],
    content: field.value ?? "",
    onUpdate: ({ editor }) => {
      helpers.setValue(editor.getHTML());
    },
    onBlur: () => {
      helpers.setTouched(true);
    },
  });

  useEffect(() => {
    if (editor && field.value !== editor.getHTML()) {
      editor.commands.setContent(field.value ?? "");
    }
  }, [field.value, editor]);

  const handleToggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const handleToggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const handleToggleLink = () => {
    if (editor?.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    } else {
      const url = window.prompt("Enter URL");
      if (url) {
        editor?.chain().focus().setLink({ href: url }).run();
      }
    }
  };

  const handleToggleBulletList = () => {
    editor?.chain().focus().toggleBulletList().run();
  };

  const handleToggleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  };

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Box
        sx={(theme) => ({
          border: `1px solid ${hasError ? theme.palette.error.main : theme.palette.divider}`,
          borderRadius: 1,
          "&:hover": {
            borderColor: hasError
              ? theme.palette.error.main
              : theme.palette.text.primary,
          },
          "&:focus-within": {
            borderColor: hasError
              ? theme.palette.error.main
              : theme.palette.primary.main,
            borderWidth: 2,
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            p: 0.5,
          }}
        >
          {toolbar.includes("bold") && (
            <IconButton
              size="small"
              onClick={handleToggleBold}
              color={editor?.isActive("bold") ? "primary" : "default"}
            >
              <FormatBold />
            </IconButton>
          )}
          {toolbar.includes("italic") && (
            <IconButton
              size="small"
              onClick={handleToggleItalic}
              color={editor?.isActive("italic") ? "primary" : "default"}
            >
              <FormatItalic />
            </IconButton>
          )}
          {toolbar.includes("link") && (
            <IconButton
              size="small"
              onClick={handleToggleLink}
              color={editor?.isActive("link") ? "primary" : "default"}
            >
              <Link />
            </IconButton>
          )}
          {toolbar.includes("bulletList") && (
            <IconButton
              size="small"
              onClick={handleToggleBulletList}
              color={editor?.isActive("bulletList") ? "primary" : "default"}
            >
              <FormatListBulleted />
            </IconButton>
          )}
          {toolbar.includes("orderedList") && (
            <IconButton
              size="small"
              onClick={handleToggleOrderedList}
              color={editor?.isActive("orderedList") ? "primary" : "default"}
            >
              <FormatListNumbered />
            </IconButton>
          )}
        </Box>
        <Box sx={{ p: 1, "& .tiptap": { outline: "none", minHeight: 100 } }}>
          <EditorContent editor={editor} />
        </Box>
      </Box>
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikRichTextField;
