import { useMemo } from 'react';
import * as Yup from 'yup';

export const useMutateIgAccountFormSchema = (): Yup.AnyObjectSchema => {
  return useMemo(
    () =>
      Yup.object({
        username: Yup.string().required('Field is required').max(255, 'Max length is 255'),
        email: Yup.string()
          .required('Field is required')
          .email('Invalid email')
          .max(255, 'Max length is 255'),
        password: Yup.string()
          .min(5, 'Min length is 5')
          .max(255, 'Max length is 255')
          .required('Field is required'),
      }),
    []
  );
};
