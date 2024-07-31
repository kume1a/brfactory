import {
  DisclosurePanel as HDisclosurePanel,
  Disclosure,
  DisclosureButton,
  Transition,
} from '@headlessui/react';
import classNames from 'classnames';

import IconChevronDown from '@public/svg/chevron-down.svg';

type TriggerIconAlignment = 'start' | 'end';

type DisclosurePanelProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
  withAnimation?: boolean;
  triggerIconAlignment?: TriggerIconAlignment | null;
};

const TriggerIcon = ({ open }: { open: boolean }): JSX.Element => {
  return (
    <div className={classNames('h-6 w-6', open && 'rotate-180 transform')}>
      <IconChevronDown />
    </div>
  );
};

export const DisclosurePanel = ({
  trigger,
  children,
  defaultOpen,
  className,
  triggerClassName,
  withAnimation = true,
  panelClassName,
  triggerIconAlignment = 'end',
}: DisclosurePanelProps): JSX.Element => {
  return (
    <Disclosure defaultOpen={defaultOpen} as="div" className={className}>
      {({ open }) => (
        <>
          <DisclosureButton
            className={classNames(
              'flex w-full text-left items-center',
              triggerIconAlignment === 'end' && 'flex-row-reverse justify-between',
              triggerClassName
            )}
          >
            <TriggerIcon open={open} />
            {trigger}
          </DisclosureButton>
          {withAnimation ? (
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
            >
              <HDisclosurePanel className={classNames('p-2', panelClassName)} static>
                {children}
              </HDisclosurePanel>
            </Transition>
          ) : (
            open && (
              <HDisclosurePanel className={classNames('p-2', panelClassName)} static>
                {children}
              </HDisclosurePanel>
            )
          )}
        </>
      )}
    </Disclosure>
  );
};
