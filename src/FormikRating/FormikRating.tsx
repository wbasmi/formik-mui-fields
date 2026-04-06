"use client";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Rating,
  type RatingProps,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  onChange?: (value: number | null, event: React.SyntheticEvent) => void;
} & Omit<RatingProps, "name" | "value" | "onChange">;

const FormikRating = ({ name, label, onChange, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Rating
        {...props}
        name={name}
        value={field.value ?? null}
        onChange={(event, newValue) => {
          helpers.setValue(newValue);
          onChange?.(newValue, event);
        }}
        onBlur={field.onBlur}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikRating;
