"use client";

import { Box, FormControl, FormHelperText, Typography } from "@mui/material";
import { useField } from "formik";
import { useCallback, useState } from "react";

import CropDialog, { type CropAspectOption } from "../CropDialog/CropDialog";

type Props = {
  name: string;
  label?: string;
  height?: number;
  cropEnabled?: boolean;
  cropOptions?: CropAspectOption[];
};

const ALL_CROP_OPTIONS: CropAspectOption[] = ["1.91:1", "1:1", "3:1"];

const FormikImageUpload = ({
  name,
  label,
  height = 120,
  cropEnabled = false,
  cropOptions = ALL_CROP_OPTIONS,
}: Props) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      if (cropEnabled) {
        setRawImageSrc(url);
      } else {
        helpers.setValue(url);
      }
      e.target.value = "";
    },
    [helpers, cropEnabled],
  );

  const handleCropConfirm = useCallback(
    (croppedUrl: string) => {
      helpers.setValue(croppedUrl);
      setRawImageSrc(null);
    },
    [helpers],
  );

  const handleCropCancel = useCallback(() => {
    setRawImageSrc(null);
  }, []);

  return (
    <FormControl fullWidth error={hasError}>
      {label && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {label}
        </Typography>
      )}
      <Box
        component="label"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height,
          border: "2px dashed",
          borderColor: hasError ? "error.main" : "divider",
          borderRadius: 1,
          cursor: "pointer",
          overflow: "hidden",
          backgroundImage: field.value ? `url(${field.value})` : "none",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          "&:hover": { borderColor: "primary.main" },
        }}
      >
        {!field.value && (
          <Typography variant="body2" color="text.secondary">
            Upload image
          </Typography>
        )}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Box>
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}

      {cropEnabled && rawImageSrc && (
        <CropDialog
          open
          imageSrc={rawImageSrc}
          cropOptions={cropOptions}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}
    </FormControl>
  );
};

export default FormikImageUpload;
