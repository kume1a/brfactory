import React from 'react';
import { MainLayout } from '../../shared/components/MainLayout';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { routes } from '../../shared/constant/routes';

export default function Example() {
  return (
    <MainLayout>
      <Breadcrumb pages={[{ name: 'Scheduled', href: routes.scheduled, current: true }]} />
    </MainLayout>
  );
}
