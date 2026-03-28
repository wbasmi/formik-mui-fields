"use client";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
} & Omit<ToggleButtonGroupProps, "value" | "onChange">;

const FormikToggleButtonGroup = ({ name, label, options, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <ToggleButtonGroup
        {...props}
        value={field.value}
        onChange={(_, newValue) => {
          if (newValue !== null) {
            helpers.setValue(newValue);
          }
        }}
        onBlur={field.onBlur}
      >
        {options.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikToggleButtonGroup;
