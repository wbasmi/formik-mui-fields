import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikSlider from "./FormikSlider";

const meta: Meta<typeof FormikSlider> = {
  title: "FormikSlider",
  component: FormikSlider,
  decorators: [withFormik({ initialValues: { volume: 50, brightness: 80 } })],
};

export default meta;
type Story = StoryObj<typeof FormikSlider>;

export const Default: Story = {
  args: {
    name: "volume",
    label: "Volume",
  },
};

export const WithInitialValue: Story = {
  args: {
    name: "brightness",
    label: "Brightness",
  },
};

export const CustomRange: Story = {
  args: {
    name: "volume",
    label: "Temperature",
    min: 0,
    max: 10,
    step: 1,
    marks: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { volume: 0 },
      initialErrors: { volume: "Volume must be at least 10" },
      initialTouched: { volume: true },
    }),
  ],
  args: {
    name: "volume",
    label: "Volume",
  },
};
