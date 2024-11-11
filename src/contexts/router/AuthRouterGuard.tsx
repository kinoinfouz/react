import {Navigate, Outlet} from 'react-router-dom'

import {useAuthState} from '@/contexts/auth-state'
import {MainLayout} from '@/layouts/main'

export const AuthRouterGuard = () => {
  const {isAuth} = useAuthState()

  if (isAuth) {
    return (
      <MainLayout>
        <Outlet/>
      </MainLayout>
    )
  }

  return <Navigate to={'/login'} replace/>
}