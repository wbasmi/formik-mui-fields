import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikToggleButtonGroup from "./FormikToggleButtonGroup";

const ALIGNMENT_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const meta: Meta<typeof FormikToggleButtonGroup> = {
  title: "FormikToggleButtonGroup",
  component: FormikToggleButtonGroup,
  decorators: [withFormik({ initialValues: { alignment: "left" } })],
};

export default meta;
type Story = StoryObj<typeof FormikToggleButtonGroup>;

export const Default: Story = {
  args: {
    name: "alignment",
    label: "Text alignment",
    options: ALIGNMENT_OPTIONS,
    exclusive: true,
  },
};

export const Small: Story = {
  args: {
    name: "alignment",
    label: "Text alignment",
    options: ALIGNMENT_OPTIONS,
    exclusive: true,
    size: "small",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { alignment: "" },
      initialErrors: { alignment: "Please select an alignment" },
      initialTouched: { alignment: true },
    }),
  ],
  args: {
    name: "alignment",
    label: "Text alignment",
    options: ALIGNMENT_OPTIONS,
    exclusive: true,
  },
};
