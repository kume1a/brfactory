import classNames from 'classnames';
import { LinkProps as NextLinkProps, default as NextLink } from 'next/link';
import { PropsWithChildren } from 'react';

import IconUrlArrow from '@public/svg/url-arrow.svg';

type LinkSize = 'xs' | 'sm' | 'base';

type CommonLinkProps = PropsWithChildren<{
  className?: string;
  classNameOverride?: string;
  includeArrowIcon?: boolean;
  size?: LinkSize;
}>;

const defaultProps: Pick<CommonLinkProps, 'includeArrowIcon' | 'size'> = {
  includeArrowIcon: false,
  size: 'sm',
};

type InternalLinkProps = CommonLinkProps & NextLinkProps;

type ExternalLinkProps = CommonLinkProps &
  React.ComponentPropsWithRef<'a'> &
  Required<Pick<React.ComponentPropsWithRef<'a'>, 'href'>>;

const resolveLinkClassNames = ({
  includeArrowIcon,
  size,
  className,
  classNameOverride,
}: Pick<CommonLinkProps, 'includeArrowIcon' | 'size' | 'className' | 'classNameOverride'>):
  | string
  | undefined => {
  if (classNameOverride) {
    return classNameOverride;
  }

  return classNames(
    'cursor-pointer text-link hover:text-linkHover transition-colors hover:transition-none',
    includeArrowIcon && 'flex items-center',
    {
      'text-sm': size === 'sm',
      'text-xs': size === 'xs',
      'text-base': size === 'base',
    },
    className
  );
};

const LinkChildren = ({
  children,
  includeArrowIcon,
  size,
}: Pick<CommonLinkProps, 'includeArrowIcon' | 'children' | 'size'>): JSX.Element => {
  return (
    <>
      {children}
      {includeArrowIcon ? (
        <div
          className={classNames({
            'w-4 h-4': size === 'xs',
            'w-5 h-5': size === 'sm',
            'w-6 h-6': size === 'base',
          })}
        >
          <IconUrlArrow />
        </div>
      ) : null}
    </>
  );
};

export const InternalLink = ({
  children,
  className,
  includeArrowIcon = defaultProps.includeArrowIcon,
  size = defaultProps.size,
  ...restProps
}: InternalLinkProps): JSX.Element => {
  const resolvedClassName = resolveLinkClassNames({ className, includeArrowIcon, size });

  return (
    <NextLink className={resolvedClassName} {...restProps}>
      <LinkChildren includeArrowIcon={includeArrowIcon} size={size}>
        {children}
      </LinkChildren>
    </NextLink>
  );
};

export const ExternalLink = ({
  children,
  className,
  classNameOverride,
  includeArrowIcon = defaultProps.includeArrowIcon,
  size = defaultProps.size,
  ...restProps
}: ExternalLinkProps): JSX.Element => {
  const resolvedClassName = resolveLinkClassNames({
    className,
    classNameOverride,
    includeArrowIcon,
    size,
  });

  return (
    <a
      className={resolvedClassName}
      target="_blank"
      rel="nofollow noopener noreferrer"
      {...restProps}
    >
      <LinkChildren includeArrowIcon={includeArrowIcon} size={size}>
        {children}
      </LinkChildren>
    </a>
  );
};
