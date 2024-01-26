import clsx from 'clsx'
import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'

interface IBreadcrumb {
  label: string
  link: string
}

interface IBreadcrumbsProps {
  crumbs: IBreadcrumb[]
}

const Breadcrumbs: FC<IBreadcrumbsProps> = ({ crumbs }) => {
  return (
    <div className='bg-gray-200 dark:bg-gray-800 w-full max-w-full flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap'>
      {crumbs?.map((crumb, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          )}
          {index < crumbs.length - 1 ? (
            <Link
              to={crumb.link}
              className={clsx(
                'text-gray-600 dark:text-gray-200 hover:underline text-xl'
              )}
            >
              {crumb.label}
            </Link>
          ) : (
            <span className='text-gray-600 dark:text-gray-200 text-xl'>
              {crumb.label}
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default Breadcrumbs
