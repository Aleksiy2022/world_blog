import { Button, Checkbox, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

import classes from '../profile-form.module.scss'

// eslint-disable-next-line import/no-unresolved
import { useCreateNewUserMutation } from '@/redux/apiSlice.js'

function RegisterForm() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agree: true,
    },
  })

  const [createNewUser, { isError, error }] = useCreateNewUserMutation()

  useEffect(() => {
    if (error?.data.errors.username) {
      setError('username', error.data.errors.username)
    }
    if (error?.data.errors.email) {
      setError('email', error.data.errors.email)
    }
  }, [isError])

  const onSubmit = async (formData) => {
    const userData = {
      user: {
        username: formData.username,
        email: formData.email.toLowerCase(),
        password: formData.password,
      },
    }
    const response = await createNewUser({ userData })
    if (response?.data) {
      const jwt = response.data.user.token
      const email = response.data.user.email
      localStorage.setItem('blogRegisterData', JSON.stringify({ 'token': jwt, 'email': email }))
      navigate('/sign-in')
    }
  }

  return (
    <div className={classes['form']}>
      <h4 className={classes['form__title']}>Create new account</h4>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password ? errors.password.message : ''}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
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

        <Form.Item>
          <Button className={classes['form__btn']} type="primary" block htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
      <span className={classes['form__prompt']}>
        Already have an account?
        <Link to="/sign-in" className={classes['form__link']}>
          Sign In
        </Link>
      </span>
    </div>
  )
}

export default RegisterForm
