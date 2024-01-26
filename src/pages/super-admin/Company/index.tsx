import { useState } from 'react'
import Table, { ITableData } from '../../../components/Table'
import { useGetCompanyQuery } from '../../../services/company.service'
import { Avatar } from '@material-tailwind/react'
import Breadcrumbs from '../../../components/BreadCrumbs'

export const CompanyPage = () => {
  const [currentPage, setCurrentPage] = useState<number | string>(1)
  const { data: companyData = [], isLoading } = useGetCompanyQuery()

  const COLUMNS = [
    { label: '№', accessKey: 'indexOF' },
    {
      label: 'Лого',
      skeletonKey: 'SKimage',
      action: (item: ITableData) => {
        const avatar = item.logo as string
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
    { label: 'Название', accessKey: 'name' },
    { label: 'Домен', accessKey: 'domain' },
    { label: 'Директор', accessKey: 'firstName' },
    { label: 'Телефон', accessKey: 'phoneNumber' }
  ]

  const transformedData = companyData.map((item, index) => ({
    ...item,
    indexOF: index + 1
  }))

  const BREADCRUMBS_HEADER = [{ label: 'Компании', link: '/company' }]

  return (
    <div>
      <Breadcrumbs crumbs={BREADCRUMBS_HEADER} />
      <Table
        columns={COLUMNS}
        data={transformedData}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={0}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
