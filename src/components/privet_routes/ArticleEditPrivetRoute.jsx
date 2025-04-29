import { Navigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { useGetArticleBySlugQuery, useGetUserQuery } from '@/redux/apiSlice.js'
import { selectAuth } from '@/components/profile_forms/authSlice.js'

function ArticleEditPrivetRoute({ children }) {
  const authStatus = useSelector(selectAuth)
  const params = useParams()
  const slug = params?.slug
  const { data: curUser } = useGetUserQuery()
  const { data: curArticle } = useGetArticleBySlugQuery({ slug })

  if (!authStatus) return <Navigate to={`/articles/${slug}`} />

  const showArticleEdit = curUser?.user.username === curArticle?.article.author.username
  return showArticleEdit ? children : <Navigate to ={`/articles/${slug}`} />
}

export default ArticleEditPrivetRoute
