import {useQuery} from '@tanstack/react-query'

import {MenuApi} from '@/api/system/menu/menu.api'

export const useNavbarMenus = () => {
  const {data, isLoading} = useQuery({
    queryKey: MenuQueryKeys.menus(),
    queryFn: MenuApi.menus
  })

  return {data, isLoading}
}
