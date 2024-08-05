import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@repo/ui/styles.css';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BrFactory',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={classNames(inter.className, 'h-full bg-body')}>
        <ToastContainer pauseOnFocusLoss={false} />

        {children}
      </body>
    </html>
  );
}
