import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikPasswordField from "./FormikPasswordField";

const meta: Meta<typeof FormikPasswordField> = {
  title: "FormikPasswordField",
  component: FormikPasswordField,
  decorators: [withFormik({ initialValues: { password: "" } })],
};

export default meta;
type Story = StoryObj<typeof FormikPasswordField>;

export const Default: Story = {
  args: {
    name: "password",
    label: "Password",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { password: "" },
      initialErrors: { password: "Password is required" },
      initialTouched: { password: true },
    }),
  ],
  args: {
    name: "password",
    label: "Password",
  },
};
