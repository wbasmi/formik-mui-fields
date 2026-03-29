import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikChipInput from "./FormikChipInput";

const meta: Meta<typeof FormikChipInput> = {
  title: "FormikChipInput",
  component: FormikChipInput,
  decorators: [
    withFormik({
      initialValues: {
        tags: [],
        prefilled: ["react", "typescript", "formik"],
      },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikChipInput>;

export const Default: Story = {
  args: {
    name: "tags",
    label: "Tags",
    placeholder: "Type and press Enter",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { tags: [] },
      initialErrors: { tags: "At least one tag is required" },
      initialTouched: { tags: true },
    }),
  ],
  args: {
    name: "tags",
    label: "Tags",
    placeholder: "Type and press Enter",
  },
};

export const WithSuggestions: Story = {
  args: {
    name: "tags",
    label: "Skills",
    placeholder: "Select or type a skill",
    options: ["React", "TypeScript", "JavaScript", "Node.js", "Python", "Go"],
  },
};

export const PrefilledValues: Story = {
  args: {
    name: "prefilled",
    label: "Technologies",
    placeholder: "Add more...",
  },
};
