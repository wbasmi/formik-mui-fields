"use client";

import { type ReactNode } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useField } from "formik";

type Option = {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
};

type Props = {
  name: string;
  label?: string;
  options: Option[];
  direction?: "row" | "column";
};

const FormikRadioCards = ({
  name,
  label,
  options,
  direction = "column",
}: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        value={field.value}
        onChange={(_e, value) => helpers.setValue(value)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: direction,
            gap: 1,
            mt: label ? 1 : 0,
          }}
        >
          {options.map((option) => (
            <Paper
              key={option.value}
              variant="outlined"
              onClick={() => helpers.setValue(option.value)}
              onBlur={() => helpers.setTouched(true)}
              sx={{
                p: 2,
                cursor: "pointer",
                borderColor:
                  field.value === option.value ? "primary.main" : "divider",
                borderWidth: field.value === option.value ? 2 : 1,
                bgcolor:
                  field.value === option.value
                    ? "action.selected"
                    : "background.paper",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Radio
                value={option.value}
                checked={field.value === option.value}
                sx={{ p: 0 }}
              />
              {option.icon && <Box sx={{ display: "flex" }}>{option.icon}</Box>}
              <Box>
                <Typography variant="body1">{option.label}</Typography>
                {option.description && (
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      </RadioGroup>
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikRadioCards;
