import { useSelector, useDispatch } from 'react-redux'
import { Pagination, Alert, Skeleton } from 'antd'

import { useGetArticlesQuery } from '@/redux/apiSlice.js'

import { ArticleInfo } from '../article/Article.jsx'

import { selectPage, setPage } from './articlesPageSlice.js'
import classes from './article-list.module.scss'

function ArticleList() {
  const dispatch = useDispatch()
  const curPage = useSelector(selectPage)
  const offset = (curPage - 1) * 5
  const { data, isLoading, isError } = useGetArticlesQuery({ limit: 5, offset })

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

  if (isLoading) return <Skeleton active />

  const articles = data?.articles || []
  const total = data?.articlesCount || 0

  const handleChangePage = (page) => {
    dispatch(setPage({ page }))
  }

  return (
    <>
      <ul className={`list-reset ${classes['article-list']}`}>
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleInfo article={article} />
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Pagination current={curPage} total={total} pageSize={5} onChange={handleChangePage} showSizeChanger={false} />
      </div>
    </>
  )
}

export default ArticleList
