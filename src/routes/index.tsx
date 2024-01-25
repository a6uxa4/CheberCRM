import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AdminRoutes } from './adminRoutes'
import SuperAdminRoutes from './superAdminRoutes'

const AppRoute = () => {
  const IsAuthentication = useAuth()

  useEffect(() => {
    if (!IsAuthentication) window.location.href = `https://cheber.online`
  }, [IsAuthentication])

  switch (IsAuthentication.role) {
    case 'ADMIN':
      return <AdminRoutes />
    case 'SUPER_ADMIN':
      return <SuperAdminRoutes />
  }
}

export default AppRoute
