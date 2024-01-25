import Layout from '../../layout'
import { Route, Routes } from 'react-router-dom'

import { DashboardPage } from '../../pages/owner/Dashboard'
import { BranchPage } from '../../pages/owner/Branch'
import { SupportPage } from '../../pages/owner/Support'

export default function OwnerRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/branches' element={<BranchPage />} />
        <Route path='/supports' element={<SupportPage />} />
      </Route>
    </Routes>
  )
}
