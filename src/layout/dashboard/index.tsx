import { Fragment, createElement, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import clsx from 'clsx'
import { DASHBOARD_DATA } from '../../utils/constants/general'
import { BiLogOut } from 'react-icons/bi'
import { useAuth } from '../../hooks/useAuth'
import { distinguishROLE } from '../../utils/helpers/general'
import { useGetBranchAdminQuery } from '../../services/branch.service'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { IResBranchAdmin } from '../../common/branch.common'

export default function Dashboard() {
  const { role } = useAuth()
  const [dashboardOpen, setDashboardOpen] = useState<boolean>(false)

  const { data: BranchData = null } = useGetBranchAdminQuery()

  const [_, setBranchDataLocal] = useLocalStorage<IResBranchAdmin | null>(
    '_@BRANCH_DATA',
    null
  )

  useEffect(() => {
    setBranchDataLocal(BranchData)
  }, [BranchData])

  // const { logout } = useActions()
  const { pathname } = useLocation()

  return (
    <div>
      <aside
        className={clsx(
          'flex flex-col h-screen px-5 py-5 overflow-y-auto duration-500 transition-all bg-white border-r rtl:border-r-0 rtl:border-l',
          {
            'w-52': dashboardOpen,
            'w-16': !dashboardOpen
          }
        )}
      >
        <div className='flex flex-col justify-between flex-1'>
          <nav className='-mx-3 space-y-6 '>
            <div className='w-full flex items-center justify-end'>
              <div
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className='flex items-center cursor-pointer w-11 h-11 px-3 py-3 text-gray-600 transition-colors duration-300 transform rounded-lg bg-gray-200'
              >
                <RxHamburgerMenu size={20} />
              </div>
            </div>
            <div className='space-y-3'>
              {DASHBOARD_DATA[distinguishROLE(role)].map((item, index) => {
                return (
                  <Fragment key={index}>
                    <Link
                      className={clsx(
                        'flex items-center py-3 px-3 text-gray-500 transition-colors duration-300 transform rounded-lg hover:bg-[#31a010] hover:text-white',
                        {
                          'bg-[#31a010] text-white': pathname === item.navigate
                        },
                        {
                          'w-11 h-11 px-3': !dashboardOpen
                        }
                      )}
                      to={item.navigate}
                    >
                      <div>
                        {createElement(item?.icon, {
                          size: '20'
                        })}
                      </div>
                      <span
                        className={clsx('mx-2 text-sm font-medium', {
                          block: dashboardOpen,
                          hidden: !dashboardOpen
                        })}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </Fragment>
                )
              })}
              <hr className='border' />
              <div className='w-full flex items-center cursor-pointer  h-11 px-3 py-3 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-200 hover:text-gray-700'>
                <div>
                  <BiLogOut size={20} />
                </div>
                <span
                  className={clsx('mx-2 text-sm font-medium', {
                    block: dashboardOpen,
                    hidden: !dashboardOpen
                  })}
                >
                  Выйти
                </span>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  )
}
