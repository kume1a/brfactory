import React, { FocusEventHandler, useEffect, useState } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/20/solid';

export type SelectOption<T> = {
  readonly label: string;
  readonly value: T;
};

type SelectProps<T> = {
  readonly options: SelectOption<T>[];
  readonly placeholder: string;
  readonly onChange: (option: T) => void;
  readonly onBlur?: FocusEventHandler<HTMLDivElement>;
  readonly prefix?: JSX.Element;
  readonly value?: T;
  readonly className?: string;
  readonly size?: 'md' | 'lg';
};

export const Select = <T,>({
  options,
  placeholder,
  onChange,
  onBlur,
  prefix,
  value,
  className,
  size = 'md',
}: SelectProps<T>): JSX.Element => {
  const [selected, setSelected] = useState<SelectOption<T> | null>(null);

  useEffect(() => {
    if (value === null || value === undefined) {
      return;
    }

    setSelected(options.find(e => e.value === value) ?? null);
  }, [value]);

  return (
    <Listbox
      value={selected}
      onChange={(option: SelectOption<T>) => {
        setSelected(option);
        onChange(option.value);
      }}
    >
      <div className="relative" onBlur={onBlur}>
        <ListboxButton
          className={classNames(
            'w-full cursor-pointer rounded-sm',
            'flex items-center px-2 leading-5',
            ' text-textPrimary ring-1 ring-inset ring-gray-300',
            {
              'text-sm py-1.5': size === 'md',
              'text-base py-2.5': size === 'lg',
            },
            className
          )}
        >
          {prefix}
          <div
            className={classNames(
              'text-left flex-1 truncate',
              !selected && 'text-textSecondary',
              prefix && 'ml-2'
            )}
          >
            {selected?.label ?? placeholder}
          </div>
          <ChevronDownIcon className="size-4" />
        </ListboxButton>
        <Transition
          as="div"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            className={classNames(
              'mt-2 w-[var(--button-width)] rounded p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'transition duration-100 ease-in',
              'bg-white ring-1 ring-gray-300'
            )}
            anchor="bottom"
          >
            {options.map((option, idx) => (
              <ListboxOption
                key={idx}
                value={option}
                className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-bgPrimaryContainer"
              >
                <CheckIcon className="hidden size-4 fill-textPrimary group-data-[selected]:block" />

                <span className="block truncate text-sm group-data-[selected]:font-medium">
                  {option.label}
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};
