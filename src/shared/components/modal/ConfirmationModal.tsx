import React from 'react';
import { Modal } from './Modal';
import { DialogTitle } from '@headlessui/react';

import IconClose from '@public/svg/close.svg';
import { Button } from '../Button';

type Props = {
  onClose: VoidFunction;
  title: string;
  content: string;
  positiveLabel?: string;
  negativeLabel?: string;
  onNegativeClick: VoidFunction;
  onPositiveClick: VoidFunction;
};

export const ConfirmationModal = ({
  onClose,
  title,
  content,
  positiveLabel,
  negativeLabel,
  onNegativeClick,
  onPositiveClick,
}: Props): JSX.Element => {
  return (
    <Modal onClose={onClose} className="max-w-sm">
      {title ? (
        <DialogTitle as="div" className="flex justify-between items-center">
          <span className="text-lg font-medium leading-6 ">{title}</span>

          <div
            className="w-6 h-6 cursor-pointer text-secondary-element hover:text-black transition-colors"
            onClick={() => onClose()}
          >
            <IconClose />
          </div>
        </DialogTitle>
      ) : null}

      <p className="text-sm mt-3">{content}</p>

      <div className="mt-4 flex gap-3">
        <Button
          type="button"
          className="outline-none bg-bgSecondaryContainer hover:bg-bgSecondaryContainerHover"
          onClick={onNegativeClick}
        >
          {negativeLabel ?? 'Cancel'}
        </Button>

        <Button type="button" className="outline-none" onClick={onPositiveClick}>
          {positiveLabel ?? 'Confirm'}
        </Button>
      </div>
    </Modal>
  );
};
