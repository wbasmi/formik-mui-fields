import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikCurrencyField from "./FormikCurrencyField";

const meta: Meta<typeof FormikCurrencyField> = {
  title: "FormikCurrencyField",
  component: FormikCurrencyField,
  decorators: [
    withFormik({
      initialValues: { price: 1234.56, amount: 0 },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikCurrencyField>;

export const Default: Story = {
  args: {
    name: "price",
    label: "Price",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { price: null },
      initialErrors: { price: "Price is required" },
      initialTouched: { price: true },
    }),
  ],
  args: {
    name: "price",
    label: "Price",
  },
};

export const EUR: Story = {
  decorators: [
    withFormik({
      initialValues: { price: 9999.99 },
    }),
  ],
  args: {
    name: "price",
    label: "Price (EUR)",
    currency: "EUR",
    locale: "de-DE",
  },
};

export const CustomPrecision: Story = {
  decorators: [
    withFormik({
      initialValues: { price: 42.1234 },
    }),
  ],
  args: {
    name: "price",
    label: "Price (4 decimals)",
    decimalPlaces: 4,
  },
};
