import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/date-picker.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@mui/material",
    "@mui/x-date-pickers",
    "formik",
    "dayjs",
  ],
  banner: {
    js: '"use client";',
  },
});
