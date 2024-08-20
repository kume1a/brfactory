'use client';

import { Inter } from 'next/font/google';
import '@repo/ui/styles.css';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';
import { Pocketbase } from '@repo/pocketbase-react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'BrFactory',
// };

// App.tsx

const serverURL = 'http://127.0.0.1:8090/api';
const collections = ['COLLECTION_NAME_01', 'COLLECTION_NAME_02'];
const webRedirectURL = 'http://...';
const mobileRedirectURL = 'expo://...'; // for example

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
          openURL={async url => {}}
        >
          {children}
        </Pocketbase>
      </body>
    </html>
  );
}
