"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormikTextField from "../FormikTextField/FormikTextField";
import FormikSelect from "../FormikSelect/FormikSelect";
import FormikNumberField from "../FormikNumberField/FormikNumberField";

const CATEGORY_OPTIONS = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "food", label: "Food & Beverages" },
  { value: "books", label: "Books" },
];

type ProductFormValues = {
  name: string;
  category: string;
  price: number | "";
};

const initialValues: ProductFormValues = {
  name: "",
  category: "",
  price: "",
};

type StoryArgs = {
  onSubmit: (values: ProductFormValues) => void;
};

const meta: Meta<StoryArgs> = {
  title: "Examples/ProductForm",
  args: {
    onSubmit: fn(),
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: ({ onSubmit }) => (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Stack spacing={2} sx={{ width: 360 }}>
          <FormikTextField name="name" label="Product Name" />
          <FormikSelect
            name="category"
            label="Category"
            options={CATEGORY_OPTIONS}
          />
          <FormikNumberField name="price" label="Price" min={0} step={0.01} />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  ),
};

export const WithInitialValues: Story = {
  render: ({ onSubmit }) => (
    <Formik
      initialValues={{
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
      }}
      onSubmit={onSubmit}
    >
      <Form>
        <Stack spacing={2} sx={{ width: 360 }}>
          <FormikTextField name="name" label="Product Name" />
          <FormikSelect
            name="category"
            label="Category"
            options={CATEGORY_OPTIONS}
          />
          <FormikNumberField name="price" label="Price" min={0} step={0.01} />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  ),
};
