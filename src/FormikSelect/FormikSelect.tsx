"use client";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  type SelectProps,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string, event: SelectChangeEvent<unknown>) => void;
} & Omit<SelectProps, "name" | "value" | "onChange" | "onBlur" | "error">;

const FormikSelect = ({ name, label, options, onChange, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value as string;
    helpers.setValue(value);
    onChange?.(value, e);
  };

  return (
    <FormControl fullWidth error={hasError}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select {...field} {...props} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikSelect;
