"use client";

import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import {
  DatePicker,
  type DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
} & Omit<DatePickerProps, "value" | "onChange">;

const FormikDatePicker = ({ name, label, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <DatePicker
        {...props}
        value={field.value ?? null}
        onChange={(value) => helpers.setValue(value)}
        slotProps={{
          textField: {
            onBlur: () => helpers.setTouched(true),
            error: hasError,
          },
          ...props.slotProps,
        }}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikDatePicker;
