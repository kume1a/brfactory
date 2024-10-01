import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ pageCount, onPageChange }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected)}
      breakLabel="..."
      nextLabel="next"
      previousLabel="previous"
      pageRangeDisplayed={2}
      renderOnZeroPageCount={null}
      containerClassName="flex flex-wrap justify-start mt-4 select-none"
      pageClassName="mx-1"
      pageLinkClassName="px-3 rounded py-1 border"
      previousClassName="mr-1"
      previousLinkClassName="px-3 py-1 rounded border"
      nextClassName="ml-1"
      nextLinkClassName="px-3 py-1 rounded border"
      breakClassName="mx-1"
      breakLinkClassName="px-3 py-1 border rounded"
      activeLinkClassName="bg-secondary text-textPrimary rounded"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};
