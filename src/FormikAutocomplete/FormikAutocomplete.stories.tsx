import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikAutocomplete from "./FormikAutocomplete";

type Country = { code: string; name: string };

const COUNTRIES: Country[] = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "JP", name: "Japan" },
  { code: "MA", name: "Morocco" },
];

const meta: Meta<typeof FormikAutocomplete<Country>> = {
  title: "FormikAutocomplete",
  component: FormikAutocomplete,
  decorators: [
    withFormik({
      initialValues: {
        country: null,
        preselected: { code: "FR", name: "France" },
      },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikAutocomplete<Country>>;

export const Default: Story = {
  args: {
    name: "country",
    label: "Country",
    options: COUNTRIES,
    getOptionLabel: (option: Country) => option.name,
    isOptionEqualToValue: (a: Country, b: Country) => a.code === b.code,
  },
};

export const WithPreselection: Story = {
  args: {
    name: "preselected",
    label: "Country",
    options: COUNTRIES,
    getOptionLabel: (option: Country) => option.name,
    isOptionEqualToValue: (a: Country, b: Country) => a.code === b.code,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { country: null },
      initialErrors: { country: "Please select a country" },
      initialTouched: { country: true },
    }),
  ],
  args: {
    name: "country",
    label: "Country",
    options: COUNTRIES,
    getOptionLabel: (option: Country) => option.name,
    isOptionEqualToValue: (a: Country, b: Country) => a.code === b.code,
  },
};
