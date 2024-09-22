'use client';

import {
  Menu as HMenu,
  MenuItem as HMenuItem,
  MenuItems as HMenuItems,
  MenuButton as HMenuButton,
  Transition,
} from '@headlessui/react';
import { match, P } from 'ts-pattern';
import classNames from 'classnames';
import React, { MouseEventHandler, PropsWithChildren, useRef } from 'react';
import Link from 'next/link';

type Align = 'start' | 'end';
type Placement = 'top' | 'right' | 'bottom' | 'left';
type Anchor = `${Placement}` | `${Placement} ${Align}`;

type MenuOptionButton = {
  readonly onClick: MouseEventHandler<HTMLButtonElement>;
};

type MenuOptionLink = {
  readonly href: string;
};

export type MenuOption = {
  readonly icon?: JSX.Element;
  readonly label: string;
} & (MenuOptionButton | MenuOptionLink);

type MenuProps = PropsWithChildren<{
  readonly options: readonly MenuOption[];
  readonly anchor?: Anchor;
  readonly useHover?: boolean;
  readonly className?: string;
}>;

const MenuItem = ({ option }: { option: MenuOption }): JSX.Element => {
  return (
    <HMenuItem>
      {({ focus }) => {
        const className = classNames(
          'group flex w-full items-center rounded-md p-2 text-sm',
          focus && 'bg-bgPrimaryContainer'
        );

        return match(option)
          .with({ href: P.select() }, href => (
            <Link className={className} href={href}>
              <MenuItemChildren option={option} focus={focus} />
            </Link>
          ))
          .with({ onClick: P.select() }, onClick => (
            <button className={className} onClick={onClick}>
              <MenuItemChildren option={option} focus={focus} />
            </button>
          ))
          .exhaustive();
      }}
    </HMenuItem>
  );
};

const MenuItemChildren = ({
  option,
  focus,
}: {
  option: MenuOption;
  focus: boolean;
}): JSX.Element => {
  return (
    <>
      {option.icon ? (
        <span className={classNames('size-4 text-elSecondary', focus && 'text-white')}>
          {option.icon}
        </span>
      ) : null}

      <span className={classNames(option.icon && 'pl-2')}>{option.label}</span>
    </>
  );
};

export const Menu = ({
  children,
  options,
  anchor,
  useHover,
  className,
}: MenuProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openMenu = () => buttonRef?.current?.click();

  const closeMenu = () => {
    return dropdownRef?.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
    );
  };

  const onMouseEnter = (closed: boolean) => {
    if (closed) {
      openMenu();
    }
  };

  const onMouseLeave = (open: boolean) => {
    if (open) {
      closeMenu();
    }
  };

  return (
    <HMenu as="div" className={classNames('relative inline-block text-left', className)}>
      {({ open }) => (
        <div
          onClick={openMenu}
          onMouseEnter={useHover ? () => onMouseEnter(!open) : undefined}
          onMouseLeave={useHover ? () => onMouseLeave(open) : undefined}
        >
          <HMenuButton ref={buttonRef} as="div">
            {children}
          </HMenuButton>

          <Transition
            as={React.Fragment}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <HMenuItems
              ref={dropdownRef}
              anchor={anchor}
              className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              onMouseEnter={useHover ? () => onMouseEnter(!open) : undefined}
              onMouseLeave={useHover ? () => onMouseLeave(open) : undefined}
            >
              {options.map(option => (
                <MenuItem key={option.label} option={option} />
              ))}
            </HMenuItems>
          </Transition>
        </div>
      )}
    </HMenu>
  );
};
