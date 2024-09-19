'use client';

import { useAuth } from '@repo/pocketbase-react';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { routes } from '../../../shared/constant/routes';

type Props = PropsWithChildren<{
  ignoredRoutes?: string[];
}>;

export const AuthGuard = ({ children, ignoredRoutes }: Props): JSX.Element => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isSignedIn || ignoredRoutes?.includes(pathname)) {
      return;
    }

    router.replace(routes.signIn);
  }, [isSignedIn, pathname]);

  if (isSignedIn || ignoredRoutes?.includes(pathname)) {
    return <>{children}</>;
  }

  return <></>;
};
