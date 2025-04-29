import { Link, useParams } from 'react-router'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { Alert, Tag, Button, Flex, ConfigProvider, Popconfirm, Skeleton } from 'antd'
import { useSelector } from 'react-redux'
import { memo, useMemo } from 'react'

import { useGetArticleBySlugQuery } from '@/redux/apiSlice.js'

import { selectAuth } from '../profile_forms/authSlice.js'

import { useArticleActions } from './hooks.js'
import { editBtn, deleteBtn } from './antTheme.js'
import classes from './article.module.scss'
import unFavoriteImage from './image/unfavorite.svg'
import favoriteImage from './image/favorite.svg'

function Article() {
  const params = useParams()
  const slug = params.slug
  const { data, isLoading, isError } = useGetArticleBySlugQuery({ slug })

  const content = useMemo(() => {
    if (!data) return null
    const { body } = data.article
    const article = { ...data.article, fullArticle: true }
    return (
      <article className={classes['article-wrapper']}>
        <ArticleInfo article={article} />
        <div className={classes['article__content']}>
          <Markdown>{body}</Markdown>
        </div>
      </article>
    )
  }, [data])

  if (isError) {
    return (
      <Alert
        message="Error"
        description="Не удалось загрузить статью. Пожалуйста, перезагрузите страницу или попробуйте еще раз позже."
        type="error"
        showIcon
      />
    )
  }

  if (isLoading) return <Skeleton active />
  return <>{content}</>
}

const ArticleInfo = memo(function ArticleInfo({ article }) {
  const authStatus = useSelector(selectAuth)
  const { fullArticle, title, slug, favorited, favoritesCount, tagList, description, author, createdAt, updatedAt } =
    article
  const articleDate = format(new Date(updatedAt ? updatedAt : createdAt), 'MMMM d, yyyy')
  const { handleFavorite, handleDeleteArticle, handleEditArticle, username, isFavorite, isUnfavorite, isDeleting } =
    useArticleActions(slug, favorited)
  const showButtons = fullArticle && authStatus && author.username === username

  const tagsToView = useMemo(
    () =>
      tagList.map((tag, index) => (
        <li key={index}>
          <Tag rootClassName={classes['article__tag']}>{tag}</Tag>
        </li>
      )),
    [tagList, classes]
  )

  const buttons = (
    <Flex gap={12} rootClassName={classes['article__buttons']}>
      <ConfigProvider theme={deleteBtn}>
        <Popconfirm
          title=""
          description="Are you sure to delete this article?"
          onConfirm={handleDeleteArticle}
          okText="Yes"
          cancelText="No"
          placement="rightTop"
        >
          <Button variant="outlined" color="primary" disabled={isDeleting}>
            Delete
          </Button>
        </Popconfirm>
      </ConfigProvider>
      <ConfigProvider theme={editBtn}>
        <Button variant="outlined" color="primary" onClick={handleEditArticle}>
          Edit
        </Button>
      </ConfigProvider>
    </Flex>
  )

  if (isDeleting) return <Skeleton active />

  return (
    <div className={classes['article']}>
      <div className={classes['article__info']}>
        <div className={classes['title-wrapper']}>
          <h5 className={classes['article__title']}>
            <Link to={`/articles/${slug}`} className={`link-reset ${classes['article__link']}`}>
              {title}
            </Link>
          </h5>
          <button
            className={classes['article__favorite-btn']}
            onClick={handleFavorite}
            disabled={isFavorite || isUnfavorite}
          >
            <img
              src={favorited ? favoriteImage : unFavoriteImage}
              alt="лайка"
              className={classes['article__favorite-img']}
            />
          </button>
          <span className={classes['article__favorite-count']}>{favoritesCount}</span>
        </div>
        <ul className={`list-reset ${classes['article__tags-wrapper']}`}>{tagsToView}</ul>
        <p className={classes['article__description']}>{description}</p>
      </div>
      <div className={classes['author']}>
        <div className={classes['author__info']}>
          <span className={classes['author__username']}>{author.username}</span>
          <span className={classes['article__date']}>{articleDate}</span>
        </div>
        <img src={author.image} alt="Аватар" className={classes['author__image']} />
      </div>
      {showButtons ? buttons : null}
    </div>
  )
})

export default Article
export { ArticleInfo }
