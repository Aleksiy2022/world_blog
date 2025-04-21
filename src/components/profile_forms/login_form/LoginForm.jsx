import { Button, Form, Input } from 'antd'
import { Link } from 'react-router'

import classes from '../profile-form.module.scss'

function LoginForm() {
  const [form] = Form.useForm();

  return (
    <div className={classes['form']}>
      <h4 className={classes['form__title']}>Sign in</h4>
      <Form layout={'vertical'} form={form} style={{ width: '100%'}}>
        <Form.Item label='Email address'>
          <Input name='email' placeholder='Email address'></Input>
        </Form.Item>
        <Form.Item label='Password'>
          <Input name='password' placeholder='Password'></Input>
        </Form.Item>
        <Form.Item>
          <Button rootClassName={classes['form__btn']} type='primary' block>Login</Button>
        </Form.Item>
      </Form>
      <span className={classes['form__prompt']}>Dont`t have an account? <Link to='/sign-up' className={classes['form__link']}>Sign Un</Link>.</span>
    </div>
  )
}

export default LoginForm
