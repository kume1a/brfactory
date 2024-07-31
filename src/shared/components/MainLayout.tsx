import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

type Props = PropsWithChildren<{
  useDefaultPadding?: boolean;
}>;

export const MainLayout = ({ children, useDefaultPadding }: Props): JSX.Element => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <main className="flex-1 overflow-y-auto">
        <div
          className={classNames('h-full mx-auto min-h-[calc(100vh/14*13)] max-w-7xl', {
            'px-4 sm:px-6 lg:px-8': useDefaultPadding ?? true,
          })}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
