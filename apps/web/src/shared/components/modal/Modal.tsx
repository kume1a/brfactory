import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';

type ModalProps = {
  readonly onClose: (value: boolean) => void;
  readonly children: React.ReactNode;
  readonly className?: string;
};

export const Modal = ({ onClose, children, className }: ModalProps): JSX.Element => {
  return (
    <Transition appear show={true} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={classNames(
                  'w-full transform overflow-hidden rounded-lg bg-white',
                  'p-5 text-left align-middle transition-all',
                  className
                )}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
