import { TiHome } from 'react-icons/ti'
import { HiBuildingOffice2 } from 'react-icons/hi2'
import { IoMdSettings, IoMdInformationCircle } from 'react-icons/io'
import { MdAnnouncement } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { FaCalendarDays } from 'react-icons/fa6'
import { FaUsers } from 'react-icons/fa'

export const DASHBOARD_DATA = [
  [
    {
      icon: TiHome,
      name: 'Dashboard',
      navigate: '/'
    },
    {
      icon: HiBuildingOffice2,
      name: 'Компании',
      navigate: '/company'
    },
    {
      icon: IoMdInformationCircle,
      name: 'Тарифы',
      navigate: '/tariffs'
    },
    {
      icon: MdAnnouncement,
      name: 'Объявления',
      navigate: '/announcements'
    },
    {
      icon: IoMdSettings,
      name: 'Настройки',
      navigate: '/settings'
    },
    {
      icon: BiSupport,
      name: 'Поддержка',
      navigate: '/supports'
    }
  ],
  [
    {
      icon: TiHome,
      name: 'Dashboard',
      navigate: '/'
    },
    {
      icon: HiBuildingOffice2,
      name: 'Филиалы',
      navigate: '/branches'
    },
    {
      icon: IoMdSettings,
      name: 'Поддержка',
      navigate: '/supports'
    }
  ],
  [
    {
      icon: FaCalendarDays,
      name: 'Календарь',
      navigate: '/'
    },
    {
      icon: FaUsers,
      name: 'Клиенты',
      navigate: '/users'
    },
    {
      icon: IoMdSettings,
      name: 'Настройки',
      navigate: '/settings'
    }
  ]
]
