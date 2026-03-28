import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikRadioGroup from "./FormikRadioGroup";

const SIZE_OPTIONS = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

const meta: Meta<typeof FormikRadioGroup> = {
  title: "FormikRadioGroup",
  component: FormikRadioGroup,
  decorators: [withFormik({ initialValues: { size: "", preselected: "md" } })],
};

export default meta;
type Story = StoryObj<typeof FormikRadioGroup>;

export const Default: Story = {
  args: {
    name: "size",
    label: "Size",
    options: SIZE_OPTIONS,
  },
};

export const WithPreselection: Story = {
  args: {
    name: "preselected",
    label: "Size",
    options: SIZE_OPTIONS,
  },
};

export const Row: Story = {
  args: {
    name: "size",
    label: "Size (row layout)",
    options: SIZE_OPTIONS,
    row: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { size: "" },
      initialErrors: { size: "Please select a size" },
      initialTouched: { size: true },
    }),
  ],
  args: {
    name: "size",
    label: "Size",
    options: SIZE_OPTIONS,
  },
};
