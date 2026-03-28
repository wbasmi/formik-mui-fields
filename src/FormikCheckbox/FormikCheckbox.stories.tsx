import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikCheckbox from "./FormikCheckbox";

const meta: Meta<typeof FormikCheckbox> = {
  title: "FormikCheckbox",
  component: FormikCheckbox,
  decorators: [
    withFormik({ initialValues: { agree: false, newsletter: true } }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikCheckbox>;

export const Default: Story = {
  args: {
    name: "agree",
    label: "I agree to the terms",
  },
};

export const Checked: Story = {
  args: {
    name: "newsletter",
    label: "Subscribe to newsletter",
  },
};

export const Disabled: Story = {
  args: {
    name: "agree",
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { agree: false },
      initialErrors: { agree: "You must accept the terms" },
      initialTouched: { agree: true },
    }),
  ],
  args: {
    name: "agree",
    label: "I agree to the terms",
  },
};
