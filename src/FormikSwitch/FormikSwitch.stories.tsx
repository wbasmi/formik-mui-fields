import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikSwitch from "./FormikSwitch";

const meta: Meta<typeof FormikSwitch> = {
  title: "FormikSwitch",
  component: FormikSwitch,
  decorators: [
    withFormik({
      initialValues: { darkMode: false, notifications: true },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikSwitch>;

export const Default: Story = {
  args: {
    name: "darkMode",
    label: "Dark mode",
  },
};

export const On: Story = {
  args: {
    name: "notifications",
    label: "Enable notifications",
  },
};

export const Disabled: Story = {
  args: {
    name: "darkMode",
    label: "Disabled switch",
    disabled: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { darkMode: false },
      initialErrors: { darkMode: "This setting is required" },
      initialTouched: { darkMode: true },
    }),
  ],
  args: {
    name: "darkMode",
    label: "Dark mode",
  },
};
