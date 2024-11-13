import {Fragment, ReactNode, useState} from 'react'

import {MainNavbar} from '@/layouts/main'

import '@/styles/layouts/l4/layout.min.css'
import '@/styles/layouts/l4/components.min.css'

export const MainLayout = ({children}: { children: ReactNode }) => {
  const [hasAccess, setHasAccess] = useState(true)

  const TeaPot = () => <>Tea pot</>

  return (
    <Fragment>
      <MainNavbar/>
      {/*<Navigation/>*/}

      {/*<Suspense fallback={<p>Loading...</p>}>*/}
        {hasAccess ? children : <TeaPot/>}
      {/*</Suspens>*/}

      {/*<Footer/>*/}
    </Fragment>
  )
}
