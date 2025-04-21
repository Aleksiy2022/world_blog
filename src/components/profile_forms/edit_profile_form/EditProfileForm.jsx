import { Button, Form, Input, Checkbox } from 'antd'
import { Link } from 'react-router'

import classes from '../profile-form.module.scss'

function EditForm() {
  const [form] = Form.useForm();

  return (
    <div className={classes['form']}>
      <h4 className={classes['form__title']}>Edit Profile</h4>
      <Form layout={'vertical'} form={form} style={{ width: '100%' }}>
        <Form.Item label='Username'>
          <Input name='username' placeholder='Username'></Input>
        </Form.Item>
        <Form.Item label='Email address'>
          <Input name='email' placeholder='Email address'></Input>
        </Form.Item>
        <Form.Item label='New password'>
          <Input name='newPassword' placeholder='New password'></Input>
        </Form.Item>
        <Form.Item label='Avatar image(url)'>
          <Input name='avatar' placeholder='Avatar image'></Input>
        </Form.Item>
        <Form.Item>
          <Button rootClassName={classes['form__btn']} type='primary' block>Save</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditForm
