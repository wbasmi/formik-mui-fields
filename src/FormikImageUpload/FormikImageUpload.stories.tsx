import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikImageUpload from "./FormikImageUpload";

const meta: Meta<typeof FormikImageUpload> = {
  title: "FormikImageUpload",
  component: FormikImageUpload,
  decorators: [withFormik({ initialValues: { avatar: "", banner: "" } })],
};

export default meta;
type Story = StoryObj<typeof FormikImageUpload>;

export const Default: Story = {
  args: {
    name: "avatar",
    label: "Upload avatar",
  },
};

export const TallDropzone: Story = {
  args: {
    name: "banner",
    label: "Upload banner",
    height: 200,
  },
};

export const WithCrop: Story = {
  args: {
    name: "avatar",
    label: "Upload & crop",
    cropEnabled: true,
  },
};

export const CropSingleAspect: Story = {
  args: {
    name: "avatar",
    label: "Upload & crop (1:1 only)",
    cropEnabled: true,
    cropOptions: ["1:1"],
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { avatar: "" },
      initialErrors: { avatar: "Image is required" },
      initialTouched: { avatar: true },
    }),
  ],
  args: {
    name: "avatar",
    label: "Upload avatar",
  },
};
