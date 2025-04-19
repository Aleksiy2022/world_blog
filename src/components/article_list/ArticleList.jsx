import { Pagination, Tag } from 'antd';
import { useGetArticlesQuery } from '/src/redux/apiSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { selectPage, setPage } from './articlesPageSlice.js'
import classes from './article-list.module.scss'
import likeImage from './image/like.svg'

function ArticleList() {
  const dispatch = useDispatch()
  const curPage = useSelector(selectPage)
  const offset = (curPage - 1) * 5

  const { data: articlesData } = useGetArticlesQuery({ limit: 5, offset })
  console.log(curPage)
  console.log(articlesData)

  let articlesToView = null

  if (articlesData) {
    articlesToView = articlesData.articles.map((article) => {
      return (
        <li key={article.slug}>
          <ArticlePreview article={article} />
        </li>
      )
    })
  }

  function handleChangePage(page) {
    dispatch(setPage({ page }))
  }

  return (
    <>
      <ul className={`list-reset ${classes['article-list']}`}>
        {articlesToView}
      </ul>
      <Pagination
        align="center"
        current={curPage}
        total={articlesData?.articlesCount ? articlesData.articlesCount : 0}
        defaultPageSize={5}
        onChange={handleChangePage}
        showSizeChanger={false}/>
    </>
  )
}

function ArticlePreview({ article }) {

  const { title, favoritesCount, tagList, description, body, author, createdAt } = article

  // const tagsToView = tagList.map((tag) => {
  //   return (
  //     <Tag>{tag}</Tag>
  //   )
  // })

  const tagsToView = (
    <>
      <li>
        <Tag rootClassName={classes['article__tag']}>Tag 1</Tag>
      </li>
      <li>
        <Tag rootClassName={classes['article__tag']}>Tag 2</Tag>
      </li>
      <li>
        <Tag rootClassName={classes['article__tag']}>Tag 3</Tag>
      </li>
    </>
  )


  return (
    <article className={`${classes['article']}`}>
      <div className={`${classes['article__info']}`}>
        <div className={`${classes['title-wrapper']}`}>
          <h3 className={`${classes['article__title']}`}>Some article title</h3>
          <img src={likeImage} alt="картинка лайка" className={`${classes['article__likes-img']}`}/>
          <span className={`${classes['article__likes-count']}`}>12</span>
        </div>
        <ul className={`list-reset ${classes['article__tags-wrapper']}`}>
          {tagsToView}
        </ul>
        <p className={`${classes['article__description']}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat. </p>
      </div>
      <div className={`${classes['author']}`}>
        <div>
          <span className={`${classes['author__username']}`}>{author.username}</span>
          <span className={`${classes['author__created']}`}>{createdAt}</span>
        </div>
        <img src={author.image} alt="Аватар" className={classes['author__image']} />
      </div>
    </article>
  )
}

export default ArticleList