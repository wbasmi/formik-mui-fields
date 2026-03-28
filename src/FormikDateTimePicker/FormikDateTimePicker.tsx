"use client";

import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import {
  DateTimePicker,
  type DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
} & Omit<DateTimePickerProps, "value" | "onChange">;

const FormikDateTimePicker = ({ name, label, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <DateTimePicker
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

export default FormikDateTimePicker;
