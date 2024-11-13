import axiosInstance from '@/api/axios-instance'

import {UserCredentialsInterface} from '@/types/auth'
import {GetMeResponse, LoginResponse, LogoutResponse} from '@/types/response'

export const AuthApi = {
  login: async (credentials: UserCredentialsInterface) => {
    const {data} = await axiosInstance.post<LoginResponse>('auth/login', credentials)

    return data
  },

  getMe: async () => {
    const {data} = await axiosInstance.get<GetMeResponse>('/auth/me')

    return data
  },

  logout: async () => {
    const {data} = await axiosInstance.delete<LogoutResponse>('auth/logout')

    return data
  }
}