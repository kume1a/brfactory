'use client';

import { DateTime } from 'luxon';
import TableConstructor from '../../../shared/components/TableConstructor';
import { getLocaleDateTime } from '../../../shared/util/datetime';
import { ScheduledIGReel } from '../scheduledIGReel.type';
import { Button } from '../../../shared/components/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { routes } from '../../../shared/constant/routes';
import { ConfirmationModal } from '../../../shared/components/modal';
import { useBoolean } from '../../../shared/hooks/useBoolean';
import { useScheduledIGReels } from '../hooks/useScheduledIGReels';
import { useMutateScheduledIGReel } from '../hooks/useMutateScheduledIGReel';
import { formatLongString } from '../../../shared/util/string';
import { Pagination } from '../../../shared/components/pagination';

export const ScheduledIGReelsTable = (): JSX.Element => {
  const {
    data: scheduledIGReels,
    refetch: refetchScheduledIGReels,
    pagingMeta,
    setPage,
  } = useScheduledIGReels();

  return (
    <>
      <TableConstructor<ScheduledIGReel>
        tableData={scheduledIGReels}
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
            columnTitle: 'Start at',
            cellContent: record => (
              <>
                {getLocaleDateTime(record.startAt).toLocaleString(
                  DateTime.DATETIME_MED_WITH_SECONDS
                )}
              </>
            ),
          },
          {
            columnTitle: 'Interval in seconds',
            cellContent: record => <>{record.intervalInSeconds}</>,
          },
          {
            columnTitle: 'Title',
            cellContent: record => <>{record.title}</>,
          },
          {
            columnTitle: 'Caption',
            cellContent: record => <>{formatLongString(record.caption)}</>,
          },
          {
            columnTitle: '',
            cellContent: record => (
              <Actions record={record} onDeleteRow={refetchScheduledIGReels} />
            ),
          },
        ]}
      />

      <Pagination pageCount={pagingMeta.totalPages} onPageChange={page => setPage(page)} />
    </>
  );
};

type ActionsProps = {
  record: ScheduledIGReel;
  onDeleteRow: VoidFunction;
};

const Actions = ({ record, onDeleteRow }: ActionsProps): JSX.Element => {
  const router = useRouter();

  const { deleteScheduledIGReel } = useMutateScheduledIGReel();

  const [confirmDeleteShowing, showConfirmDelete, hideConfirmDelete] = useBoolean(false);

  return (
    <>
      {confirmDeleteShowing ? (
        <ConfirmationModal
          onClose={hideConfirmDelete}
          title="Delete schedyuled IG reel"
          content="Are you sure you want to delete this scheduled IG reel?"
          onPositiveClick={async () => {
            await deleteScheduledIGReel(record.id);
            onDeleteRow();
          }}
          onNegativeClick={hideConfirmDelete}
        />
      ) : null}

      <span className="flex gap-1">
        <Button
          className="!rounded-full !p-2"
          href={{
            pathname: routes.scheduledIGReelMutate,
            query: { scheduledIGReelId: record.id },
          }}
        >
          <PencilIcon className="size-4" />
        </Button>

        <Button className="!rounded-full !p-2" onClick={showConfirmDelete}>
          <TrashIcon className="size-4" />
        </Button>
      </span>
    </>
  );
};
