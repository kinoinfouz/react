import axiosInstance from '@/api/axios-instance'

export const MenuApi = {
  all: async () => {
    const {data} = await axiosInstance.get<{status: boolean}>('system/menu/all')

    return data
  }
}
