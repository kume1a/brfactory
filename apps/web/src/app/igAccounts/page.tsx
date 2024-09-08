import React from 'react';
import { MainLayout } from '../../shared/components/MainLayout';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { routes } from '../../shared/constant/routes';
import { Button } from '../../shared/components/Button';

export default function Example() {
  return (
    <MainLayout>
      <Breadcrumb pages={[{ name: 'IG accounts', href: routes.igAccounts, current: true }]} />

      <div className="flex justify-end">
        <Button href={routes.igAccountsMutate}>Create new</Button>
      </div>
    </MainLayout>
  );
}
