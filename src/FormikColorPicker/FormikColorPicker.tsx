"use client";

import {
  Box,
  ClickAwayListener,
  FormControl,
  FormLabel,
  Popper,
} from "@mui/material";
import { useField } from "formik";
import { useRef, useState } from "react";
import { ChromePicker, type ColorResult } from "react-color";

type Props = {
  name: string;
  label?: string;
};

const FormikColorPicker = ({ name, label }: Props) => {
  const [field, , helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleChange = (color: ColorResult) => {
    helpers.setValue(color.hex);
  };

  return (
    <FormControl>
      {label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}
      <Box
        ref={anchorRef}
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: field.value,
          border: "2px solid",
          borderColor: "grey.300",
          cursor: "pointer",
          transition: "border-color 0.2s",
          "&:hover": { borderColor: "grey.500" },
        }}
      />
      <Popper
        open={open}
        // eslint-disable-next-line react-hooks/refs
        anchorEl={anchorRef.current}
        placement="bottom-start"
        sx={{ zIndex: 1500 }}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Box>
            <ChromePicker
              color={field.value}
              onChange={handleChange}
              disableAlpha
            />
          </Box>
        </ClickAwayListener>
      </Popper>
    </FormControl>
  );
};

export default FormikColorPicker;
