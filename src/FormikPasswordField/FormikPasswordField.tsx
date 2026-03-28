"use client";

import { type ReactNode, useState } from "react";
import {
  TextField,
  type TextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useField } from "formik";

type Props = {
  name: string;
  visiblePasswordIcon?: ReactNode;
  hiddenPasswordIcon?: ReactNode;
} & Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "onBlur" | "error" | "helperText" | "type"
>;

const FormikPasswordField = ({
  name,
  visiblePasswordIcon = <Visibility />,
  hiddenPasswordIcon = <VisibilityOff />,
  ...props
}: Props) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...field}
      {...props}
      type={showPassword ? "text" : "password"}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? hiddenPasswordIcon : visiblePasswordIcon}
              </IconButton>
            </InputAdornment>
          ),
        },
        ...props.slotProps,
      }}
    />
  );
};

export default FormikPasswordField;
