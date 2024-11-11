import axiosInstance from '@/api/axios-instance'

interface UserCredentials {
  username: string,
  password: string
}

interface ResponseError {
  code: number,
  message: string
}

interface AuthResponse {
  message: string,
  token: string,
}

interface LoginResponse {
  status: boolean,
  data?: AuthResponse,
  error?: ResponseError
}

interface LogoutResponse {
  status: boolean,
  result?: {
    message: string
  },
  error?: ResponseError
}

interface DateTimeInterface {
  human: string,
  string: string,
  timestamp: number,
  format: string,
}

interface UserType {
  id: number,
  username: string,
  display_name: string,
  last_ip: string,
  last_login: DateTimeInterface,
  trashed: boolean,
  su: boolean,
  status: boolean,
  role: [],
  created: DateTimeInterface,
  updated: DateTimeInterface,
  deleted: DateTimeInterface,
}

interface GetMeResponse {
  status: boolean,
  error?: ResponseError,
  data?: UserType
}

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
    const {data} = await axiosInstance.get<GetMeResponse>('auth/me')

    return data
  }
}