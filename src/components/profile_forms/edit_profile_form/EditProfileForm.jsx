import { Button, Form, Input, Spin } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Navigate } from 'react-router'

import classes from '../profile-form.module.scss'

// eslint-disable-next-line import/no-unresolved
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/apiSlice.js'

function EditForm({ authStatus }) {

  const [updateUser, { isLoading: isUpdate, isError, error }] = useUpdateUserMutation()
  const jwt = JSON.parse(localStorage.getItem('blogAuthToken'))
  const { data, isLoading: isGetUser } = useGetUserQuery({ jwt })

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      username: undefined,
      email: undefined,
      password: undefined,
      image: null,
    },
  })

  useEffect(() => {
    if (data) {
      setValue('username', data.user.username)
      setValue('email', data.user.email)
      setValue('image', data.user.image)
    }
  }, [data])

  useEffect(() => {
    if (error?.data.errors.username) {
      setError('username', error.data.errors.username)
    }
    if (error?.data.errors.email) {
      setError('email', error.data.errors.email)
    }
  }, [isError])

  const onSubmit = async (userData) => {
    const response = await updateUser({ userData, jwt })
    if (!isError) {
      const newRegJwt = response.data.user.token
      const email = response.data.user.email
      localStorage.setItem('blogRegisterData', JSON.stringify({ token: newRegJwt, email: email }))
    }
  }

  const content = (
    <div className={classes['form']}>
      <h4 className={classes['form__title']}>Edit Profile</h4>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Form.Item
          label="Username"
          validateStatus={errors.username ? 'error' : ''}
          help={
            errors.username
              ? isError && error.data.errors.username
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

        <Form.Item
          label="Email address"
          validateStatus={errors.email ? 'error' : ''}
          help={
            errors.email ? (isError && error.data.errors.email ? `Email is already taken.` : 'Email is required') : ''
          }
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
            render={({ field }) => <Input {...field} placeholder="Email address" type="email" />}
          />
        </Form.Item>

        <Form.Item
          label="New password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password ? errors.password.message : ''}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: false,
              minLength: {
                value: 6,
                message: 'Your new password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your new password needs to be no more than 40 characters.',
              },
            }}
            render={({ field }) => <Input.Password {...field} placeholder="Password" />}
          />
        </Form.Item>

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

        <Form.Item>
          <Button rootClassName={classes['form__btn']} type="primary" block htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )

  if (!authStatus) {
    return <Navigate to={'/sign-in'} />
  }

  if (isGetUser || isUpdate) {
    return (
      <Spin tip="Loading..." size="large">
        {content}
      </Spin>
    )
  } else {
    return <>{content}</>
  }
}

export default EditForm
