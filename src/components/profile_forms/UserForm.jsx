import { Button, Checkbox, Form, Input, Spin } from 'antd'
import { Link, useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import apiSlice, { useCreateNewUserMutation, useLoginMutation, useGetUserQuery, useUpdateUserMutation } from '@/redux/apiSlice.js'

import { useLogin } from './hooks.js'
import classes from './profile-form.module.scss'
import { getJwtExpiration } from './utils.js'

function UserForm({ register, login, edit }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [createNewUser, { data: newUser, isLoading: isCreatingUser, isError: isCreateError, error: createError }] =
    useCreateNewUserMutation()

  const [updateUser, { data: updatedUser, isLoading: isUpdatingUser, isError: isUpdatingError, error: updateError }] =
    useUpdateUserMutation()
  const { data: curUser, isLoading: isGetingUser } = useGetUserQuery()
  const { refetch } = apiSlice.endpoints.getUser.useQuerySubscription()
  const [loginUser, { data: userData, isLoading: isLoging, isError: isLoginError, loginError }] = useLoginMutation()
  const email = JSON.parse(localStorage.getItem('blogAuthTokenData'))?.email

  const user = newUser ? newUser : userData

  useLogin({ user, dispatch, navigate, isRegister: true }, refetch)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      username: undefined,
      email: email ?? login ? email : '',
      password: undefined,
      repeatPassword: undefined,
      agree: true,
      image: null,
    },
  })

  useEffect(() => {
    if (createError?.data.errors.username) {
      setError('username', createError.data.errors.username)
    }
    if (createError?.data.errors.email) {
      setError('email', createError.data.errors.email)
    }
  }, [isCreateError])

  useEffect(() => {
    if (curUser && edit) {
      setValue('username', curUser.user.username)
      setValue('email', curUser.user.email)
      setValue('image', curUser.user.image)
    }
  }, [curUser])

  useEffect(() => {
    if (updateError?.data.errors.username) {
      setError('username', updateError.data.errors.username)
    }
    if (updateError?.data.errors.email) {
      setError('email', updateError.data.errors.email)
    }
  }, [isUpdatingError])

  useEffect(() => {
    if (loginError?.data.errors) {
      setError('email', loginError.data.errors['email or password'])
      setError('password', loginError.data.errors['email or password'])
    }
  }, [isLoginError])

  const onSubmit = async (formData) => {
    if (register) {
      await createNewUser({ formData })
    }
    if (edit) {
      await updateUser({ formData })
      if (updatedUser) {
        const jwt = updatedUser.user.token
        const expiresAt = getJwtExpiration(jwt)
        localStorage.setItem('blogAuthTokenData', JSON.stringify({ jwt: jwt, expiresAt: expiresAt }))
      }
    }
    if (login) {
      await loginUser({ formData })
    }
  }

  const usernameField = (
    <Form.Item
      label="Username"
      validateStatus={errors.username ? 'error' : ''}
      help={
        errors.username
          ? isCreateError && createError.data.errors.username
            ? `Username is already taken.`
            : errors.username.message
          : ''
      }
    >
      <Controller
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Your username needs to be at least 3 characters.',
          },
          maxLength: {
            value: 20,
            message: 'Your username needs to be no more than 20 characters.',
          },
        }}
        render={({ field }) => <Input {...field} placeholder="Username" />}
      />
    </Form.Item>
  )

  const emailField = (
    <Form.Item
      label="Email address"
      validateStatus={errors.email ? 'error' : ''}
      help={
        errors.email
          ? isCreateError && createError.data.errors.email
            ? `Email is already taken.`
            : 'Email is required'
          : ''
      }
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
        render={({ field }) => <Input {...field} placeholder="Email address" type="email" />}
      />
    </Form.Item>
  )

  const passwordField = (
    <Form.Item
      label="Password"
      validateStatus={errors.password ? 'error' : ''}
      help={errors.password ? errors.password.message : ''}
    >
      <Controller
        name="password"
        control={control}
        rules={{
          required: register || login,
          minLength: {
            value: 6,
            message: 'Your password needs to be at least 6 characters.',
          },
          maxLength: {
            value: 40,
            message: 'Your password needs to be no more than 40 characters.',
          },
        }}
        render={({ field }) => <Input.Password {...field} placeholder="Password" />}
      />
    </Form.Item>
  )

  const repeatPasswordField = (
    <Form.Item
      label="Repeat Password"
      validateStatus={errors.repeatPassword ? 'error' : ''}
      help={errors.repeatPassword ? errors.repeatPassword.message : ''}
    >
      <Controller
        name="repeatPassword"
        control={control}
        rules={{
          required: 'Please repeat your password',
          validate: (value) => value === control._formValues.password || 'Passwords must match',
        }}
        render={({ field }) => <Input.Password {...field} placeholder="Password" />}
      />
    </Form.Item>
  )

  const imageFiled = (
    <Form.Item
      label="Avatar image(url)"
      validateStatus={errors.image ? 'error' : ''}
      help={errors.image ? errors.image.message : ''}
    >
      <Controller
        name="image"
        control={control}
        rules={{
          validate: {
            isUrl: (value) => {
              if (!value) return true // если поле не обязательно
              try {
                new URL(value)
                return true
              } catch (e) {
                return 'Некорректный URL.'
              }
            },
          },
        }}
        render={({ field }) => <Input {...field} placeholder="Avatar image" />}
      />
    </Form.Item>
  )

  const checkboxField = (
    <Form.Item validateStatus={errors.agree ? 'error' : ''} help={errors.agree ? 'You must agree to continue' : ''}>
      <Controller
        name="agree"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox {...field} checked={field.value} className={classes['form__checkbox']}>
            I agree to the processing of my personal information
          </Checkbox>
        )}
      />
    </Form.Item>
  )

  const registerFields = (
    <>
      {usernameField}
      {emailField}
      {passwordField}
      {repeatPasswordField}
      {checkboxField}
    </>
  )

  const editFields = (
    <>
      {usernameField}
      {emailField}
      {passwordField}
      {imageFiled}
    </>
  )

  const loginFields = (
    <>
      {emailField}
      {passwordField}
    </>
  )

  let formTitle
  if (register) {
    formTitle = 'Create new account'
  }
  if (edit) {
    formTitle = 'Edit Profile'
  }
  if (login) {
    formTitle = 'Sign In'
  }

  let formFields
  if (register) {
    formFields = registerFields
  }
  if (edit) {
    formFields = editFields
  }
  if (login) {
    formFields = loginFields
  }

  let formBtnText
  if (register) {
    formBtnText = 'Create'
  }
  if (edit) {
    formBtnText = 'Save'
  }
  if (login) {
    formBtnText = 'Login'
  }

  const prompt = (
    <span className={classes['form__prompt']}>
      {register ? 'Already have an account? ' : 'Dont`t have an account? '}
      <Link to={register ? '/sign-in' : '/sign-up'} className={classes['form__link']}>
        {register ? 'Sign-in' : 'Sign-up'}
      </Link>
    </span>
  )

  const content = (
    <div className={classes['form']}>
      <h4 className={classes['form__title']}>{formTitle}</h4>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        {formFields}
        <Form.Item>
          <Button className={classes['form__btn']} type="primary" block htmlType="submit">
            {formBtnText}
          </Button>
        </Form.Item>
      </Form>
      {!edit ? prompt : null}
    </div>
  )

  if (isCreatingUser || isUpdatingUser || isLoging || isGetingUser) {
    return (
      <Spin tip="Loading..." size="large">
        {content}
      </Spin>
    )
  }
  return <>{content}</>
}

export default UserForm
