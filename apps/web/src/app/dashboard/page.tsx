'use client';

import { NavigationPanel } from '../../shared/components/NavigationPanel';

export default function Example() {
  return (
    <>
      <NavigationPanel />

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">Main content</div>
      </main>
    </>
  );
}
