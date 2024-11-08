import {Outlet} from 'react-router-dom'

import {MainLayout} from '@/layouts/main'

export const AuthRouterGuard = () => {
  return (
    <MainLayout>
      <Outlet/>
    </MainLayout>
  )
}