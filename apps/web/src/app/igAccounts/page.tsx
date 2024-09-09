import React from 'react';
import { MainLayout } from '../../shared/components/MainLayout';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { routes } from '../../shared/constant/routes';
import { Button } from '../../shared/components/Button';
import { IGAccountsTable } from '../../entities/igAccount/components/IGAccountsList';

export default function Example() {
  return (
    <MainLayout>
      <div className="flex justify-between pb-4">
        <Breadcrumb pages={[{ name: 'IG accounts', href: routes.igAccounts, current: true }]} />

        <Button href={routes.igAccountsMutate}>Create new</Button>
      </div>

      <IGAccountsTable />
    </MainLayout>
  );
}
