import { Route, Routes } from 'react-router-dom'
import Layout from '../../layout'

import { CalendarPage } from '../../pages/admin/Calendar'
import { UsersPage } from '../../pages/admin/Users'
import { SettingsPage } from '../../pages/super-admin/Settings'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<CalendarPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
