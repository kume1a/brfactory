import React from 'react';
import { ErrorMessage } from 'formik';

type Props = {
  name: string;
};

export const FieldErrorMessage = ({ name }: Props): JSX.Element => {
  return (
    <ErrorMessage name={name}>
      {message => <p className="text-error text-sm">{message}</p>}
    </ErrorMessage>
  );
};
