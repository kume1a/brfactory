import React from 'react';
import { MainLayout } from '../../shared/components/MainLayout';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { routes } from '../../shared/constant/routes';
import { Button } from '../../shared/components/Button';
import { ScheduledIGReelsTable } from '../../entities/scheduledIGReel/components/ScheduledIGReelsList';

export default function Example() {
  return (
    <MainLayout>
      <div className="flex justify-between pb-4">
        <Breadcrumb
          pages={[{ name: 'Scheduled IG reels', href: routes.scheduledIGReels, current: true }]}
        />

        <Button href={routes.scheduledIGReelMutate}>Create new</Button>
      </div>

      <ScheduledIGReelsTable />
    </MainLayout>
  );
}
