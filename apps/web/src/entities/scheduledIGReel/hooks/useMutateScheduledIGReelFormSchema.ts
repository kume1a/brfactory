import { useMemo } from 'react';
import * as Yup from 'yup';

export const useMutateScheduledIGReelFormSchema = (): Yup.AnyObjectSchema => {
  return useMemo(
    () =>
      Yup.object({
        startAt: Yup.date()
          .required('Field is required')
          .min(new Date(), 'Date must be in the future'),
        intervalInSeconds: Yup.number()
          .required('Field is required')
          .integer('Must be an integer')
          .min(1, 'Min is 1'),
        title: Yup.string()
          .required('Field is required')
          .min(1, 'Min length is 1')
          .max(255, 'Max length is 255'),
        caption: Yup.string()
          .required('Field is required')
          .min(1, 'Min length is 1')
          .max(65535, 'Max length is 65535'),
        igAccount: Yup.string().required('Field is required'),
      }),
    []
  );
};
