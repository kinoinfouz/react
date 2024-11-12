import {createContext, ReactNode, useContext} from 'react'
import {toast, ToastContainer, ToastOptions, Zoom} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

type NotificationType = 'error' | 'success'

interface NotificationContextInterface {
  notification: (type: NotificationType, message?: string, options?: ToastOptions<unknown>) => void
}

const NotificationContext = createContext<NotificationContextInterface | null>(null)

const notification = (type: NotificationType, message?: string, options?: ToastOptions<unknown>) => {
  toast[type](message, {...options})
}

export const NotificationProvider = ({children}: { children: ReactNode }) => {
  return (
    <NotificationContext.Provider value={{notification}}>
      {children}
      <ToastContainer
        position={'top-center'}
        autoClose={5000}
        transition={Zoom}
        hideProgressBar={false}
        pauseOnHover={true}
        pauseOnFocusLoss={true}
        stacked={false}
        newestOnTop={false}
        draggable={'mouse'}
        theme={'dark'}
      />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification should be used within NotificationProvider');
  }

  return context;
}
