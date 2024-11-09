export type Inputs = {
  username: string,
  password: string,
}

export type Credentials = {
  username: string,
  password: string,
}

type AuthResponse = {
  token: string,
  user: UserType
}

export type LoginResponse = {
  status: boolean,
  result?: AuthResponse,
  error?: ResponseError
}
