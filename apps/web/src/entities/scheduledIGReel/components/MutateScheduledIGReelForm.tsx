'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Input } from '../../../shared/components/Input';
import { FieldErrorMessage } from '../../../shared/components/FieldErrorMessage';
import { Button } from '../../../shared/components/Button';
import { CircularProgressIndicator } from '../../../shared/components/CircularProgressIndicator';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { routes } from '../../../shared/constant/routes';
import { useMutateScheduledIGReel } from '../hooks/useMutateScheduledIGReel';
import { useMutateScheduledIGReelFormSchema } from '../hooks/useMutateScheduledIGReelFormSchema';
import { useScheduledIGReelRepository } from '../hooks/useScheduledIGReelRepository';
import { FileUploader } from '../../../shared/components/file/FileUploader';
import { useIGAccounts } from '../../igAccount/hooks/useIGAccounts';
import { Select } from '../../../shared/components/Select';

type FormValues = {
  startAt: string;
  intervalInSeconds: number;
  title: string;
  caption: string;
  igAccount: string;
  thumbnail: File | null;
  video: File | null;
};

export const MutateScheduledIGReelForm = (): JSX.Element => {
  const query = useSearchParams();
  const router = useRouter();

  const formSchema = useMutateScheduledIGReelFormSchema();
  const { createScheduledIGReel, updateScheduledIGReel } = useMutateScheduledIGReel();
  const { getById } = useScheduledIGReelRepository();

  const { data: igAccounts } = useIGAccounts();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [initialFormValues, setInitialFormValues] = useState<FormValues>({
    startAt: '',
    intervalInSeconds: 0,
    title: '',
    caption: '',
    igAccount: '',
    thumbnail: null,
    video: null,
  });

  const igAccountSelectOptions = useMemo(
    () =>
      igAccounts.map(e => ({
        label: e.username,
        value: e.id,
      })),
    [igAccounts]
  );

  useEffect(() => {
    const scheduledIGReelId = query.get('scheduledIGReelId');

    if (!scheduledIGReelId) {
      return;
    }

    getById(scheduledIGReelId).then(entity => {
      if (!entity) {
        return;
      }

      setInitialFormValues({
        startAt: entity.startAt,
        intervalInSeconds: entity.intervalInSeconds,
        title: entity.title,
        caption: entity.caption,
        igAccount: entity.igAccount,
        video: null,
        thumbnail: null,
      });
    });
  }, [query]);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ): Promise<void> => {
    console.log('onSubmit called, values:', values);
    if (!thumbnailFile || !videoFile) {
      console.warn('Thumbnail and video are required');
      return;
    }

    const scheduledIGReelId = query.get('scheduledIGReelId');

    const input = {
      ...values,
      thumbnail: thumbnailFile,
      video: videoFile,
    };

    setSubmitting(true);

    if (scheduledIGReelId) {
      await updateScheduledIGReel(scheduledIGReelId, input);
    } else {
      await createScheduledIGReel(input);
    }

    setSubmitting(false);

    router.replace(routes.scheduledIGReels);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      enableReinitialize
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, setFieldTouched }) => (
        <Form noValidate className="max-w-lg flex flex-col mt-12">
          <Input
            name="startAt"
            inputWrapClassName="!bg-primaryContainer"
            placeholder="Start at"
            renderInputElement={defaultProps => <Field {...defaultProps} />}
          />
          <FieldErrorMessage name="startAt" />

          <Input
            name="intervalInSeconds"
            type="number"
            inputWrapClassName="!bg-primaryContainer mt-4"
            placeholder="Interval in seconds"
            renderInputElement={defaultProps => <Field {...defaultProps} />}
          />
          <FieldErrorMessage name="intervalInSeconds" />

          <Input
            name="title"
            placeholder="Title"
            inputWrapClassName="!bg-primaryContainer mt-4"
            renderInputElement={defaultProps => <Field {...defaultProps} />}
          />
          <FieldErrorMessage name="title" />

          <Input
            name="caption"
            placeholder="Caption"
            inputWrapClassName="!bg-primaryContainer mt-4"
            renderInputElement={defaultProps => <Field {...defaultProps} />}
          />
          <FieldErrorMessage name="caption" />

          <Select
            className="mt-4"
            options={igAccountSelectOptions}
            placeholder="Select IG Account"
            onChange={option => setFieldValue('igAccount', option)}
            onBlur={() => setFieldTouched('igAccount')}
          />
          <FieldErrorMessage name="igAccount" />

          <FileUploader
            className="mt-4"
            label="Thumbnail"
            handleChange={file => setThumbnailFile((Array.isArray(file) ? file[0] : file) ?? null)}
            name="thumbnail"
            types={['JPEG', 'JPG', 'PNG']}
          />

          <FileUploader
            className="mt-4"
            label="Video"
            handleChange={file => setVideoFile((Array.isArray(file) ? file[0] : file) ?? null)}
            name="video"
            types={['MP4']}
          />

          <Button type="submit" className="w-full flex gap-2 mt-6">
            Submit
            {isSubmitting ? <CircularProgressIndicator /> : null}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
