import { UserIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

type Props = {
  containerClassName?: string;
  iconContainerClassName?: string;
};

export const BlankProfileImage = ({
  containerClassName,
  iconContainerClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={classNames(
        'w-24 h-24 flex justify-center items-center bg-bgPrimaryContainer rounded-lg',
        containerClassName
      )}
    >
      <div
        className={classNames(
          'h-8 w-8 rounded-full bg-bgTertiaryContainer flex justify-center items-center',
          iconContainerClassName
        )}
      >
        <UserIcon className="size-5" />
      </div>
    </div>
  );
};
