import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikTextField from "./FormikTextField";

const meta: Meta<typeof FormikTextField> = {
  title: "FormikTextField",
  component: FormikTextField,
  decorators: [
    withFormik({ initialValues: { username: "", email: "user@example.com" } }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikTextField>;

export const Default: Story = {
  args: {
    name: "username",
    label: "Username",
  },
};

export const WithInitialValue: Story = {
  args: {
    name: "email",
    label: "Email",
  },
};

export const Multiline: Story = {
  args: {
    name: "username",
    label: "Bio",
    multiline: true,
    rows: 4,
  },
};

export const Password: Story = {
  args: {
    name: "username",
    label: "Password",
    type: "password",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { username: "" },
      initialErrors: { username: "Username is required" },
      initialTouched: { username: true },
    }),
  ],
  args: {
    name: "username",
    label: "Username",
  },
};
