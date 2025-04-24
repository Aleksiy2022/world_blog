import { useSelector, useDispatch } from 'react-redux'
import { Pagination, Alert } from 'antd'

import { ArticleInfo } from '../article/Article.jsx'
import SpinLoading from '../spin_loading/SpinLoading.jsx'

import { selectPage, setPage } from './articlesPageSlice.js'
import classes from './article-list.module.scss'

// eslint-disable-next-line import/no-unresolved
import { useGetArticlesQuery } from '@/redux/apiSlice.js'

function ArticleList() {
  const dispatch = useDispatch()
  const curPage = useSelector(selectPage)
  const offset = (curPage - 1) * 5
  const jwtData = JSON.parse(localStorage.getItem('blogAuthTokenData'))

  const { data: articlesData, isLoading, isError } = useGetArticlesQuery({ limit: 5, offset, jwt: jwtData?.authJwt })
  let articlesToView = null
  console.log(isLoading)
  if (isError) {
    return (
      <Alert
        message="Error"
        description="Не удалось загрузить статьи. Пожалуйста, перезагрузите страницу или попробуйте еще раз позже."
        type="error"
        showIcon
      />
    )
  }

  if (isLoading) {
    return <SpinLoading />
  }

  if (articlesData) {
    articlesToView = articlesData.articles.map((article) => {
      return (
        <li key={article.slug}>
          <ArticleInfo article={article} />
        </li>
      )
    })
  }

  function handleChangePage(page) {
    dispatch(setPage({ page }))
  }

  return (
    <>
      <ul className={`list-reset ${classes['article-list']}`}>{articlesToView}</ul>
      <Pagination
        align="center"
        current={curPage}
        total={articlesData?.articlesCount ? articlesData.articlesCount : 0}
        defaultPageSize={5}
        onChange={handleChangePage}
        showSizeChanger={false}
      />
    </>
  )
}

export default ArticleList
