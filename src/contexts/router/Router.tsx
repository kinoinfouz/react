import {lazy} from 'react'
import {useRoutes, Navigate} from 'react-router-dom'

import {AuthRouterGuard} from '@/contexts/router'

import {AuthLayout} from '@/layouts/auth'

const Error404 = lazy(() => import('@/layouts/error/Error404'))

export const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <AuthRouterGuard/>,
      children: [
        {
          path: '/',
          element: <>Home page</>
        },
        {
          path: 'about',
          element: <>About page</>
        },
        {
          path: '404',
          element: <Error404/>
        }
      ]
    },
    {
      path: '/login',
      element: <AuthLayout/>
    },
    {
      path: '*',
      element: <Navigate to='/404' replace/>
    }
  ])
}