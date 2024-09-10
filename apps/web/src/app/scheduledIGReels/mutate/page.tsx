import React from 'react';
import { MainLayout } from '../../../shared/components/MainLayout';
import { Breadcrumb } from '../../../shared/components/Breadcrumb';
import { routes } from '../../../shared/constant/routes';
import { MutateScheduledIGReelForm } from '../../../entities/scheduledIGReel/components/MutateScheduledIGReelForm';

export default function Example() {
  return (
    <MainLayout>
      <Breadcrumb
        pages={[
          { name: 'Scheduled IG reels', href: routes.scheduledIGReels, current: false },
          { name: 'Mutate', href: routes.scheduledIGReelMutate, current: true },
        ]}
      />

      <MutateScheduledIGReelForm />
    </MainLayout>
  );
}
