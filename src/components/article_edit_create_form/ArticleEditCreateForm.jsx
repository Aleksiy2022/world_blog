import { Input, Form, Typography, Button, Flex, Row, Col, ConfigProvider } from 'antd'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

import classes from './article-edit-create-form.module.scss'
import { theme } from './antdTheme.js'

// eslint-disable-next-line import/no-unresolved
import { useCreateArticleMutation } from '@/redux/apiSlice.js'

function ArticleEditCreateForm() {
  const [createArticle, { data, isLoading }] = useCreateArticleMutation()
  console.log(data)
  const jwt = JSON.parse(localStorage.getItem('blogAuthTokenData')).authJwt

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: undefined,
      body: undefined,
      description: undefined,
      tags: [{ tag: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = (data) => {
    const tags = data.tags.map((item) => item.tag)
    const newArticle = {
      article: {...data, tags: tags},
    }
    createArticle({ newArticle, jwt })
  }

  return (
    <ConfigProvider theme={theme}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className={classes['form__wrapper']}>
        <Typography.Title level={4} className={classes['form__title']}>
          Create new Article
        </Typography.Title>
        <Form.Item
          label="Title"
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title ? errors.title.message : null}
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => <Input {...field} placeholder="Title" />}
          />
        </Form.Item>
        <Form.Item
          label="Short description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description ? errors.description.message : null}
        >
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => <Input {...field} placeholder="Description" />}
          />
        </Form.Item>
        <Form.Item
          label="Text"
          validateStatus={errors.body ? 'error' : ''}
          help={errors.body ? errors.body.message : null}
        >
          <Controller
            name="body"
            control={control}
            rules={{ required: 'Text is required' }}
            render={({ field }) => <Input.TextArea styles={{
              textarea: { height: '168px' },
            }} {...field} placeholder="Text" />}
          />
        </Form.Item>
        <Row align="bottom" gutter={[17, 0]}>
          <Col flex span={12} >
            <Form.Item label="Tags" >
              {fields.map((item, index) => (
                <Flex key={item.id} className={classes['form__tag_wrapper']}>
                  <Controller
                    name={`tags.${index}.tag`}
                    control={control}
                    rules={{ required: 'Tag is required' }}
                    render={({ field, fieldState }) => (
                      <Input {...field} placeholder="Tag" status={fieldState.error ? 'error' : ''} />
                    )}
                  />
                  <Button className={classes['form__delete-btn']} onClick={() => remove(index)} variant="outlined" danger>
                    Delete
                  </Button>
                </Flex>
              ))}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button variant="outlined" onClick={() => append({ tag: '' })} className={classes['form__add-btn']} color='primary'>
                Add tag
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={classes['form__send-btn']}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}

export default ArticleEditCreateForm
