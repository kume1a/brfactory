import { acceptedExt, checkType, getFileSizeMB } from './utils';
import React, { useEffect, useRef, useState } from 'react';

import useDragging from './useDragging';
import classNames from 'classnames';
import { DocumentTextIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { match, P } from 'ts-pattern';

type Props = {
  name?: string;
  hoverTitle?: string;
  types?: Array<string>;
  className?: string;
  children?: JSX.Element;
  maxSize?: number;
  minSize?: number;
  fileOrFiles?: Array<File> | File | null;
  disabled?: boolean;
  label?: string | undefined;
  multiple?: boolean;
  required?: boolean;
  onSizeError?: (arg0: string) => void;
  onTypeError?: (arg0: string) => void;
  onDrop?: (arg0: File | Array<File>) => void;
  onSelect?: (arg0: File | Array<File>) => void;
  handleChange?: (arg0: File | Array<File> | File) => void;
  onDraggingStateChange?: (dragging: boolean) => void;
  dropMessageStyle?: React.CSSProperties | undefined;
};

type DescriptionProps = {
  currFile: Array<File> | File | null;
  uploaded: boolean;
  typeError: boolean;
  disabled: boolean;
};

const Description = ({
  currFile,
  uploaded,
  typeError,
  disabled,
}: DescriptionProps): JSX.Element => {
  return (
    <span className="text-sm text-gray-600">
      {match({ typeError, disabled, uploaded, currFile })
        .with({ typeError: true, disabled: false }, () => <>File type/size error</>)
        .with({ typeError: false, disabled: true }, () => <>Upload disabled</>)
        .with({ currFile: P._, uploaded: false }, () => (
          <>
            <span className="text-textSecondary">Drag and drop or </span>
            <span className="font-medium text-textPrimary">choose a file</span>
          </>
        ))
        .otherwise(() => (
          <>Uploaded Successfully!</>
        ))}
    </span>
  );
};

export const FileUploader = (props: Props): JSX.Element => {
  const {
    name,
    hoverTitle,
    types,
    handleChange,
    className,
    children,
    maxSize,
    minSize,
    fileOrFiles,
    onSizeError,
    onTypeError,
    onSelect,
    onDrop,
    disabled,
    label,
    multiple,
    required,
    onDraggingStateChange,
    dropMessageStyle,
  } = props;
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState(false);
  const [currFiles, setFile] = useState<Array<File> | File | null>(null);
  const [error, setError] = useState(false);

  const validateFile = (file: File) => {
    if (types && !checkType(file, types)) {
      setError(true);
      if (onTypeError) onTypeError('File type is not supported');
      return false;
    }
    if (maxSize && getFileSizeMB(file.size) > maxSize) {
      setError(true);
      if (onSizeError) onSizeError('File size is too big');
      return false;
    }
    if (minSize && getFileSizeMB(file.size) < minSize) {
      setError(true);
      if (onSizeError) onSizeError('File size is too small');
      return false;
    }
    return true;
  };

  const handleChanges = (files: File | Array<File>): boolean => {
    let checkError = false;
    if (files) {
      if (files instanceof File) {
        checkError = !validateFile(files);
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          checkError = !file || !validateFile(file) || checkError;
        }
      }
      if (checkError) return false;
      if (handleChange) handleChange(files);
      setFile(files);

      setUploaded(true);
      setError(false);
      return true;
    }
    return false;
  };

  const blockEvent = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
  };
  const handleClick = (ev: any) => {
    ev.stopPropagation();
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  const handleInputChange = (ev: any) => {
    const allFiles = ev.target.files;
    const files = multiple ? allFiles : allFiles[0];
    const success = handleChanges(files);
    if (onSelect && success) onSelect(files);
  };
  const dragging = useDragging({
    labelRef,
    inputRef,
    multiple,
    handleChanges,
    onDrop,
  });

  useEffect(() => {
    onDraggingStateChange?.(dragging);
  }, [dragging]);

  useEffect(() => {
    if (fileOrFiles) {
      setUploaded(true);
      setFile(fileOrFiles);
    } else {
      if (inputRef.current) inputRef.current.value = '';
      setUploaded(false);
      setFile(null);
    }
  }, [fileOrFiles]);

  return (
    <div className="flex flex-col gap-1">
      {label ? <span className="text-sm text-textSecondary pb-1">{label}</span> : null}

      <label
        className={classNames(
          'relative flex items-center justify-center border-1.5 border-dashed px-5 py-10 rounded-md',
          disabled
            ? 'border-gray-600 cursor-no-drop bg-gray-300'
            : 'border-secondary cursor-pointer bg-secondaryLight',
          className
        )}
        ref={labelRef}
        htmlFor={name}
        onClick={blockEvent}
      >
        <input
          onClick={handleClick}
          onChange={handleInputChange}
          accept={acceptedExt(types)}
          ref={inputRef}
          type="file"
          name={name}
          disabled={disabled}
          multiple={multiple}
          required={required}
          className="hidden"
        />

        {dragging ? (
          <div
            className="absolute top-0 right-0 left-0 bottom-0 border-2 border-dashed border-gray-600 rounded-md bg-gray-400 opacity-50"
            style={dropMessageStyle}
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {hoverTitle || 'Drop Here'}
            </span>
          </div>
        ) : null}

        {children ? null : (
          <>
            <DocumentTextIcon className="w-6 h-6 mr-2" />

            <Description
              currFile={currFiles}
              uploaded={uploaded}
              typeError={error}
              disabled={disabled ?? false}
            />
          </>
        )}

        {children}
      </label>

      <UnderCaption types={types} minSize={minSize} maxSize={maxSize} />
    </div>
  );
};

type UnderCaptionProps = {
  types?: Array<string>;
  minSize?: number;
  maxSize?: number;
};

const UnderCaption = ({ types, minSize, maxSize }: UnderCaptionProps): null | JSX.Element => {
  if (!types) {
    return null;
  }

  let size = '';
  if (maxSize) size += `size >= ${maxSize}`;
  if (minSize) size += `size <= ${minSize}`;

  return (
    <div className="flex gap-1.5 text-sm items-center">
      <InformationCircleIcon className="w-6 h-6" />
      <span className="file-types">
        Only {types?.join('/')} files are allowed. {size}
      </span>
    </div>
  );
};
