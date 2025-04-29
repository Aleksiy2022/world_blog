import { Input, Form, Typography, Button, Flex, Row, Col, ConfigProvider } from 'antd'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useCreateArticleMutation, useGetArticleBySlugQuery, useUpdateArticleMutation } from '@/redux/apiSlice.js'

import classes from './article-edit-create-form.module.scss'
import { theme } from './antdTheme.js'

function ArticleEditCreateForm() {
  const navigate = useNavigate()
  const [createArticle, {data: createdArticle, isSuccess}] = useCreateArticleMutation()
  const [updateArticle] = useUpdateArticleMutation()

  const { slug } = useParams()
  const { data } = useGetArticleBySlugQuery({ slug }, { skip: !slug })
  const tagsToEdit = data?.article.tagList.map((item) => ({ tag: item }))

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data ? data.article.title : undefined,
      body: data ? data.article.body : undefined,
      description: data ? data.article.description : undefined,
      tagList: data ? tagsToEdit : [{ tag: '' }],
    },
  })

  const {
    fields,
    append: addTag,
    remove: deleteTag,
  } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit = async (data) => {
    const tagList = data.tagList.map((item) => item.tag)
    const newArticle = {
      article: { ...data, tagList: tagList },
    }
    if (!slug) {
      await createArticle({ newArticle })
    } else {
      await updateArticle({ updatedArticle: newArticle, slug })
      navigate(`/articles/${slug}`)
    }
  }

  if (isSuccess) {
    const newArticleSlug = createdArticle.article.slug
    navigate(`/articles/${newArticleSlug}`)
  }

  return (
    <ConfigProvider theme={theme}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className={classes['form__wrapper']}>
        <Typography.Title level={4} className={classes['form__title']}>
          {slug ? 'Edit article' : 'Create new Article'}
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
            render={({ field }) => (
              <Input.TextArea
                styles={{
                  textarea: { height: '168px' },
                }}
                {...field}
                placeholder="Text"
              />
            )}
          />
        </Form.Item>
        <Row align="bottom" gutter={[17, 0]}>
          <Col flex span={12}>
            <Form.Item label="Tags">
              {fields.map((item, index) => (
                <Flex key={item.id} className={classes['form__tag_wrapper']}>
                  <Controller
                    name={`tagList.${index}.tag`}
                    control={control}
                    rules={{ required: 'Tag is required' }}
                    render={({ field, fieldState }) => (
                      <Input {...field} placeholder="Tag" status={fieldState.error ? 'error' : ''} />
                    )}
                  />
                  <Button
                    className={classes['form__delete-btn']}
                    onClick={() => deleteTag(index)}
                    variant="outlined"
                    danger
                  >
                    Delete
                  </Button>
                </Flex>
              ))}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button
                variant="outlined"
                onClick={() => addTag({ tag: '' })}
                className={classes['form__add-btn']}
                color="primary"
              >
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
