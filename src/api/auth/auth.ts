import axiosInstance from '@/api/axios-instance'

import {Credentials, LoginResponse} from '@/types/auth/auth'

export const AuthApi = {
  login: async (credentials: Credentials) => {
    const {data} = await axiosInstance.post<LoginResponse>('auth/login', credentials)

    return data
  },

  logout: async () => {
  }
}
