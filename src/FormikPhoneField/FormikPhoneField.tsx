"use client";

import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { all, type CountryData } from "country-codes-list";
import * as Flags from "country-flag-icons/react/3x2";
import { useField } from "formik";

type Country = {
  code: string;
  name: string;
  dialCode: string;
};

const COUNTRIES: Country[] = all()
  .filter((c: CountryData) => c.countryCallingCode)
  .map((c: CountryData) => ({
    code: c.countryCode,
    name: c.countryNameEn,
    dialCode: `+${c.countryCallingCode}`,
  }));

const findCountryByDialCode = (phone: string): Country | undefined => {
  const sorted = [...COUNTRIES].sort(
    (a, b) => b.dialCode.length - a.dialCode.length,
  );
  return sorted.find((c) => phone.startsWith(c.dialCode));
};

const formatLocalNumber = (digits: string): string => {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

type Props = {
  name: string;
  label?: string;
  defaultCountry?: string;
  preferredCountries?: string[];
} & Omit<
  TextFieldProps,
  | "name"
  | "value"
  | "onChange"
  | "onBlur"
  | "error"
  | "helperText"
  | "slotProps"
>;

const FormikPhoneField = ({
  name,
  label,
  defaultCountry = "US",
  preferredCountries = [],
  ...props
}: Props) => {
  const [field, meta, helpers] = useField<string>(name);
  const hasError = meta.touched && Boolean(meta.error);

  const currentValue = field.value ?? "";
  const matchedCountry = currentValue
    ? findCountryByDialCode(currentValue)
    : undefined;
  const selectedCountry =
    matchedCountry ??
    COUNTRIES.find((c) => c.code === defaultCountry) ??
    COUNTRIES[0]!;

  const localNumber = currentValue.startsWith(selectedCountry.dialCode)
    ? currentValue.slice(selectedCountry.dialCode.length)
    : currentValue.replace(/^\+\d*/, "");

  const displayNumber = formatLocalNumber(localNumber);

  const sortedCountries = (() => {
    if (preferredCountries.length === 0) return COUNTRIES;
    const preferred = COUNTRIES.filter((c) =>
      preferredCountries.includes(c.code),
    );
    const rest = COUNTRIES.filter((c) => !preferredCountries.includes(c.code));
    return [...preferred, ...rest];
  })();

  const handleCountryChange = (newCode: string) => {
    const newCountry = COUNTRIES.find((c) => c.code === newCode);
    if (newCountry) {
      helpers.setValue(`${newCountry.dialCode}${localNumber}`);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^\d]/g, "");
    helpers.setValue(`${selectedCountry.dialCode}${digits}`);
  };

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <TextField
        {...props}
        value={displayNumber}
        onChange={handlePhoneChange}
        onBlur={() => helpers.setTouched(true)}
        error={hasError}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Select
                  value={selectedCountry.code}
                  onChange={(e) =>
                    handleCountryChange(e.target.value as string)
                  }
                  variant="standard"
                  disableUnderline
                  sx={{ minWidth: 80 }}
                >
                  {sortedCountries.map((country) => {
                    const FlagComponent =
                      Flags[country.code as keyof typeof Flags];
                    return (
                      <MenuItem key={country.code} value={country.code}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {FlagComponent && (
                            <FlagComponent style={{ width: 20, height: 14 }} />
                          )}
                          {country.code} {country.dialCode}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Select>
              </InputAdornment>
            ),
          },
        }}
      />
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormikPhoneField;
