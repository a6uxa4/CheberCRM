import { Avatar } from '@material-tailwind/react'
import Breadcrumbs from '../../../components/BreadCrumbs'
import Table, { ITableData } from '../../../components/Table'
import { useGetBranchQuery } from '../../../services/branch.service'
import { useState } from 'react'
import EditDeleteButtons from '../../../components/EditDeleteButtons'
import Rating from '../../../components/Rating/Rating'

export const BranchPage = () => {
  const [currentPage, setCurrentPage] = useState<number | string>(1)

  const { data: branchData = [], isLoading } = useGetBranchQuery()

  const COLUMNS_PRODUCT = [
    { label: '№', accessKey: 'indexOF' },
    {
      label: 'Фото',
      skeletonKey: 'SKimage',
      action: (item: ITableData) => {
        const avatar = item.image as string
        return (
          <Avatar
            placeholder={'hello'}
            src={avatar}
            alt='avatar'
            size='md'
            withBorder={true}
            variant='rounded'
          />
        )
      }
    },
    { label: 'Адрес', accessKey: 'address' },
    {
      label: 'Рейтинг',
      skeletonKey: 'SKrating',
      action: (item: ITableData) => {
        const rating = item.rating as number
        return <Rating rating={rating} />
      }
    },
    { label: 'Телефон', accessKey: 'phoneNumber' },
    {
      label: 'Действие',
      skeletonKey: 'SKbuttonDU',
      action: (item: ITableData) => {
        return (
          <EditDeleteButtons
            onDelete={() => console.log('delete')}
            onEdit={() => console.log('edit')}
          />
        )
      }
    }
  ]

  const transformedData = branchData.map((item, index) => ({
    ...item,
    indexOF: index + 1
  }))

  const BREADCRUMBS_HEADER = [{ label: 'Филиалы', link: '/branches' }]

  return (
    <div>
      <Breadcrumbs crumbs={BREADCRUMBS_HEADER} />
      <Table
        columns={COLUMNS_PRODUCT}
        data={transformedData}
        isLoading={isLoading}
        totalPages={0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
