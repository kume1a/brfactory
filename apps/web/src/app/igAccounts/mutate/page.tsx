import React from 'react';
import { MainLayout } from '../../../shared/components/MainLayout';
import { Breadcrumb } from '../../../shared/components/Breadcrumb';
import { routes } from '../../../shared/constant/routes';
import { MutateIgAccountForm } from '../../../features/igAccount/components/MutateIGAccountForm';

export default function Example() {
  return (
    <MainLayout>
      <Breadcrumb
        pages={[
          { name: 'IG accounts', href: routes.igAccounts, current: false },
          { name: 'Mutate', href: routes.igAccountsMutate, current: true },
        ]}
      />

      <MutateIgAccountForm />
    </MainLayout>
  );
}
