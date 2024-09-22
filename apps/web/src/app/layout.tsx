import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';
import '@repo/ui/styles.css';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datetime/css/react-datetime.css';
import { AuthGuard } from '../features/auth/components/AuthGuard';
import { routes } from '../shared/constant/routes';
import { DynamicServerUrlPBProvider } from '../features/dynamicServer/ui/DynamicServerUrlPBProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={classNames(inter.className, 'h-full bg-body')}>
        <ToastContainer pauseOnFocusLoss={false} />

        <DynamicServerUrlPBProvider>
          <AuthGuard ignoredRoutes={[routes.index, routes.signIn]}>{children}</AuthGuard>
        </DynamicServerUrlPBProvider>
      </body>
    </html>
  );
}
