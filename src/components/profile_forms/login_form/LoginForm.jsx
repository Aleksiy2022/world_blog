import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setProfile } from '../profileSlice.js'
import classes from '../profile-form.module.scss'

// eslint-disable-next-line import/no-unresolved
import { useLoginMutation } from '@/redux/apiSlice.js'

function LoginForm() {
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const [login, { isError, error }] = useLoginMutation()
  const savedAuthData = JSON.parse(localStorage.getItem('blogRegisterData'))
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: savedAuthData.email,
      password: '',
    },
  })

  useEffect(() => {
    if (error?.data.errors) {
      setError('email', error.data.errors['email or password'])
      setError('password', error.data.errors['email or password'])
    }
  }, [isError])

  const onSubmit = async (formData) => {
    const loginData = { user: { ...formData } }
    const jwt = JSON.parse(localStorage.getItem('blogRegisterData')).token
    const response = await login({ loginData, jwt })
    const userData = response.data?.user
    if (userData) {
      localStorage.setItem('blogAuthData', JSON.stringify(userData))
      const { username, image, email } = userData
      dispatch(setProfile({username, image, email}))
      navigate("/profile")
    }
  }

  return (
    <div className={classes['form']}>
      <h4 className={classes['form__title']}>Sign in</h4>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Form.Item
          label="Email address"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email ? (isError ? 'Email or password is invalid' : 'Email is required') : ''}
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
            rules={{ required: 'Password is required' }}
            render={({ field }) => <Input.Password {...field} placeholder="Password" />}
          />
        </Form.Item>
        <Form.Item>
          <Button rootClassName={classes['form__btn']} type="primary" block htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <span className={classes['form__prompt']}>
        Dont`t have an account?{' '}
        <Link to="/sign-up" className={classes['form__link']}>
          Sign Un
        </Link>
        .
      </span>
    </div>
  )
}

export default LoginForm
