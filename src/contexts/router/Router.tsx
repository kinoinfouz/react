import {lazy} from 'react'
import {useRoutes, Navigate} from 'react-router-dom'

import {AuthRouterGuard} from '@/contexts/router'

import {AuthLayout} from '@/layouts/auth'

const Error404 = lazy(() => import('@/layouts/error/Error404'))

const UserPage = lazy(() => import('@/pages/setting/user/UserPage'))

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
          path: 'setting',
          children: [
            {
              path: 'user',
              element: <UserPage/>,
              children: [
                {
                  path: 'list',
                  element: <>User list</>
                }
              ]
            }
          ]
        },
        {
          path: 'error-page',
          element: (<>System error</>)
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