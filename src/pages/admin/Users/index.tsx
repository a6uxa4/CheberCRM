import { useState } from 'react'
import Breadcrumbs from '../../../components/BreadCrumbs'
import Table, { ITableData } from '../../../components/Table'
import { Avatar } from '@material-tailwind/react'
import { useGetUsersQuery } from '../../../services/user.service'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { IResBranchAdmin } from '../../../common/branch.common'

export const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState<number | string>(1)

  const [branchData] = useLocalStorage<IResBranchAdmin | any>(
    '_@BRANCH_DATA',
    null
  )

  const { data: personalData = [], isLoading } = useGetUsersQuery(
    branchData.branchId,
    {
      skip: branchData === null
    }
  )

  const COLUMNS = [
    { label: '№', accessKey: 'indexOF' },
    {
      label: 'Лого',
      skeletonKey: 'SKimage',
      action: (item: ITableData) => {
        const avatar = item.avatar as string
        return (
          <Avatar
            placeholder={'hello'}
            src={avatar}
            alt='avatar'
            size='sm'
            withBorder={true}
          />
        )
      }
    },
    { label: 'ФИО', accessKey: 'fullName' },
    { label: 'Номер телефона', accessKey: 'phoneNumber' }
  ]

  const BREADCRUMBS_HEADER = [{ label: 'Клиенты', link: '/users' }]

  const transformedData = personalData.map((item, index) => ({
    ...item,
    indexOF: index + 1
  }))

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
