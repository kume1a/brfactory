import React from 'react';
import { MainLayout } from '../../shared/components/MainLayout';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { routes } from '../../shared/constant/routes';
import { ScheduledIGReelUploadsTable } from '../../entities/scheduledIGReelUpload/components/ScheduledIGReelsUploadList';

export default function Page() {
  return (
    <MainLayout>
      <div className="pb-4">
        <Breadcrumb
          pages={[
            {
              name: 'Scheduled IG reel uploads',
              href: routes.scheduledIGReelUploads,
              current: true,
            },
          ]}
        />
      </div>

      <ScheduledIGReelUploadsTable />
    </MainLayout>
  );
}
