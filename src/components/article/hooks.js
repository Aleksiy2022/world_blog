import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useCallback } from 'react';

import apiSlice, {
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
  useDeleteArticleMutation,
} from '@/redux/apiSlice.js'

import { selectAuth } from '../profile_forms/authSlice.js'

function useArticleActions(slug, favorited) {
  const authStatus = useSelector(selectAuth);
  const navigate = useNavigate();
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unFavoriteArticle] = useUnFavoriteArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  const { data: curUser } = apiSlice.endpoints.getUser.useQueryState()

  const handleFavorite = useCallback(() => {
    if (authStatus && !favorited) {
      favoriteArticle({ slug })
    }
    if (authStatus && favorited) {
      unFavoriteArticle({ slug })
    }
    if (!authStatus) {
      navigate('/sign-in')
    }
  }, [authStatus, favorited, slug, navigate, unFavoriteArticle])

  const handleDeleteArticle = useCallback(() => {
    deleteArticle({ slug })
    navigate('/')
  }, [slug, navigate, deleteArticle])

  const handleEditArticle = useCallback(() => {
    navigate(`/articles/${slug}/edit`)
  }, [slug, navigate])

  const username = curUser?.user?.username

  return { handleFavorite, handleDeleteArticle, handleEditArticle, username }
}

export { useArticleActions }