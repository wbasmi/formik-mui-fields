"use client";

import {
  Autocomplete,
  type AutocompleteProps,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  options?: string[];
  onChange?: (value: string[]) => void;
} & Omit<
  AutocompleteProps<string, true, false, true>,
  | "renderInput"
  | "value"
  | "onChange"
  | "onBlur"
  | "options"
  | "multiple"
  | "freeSolo"
  | "renderTags"
>;

const FormikChipInput = ({
  name,
  label,
  placeholder,
  options = [],
  onChange,
  ...props
}: Props) => {
  const [field, meta, helpers] = useField<string[]>(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        {...props}
        multiple
        freeSolo
        options={options}
        value={field.value ?? []}
        onChange={(_, newValue) => {
          const value = newValue as string[];
          helpers.setValue(value);
          onChange?.(value);
        }}
        onBlur={() => helpers.setTouched(true)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} key={option} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikChipInput;
