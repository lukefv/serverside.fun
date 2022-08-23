import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';
import { DOTS, usePagination } from './usePagination';

const Pagination = ({
  onPageChange,
  totalCount,
  pageSize,
  currentPage,
  siblingCount,
  doubleSkip,
}: {
  onPageChange: (page: number) => void;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
  doubleSkip: boolean;
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    doubleSkip,
  });

  if (!paginationRange) return <></>;

  const lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if (currentPage === lastPage) return;
    if (lastPage === undefined) return;
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === undefined) return;
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  return (
    <>
      <div className="dark:bg-dModeDark dark:border-dModeSelected flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            type="button"
            onClick={onPrevious}
            className={`${
              currentPage === 1
                ? 'border-gray-300 bg-white text-gray-400 hover:bg-gray-200'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } dark:bg-dModeLightDark dark:border-dModeSelected relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition`}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className={`${
              currentPage === lastPage
                ? 'border-gray-300 bg-white text-gray-400 hover:bg-gray-200'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } dark:bg-dModeLightDark dark:border-dModeSelected relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-500">
              Showing{' '}
              <span className="font-medium">
                {totalCount >= 1 ? (
                  <>{(currentPage - 1) * pageSize + 1}</>
                ) : (
                  <>0</>
                )}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {totalCount >= 1
                  ? currentPage === Math.ceil(totalCount / pageSize)
                    ? totalCount
                    : currentPage * pageSize
                  : 0}
              </span>{' '}
              of <span className="font-medium">{totalCount}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={onPrevious}
                type="button"
                className={`${
                  currentPage === 1
                    ? 'dark:bg-dModeLightDark dark:border-dModeSelected border-gray-300 bg-white text-gray-400 hover:bg-gray-200'
                    : 'dark:bg-dModeLightDark dark:border-dModeSelected border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                } relative inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium transition`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {paginationRange.map((pageNumber) => {
                switch (pageNumber) {
                  case DOTS: {
                    return (
                      <span className="dark:text-gray-400+ dark:border-dModeSelected dark:bg-dModeLightDark relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition">
                        &#8230;
                      </span>
                    );
                  }

                  case '<<': {
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => onPageChange(currentPage - 2)}
                        className="dark:bg-dModeLightDark dark:border-dModeSelected relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronDoubleLeftIcon
                          className="h-5 w-5 "
                          aria-hidden="true"
                        />
                      </button>
                    );
                  }

                  case '>>': {
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => onPageChange(currentPage + 2)}
                        className="dark:bg-dModeLightDark dark:border-dModeSelected relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-50"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronDoubleRightIcon
                          className="h-5 w-5 "
                          aria-hidden="true"
                        />
                      </button>
                    );
                  }

                  default: {
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => onPageChange(Number(pageNumber))}
                        className={`${
                          pageNumber === currentPage
                            ? 'z-10 border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-600 dark:bg-opacity-20 dark:text-blue-400'
                            : 'dark:bg-dModeLightDark dark:border-dModeSelected border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        } relative inline-flex items-center border px-4 py-2 text-sm font-medium transition`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                }
              })}
              <button
                onClick={onNext}
                type="button"
                className={`${
                  currentPage === lastPage || lastPage === undefined
                    ? 'dark:bg-dModeLightDark dark:border-dModeSelected border-gray-300 bg-white text-gray-400 hover:bg-gray-200'
                    : 'dark:bg-dModeLightDark dark:border-dModeSelected border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                } relative inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium transition`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
