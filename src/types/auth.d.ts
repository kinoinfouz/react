import {DateTimeInterface} from '@/types/type'

export interface UserInterface {
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

export interface UserCredentialsInterface {
  username: string,
  password: string,
}

export interface AuthDataInterface {
  message: string,
  token: string,
}

export interface AuthStateInterface {
  isAuth: boolean,
  accessToken: string | null,
  userData: UserInterface | null
}

export interface AuthMethodInterface {
  initialize: VoidFunction,
  setAccessToken: (token: string) => void,
  setUserData: (user: UserInterface) => void,
  removeAccessToken: VoidFunction,
  logout: () => Promise<{
    status: boolean,
    message: string
  }>
}
