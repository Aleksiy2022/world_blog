import { Button, Form, Input } from 'antd'
import { Link } from 'react-router'
import { useForm, Controller } from 'react-hook-form'

import classes from '../profile-form.module.scss'

function LoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className={classes['form']}>
      <h4 className={classes['form__title']}>Sign in</h4>
      <Form layout={'vertical'} onFinish={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Form.Item
          label="Email address"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email ? 'Email is required' : ''}
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
