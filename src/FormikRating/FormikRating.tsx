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
} & Omit<RatingProps, "name" | "value" | "onChange">;

const FormikRating = ({ name, label, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Rating
        {...props}
        name={name}
        value={field.value ?? null}
        onChange={(_, newValue) => helpers.setValue(newValue)}
        onBlur={field.onBlur}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikRating;
