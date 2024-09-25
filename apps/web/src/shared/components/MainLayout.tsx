import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { NavigationPanel } from './NavigationPanel';

type Props = PropsWithChildren<{
  useDefaultPadding?: boolean;
}>;

export const MainLayout = ({ children, useDefaultPadding }: Props): JSX.Element => {
  return (
    <>
      <NavigationPanel />

      <main className="flex-1 overflow-y-auto py-5 lg:py-10 lg:pl-72">
        <div
          className={classNames('h-full mx-auto min-h-[calc(100vh/14*13)] max-w-7xl', {
            'px-4 sm:px-6 lg:px-8': useDefaultPadding ?? true,
          })}
        >
          {children}
        </div>
      </main>
    </>
  );
};
