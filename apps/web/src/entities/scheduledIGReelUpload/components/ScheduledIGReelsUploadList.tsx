'use client';

import { DateTime } from 'luxon';
import TableConstructor from '../../../shared/components/TableConstructor';
import { getLocaleDateTime } from '../../../shared/util/datetime';
import { formatLongString } from '../../../shared/util/string';
import { ScheduledIGReelUpload } from '../scheduledIGReelUpload.type';
import { useScheduledIGReelUploads } from '../hooks/useScheduledIGReelUploads';

export const ScheduledIGReelUploadsTable = (): JSX.Element => {
  const { data: scheduledIGReelUploads } = useScheduledIGReelUploads();

  return (
    <TableConstructor<ScheduledIGReelUpload>
      tableData={scheduledIGReelUploads}
      cellClassName="p-3"
      rowClassName="p-3 h-22"
      headerCellClassName="!p-3 text-xs font-medium tracking-wider"
      useBottomBorderOnLastRow={false}
      columnSchema={[
        {
          columnTitle: 'ID',
          cellContent: record => <>{record.id}</>,
        },
        {
          columnTitle: 'Created at',
          cellContent: record => (
            <>
              {getLocaleDateTime(record.created).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
            </>
          ),
        },
        {
          columnTitle: 'Success',
          cellContent: record => <>{record.success ? 'Yes' : 'No'}</>,
        },
        {
          columnTitle: 'Index',
          cellContent: record => <>{record.index}</>,
        },
        {
          columnTitle: 'Title',
          cellContent: record => <>{record.title}</>,
        },
        {
          columnTitle: 'Caption',
          cellContent: record => <>{formatLongString(record.caption)}</>,
        },
      ]}
    />
  );
};
