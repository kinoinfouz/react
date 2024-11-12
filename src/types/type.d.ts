export interface UserCredentials {
  username: string,
  password: string
}

export interface ResponseError {
  code: number,
  message: string
}

export interface AuthResponse {
  message: string,
  token: string,
}

export interface LoginResponse {
  status: boolean,
  data?: AuthResponse,
  error?: ResponseError
}

export interface LogoutResponse {
  status: boolean,
  result?: {
    message: string
  },
  error?: ResponseError
}

export interface DateTimeInterface {
  human: string,
  string: string,
  timestamp: number,
  format: string,
}

export interface UserType {
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

export interface GetMeResponse {
  status: boolean,
  error?: ResponseError,
  data?: UserType
}

export interface Inputs {
  username: string,
  password: string
}

export interface Credentials {
  username: string,
  password: string
}

export interface AuthStateType {
  isAuth: boolean,
  accessToken: string | null,
  userData: UserInterface | null
}

export interface Logout {
  status: boolean,
  message: string
}

export interface AuthMethodsType {
  initialize: VoidFunction,
  setAccessToken: (token: string) => void,
  removeAccessToken: VoidFunction,
  setUserData: (user: UserInterface) => void,
  logout: () => Promise<Logout>
}