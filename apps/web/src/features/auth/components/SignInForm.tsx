'use client';

import { Field, Form, Formik } from 'formik';
import { useSignInFormSchema } from '../hooks/useSignInFormSchema';
import { Input } from '../../../shared/components/Input';
import { FieldErrorMessage } from '../../../shared/components/FieldErrorMessage';
import { Button } from '../../../shared/components/Button';
import { signInAction } from '../actions/signIn.action';
import { useTransition } from 'react';
import { CircularProgressIndicator } from '../../../shared/components/CircularProgressIndicator';

export const SignInForm = (): JSX.Element => {
  const formSchema = useSignInFormSchema();

  const [isExecuting, startTransition] = useTransition();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={formSchema}
      onSubmit={values => startTransition(() => signInAction(values))}
    >
      <Form noValidate>
        <Input
          name="email"
          type="email"
          className="mt-12"
          inputWrapClassName="!bg-primaryContainer"
          placeholder="Email address"
          size="lg"
          renderInputElement={defaultProps => <Field {...defaultProps} />}
        />
        <FieldErrorMessage name="email" />
        <Input
          name="password"
          type="password"
          className="mt-3"
          placeholder="Password"
          inputWrapClassName="!bg-primaryContainer"
          size="lg"
          renderInputElement={defaultProps => <Field {...defaultProps} />}
        />
        <FieldErrorMessage name="password" />

        {/* <div className="mt-2 justify-self-end">
          <InternalLink href="recoverPassword">
            <a className="text-secondary hover:text-secondary-dark transition-colors text-sm">
              Forgot password?
            </a>
          </InternalLink>
        </div> */}

        <div className="h-4" />

        <Button type="submit" className="w-full flex gap-2">
          Sign in
          {isExecuting ? <CircularProgressIndicator /> : null}
        </Button>
      </Form>
    </Formik>
  );
};
