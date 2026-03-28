import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikNumberField from "./FormikNumberField";

const meta: Meta<typeof FormikNumberField> = {
  title: "FormikNumberField",
  component: FormikNumberField,
  decorators: [withFormik({ initialValues: { quantity: "", price: 19.99 } })],
};

export default meta;
type Story = StoryObj<typeof FormikNumberField>;

export const Default: Story = {
  args: {
    name: "quantity",
    label: "Quantity",
  },
};

export const WithInitialValue: Story = {
  args: {
    name: "price",
    label: "Price",
  },
};

export const WithMinMax: Story = {
  args: {
    name: "quantity",
    label: "Quantity (1-100)",
    min: 1,
    max: 100,
  },
};

export const WithStep: Story = {
  args: {
    name: "quantity",
    label: "Quantity (step 5)",
    step: 5,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { quantity: "" },
      initialErrors: { quantity: "Quantity is required" },
      initialTouched: { quantity: true },
    }),
  ],
  args: {
    name: "quantity",
    label: "Quantity",
  },
};
