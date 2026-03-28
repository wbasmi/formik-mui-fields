"use client";

import {
  Checkbox,
  type CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
} & Omit<CheckboxProps, "name" | "value" | "checked" | "onChange" | "onBlur">;

const FormikCheckbox = ({ name, label, ...props }: Props) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl error={hasError}>
      <FormControlLabel
        control={<Checkbox {...field} {...props} checked={field.checked} />}
        label={label ?? ""}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikCheckbox;
