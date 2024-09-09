'use client';

import { Field, Form, Formik } from 'formik';
import { Input } from '../../../shared/components/Input';
import { FieldErrorMessage } from '../../../shared/components/FieldErrorMessage';
import { Button } from '../../../shared/components/Button';
import { useMutateIgAccountFormSchema } from '../hooks/useMutateIgAccountFormSchema';
import { useAppContent, useAuth } from '@repo/pocketbase-react';
import { toast } from 'react-toastify';
import { CircularProgressIndicator } from '../../../shared/components/CircularProgressIndicator';
import { routes } from '../../../shared/constant/routes';
import { useRouter } from 'next/navigation';

export const MutateIgAccountForm = (): JSX.Element => {
  const router = useRouter();

  const { user } = useAuth();
  const { actions } = useAppContent(process.env.NEXT_PUBLIC_PB_IG_ACCOUNTS_COLLECTION ?? '');

  const formSchema = useMutateIgAccountFormSchema();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={formSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          await actions.create({ ...values, user: user.id });

          router.replace(routes.igAccounts);
        } catch (e) {
          toast.error('Error creating IG account' + JSON.stringify(e));
          console.error(e);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form noValidate className="max-w-lg flex flex-col gap-y-4 mt-12">
          <Input
            name="username"
            inputWrapClassName="!bg-primaryContainer"
            placeholder="Username"
            renderInputElement={defaultProps => <Field {...defaultProps} />}
          />
          <FieldErrorMessage name="username" />

          <Input
            name="email"
            type="email"
            inputWrapClassName="!bg-primaryContainer"
            placeholder="Email address"
            renderInputElement={defaultProps => <Field {...defaultProps} />}
          />
          <FieldErrorMessage name="email" />

          <Input
            name="password"
            placeholder="Password"
            inputWrapClassName="!bg-primaryContainer"
            renderInputElement={defaultProps => <Field {...defaultProps} />}
          />
          <FieldErrorMessage name="password" />

          <Button type="submit" className="w-full flex gap-2 mt-3">
            Submit
            {isSubmitting ? <CircularProgressIndicator /> : null}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
