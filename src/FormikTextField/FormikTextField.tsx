"use client";

import { TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
} & Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText"
>;

const FormikTextField = ({ name, ...props }: Props) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default FormikTextField;
