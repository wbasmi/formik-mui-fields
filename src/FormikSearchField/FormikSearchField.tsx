"use client";

import { useState, useEffect } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useField } from "formik";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  name: string;
  debounceMs?: number;
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
} & Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText"
>;

const FormikSearchField = ({
  name,
  debounceMs = 300,
  onChange,
  ...props
}: Props) => {
  const [field, meta, helpers] = useField(name);
  const [localValue, setLocalValue] = useState<string>(field.value ?? "");

  useEffect(() => {
    setTimeout(() => {
      setLocalValue(field.value ?? "");
    }, 0);
  }, [field.value]);

  const debouncedSetValue = useDebouncedCallback((value: string) => {
    helpers.setValue(value);
  }, debounceMs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    debouncedSetValue(value);
    onChange?.(value, e);
  };

  const handleClear = () => {
    setLocalValue("");
    debouncedSetValue.cancel();
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
