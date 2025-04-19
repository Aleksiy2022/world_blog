import { Pagination } from 'antd';
import { useGetArticlesQuery } from '/src/redux/apiSlice.js'

function ArticleList() {
  const { data: articles } = useGetArticlesQuery(5, 0)
  console.log(articles)

  return (
    <>
      <ul className={'list-reset'}>

      </ul>
      <Pagination align="center" defaultCurrent={1} total={articles?.articlesCount ? articles.articlesCount : 0} defaultPageSize={5} />
    </>
  )
}

function ArticlePreview() {


  return (
    <li>

    </li>
  )
}

export default ArticleList