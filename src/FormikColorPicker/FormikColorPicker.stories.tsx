import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikColorPicker from "./FormikColorPicker";

const meta: Meta<typeof FormikColorPicker> = {
  title: "FormikColorPicker",
  component: FormikColorPicker,
  decorators: [
    withFormik({ initialValues: { color: "#1976d2", bg: "#ff5722" } }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikColorPicker>;

export const Default: Story = {
  args: {
    name: "color",
    label: "Brand colour",
  },
};

export const DifferentDefault: Story = {
  args: {
    name: "bg",
    label: "Background colour",
  },
};

export const NoLabel: Story = {
  args: {
    name: "color",
  },
};
