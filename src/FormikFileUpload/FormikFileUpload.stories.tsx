import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikFileUpload from "./FormikFileUpload";

const meta: Meta<typeof FormikFileUpload> = {
  title: "FormikFileUpload",
  component: FormikFileUpload,
  decorators: [withFormik({ initialValues: { document: null } })],
};

export default meta;
type Story = StoryObj<typeof FormikFileUpload>;

export const Default: Story = {
  args: {
    name: "document",
    label: "Upload document",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { document: null },
      initialErrors: { document: "File is required" },
      initialTouched: { document: true },
    }),
  ],
  args: {
    name: "document",
    label: "Upload document",
  },
};

export const AcceptPDF: Story = {
  args: {
    name: "document",
    label: "Upload PDF",
    accept: "application/pdf",
  },
};

export const MaxSize: Story = {
  args: {
    name: "document",
    label: "Upload file (max 1MB)",
    maxSize: 1_048_576,
  },
};

export const Multiple: Story = {
  decorators: [withFormik({ initialValues: { documents: [] } })],
  args: {
    name: "documents",
    label: "Upload multiple files",
    multiple: true,
  },
};
