"use client";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  row?: boolean;
};

const FormikRadioGroup = ({ name, label, options, row }: Props) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup {...field} row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikRadioGroup;
