import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikFontPicker from "./FormikFontPicker";

const meta: Meta<typeof FormikFontPicker> = {
  title: "FormikFontPicker",
  component: FormikFontPicker,
  decorators: [
    withFormik({ initialValues: { font: "", preselected: "Roboto" } }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Fetches fonts from `/api/google/fonts`. In Storybook the API is unavailable so the dropdown will be empty — this story demonstrates the component shell and Formik wiring.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormikFontPicker>;

export const Default: Story = {
  args: {
    name: "font",
    label: "Font family",
  },
};

export const WithPreselection: Story = {
  args: {
    name: "preselected",
    label: "Font family",
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { font: "" },
      initialErrors: { font: "Please select a font" },
      initialTouched: { font: true },
    }),
  ],
  args: {
    name: "font",
    label: "Font family",
  },
};
