"use client";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Slider,
  type SliderProps,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  onChange?: (value: number | number[]) => void;
} & Omit<SliderProps, "name" | "value" | "onChange">;

const FormikSlider = ({ name, label, onChange, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Slider
        {...props}
        value={field.value}
        onChange={(_, value) => {
          helpers.setValue(value);
          onChange?.(value);
        }}
        onBlur={field.onBlur}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikSlider;
