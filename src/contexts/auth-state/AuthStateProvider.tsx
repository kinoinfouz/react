import {createContext, ReactNode, useContext, useRef, useState} from 'react'

import {useEffectOnce, useGetSet} from 'react-use'

import {userTokenStorage} from "@/helpers/user.token.storage"

interface Props {
  children: ReactNode
}

interface AuthStateType {
  isAuth: boolean
  accessToken: string
}

interface AuthMethodsType {
  initialize: VoidFunction,
  // setUserData: (user: UserType) => void,
  // setAccessToken: (token: string) => void,
  // fetchUserData: VoidFunction,
  // removeAccessToken: VoidFunction,
  // logout: () => Promise<SignOut>
}

const AuthStateContext = createContext<AuthStateType | null>(null)
const AuthMethodsContext = createContext<AuthMethodsType | null>(null);

const initialState = () => ({
  isAuth: userTokenStorage.hasToken(),
  accessToken: userTokenStorage.getToken(),
  userData: null
})

export const AuthStateProvider = (props: Props) => {
  const {children} = props

  const [initialCheck, setInitialCheck] = useState(false)
  const [getAuthState, setAuthState] = useGetSet<AuthStateType>(initialState)
  const methodsRef = useRef<AuthMethodsType>()

  if (!methodsRef.current) {
    const setUserData = (user: UserType) => {
      setAuthState((prev) => ({
        ...prev,
        userData: user
      }))
    }

    const removeAccessToken = () => {
      userTokenStorage.removeToken()
      delete axiosInstance.defaults.headers['Authorization']
    }

    const fetchUserData = async () => {
      const response = await ProfileApi.getMe()

      const {status} = response
      if (status) {
        const {result} = response
        setUserData(result as UserType)
      } else {
        removeAccessToken()
        setAuthState((prevState) => ({
          ...prevState,
          isAuth: false,
          accessToken: 'bearer-token'
        }))
      }
    }

    const initialize = async () => {
      // const {isAuth, accessToken} = getAuthState()

      // if (isAuth) {
      //   axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`
      //
      //   await fetchUserData()
      // }

      setInitialCheck(true)
    }

    methodsRef.current = {
      // logout,
      // setUserData,
      // removeAccessToken,
      // setAccessToken,
      // fetchUserData,
      initialize
    }
  }

  useEffectOnce(() => {
    methodsRef.current!.initialize()
  })

  if (!initialCheck) {
    return null
  }

  return (
    <AuthStateContext.Provider value={getAuthState()}>
      <AuthMethodsContext.Provider value={methodsRef.current}>
        {children}
      </AuthMethodsContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const useAuthState = (): AuthStateType => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export const useAuthMethods = (): AuthMethodsType => {
  const context = useContext(AuthMethodsContext);

  if (!context) {
    throw new Error("useAuthMethods must be used within a AuthProvider");
  }

  return context;
}
