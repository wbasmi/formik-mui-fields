"use client";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  type SelectProps,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
} & Omit<SelectProps, "name" | "value" | "onChange" | "onBlur" | "error">;

const FormikSelect = ({ name, label, options, ...props }: Props) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select {...field} {...props}>
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
