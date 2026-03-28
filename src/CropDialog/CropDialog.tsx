"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export type CropAspectOption = "1.91:1" | "1:1" | "3:1";

const ASPECT_RATIOS: Record<CropAspectOption, number> = {
  "1.91:1": 1.91,
  "1:1": 1,
  "3:1": 3,
};

type Props = {
  open: boolean;
  imageSrc: string;
  cropOptions: CropAspectOption[];
  onConfirm: (croppedUrl: string) => void;
  onCancel: () => void;
};

const getCroppedImageUrl = (image: HTMLImageElement, crop: Crop): string => {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  return canvas.toDataURL("image/png");
};

const CropDialog = ({
  open,
  imageSrc,
  cropOptions,
  onConfirm,
  onCancel,
}: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [selectedAspect, setSelectedAspect] = useState<CropAspectOption>(
    cropOptions[0]!,
  );
  const [crop, setCrop] = useState<Crop>();

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      imgRef.current = e.currentTarget;
      const aspect = ASPECT_RATIOS[selectedAspect];
      const { width, height } = e.currentTarget;
      const cropWidth = Math.min(width, height * aspect);
      const cropHeight = cropWidth / aspect;
      setCrop({
        unit: "px",
        x: (width - cropWidth) / 2,
        y: (height - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
      });
    },
    [selectedAspect],
  );

  const handleAspectChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, value: CropAspectOption | null) => {
      if (!value || !imgRef.current) return;
      setSelectedAspect(value);
      const aspect = ASPECT_RATIOS[value];
      const { width, height } = imgRef.current;
      const cropWidth = Math.min(width, height * aspect);
      const cropHeight = cropWidth / aspect;
      setCrop({
        unit: "px",
        x: (width - cropWidth) / 2,
        y: (height - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
      });
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    if (!imgRef.current || !crop) return;
    const url = getCroppedImageUrl(imgRef.current, crop);
    onConfirm(url);
  }, [crop, onConfirm]);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="md" fullWidth>
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={ASPECT_RATIOS[selectedAspect]}
          >
            <img
              src={imageSrc}
              alt="Crop preview"
              onLoad={handleImageLoad}
              style={{ maxWidth: "100%", maxHeight: 400 }}
            />
          </ReactCrop>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Aspect ratio
            </Typography>
            <ToggleButtonGroup
              value={selectedAspect}
              exclusive
              onChange={handleAspectChange}
              size="small"
            >
              {cropOptions.map((option) => (
                <ToggleButton key={option} value={option}>
                  {option}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropDialog;
