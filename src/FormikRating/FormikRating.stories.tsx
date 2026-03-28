import type { Meta, StoryObj } from "@storybook/react-vite";
import { withFormik } from "../test-utils/FormikDecorator";
import FormikRating from "./FormikRating";

const meta: Meta<typeof FormikRating> = {
  title: "FormikRating",
  component: FormikRating,
  decorators: [withFormik({ initialValues: { rating: 3, score: 0 } })],
};

export default meta;
type Story = StoryObj<typeof FormikRating>;

export const Default: Story = {
  args: {
    name: "score",
    label: "Rating",
  },
};

export const WithValue: Story = {
  args: {
    name: "rating",
    label: "Your rating",
  },
};

export const TenStars: Story = {
  args: {
    name: "score",
    label: "Score (out of 10)",
    max: 10,
  },
};

export const ReadOnly: Story = {
  args: {
    name: "rating",
    label: "Read-only rating",
    readOnly: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormik({
      initialValues: { score: 0 },
      initialErrors: { score: "Please provide a rating" },
      initialTouched: { score: true },
    }),
  ],
  args: {
    name: "score",
    label: "Rating",
  },
};
