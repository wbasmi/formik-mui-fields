"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import { useCallback, useRef } from "react";

type Props = {
  name: string;
  label?: string;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  buttonText?: string;
};

const FormikFileUpload = ({
  name,
  label,
  accept,
  maxSize,
  multiple = false,
  buttonText = "Choose file",
}: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      if (maxSize) {
        const oversized = Array.from(files).find((file) => file.size > maxSize);
        if (oversized) {
          helpers.setError(
            `File "${oversized.name}" exceeds maximum size of ${maxSize} bytes`,
          );
          helpers.setTouched(true);
          e.target.value = "";
          return;
        }
      }

      if (multiple) {
        helpers.setValue(Array.from(files));
      } else {
        helpers.setValue(files[0]);
      }
      helpers.setTouched(true);
      e.target.value = "";
    },
    [helpers, maxSize, multiple],
  );

  const getDisplayText = (): string => {
    if (!field.value) return "No file selected";
    if (Array.isArray(field.value)) {
      return field.value.map((f: File) => f.name).join(", ");
    }
    if (field.value instanceof File) {
      return field.value.name;
    }
    return String(field.value);
  };

  return (
    <FormControl fullWidth error={hasError}>
      {label && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {label}
        </Typography>
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button variant="outlined" onClick={handleClick}>
          {buttonText}
        </Button>
        <Typography variant="body2" color="text.secondary">
          {getDisplayText()}
        </Typography>
      </Box>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={handleChange}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikFileUpload;
