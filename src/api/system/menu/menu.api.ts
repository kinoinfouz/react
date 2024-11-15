import axiosInstance from '@/api/axios-instance'

import {MenuAllResponse} from '@/api/system/menu/menu.type'

export const MenuApi = {
  all: async () => {
    const {data} = await axiosInstance.get<MenuAllResponse>('system/menu/all')

    return data
  }
}