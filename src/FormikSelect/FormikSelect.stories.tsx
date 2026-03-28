import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikSelect from "./FormikSelect";

const FRUIT_OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragonfruit" },
];

const meta: Meta<typeof FormikSelect> = {
  title: "FormikSelect",
  component: FormikSelect,
  decorators: [
    withFormik({ initialValues: { fruit: "", preselected: "banana" } }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikSelect>;

export const Default: Story = {
  args: {
    name: "fruit",
    label: "Favourite fruit",
    options: FRUIT_OPTIONS,
  },
};

export const WithPreselection: Story = {
  args: {
    name: "preselected",
    label: "Favourite fruit",
    options: FRUIT_OPTIONS,
  },
};

export const Disabled: Story = {
  args: {
    name: "fruit",
    label: "Disabled select",
    options: FRUIT_OPTIONS,
    disabled: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { fruit: "" },
      initialErrors: { fruit: "Please select a fruit" },
      initialTouched: { fruit: true },
    }),
  ],
  args: {
    name: "fruit",
    label: "Favourite fruit",
    options: FRUIT_OPTIONS,
  },
};
