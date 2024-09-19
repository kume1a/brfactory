import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';
import { Pocketbase } from '@repo/pocketbase-react';
import '@repo/ui/styles.css';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datetime/css/react-datetime.css';
import { getPocketbaseServerUrl } from '../features/dynamicServer/util/getPocketbaseUrl';
import { AuthGuard } from '../features/auth/components/AuthGuard';
import { routes } from '../shared/constant/routes';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  const pocketbaseServerUrl = getPocketbaseServerUrl();

  return (
    <html lang="en" className="h-full">
      <body className={classNames(inter.className, 'h-full bg-body')}>
        <ToastContainer pauseOnFocusLoss={false} />

        <Pocketbase
          serverURL={pocketbaseServerUrl}
          initialCollections={[]}
          webRedirectUrl={''}
          mobileRedirectUrl={''}
          // openURL={async () => {}}
        >
          <AuthGuard ignoredRoutes={[routes.index, routes.signIn]}>{children}</AuthGuard>
        </Pocketbase>
      </body>
    </html>
  );
}
