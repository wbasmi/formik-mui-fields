import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikSearchField from "./FormikSearchField";

const meta: Meta<typeof FormikSearchField> = {
  title: "FormikSearchField",
  component: FormikSearchField,
  decorators: [withFormik({ initialValues: { query: "" } })],
};

export default meta;
type Story = StoryObj<typeof FormikSearchField>;

export const Default: Story = {
  args: {
    name: "query",
    label: "Search",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { query: "" },
      initialErrors: { query: "Search query is required" },
      initialTouched: { query: true },
    }),
  ],
  args: {
    name: "query",
    label: "Search",
  },
};

export const CustomDebounce: Story = {
  args: {
    name: "query",
    label: "Search (500ms debounce)",
    debounceMs: 500,
  },
};
