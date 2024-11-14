import {useQuery} from '@tanstack/react-query'

import {MenuApi} from '@/api/system/menu.api'

export const useNavbarMenus = () => {
  const {data, isLoading} = useQuery({
    queryKey: MenuApi.all(),
    queryFn: () => {}
  })

  return {data, isLoading}
}
