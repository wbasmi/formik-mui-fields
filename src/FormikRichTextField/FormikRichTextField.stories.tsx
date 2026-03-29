import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikRichTextField from "./FormikRichTextField";

const meta: Meta<typeof FormikRichTextField> = {
  title: "FormikRichTextField",
  component: FormikRichTextField,
  decorators: [
    withFormik({
      initialValues: {
        content: "",
      },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikRichTextField>;

export const Default: Story = {
  args: {
    name: "content",
    label: "Content",
    placeholder: "Start typing...",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { content: "" },
      initialErrors: { content: "Content is required" },
      initialTouched: { content: true },
    }),
  ],
  args: {
    name: "content",
    label: "Content",
    placeholder: "Start typing...",
  },
};

export const CustomToolbar: Story = {
  args: {
    name: "content",
    label: "Simple Editor",
    placeholder: "Bold and italic only...",
    toolbar: ["bold", "italic"],
  },
};
