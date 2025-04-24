import { Link, useParams, useNavigate } from 'react-router'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { Alert, Tag } from 'antd'
import { useSelector } from 'react-redux'

import { selectAuth } from '../profile_forms/authSlice.js'
import SpinLoading from '../spin_loading/SpinLoading.jsx'

import classes from './article.module.scss'
import unFavoriteImage from './image/unfavorite.svg'
import favoriteImage from './image/favorite.svg'

// eslint-disable-next-line import/no-unresolved
import { useGetArticleBySlugQuery, useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '@/redux/apiSlice.js'

function Article() {
  const params = useParams()
  const slug = params.slug
  const jwtData = JSON.parse(localStorage.getItem('blogAuthTokenData'))
  const { data, isLoading, isError } = useGetArticleBySlugQuery({ slug, jwt: jwtData?.authJwt })

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

  if (isLoading) {
    return <SpinLoading />
  }

  let content = null
  if (data) {
    const { body } = data.article
    content = (
      <article className={classes['article-wrapper']}>
        <ArticleInfo article={data.article} />
        <div className={classes['article__content']}>
          <Markdown>{body}</Markdown>
        </div>
      </article>
    )
  }
  return <>{content}</>
}

function ArticleInfo({ article }) {
  const authStatus = useSelector(selectAuth)
  const navigate = useNavigate()
  const [favoriteArticle] = useFavoriteArticleMutation()
  const [unFavoritedArticle] = useUnFavoriteArticleMutation()
  const { title, slug, favorited, favoritesCount, tagList, description, author, createdAt, updatedAt } = article
  const articleDate = format(new Date(updatedAt ? updatedAt : createdAt), 'MMMM d, yyyy')

  const tagsToView = tagList.map((tag, index) => {
    return (
      <li key={index}>
        <Tag rootClassName={classes['article__tag']}>{tag}</Tag>
      </li>
    )
  })

  function handleFavorite() {
    const jwtData = JSON.parse(localStorage.getItem('blogAuthTokenData'))
    if (authStatus && !favorited) {
      favoriteArticle({ slug, jwt: jwtData.authJwt })
    }
    if (authStatus && favorited) {
      unFavoritedArticle({ slug, jwt: jwtData.authJwt })
    }
    if (!authStatus) {
      navigate('/sign-in')
    }
  }

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
    </div>
  )
}

export default Article
export { ArticleInfo }
