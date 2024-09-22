'use client';

import cn from 'classnames';
import Link, { LinkProps as NextLinkProps } from 'next/link';
import { Ref } from 'react';
import { MouseEventHandler, FocusEventHandler, ReactNode, forwardRef } from 'react';

type CommonProps<T> = {
  disabled?: boolean;
  variant?: 'secondary' | 'transparent';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  withAnimatedBorders?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<T>;
  onFocus?: FocusEventHandler<Element>;
  onBlur?: FocusEventHandler<Element>;
};

type LinkProps = CommonProps<HTMLAnchorElement> &
  Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> &
  Pick<NextLinkProps, 'href'>;

type ButtonProps = CommonProps<HTMLButtonElement> & React.ComponentPropsWithoutRef<'button'>;

function isLink(props: LinkProps | ButtonProps): props is LinkProps {
  return 'href' in props && Boolean(props.href);
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkProps>((props, ref): JSX.Element => {
  return (
    <Link
      {...props}
      ref={ref}
      onClick={e => {
        if (props.disabled) {
          e.preventDefault();
        }

        props.onClick?.(e);
      }}
    />
  );
});

LinkButton.displayName = LinkButton.name;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkProps | ButtonProps>(
  (
    { variant = 'secondary', size = 'm', className, withAnimatedBorders, ...props },
    ref
  ): JSX.Element => {
    const commonProps: LinkProps | ButtonProps = {
      ...props,
      className: cn(
        {
          'bg-secondary shadow-buttonSecondaryBorder': variant === 'secondary',
          'hover:bg-secondaryHover transition-colors text-textPrimary':
            variant === 'secondary' && !props.disabled,
          'text-elSecondary': variant === 'secondary' && props.disabled,
          'bg-transparent hover:bg-transparent': variant === 'transparent',
        },
        {
          'py-1 px-2 gap-1 text-xs leading-4': size === 'xs',
          'py-1 px-3 gap-2 text-sm leading-5': size === 's',
          'py-1.5 px-3 gap-2 text-sm leading-5': size === 'm',
          'py-1.5 px-3 gap-2 text-base leading-6': size === 'l',
          'py-2 px-3 gap-2 text-base leading-6': size === 'xl',
        },
        'inline-flex items-center justify-center',
        'rounded-lg',
        'font-medium',
        'select-none',
        'outline-none',
        'focus-visible:ring-2',
        props.disabled && 'cursor-default',
        props.disabled ? 'ring-outlineDisabled' : 'ring-outlineActive',
        withAnimatedBorders && 'glowing-orders !rounded-[26px]',
        className
      ),
    };

    if (isLink(commonProps)) {
      return <LinkButton {...commonProps} ref={ref as Ref<HTMLAnchorElement>} />;
    }

    return <button {...commonProps} ref={ref as Ref<HTMLButtonElement>} />;
  }
);

Button.displayName = Button.name;
