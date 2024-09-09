'use client';

import { useEffect, useState } from 'react';

export enum SortDirection {
  ASC = 'ASCENDING',
  DESC = 'DESCENDING',
}

type UseTableSortHook = <T>(tableData: Array<T>) => {
  sortConfig: {
    direction: SortDirection | null;
    sortKey: keyof T | null;
  };
  sortTableData: (title: string, key: keyof T) => void;
  sortedTableData: Array<T>;
};

export const useTableSort: UseTableSortHook = <T>(tableData: Array<T>) => {
  const [sortKey, setSortKey] = useState<null | keyof T>(null);
  const [direction, setDirection] = useState<null | SortDirection>(SortDirection.DESC);
  const [sortedTableData, setSortedTableData] = useState<Array<T>>(tableData);

  const sortTableData = (_title: string, key: keyof T): SortDirection | void => {
    setDirection(currentDirection => {
      if (key === sortKey) {
        return direction === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC;
      }
      return currentDirection;
    });
    setSortKey(key);
  };

  useEffect(() => {
    if (sortKey) {
      setSortedTableData(tableData => {
        return [...tableData].sort((a, b) =>
          a[sortKey] > b[sortKey]
            ? direction === SortDirection.ASC
              ? 1
              : -1
            : direction === SortDirection.ASC
              ? -1
              : 1
        );
      });
    } else {
      setSortedTableData(tableData);
    }
  }, [tableData, sortKey, direction]);

  return {
    sortConfig: {
      direction,
      sortKey,
    },
    sortTableData,
    sortedTableData,
  };
};
