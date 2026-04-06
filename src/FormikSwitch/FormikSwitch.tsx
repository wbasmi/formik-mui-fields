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
  onChange?: (
    value: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
} & Omit<SwitchProps, "name" | "value" | "checked" | "onChange" | "onBlur">;

const FormikSwitch = ({ name, label, onChange, ...props }: Props) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  const hasError = meta.touched && Boolean(meta.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    onChange?.(e.target.checked, e);
  };

  return (
    <FormControl error={hasError}>
      <FormControlLabel
        control={
          <Switch
            {...field}
            {...props}
            checked={field.checked}
            onChange={handleChange}
          />
        }
        label={label ?? ""}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikSwitch;
