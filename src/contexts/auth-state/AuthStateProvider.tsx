import {ReactNode} from 'react'

interface Props {
  children: ReactNode
}

export const AuthStateProvider = ({children}: Props) => {
  return (
    <>
      {children}
    </>
  )
}