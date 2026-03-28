import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Decorator } from "@storybook/react-vite";
import { Formik, Form } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormikTimePicker from "./FormikTimePicker";

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

const meta: Meta<typeof FormikTimePicker> = {
  title: "FormikTimePicker",
  component: FormikTimePicker,
  decorators: [
    withFormikAndLocalization({
      initialValues: { time: null, preselected: dayjs().hour(14).minute(30) },
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FormikTimePicker>;

export const Default: Story = {
  args: {
    name: "time",
    label: "Time",
  },
};

export const WithPreselection: Story = {
  args: {
    name: "preselected",
    label: "Time",
  },
};

export const AMPM: Story = {
  args: {
    name: "time",
    label: "Time (12h)",
    ampm: true,
  },
};

export const Error: Story = {
  decorators: [
    withFormikAndLocalization({
      initialValues: { time: null },
      initialErrors: { time: "Time is required" },
      initialTouched: { time: true },
    }),
  ],
  args: {
    name: "time",
    label: "Time",
  },
};
