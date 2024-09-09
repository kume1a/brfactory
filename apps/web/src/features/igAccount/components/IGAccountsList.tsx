'use client';

import { DateTime } from 'luxon';
import TableConstructor from '../../../shared/components/TableConstructor';
import { getLocaleDateTime } from '../../../shared/util/datetime';
import { useIGAccounts } from '../hooks/useIGAccounts';
import { IGAccount } from '../igAccount.type';
import { useState } from 'react';

type Props = {
  className?: string;
};

export const IGAccountsTable = ({ className }: Props): JSX.Element => {
  const records = useIGAccounts();

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
      tableData={records}
      cellClassName="p-3"
      rowClassName="p-3 h-22"
      headerCellClassName="!p-3 text-xs font-medium tracking-wider"
      className={className}
      useBottomBorderOnLastRow={false}
      columnSchema={[
        {
          columnTitle: 'ID',
          cellContent: record => <p>{record.id}</p>,
        },
        {
          columnTitle: 'Created at',
          cellContent: record => (
            <p>
              {getLocaleDateTime(record.created).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
            </p>
          ),
        },
        {
          columnTitle: 'Username',
          cellContent: record => <p>{record.username}</p>,
        },
        {
          columnTitle: 'Email',
          cellContent: record => <p>{record.email}</p>,
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
      ]}
    />
  );
};
