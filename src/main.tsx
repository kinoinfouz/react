import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import {TanStackQueryProvider} from '@/contexts/tan-stack-query'
import {AuthStateProvider} from '@/contexts/auth-state'
import {NotificationProvider} from '@/contexts/notification'

import '@/index.css'

import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackQueryProvider>
      <BrowserRouter>
        <NotificationProvider>
          <AuthStateProvider>
            <App/>
          </AuthStateProvider>
        </NotificationProvider>
      </BrowserRouter>
    </TanStackQueryProvider>
  </StrictMode>
)
