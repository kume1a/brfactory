'use client';

import { DateTime } from 'luxon';
import TableConstructor from '../../../shared/components/TableConstructor';
import { getLocaleDateTime } from '../../../shared/util/datetime';
import { useIGAccounts } from '../hooks/useIGAccounts';
import { IGAccount } from '../igAccount.type';
import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { routes } from '../../../shared/constant/routes';
import { ConfirmationModal } from '../../../shared/components/modal';
import { useBoolean } from '../../../shared/hooks/useBoolean';
import { useMutateIGAccount } from '../hooks/useMutateIGAccount';

export const IGAccountsTable = (): JSX.Element => {
  const { data: igAccounts, refetch: refetchIGAccounts } = useIGAccounts();

  const [visiblePasswordRowIds, setVisiblePasswordRowIds] = useState<string[]>([]);

  const handlePasswordClick = (record: IGAccount) => {
    if (visiblePasswordRowIds.includes(record.id)) {
      setVisiblePasswordRowIds(visiblePasswordRowIds.filter(rowId => rowId !== record.id));
    } else {
      setVisiblePasswordRowIds([...visiblePasswordRowIds, record.id]);
    }
  };

  return (
    <TableConstructor<IGAccount>
      tableData={igAccounts}
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
          columnTitle: 'Username',
          cellContent: record => <>{record.username}</>,
        },
        {
          columnTitle: 'Email',
          cellContent: record => <>{record.email}</>,
        },
        {
          columnTitle: 'Password',
          cellContent: record => (
            <p
              className="cursor-pointer text-textPrimary hover:text-secondary transition-colors"
              onClick={() => handlePasswordClick(record)}
            >
              {visiblePasswordRowIds.includes(record.id) ? record.password : '********'}
            </p>
          ),
        },
        {
          columnTitle: '',
          cellContent: record => (
            <IGAccountsActions record={record} onDeleteIGAccount={refetchIGAccounts} />
          ),
        },
      ]}
    />
  );
};

type IGAccountsActionsProps = {
  record: IGAccount;
  onDeleteIGAccount: VoidFunction;
};

const IGAccountsActions = ({ record, onDeleteIGAccount }: IGAccountsActionsProps): JSX.Element => {
  const { deleteIGAccount } = useMutateIGAccount();

  const [confirmDeleteShowing, showConfirmDelete, hideConfirmDelete] = useBoolean(false);

  return (
    <>
      {confirmDeleteShowing ? (
        <ConfirmationModal
          onClose={hideConfirmDelete}
          title="Delete IG Account"
          content="Are you sure you want to delete this IG Account?"
          onPositiveClick={async () => {
            await deleteIGAccount(record.id);
            onDeleteIGAccount();
          }}
          onNegativeClick={hideConfirmDelete}
        />
      ) : null}

      <span className="flex gap-1">
        <Button
          className="!rounded-full !p-2"
          href={{
            pathname: routes.igAccountsMutate,
            query: { igAccountId: record.id },
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
