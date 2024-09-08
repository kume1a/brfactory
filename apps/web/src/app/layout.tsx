import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';
import { Pocketbase } from '@repo/pocketbase-react';
import '@repo/ui/styles.css';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

const serverURL = process.env.NEXT_PUBLIC_PB_URL ?? '';
const collections: string[] = [];
const webRedirectURL = '';
const mobileRedirectURL = '';

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={classNames(inter.className, 'h-full bg-body')}>
        <ToastContainer pauseOnFocusLoss={false} />

        <Pocketbase
          serverURL={serverURL}
          initialCollections={collections}
          webRedirectUrl={webRedirectURL}
          mobileRedirectUrl={mobileRedirectURL}
          // openURL={async () => {}}
        >
          {children}
        </Pocketbase>
      </body>
    </html>
  );
}
