import Layout from '../../layout'
import { Route, Routes } from 'react-router-dom'

import { DashboardPage } from '../../pages/super-admin/Dashboard'
import { CompanyPage } from '../../pages/super-admin/Company'
import { SettingsPage } from '../../pages/super-admin/Settings'
import { TariffsPage } from '../../pages/super-admin/Tariffs'
import { AnnouncommentsPage } from '../../pages/super-admin/Anouncoments'
import { SupportsPage } from '../../pages/super-admin/Support'

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/company' element={<CompanyPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/tariffs' element={<TariffsPage />} />
        <Route path='/announcements' element={<AnnouncommentsPage />} />
        <Route path='/supports' element={<SupportsPage />} />
      </Route>
    </Routes>
  )
}
