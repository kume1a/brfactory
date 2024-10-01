'use client';

import { DateTime } from 'luxon';
import TableConstructor from '../../../shared/components/TableConstructor';
import { getLocaleDateTime } from '../../../shared/util/datetime';
import { formatLongString } from '../../../shared/util/string';
import { ScheduledIGReelUpload } from '../scheduledIGReelUpload.type';
import { useScheduledIGReelUploads } from '../hooks/useScheduledIGReelUploads';

import { Pagination } from '../../../shared/components/pagination';
import classNames from 'classnames';

export const ScheduledIGReelUploadsTable = (): JSX.Element => {
  const { data: scheduledIGReelUploads, pagingMeta, setPage } = useScheduledIGReelUploads();

  return (
    <>
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
                {getLocaleDateTime(record.created).toLocaleString(
                  DateTime.DATETIME_MED_WITH_SECONDS
                )}
              </>
            ),
          },
          {
            columnTitle: 'Success',
            cellContent: record => (
              <p
                className={classNames({
                  'text-success': record.success,
                  'text-error': !record.success,
                })}
              >
                {record.success ? 'Yes' : 'No'}
              </p>
            ),
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

      <Pagination onPageChange={page => setPage(page)} pageCount={pagingMeta.totalPages} />
    </>
  );
};
