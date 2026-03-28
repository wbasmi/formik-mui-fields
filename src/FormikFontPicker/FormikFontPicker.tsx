"use client";

import { useEffect, useState } from "react";
import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
};

type FontOption = { value: string; label: string };

const FormikFontPicker = ({ name, label }: Props) => {
  const [fonts, setFonts] = useState<FontOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    fetch("/api/google/fonts")
      .then((res) => res.json())
      .then((data) => setFonts(data))
      .catch(() => setFonts([]))
      .finally(() => setLoading(false));
  }, []);

  // Inject a Google Fonts stylesheet for the selected font
  useEffect(() => {
    if (!field.value) return;

    const linkId = "google-font-preview";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(field.value)}&display=swap`;
  }, [field.value]);

  const selectedOption = fonts.find((f) => f.value === field.value) ?? null;
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        options={fonts}
        loading={loading}
        getOptionLabel={(option) => option.label}
        value={selectedOption}
        onChange={(_, newValue) => {
          helpers.setValue(newValue?.value ?? "");
        }}
        onBlur={() => helpers.setTouched(true)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            error={hasError}
            helperText={hasError ? meta.error : undefined}
          />
        )}
      />
    </FormControl>
  );
};

export default FormikFontPicker;
