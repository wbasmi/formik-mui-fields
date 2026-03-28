import type { Decorator } from "@storybook/react-vite";
import { Formik, Form } from "formik";

type FormikDecoratorOptions = {
  initialValues?: Record<string, unknown>;
  initialErrors?: Record<string, string>;
  initialTouched?: Record<string, boolean>;
};

export const withFormik = ({
  initialValues = {},
  initialErrors = {},
  initialTouched = {},
}: FormikDecoratorOptions): Decorator => {
  const decorator: Decorator = (Story) => (
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
  );
  decorator.displayName = "withFormik";
  return decorator;
};
