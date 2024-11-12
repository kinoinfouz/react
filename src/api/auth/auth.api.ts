import axiosInstance from '@/api/axios-instance'

import {GetMeResponse, LoginResponse, LogoutResponse, UserCredentials} from '@/types/type'

export const AuthApi = {
  login: async (credentials: UserCredentials) => {
    const {data} = await axiosInstance.post<LoginResponse>('auth/login', credentials)

    return data
  },

  logout: async () => {
    const {data} = await axiosInstance.get<LogoutResponse>('auth/logout')

    return data
  },

  getMe: async () => {
    const {data} = await axiosInstance.get<GetMeResponse>('/auth/me')

    return data
  }
}