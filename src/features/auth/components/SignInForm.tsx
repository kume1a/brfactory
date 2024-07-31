import { Field, Form, Formik } from 'formik';
import { useSignInFormSchema } from '../hooks/useSignInFormSchema';
import { Input } from '../../../shared/components/Input';
import { FieldErrorMessage } from '../../../shared/components/FieldErrorMessage';
import { InternalLink } from '../../../shared/components/Link';
import { Button } from '../../../shared/components/Button';

export const SignInForm = (): JSX.Element => {
  const formSchema = useSignInFormSchema();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={formSchema}
      onSubmit={values => {}}
    >
      <Form noValidate>
        <Input
          name="email"
          type="email"
          className="mt-12"
          inputWrapClassName="!bg-primaryContainer"
          placeholder="Email address"
          size="lg"
          renderInputElement={() => <Field />}
        />
        <FieldErrorMessage name="email" />

        <Input
          name="password"
          type="password"
          className="mt-3"
          placeholder="Password"
          inputWrapClassName="!bg-primaryContainer"
          size="lg"
          renderInputElement={() => <Field />}
        />
        <FieldErrorMessage name="password" />

        <div className="mt-2 justify-self-end">
          <InternalLink href="recoverPassword">
            <a className="text-secondary hover:text-secondary-dark transition-colors text-sm">
              Forgot password?
            </a>
          </InternalLink>
        </div>

        <Button
          type="submit"
          className="mt-8"
          // isLoading={isLoading}
        >
          Sign in
        </Button>
      </Form>
    </Formik>
  );
};
