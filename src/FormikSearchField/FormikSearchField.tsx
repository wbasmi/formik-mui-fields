"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useField } from "formik";

type Props = {
  name: string;
  debounceMs?: number;
} & Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText"
>;

const FormikSearchField = ({ name, debounceMs = 300, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const [localValue, setLocalValue] = useState<string>(field.value ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(field.value ?? "");
  }, [field.value]);

  const debouncedSetValue = useCallback(
    (value: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        helpers.setValue(value);
      }, debounceMs);
    },
    [helpers, debounceMs],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    debouncedSetValue(value);
  };

  const handleClear = () => {
    setLocalValue("");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    helpers.setValue("");
  };

  return (
    <TextField
      {...props}
      name={field.name}
      value={localValue}
      onChange={handleChange}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: localValue ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ) : undefined,
          ...props.slotProps?.input,
        },
        ...props.slotProps,
      }}
    />
  );
};

export default FormikSearchField;
