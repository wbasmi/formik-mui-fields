import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikPhoneField from "./FormikPhoneField";

const meta: Meta<typeof FormikPhoneField> = {
  title: "FormikPhoneField",
  component: FormikPhoneField,
  decorators: [
    withFormik({
      initialValues: {
        phone: "",
      },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikPhoneField>;

export const Default: Story = {
  args: {
    name: "phone",
    label: "Phone Number",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { phone: "" },
      initialErrors: { phone: "Phone number is required" },
      initialTouched: { phone: true },
    }),
  ],
  args: {
    name: "phone",
    label: "Phone Number",
  },
};

export const PreferredCountries: Story = {
  args: {
    name: "phone",
    label: "Phone Number",
    defaultCountry: "GB",
    preferredCountries: ["GB", "US", "CA"],
  },
};
