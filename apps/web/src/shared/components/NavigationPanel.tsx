'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
  Bars3Icon as IconBars3,
  CalendarIcon as IconCalendar,
  XMarkIcon as IconXMark,
  ArrowUpTrayIcon as IconArrowUpTray,
} from '@heroicons/react/24/outline';

import classNames from 'classnames';
import Image from 'next/image';
import IconInstagram from '@public/svg/instagram.svg';
import IconDashboard from '@public/svg/dasboard.svg';
import IconServer from '@public/svg/server.svg';
import { BlankProfileImage } from './BlankProfileImage';
import { usePathname } from 'next/navigation';
import { routes } from '../constant/routes';
import Link from 'next/link';
import { ServerUrlOriginMenu } from '../../features/dynamicServer/ui/ServerUrlOriginMenu';

type NavigationItem = {
  name: string;
  href: string;
  icon: any;
};

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: routes.dashboard, icon: IconDashboard },
  { name: 'IG accounts', href: routes.igAccounts, icon: IconInstagram },
  { name: 'Scheduled IG reels', href: routes.scheduledIGReels, icon: IconCalendar },
  { name: 'Scheduled IG reel uploads', href: routes.scheduledIGReelUploads, icon: IconArrowUpTray },
];

export const NavigationPanel = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-72 flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <IconXMark
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-200 hover:text-white transition-colors"
                  />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <NavigationHeader />
              <NavigationContent />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <NavigationHeader />
          <nav className="flex flex-1 flex-col">
            <NavigationContent />
          </nav>
        </div>
      </div>

      <OpenSidebarButton onClick={() => setSidebarOpen(true)} />
    </>
  );
};

const NavigationContent = (): JSX.Element => {
  return (
    <ul role="list" className="flex flex-1 flex-col gap-y-7 select-none">
      <NavigationItems />

      <li className="mt-auto mb-2">
        <ServerUrlOriginMenu className="w-full">
          <ClickableItem
            icon={<IconServer className="size-5" />}
            label="Server URL origin"
            onClick={() => {}}
          />
        </ServerUrlOriginMenu>

        <ClickableItem
          icon={<BlankProfileImage containerClassName="w-5 h-5" />}
          label="Sign out"
          onClick={() => {}}
        />
      </li>
    </ul>
  );
};

const NavigationItems = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigation.map(item => {
        const isCurrent = pathname === item.href;

        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={classNames(
                isCurrent
                  ? 'bg-bgPrimaryContainer text-textPrimary'
                  : 'text-textSecondary hover:bg-gray-50 hover:text-textPrimary',
                'group flex gap-x-4 rounded-md p-2 text-sm font-semibold leading-6 transition-colors'
              )}
            >
              <item.icon
                className={classNames(
                  'size-5 shrink-0',
                  isCurrent ? 'text-textPrimary' : 'text-gray-400 group-hover:text-textPrimary'
                )}
              />

              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

type ClickableItemProps = {
  onClick?: VoidFunction;
  label: string;
  icon: any;
};

const ClickableItem = (item: ClickableItemProps): JSX.Element => {
  return (
    <div
      onClick={item.onClick}
      className={classNames(
        'flex items-center gap-x-4 p-2 text-sm font-semibold leading-6',
        'text-textPrimary rounded-md cursor-pointer hover:bg-gray-50'
      )}
    >
      {item.icon}

      <span aria-hidden="true">{item.label}</span>
    </div>
  );
};

const NavigationHeader = (): JSX.Element => {
  return (
    <div className="flex h-16 shrink-0 items-center gap-3">
      <Image
        alt="Logo"
        src="/brfactory/logo/logo_transparentbg.png"
        className="rounded-full border-2 border-textSecondary h-8 w-auto"
        width={56}
        height={56}
      />
      <span className="font-semibold text-sm tracking-wide">BrainRot Factory</span>
    </div>
  );
};

const OpenSidebarButton = ({ onClick }: { onClick: VoidFunction }): JSX.Element => {
  return (
    <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" onClick={onClick} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
        <IconBars3
          aria-hidden="true"
          className="h-6 w-6 text-gray-800 hover:text-black trnasition-colors"
        />
      </button>
      <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>

      <BlankProfileImage containerClassName="w-8 h-8" />
    </div>
  );
};
