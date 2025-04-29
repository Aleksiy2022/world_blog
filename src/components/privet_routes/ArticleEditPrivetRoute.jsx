import { Navigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { useGetArticleBySlugQuery, useGetUserQuery } from '@/redux/apiSlice.js'
import { selectAuth } from '@/components/profile_forms/authSlice.js'

function ArticleEditPrivetRoute({ children }) {
  const authStatus = useSelector(selectAuth)
  const params = useParams()
  const slug = params?.slug
  const { data: curUser } = useGetUserQuery(undefined, { skip: true })
  const { data: curArticle } = useGetArticleBySlugQuery({ slug }, { skip: true })

  if (!authStatus) return <Navigate to={`/articles/${slug}`} />

  const showArticleEdit = curUser?.user.username === curArticle?.article.author

  return showArticleEdit ? children : Navigate(`/articles/${slug}`)
}

export default ArticleEditPrivetRoute
