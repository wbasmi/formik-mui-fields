"use client";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  type SwitchProps,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
} & Omit<SwitchProps, "name" | "value" | "checked" | "onChange" | "onBlur">;

const FormikSwitch = ({ name, label, ...props }: Props) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl error={hasError}>
      <FormControlLabel
        control={<Switch {...field} {...props} checked={field.checked} />}
        label={label ?? ""}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikSwitch;
