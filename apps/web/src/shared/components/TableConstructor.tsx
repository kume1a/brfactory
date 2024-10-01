'use client';

import classNames from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { SortDirection, useTableSort } from '../hooks/useTableSort';

export type EntityWithId = {
  id?: string;
};

type ColumnSchemaCell<T> = {
  columnTitle: string;
  columnTitleStyle?: string;
  titleStyle?: string;
  sortKey?: keyof T;
  cellContent: (arg: T, rowIndex: number) => JSX.Element;
};

export type TableConstructorProps<T> = {
  columnSchema: Array<ColumnSchemaCell<T>>;
  tableData: Array<T>;
  cellClassName?: string | ((columnIndex: number, rowIndex: number) => string);
  rowClassName?: string;
  headerCellClassName?: string;
  onRowClick?: (params: { rowEntity: T }) => void;
  className?: string;
  useBottomBorderOnLastRow?: boolean;
};

const TableConstructor = <T extends EntityWithId>({
  columnSchema,
  tableData,
  cellClassName,
  rowClassName,
  headerCellClassName,
  onRowClick,
  className,
  useBottomBorderOnLastRow = true,
}: TableConstructorProps<T>): JSX.Element => {
  const { sortTableData, sortedTableData, sortConfig } = useTableSort<T>(tableData);

  return (
    <div className={classNames('overflow-x-auto', 'md:rounded-lg border-bgStripe', className)}>
      <table
        className="w-full text-left"
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <thead className="text-textSecondary text-xxs tracking-widest">
          <tr>
            {columnSchema?.map(({ columnTitle, sortKey, columnTitleStyle, titleStyle }) => {
              const isActiveSort = sortConfig.sortKey === sortKey;

              return (
                <th
                  key={`th-${columnTitle}`}
                  className={classNames(
                    'px-5 py-5 border-b-1 border-bgStripe font-medium',
                    sortKey && 'cursor-pointer',
                    headerCellClassName
                  )}
                  onClick={() => sortKey && sortTableData(columnTitle, sortKey)}
                >
                  <div
                    className={classNames(
                      'inline-flex items-center content-center gap-2',
                      columnTitleStyle
                    )}
                  >
                    <span
                      className={classNames(
                        'uppercase whitespace-nowrap',
                        isActiveSort && 'font-extrabold !text-textPrimary',
                        titleStyle
                      )}
                    >
                      {columnTitle}
                    </span>
                    {sortKey && (
                      <div className={classNames(isActiveSort && 'text-textPrimary')}>
                        {isActiveSort && sortConfig.direction === SortDirection.DESC ? (
                          <ChevronUpIcon />
                        ) : (
                          <ChevronDownIcon />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedTableData?.map((rowEntity, rowIndex) => {
            const rowChildren = columnSchema?.map(({ cellContent }, columnIndex) => {
              const className =
                typeof cellClassName === 'function'
                  ? cellClassName(columnIndex, rowIndex)
                  : cellClassName;

              return (
                <td key={columnIndex} className={className || 'px-5 py-5.5'}>
                  {cellContent(rowEntity, rowIndex) || '-'}
                </td>
              );
            });

            const isLastRow = rowIndex === (sortedTableData?.length ?? 0) - 1;

            return (
              <tr
                className={classNames(
                  'text-textPrimary border-bgStripe',
                  onRowClick && 'cursor-pointer hover:bg-bgSecondary',
                  !isLastRow || (useBottomBorderOnLastRow && isLastRow) ? 'border-b-1' : null,
                  rowClassName
                )}
                onClick={() => onRowClick?.({ rowEntity })}
                key={rowEntity.id}
              >
                {rowChildren}
              </tr>
            );
          })}
        </tbody>
      </table>
      {tableData?.length === 0 && (
        <p className="p-4 bg-bgSecondary text-sm text-center text-textSecondary">No data to show</p>
      )}
    </div>
  );
};

export default TableConstructor;
