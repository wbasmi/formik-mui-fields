"use client";

import {
  Autocomplete,
  type AutocompleteProps,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { useField } from "formik";

type Props<T> = {
  name: string;
  label?: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  onChange?: (value: T | null) => void;
} & Omit<
  AutocompleteProps<T, false, false, false>,
  | "renderInput"
  | "value"
  | "onChange"
  | "onBlur"
  | "options"
  | "getOptionLabel"
  | "isOptionEqualToValue"
>;

const FormikAutocomplete = <T,>({
  name,
  label,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  onChange,
  ...props
}: Props<T>) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        {...props}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        value={field.value ?? null}
        onChange={(_, newValue) => {
          helpers.setValue(newValue);
          onChange?.(newValue);
        }}
        onBlur={() => helpers.setTouched(true)}
        renderInput={(params) => (
          <TextField
            {...params}
            error={hasError}
            helperText={hasError ? meta.error : undefined}
          />
        )}
      />
    </FormControl>
  );
};

export default FormikAutocomplete;
