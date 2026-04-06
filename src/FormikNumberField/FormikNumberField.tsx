"use client";

import { TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (
    value: number | "",
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
} & Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText" | "type"
>;

const FormikNumberField = ({
  name,
  min,
  max,
  step,
  onChange,
  ...props
}: Props) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      helpers.setValue("");
      onChange?.("", e);
      return;
    }
    const parsed = parseFloat(raw);
    const value = isNaN(parsed) ? "" : parsed;
    helpers.setValue(value);
    onChange?.(value, e);
  };

  return (
    <TextField
      {...props}
      type="number"
      value={field.value ?? ""}
      onChange={handleChange}
      onBlur={field.onBlur}
      name={name}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      slotProps={{
        htmlInput: { min, max, step },
        ...props.slotProps,
      }}
    />
  );
};

export default FormikNumberField;
