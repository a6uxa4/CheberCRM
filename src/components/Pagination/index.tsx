import clsx from 'clsx'

interface IPaginationProps {
  currentPage: number | string
  totalPages: number
  onPageChange: (newPage: number | string) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: IPaginationProps) => {
  if (totalPages <= 0) {
    return null
  }

  const maxVisiblePages = 5
  const pageNumbers: number[] = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const getPageNumbersToShow = () => {
    if (totalPages <= maxVisiblePages) {
      return pageNumbers
    } else {
      const half = Math.floor(maxVisiblePages / 2)
      let startPage = Math.min(
        Math.max(Number(currentPage) - half, 1),
        totalPages - maxVisiblePages + 1
      )
      const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

      let pageNumbersToShow: (string | number)[] = []

      if (startPage > 2) {
        pageNumbersToShow.push('...')
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbersToShow.push(i)
      }

      if (endPage < totalPages - 1) {
        pageNumbersToShow.push('...')
      }

      pageNumbersToShow.push(totalPages)

      return pageNumbersToShow
    }
  }

  return (
    <div className='flex items-center justify-between mt-6 mx-4'>
      <div
        onClick={() => onPageChange(Number(currentPage) - 1)}
        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${
          currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5 rtl:-scale-x-100'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
          />
        </svg>
        <span>Пред</span>
      </div>
      <div className='items-center hidden md:flex gap-x-3'>
        {getPageNumbersToShow().map(
          (pageNumber: number | string, index: number) => (
            <a
              key={index}
              href='#'
              onClick={() => {
                if (pageNumber !== '...') {
                  onPageChange(pageNumber)
                }
              }}
              className={clsx(
                'flex justify-center items-center w-[30px] h-[30px] mx-1 transition-colors duration-300 transform text-gray-700 bg-white rounded-md  dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200',
                { 'dark:bg-blue-500': pageNumber === currentPage },
                { 'dark:bg-gray-800': pageNumber !== currentPage }
              )}
            >
              {pageNumber}
            </a>
          )
        )}
      </div>
      <div
        onClick={() => onPageChange(Number(currentPage) + 1)}
        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${
          currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        <span>След</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5 rtl:-scale-x-100'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
          />
        </svg>
      </div>
    </div>
  )
}

export default Pagination
