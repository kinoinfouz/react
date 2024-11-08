import {ReactNode} from 'react'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

interface Props {
  children: ReactNode
}

const queryClient = new QueryClient()

export const TanStackQueryProvider = (props: Props) => {
  const {children} = props

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}