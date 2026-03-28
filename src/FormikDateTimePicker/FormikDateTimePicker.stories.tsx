import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Decorator } from "@storybook/react-vite";
import { Formik, Form } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormikDateTimePicker from "./FormikDateTimePicker";

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

const meta: Meta<typeof FormikDateTimePicker> = {
  title: "FormikDateTimePicker",
  component: FormikDateTimePicker,
  decorators: [
    withFormikAndLocalization({
      initialValues: {
        datetime: null,
        preselected: dayjs("2026-03-28T14:30"),
      },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikDateTimePicker>;

export const Default: Story = {
  args: {
    name: "datetime",
    label: "Date & Time",
  },
};

export const WithPreselection: Story = {
  args: {
    name: "preselected",
    label: "Date & Time",
  },
};

export const DisableFuture: Story = {
  args: {
    name: "datetime",
    label: "Date & Time",
    disableFuture: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormikAndLocalization({
      initialValues: { datetime: null },
      initialErrors: { datetime: "Date and time is required" },
      initialTouched: { datetime: true },
    }),
  ],
  args: {
    name: "datetime",
    label: "Date & Time",
  },
};
