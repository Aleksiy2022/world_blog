import { Link, useParams } from 'react-router'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { Alert, Tag } from 'antd'

import SpinLoading from '../spin_loading/SpinLoading.jsx'

import classes from './article.module.scss'
import likeImage from './image/like.svg'

// eslint-disable-next-line import/no-unresolved
import { useGetArticleBySlugQuery } from '@/redux/apiSlice.js'

function Article() {
  let params = useParams()
  let slug = params.slug
  const { data, isLoading, isError } = useGetArticleBySlugQuery({ slug })

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
        <Markdown>{body}</Markdown>
      </article>
    )
  }
  return <>{content}</>
}

function ArticleInfo({ article }) {
  const { title, slug, favoritesCount, tagList, description, author, createdAt, updatedAt } = article
  const articleDate = format(new Date(updatedAt ? updatedAt : createdAt), 'MMMM d, yyyy')

  const tagsToView = tagList.map((tag, index) => {
    return (
      <li key={index}>
        <Tag rootClassName={classes['article__tag']}>{tag}</Tag>
      </li>
    )
  })

  return (
    <div className={classes['article']}>
      <div className={classes['article__info']}>
        <div className={classes['title-wrapper']}>
          <h3 className={classes['article__title']}>
            <Link to={`/articles/${slug}`} className={`link-reset ${classes['article__link']}`}>
              {title}
            </Link>
          </h3>
          <img src={likeImage} alt="лайка" className={classes['article__likes-img']} />
          <span className={classes['article__likes-count']}>{favoritesCount}</span>
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
