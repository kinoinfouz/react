import {createContext, lazy, ReactNode, useContext, useRef, useState} from 'react'
import {useEffectOnce, useGetSet} from 'react-use'

import {userTokenStorage} from '@/helpers/user.token.storage'
import axiosInstance from '@/api/axios-instance'
import {AuthApi} from '@/api/auth/auth.api'

const Error404 = lazy(() => import('@/layouts/error/Error404'))

interface Props {
  children: ReactNode
}

interface AuthStateType {
  isAuth: boolean,
  accessToken: string | null,
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

interface AuthMethodsType {
  initialize: VoidFunction,
  setAccessToken: (token: string) => void,
  fetchUserData: VoidFunction,
  removeAccessToken: VoidFunction,
  setUserData: (user: UserType) => void,
}

const AuthState = createContext<AuthStateType | null>(null)
const AuthMethod = createContext<AuthMethodsType | null>(null)

const initialState = () => ({
  isAuth: userTokenStorage.hasToken(),
  accessToken: userTokenStorage.getToken(),
})

export const AuthStateProvider = (props: Props) => {
  const {children} = props

  const [initialCheck, setInitialCheck] = useState(false)
  const [getAuthState, setAuthState] = useGetSet<AuthStateType>(initialState)
  const methodRef = useRef<AuthMethodsType>()

  if (!methodRef.current) {
    const setUserData = (user: UserType) => {
      setAuthState((prev) => ({
        ...prev,
        userData: user
      }))

      console.log('setUserData')
    }

    const removeAccessToken = () => {
      userTokenStorage.removeToken()
      delete axiosInstance.defaults.headers['Authorization']
    }

    const fetchUserData = async () => {
      const response = await AuthApi.getMe()

      const {status} = response
      if (status) {
        const {data} = response
        setUserData(data as UserType)
      } else {
        removeAccessToken()
        setAuthState((prevState) => ({
          ...prevState,
          isAuth: false,
          accessToken: 'bearer-token'
        }))
      }

      console.log('fetchUserData')
    }

    const setAccessToken = async (token: string) => {
      userTokenStorage.setToken(token)
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`

      setAuthState((prev) => ({
        ...prev,
        accessToken: token,
        isAuth: true,
      }))
    }

    const initialize = async () => {
      const {isAuth, accessToken} = getAuthState()

      if (isAuth) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`

        await fetchUserData()
      }

      setInitialCheck(true)
      console.log('initialize')
    }

    methodRef.current = {
      setUserData,
      removeAccessToken,
      fetchUserData,
      setAccessToken,
      initialize
    }
  }

  useEffectOnce(() => {
    methodRef.current!.initialize()
  })

  if (!initialCheck) {
    return <Error404/>
  }

  return (
    <AuthState.Provider value={getAuthState()}>
      <AuthMethod.Provider value={methodRef.current}>
        {children}
      </AuthMethod.Provider>
    </AuthState.Provider>
  );
}

export const useAuthState = () => {
  const context = useContext(AuthState);

  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export const useAuthMethod = () => {
  const context = useContext(AuthMethod);

  if (!context) {
    throw new Error("useAuthMethod must be used within a AuthProvider");
  }

  return context;
}