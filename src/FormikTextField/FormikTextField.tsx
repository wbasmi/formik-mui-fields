"use client";

import { TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
} & Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText"
>;

const FormikTextField = ({ name, onChange, ...props }: Props) => {
  const [field, meta] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    onChange?.(e.target.value, e);
  };

  return (
    <TextField
      {...field}
      {...props}
      onChange={handleChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default FormikTextField;
