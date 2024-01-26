import { ReactNode } from 'react'
import Pagination from '../Pagination'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

export interface ITableData {
  [key: string]: string | number | object | boolean
}

interface IColunms {
  label: string
  skeletonKey?: string
  accessKey?: string
  action?: (data: ITableData) => ReactNode
  childKey?: string
}

interface IProps {
  columns: IColunms[]
  data: ITableData[]
  isLoading: boolean
  currentPage: number | string
  totalPages: number
  onPageChange: (newPage: number | string) => void
  onClickCard?: (data: ITableData) => void
}

interface ITableCell {
  data: ITableData
  key?: string
  action?: (data: ITableData) => ReactNode
  childKey?: string
}

const TableCell = ({ data, key, action, childKey = '' }: ITableCell) => {
  if (!key) {
    return action?.(data)
  } else {
    const isObject = typeof data[key] === 'object' && data[key] !== null

    const content = isObject
      ? ((data[key] as ITableData)[childKey] as string)
      : (data[key] as string)

    return <h3 className='text-gray-800'>{content}</h3>
  }
}

const TableCellSkeleton = ({ key }: any) => {
  if (key === 'SKimage') {
    return (
      <div className='flex animate-pulse flex-wrap items-center gap-8'>
        <div className='grid h-12 w-12 place-items-center rounded-lg bg-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-8 w-8 text-gray-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
            />
          </svg>
        </div>
      </div>
    )
  } else if (key === 'SKrating') {
    return (
      <div className='flex items-center space-x-1'>
        {[1, 2, 3, 4, 5].map((item: number) => (
          <div key={item}>
            <svg
              className='w-4 h-4 cursor-pointer fill-gray-300 animate-pulse'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='miter'
                strokeWidth='2'
                d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'
              />
            </svg>
          </div>
        ))}
      </div>
    )
  } else if (key === 'SKbuttonDU') {
    return (
      <div className='flex gap-1'>
        <div className='w-fit h-fit cursor-pointer rounded-full p-1.5 animate-pulse'>
          <AiOutlineDelete size={22} color='#9ba3af' />
        </div>

        <div className='w-fit h-fit cursor-pointer rounded-full p-1.5 animate-pulse'>
          <AiOutlineEdit size={22} color='#9ba3af' />
        </div>
      </div>
    )
  } else {
    return (
      <div className='mb-4 h-5 w-[50px] rounded-md bg-gray-300 animate-pulse'>
        &nbsp;
      </div>
    )
  }
}

const Table = (props: IProps) => {
  return (
    <>
      <section className='w-full px-3 mt-5'>
        <div className='flex flex-col w-full'>
          <div className='w-full overflow-auto'>
            <div className='inline-block min-w-full py-2 align-middle '>
              <div className='w-full overflow-hidden border border-gray-300 rounded-md md:rounded-lg'>
                <table className='w-full divide-y divide-gray-200'>
                  <thead className='bg-[gainsboro'>
                    <tr>
                      {props.columns.map((item: IColunms, index: number) => {
                        return (
                          <th
                            key={index + 1}
                            scope='col'
                            className='py-5 px-12 text-sm font-normal text-left rtl:text-right text-black'
                          >
                            {item.label}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200 !h-[80px]'>
                    {props.isLoading
                      ? Array.from({ length: 5 }).map((_, index) => {
                          return (
                            <tr key={index}>
                              {props.columns.map(
                                (el: IColunms, index: number) => {
                                  return (
                                    <td
                                      key={index}
                                      className='px-12 py-4 text-sm font-medium whitespace-nowrap'
                                    >
                                      {TableCellSkeleton({
                                        key: el.skeletonKey
                                      })}
                                    </td>
                                  )
                                }
                              )}
                            </tr>
                          )
                        })
                      : props.data.map((item: ITableData, index: number) => {
                          return (
                            <tr key={index}>
                              {props.columns.map(
                                (el: IColunms, index: number) => {
                                  return (
                                    <td
                                      onClick={() =>
                                        props.onClickCard &&
                                        props.onClickCard(item)
                                      }
                                      key={index}
                                      className='px-12 py-3 text-sm font-medium whitespace-nowrap'
                                    >
                                      {TableCell({
                                        data: item,
                                        key: el.accessKey,
                                        action: el.action,
                                        childKey: el.childKey
                                      })}
                                    </td>
                                  )
                                }
                              )}
                            </tr>
                          )
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {props.totalPages ? (
        <Pagination
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          onPageChange={props.onPageChange}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default Table
