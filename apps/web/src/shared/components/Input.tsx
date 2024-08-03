'use client';

import classnames from 'classnames';
import React, { ChangeEventHandler, forwardRef, ReactNode, Ref, useState } from 'react';

type Props = {
  readonly size?: 'md' | 'lg';
  readonly label?: ReactNode;
  readonly hint?: ReactNode;
  readonly isDisabled?: boolean;
  readonly isRequired?: boolean;
  readonly isError?: boolean;
  readonly className?: string;
  readonly inputWrapClassName?: string;
  readonly innerRef?: Ref<HTMLInputElement>;
  readonly onClick?: React.HTMLProps<HTMLLabelElement>['onClick'];
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly renderInputElement?: (
    defaultProps: React.HTMLProps<HTMLInputElement>
  ) => JSX.Element | null;
} & Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'onClick' | 'onChange'>;

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputWrapClassName,
      size = 'md',
      isError,
      isDisabled: isDisabledProp,
      disabled,
      isRequired,
      label: labelProp,
      hint: hintProp,
      onFocus,
      onBlur,
      onClick,
      renderInputElement = props => <input {...props} />,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const isDisabled = disabled || isDisabledProp;

    const label =
      typeof labelProp === 'string' ? (
        <div className="mb-2">
          {labelProp}
          {isRequired && <span className="text-error"> *</span>}
        </div>
      ) : (
        labelProp
      );

    const hint =
      typeof hintProp === 'string' ? (
        <div className={classnames('mt-1 text-xs', isError && 'text-error')}>{hintProp}</div>
      ) : (
        hintProp
      );

    const inputProps: React.HTMLProps<HTMLInputElement> = {
      ...props,
      disabled: isDisabled,
      className: classnames('w-full border-none bg-transparent !ring-0', 'px-2 leading-5', {
        'text-sm py-1.5': size === 'md',
        'text-sm py-2.5': size === 'lg',
      }),
      onFocus: e => {
        setIsFocused(true);

        return onFocus?.(e);
      },
      onBlur: e => {
        setIsFocused(false);

        return onBlur?.(e);
      },
      ref,
    };

    return (
      <label className={classnames('block leading-5 text-sm', className)} onClick={onClick}>
        {label}
        <div
          className={classnames(
            'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
            'flex items-center leading-5 w-full',
            'rounded overflow-hidden',
            isFocused && 'shadow-fieldBorderFocused',
            isError && '!shadow-fieldBorderError',
            isDisabled ? 'bg-secondary-surface-light text-secondary' : 'bg-white text-black',
            inputWrapClassName
          )}
        >
          {renderInputElement(inputProps)}
        </div>
        {hint}
      </label>
    );
  }
);

Input.displayName = Input.name;
