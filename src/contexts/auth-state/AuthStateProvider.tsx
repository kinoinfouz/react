import {createContext, ReactNode, useContext, useRef, useState} from 'react'
import {useEffectOnce, useGetSet} from 'react-use'

import {userTokenStorage} from '@/helpers/user.token.storage'
import axiosInstance from '@/api/axios-instance'
import {AuthApi} from '@/api/auth/auth.api'

import {AuthMethodsType, AuthStateType, /**ResponseError, UserInterface*/} from '@/types/type'

const AuthState = createContext<AuthStateType | null>(null)
const AuthMethod = createContext<AuthMethodsType | null>(null)

const initialState = () => ({
  isAuth: userTokenStorage.hasToken(),
  accessToken: userTokenStorage.getToken(),
  userData: null
})

export const AuthStateProvider = ({children}: { children: ReactNode }) => {
  const [initialCheck, setInitialCheck] = useState(false)
  const [getAuthState, setAuthState] = useGetSet<AuthStateType>(initialState)
  const methodRef = useRef<AuthMethodsType>()

  if (!methodRef.current) {
    // const logout = async () => {
    //   const response = await AuthApi.logout()
    //
    //   const {status} = response
    //   if (status) {
    //     const {result} = response
    //     const {message} = result as { message: string }
    //
    //     removeAccessToken()
    //
    //     return {
    //       status: true,
    //       message: message
    //     }
    //   } else {
    //     const {error} = response
    //     const {message} = error as ResponseError
    //
    //     return {
    //       status: false,
    //       message: message
    //     }
    //   }
    // }

    // const removeAccessToken = () => {
    //   userTokenStorage.removeToken()
    //   delete axiosInstance.defaults.headers['Authorization']
    // }

    // const setUserData = (user: UserInterface) => {
    //   setAuthState((prev) => ({
    //     ...prev,
    //     userData: user
    //   }))
    // }

    // const setAccessToken = async (token: string) => {
    //   userTokenStorage.setToken(token)
    //   axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`
    //
    //   setAuthState((prev) => ({
    //     ...prev,
    //     accessToken: token,
    //     isAuth: true,
    //   }))
    // }

    const initialize = async () => {
      const {isAuth, accessToken} = getAuthState()

      if (isAuth) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`

        const response = await AuthApi.getMe()

        const {status} = response
        if (status) {
          // const {data} = response
          // setUserData(data as UserInterface)
        } else {
          // removeAccessToken()
          setAuthState((prevState) => ({
            ...prevState,
            isAuth: false,
            accessToken: 'bearer-token'
          }))
        }
      }

      setInitialCheck(true)
    }

    methodRef.current = {
      // logout,
      // removeAccessToken,
      // setUserData,
      // setAccessToken,
      initialize
    }
  }

  useEffectOnce(() => {
    methodRef.current!.initialize()
  })

  if (!initialCheck) {
    return null
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