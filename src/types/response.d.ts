import {AuthDataInterface, UserInterface} from '@/types/auth'

export interface ResponseError {
  code: number,
  message: string
}

export interface LoginResponse {
  status: boolean,
  data?: AuthDataInterface,
  error?: ResponseError,
}

export interface GetMeResponse {
  status: boolean,
  error?: ResponseError,
  data?: UserInterface
}

export interface LogoutResponse {
  status: boolean,
  data?: {
    message: string
  },
  error?: ResponseError
}
