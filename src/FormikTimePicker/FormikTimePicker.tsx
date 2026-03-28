"use client";

import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import {
  TimePicker,
  type TimePickerProps,
} from "@mui/x-date-pickers/TimePicker";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
} & Omit<TimePickerProps, "value" | "onChange">;

const FormikTimePicker = ({ name, label, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <TimePicker
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

export default FormikTimePicker;
