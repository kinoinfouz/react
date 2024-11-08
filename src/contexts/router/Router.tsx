import {useRoutes} from 'react-router-dom'

import {AuthRouterGuard} from '@/contexts/router'

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
        }
      ]
    }
  ])
}