import {useState} from 'react'
import {useForm} from 'react-hook-form'

import {Inputs, Credentials} from '@/types/auth/auth'
import {ResponseError, AuthResponse} from '@/types/response'
import {AuthApi} from '@/api/auth/auth'

import '@/layouts/auth/style.css'

import {CaretCircleRight, Lock, UserCircle} from '@phosphor-icons/react'
import logo from '@/assets/logo.svg'

export const AuthLayout = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>()

  const [errorMessage, setErrorMessage] = useState('')

  const submitForm = async (credentials: Credentials) => {
    const response = await AuthApi.login(credentials)

    const {status} = response
    if (status) {
      const {result} = response
      const {token} = result as AuthResponse

      setAccessToken(token)
      setUserData(user)

      navigate('/')
    } else {
      const {error} = response
      const {message} = error as ResponseError

      setErrorMessage(message)
    }
  }

  return (
    <div className={'page-content'}>
      <div className={'content-wrapper'}>
        <div className={'content-inner'}>
          <div className={'content d-flex justify-content-center align-items-center'}>
            <form className="login-form" onSubmit={handleSubmit(submitForm)}>
              <div className="card mb-0">
                <div className="card-body">
                  <div className="text-center mb-3">
                    <div className="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                      <img src={logo} className="h-48px" alt="Kinoinfo"/>
                    </div>

                    <h5 className="mb-0">Login to your account</h5>
                    <span className="d-block text-muted">Enter your credentials below</span>
                  </div>

                  {errorMessage && <div className="alert alert-danger alert-dismissible fade show">{errorMessage}</div>}

                  <div className="mb-3">
                    <label className="form-label">Имя пользователя</label>

                    <div className="form-control-feedback form-control-feedback-start">
                      <input
                        {...register("username", {
                          required: "Имя пользователя обязательно",
                          minLength: {
                            value: 6,
                            message: "Имя пользователя должно быть не менее 6 символов"
                          }
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Имя пользователя"
                      />

                      <div className="form-control-feedback-icon">
                        <UserCircle
                          size={20}
                          className="text-muted"
                        />
                      </div>

                      <p className="text-danger">{errors.username?.message}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Пароль</label>

                    <div className="form-control-feedback form-control-feedback-start">
                      <input
                        {...register("password", {
                          required: "Пароль обязательно",
                          minLength: {
                            value: 6,
                            message: "Пароль должно быть не менее 6 символов"
                          }
                        })}
                        type="password"
                        className="form-control"
                        placeholder="Пароль"
                      />

                      <div className="form-control-feedback-icon">
                        <Lock
                          size={20}
                          className="text-muted"
                        />
                      </div>

                      <p className="text-danger">{errors.password?.message}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Войти
                      <CaretCircleRight
                        size={20}
                        className="ms-2"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}