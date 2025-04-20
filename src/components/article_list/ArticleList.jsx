import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'

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

  const { data: articlesData, isLoading } = useGetArticlesQuery({ limit: 5, offset })
  console.log(useGetArticlesQuery({ limit: 5, offset }))
  let articlesToView = null

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
