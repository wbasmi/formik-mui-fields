import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Decorator } from "@storybook/react-vite";
import { Formik, Form } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormikDatePicker from "./FormikDatePicker";

type FormikDecoratorOptions = {
  initialValues?: Record<string, unknown>;
  initialErrors?: Record<string, string>;
  initialTouched?: Record<string, boolean>;
};

const withFormikAndLocalization = ({
  initialValues = {},
  initialErrors = {},
  initialTouched = {},
}: FormikDecoratorOptions): Decorator => {
  const decorator: Decorator = (Story) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={initialValues}
        initialErrors={initialErrors}
        initialTouched={initialTouched}
        onSubmit={() => {}}
      >
        <Form>
          <Story />
        </Form>
      </Formik>
    </LocalizationProvider>
  );
  return decorator;
};

const meta: Meta<typeof FormikDatePicker> = {
  title: "FormikDatePicker",
  component: FormikDatePicker,
  decorators: [
    withFormikAndLocalization({
      initialValues: { date: null, preselected: dayjs("2026-03-28") },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikDatePicker>;

export const Default: Story = {
  args: {
    name: "date",
    label: "Date",
  },
};

export const WithPreselection: Story = {
  args: {
    name: "preselected",
    label: "Date",
  },
};

export const DisableFuture: Story = {
  args: {
    name: "date",
    label: "Birth date",
    disableFuture: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormikAndLocalization({
      initialValues: { date: null },
      initialErrors: { date: "Date is required" },
      initialTouched: { date: true },
    }),
  ],
  args: {
    name: "date",
    label: "Date",
  },
};
