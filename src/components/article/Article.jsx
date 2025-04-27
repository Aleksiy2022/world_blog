import { Link, useParams, useNavigate } from 'react-router'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { Alert, Tag, Button, Flex, ConfigProvider, Popconfirm, Skeleton } from 'antd'
import { useSelector } from 'react-redux'

import apiSlice, {
  useGetArticleBySlugQuery,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
  useDeleteArticleMutation,
} from '@/redux/apiSlice.js'

import { selectAuth } from '../profile_forms/authSlice.js'

import { editBtn, deleteBtn } from './antTheme.js'
import classes from './article.module.scss'
import unFavoriteImage from './image/unfavorite.svg'
import favoriteImage from './image/favorite.svg'

function Article() {
  const params = useParams()
  const slug = params.slug
  const { data, isLoading, isError } = useGetArticleBySlugQuery({ slug })

  let content = null
  if (data) {
    const { body } = data.article
    const article = { ...data.article, fullArticle: true }
    content = (
      <article className={classes['article-wrapper']}>
        <ArticleInfo article={article} />
        <div className={classes['article__content']}>
          <Markdown>{body}</Markdown>
        </div>
      </article>
    )
  }

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

function ArticleInfo({ article }) {
  const authStatus = useSelector(selectAuth)
  const navigate = useNavigate()
  const [favoriteArticle] = useFavoriteArticleMutation()
  const [unFavoriteArticle] = useUnFavoriteArticleMutation()
  const [deleteArticle] = useDeleteArticleMutation()
  const { data: curUser } = apiSlice.endpoints.getUser.useQueryState()
  const { fullArticle, title, slug, favorited, favoritesCount, tagList, description, author, createdAt, updatedAt } =
    article
  const articleDate = format(new Date(updatedAt ? updatedAt : createdAt), 'MMMM d, yyyy')

  const tagsToView = tagList.map((tag, index) => {
    return (
      <li key={index}>
        <Tag rootClassName={classes['article__tag']}>{tag}</Tag>
      </li>
    )
  })

  function handleFavorite() {
    if (authStatus && !favorited) {
      favoriteArticle({ slug })
    }
    if (authStatus && favorited) {
      unFavoriteArticle({ slug })
    }
    if (!authStatus) {
      navigate('/sign-in')
    }
  }

  function handleDeleteArticle() {
    deleteArticle({ slug })
    navigate('/')
  }

  function handleEditArticle() {
    navigate(`/articles/${slug}/edit`)
  }

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
          <Button variant="outlined" color="primary">
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

  const showButtons = fullArticle && authStatus && author.username === curUser.user.username

  return (
    <div className={classes['article']}>
      <div className={classes['article__info']}>
        <div className={classes['title-wrapper']}>
          <h5 className={classes['article__title']}>
            <Link to={`/articles/${slug}`} className={`link-reset ${classes['article__link']}`}>
              {title}
            </Link>
          </h5>
          <button className={classes['article__favorite-btn']} onClick={handleFavorite}>
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
}

export default Article
export { ArticleInfo }
