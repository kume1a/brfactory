'use client';

import { Inter } from 'next/font/google';
import '@repo/ui/styles.css';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';
import { Pocketbase } from '@repo/pocketbase-react';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

const serverURL = 'http://127.0.0.1:8090';
const collections = ['users'];
const webRedirectURL = 'http://...';
const mobileRedirectURL = 'expo://...';

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
          openURL={async () => {}}
        >
          {children}
        </Pocketbase>
      </body>
    </html>
  );
}
