import {ReactNode} from 'react'

interface Props {
  children: ReactNode
}

export const NotificationProvider = (props: Props) => {
  const {children} = props

  return (
    <>
      {children}
    </>
  )
}