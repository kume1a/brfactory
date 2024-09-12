'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Input } from '../../../shared/components/Input';
import { FieldErrorMessage } from '../../../shared/components/FieldErrorMessage';
import { Button } from '../../../shared/components/Button';
import { useMutateIGAccountFormSchema } from '../hooks/useMutateIGAccountFormSchema';
import { CircularProgressIndicator } from '../../../shared/components/CircularProgressIndicator';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutateIGAccount } from '../hooks/useMutateIGAccount';
import { useEffect, useState } from 'react';
import { useIGAccountRepository } from '../hooks/useIGAccountRepository';
import { routes } from '../../../shared/constant/routes';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export const MutateIGAccountForm = (): JSX.Element => {
  const query = useSearchParams();
  const router = useRouter();

  const formSchema = useMutateIGAccountFormSchema();
  const { createIGAccount, updateIGAccount } = useMutateIGAccount();
  const { getById } = useIGAccountRepository();

  const [initialFormValues, setInitialFormValues] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const igAccountId = query.get('igAccountId');

    if (!igAccountId) {
      return;
    }

    getById(igAccountId).then(igAccount => {
      if (!igAccount) {
        return;
      }

      setInitialFormValues({
        username: igAccount.username,
        email: igAccount.email,
        password: igAccount.password,
      });
    });
  }, [query]);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ): Promise<void> => {
    const igAccountId = query.get('igAccountId');

    setSubmitting(true);

    const success = igAccountId
      ? await updateIGAccount(igAccountId, values)
      : await createIGAccount(values);

    setSubmitting(false);

    if (success) {
      router.replace(routes.igAccounts);
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      enableReinitialize
      validationSchema={formSchema}
      onSubmit={onSubmit}
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
