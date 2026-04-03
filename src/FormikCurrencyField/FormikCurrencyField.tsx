"use client";

import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  currency?: string;
  locale?: string;
  decimalPlaces?: number;
} & Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText"
>;

const getCurrencySymbol = (currency: string, locale: string): string => {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(0);
  return formatted.replace(/[\d.,\s]/g, "").trim();
};

const formatValue = (
  value: number | null | undefined,
  locale: string,
  decimalPlaces: number,
): string => {
  if (value === null || value === undefined || isNaN(value)) return "";
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: true,
  }).format(value);
};

const parseValue = (input: string, locale: string): number | null => {
  if (!input) return null;

  const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
  const groupSeparator = parts.find((p) => p.type === "group")?.value ?? ",";
  const decimalSeparator =
    parts.find((p) => p.type === "decimal")?.value ?? ".";

  let cleaned = input;
  cleaned = cleaned.split(groupSeparator).join("");
  cleaned = cleaned.split(decimalSeparator).join(".");

  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
};

const FormikCurrencyField = ({
  name,
  label,
  currency = "USD",
  locale = "en-US",
  decimalPlaces = 2,
  ...props
}: Props) => {
  const [field, meta, helpers] = useField<number | null>(name);
  const hasError = meta.touched && Boolean(meta.error);

  const currencySymbol = getCurrencySymbol(currency, locale);
  const displayValue = formatValue(field.value, locale, decimalPlaces);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = parseValue(raw, locale);
    helpers.setValue(parsed);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <TextField
      {...props}
      name={field.name}
      label={label}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={hasError}
      helperText={hasError ? meta.error : undefined}
      slotProps={{
        ...props.slotProps,
        input: {
          ...(typeof props.slotProps?.input === "object"
            ? props.slotProps.input
            : {}),
          startAdornment: (
            <InputAdornment position="start">{currencySymbol}</InputAdornment>
          ),
        },
      }}
    />
  );
};

export default FormikCurrencyField;
