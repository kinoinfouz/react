import {ReactNode} from 'react'

interface Props {
  children: ReactNode
}

export const MainLayout = ({children}: Props) => {
  return (
    <>
      {children}
    </>
  )
}