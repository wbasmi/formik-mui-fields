import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikRadioCards from "./FormikRadioCards";

const PLAN_OPTIONS = [
  { value: "free", label: "Free", description: "Basic features" },
  { value: "pro", label: "Pro", description: "Advanced features" },
  { value: "enterprise", label: "Enterprise", description: "Custom solutions" },
];

const meta: Meta<typeof FormikRadioCards> = {
  title: "FormikRadioCards",
  component: FormikRadioCards,
  decorators: [withFormik({ initialValues: { plan: "" } })],
};

export default meta;
type Story = StoryObj<typeof FormikRadioCards>;

export const Default: Story = {
  args: {
    name: "plan",
    label: "Select a Plan",
    options: PLAN_OPTIONS,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { plan: "" },
      initialErrors: { plan: "Please select a plan" },
      initialTouched: { plan: true },
    }),
  ],
  args: {
    name: "plan",
    label: "Select a Plan",
    options: PLAN_OPTIONS,
  },
};

export const WithDescriptions: Story = {
  args: {
    name: "plan",
    label: "Choose Your Plan",
    options: [
      {
        value: "starter",
        label: "Starter",
        description: "$9/mo — 1 user, 10GB storage",
      },
      {
        value: "team",
        label: "Team",
        description: "$29/mo — 5 users, 100GB storage",
      },
      {
        value: "business",
        label: "Business",
        description: "$99/mo — Unlimited users, 1TB storage",
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    name: "plan",
    label: "Shipping Method",
    options: [
      { value: "standard", label: "Standard", description: "5-7 days" },
      { value: "express", label: "Express", description: "2-3 days" },
      { value: "overnight", label: "Overnight", description: "Next day" },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    name: "plan",
    label: "Select a Plan",
    options: PLAN_OPTIONS,
    direction: "row",
  },
};
