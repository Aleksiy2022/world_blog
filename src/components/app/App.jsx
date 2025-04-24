import { Routes, Route } from 'react-router'
import { ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Header from '../header/Header.jsx'
import ArticleList from '../article_list/ArticleList.jsx'
import Article from '../article/Article.jsx'
import RegisterForm from '../profile_forms/register_form/RegisterForm.jsx'
import LoginForm from '../profile_forms/login_form/LoginForm.jsx'
import EditProfileForm from '../profile_forms/edit_profile_form/EditProfileForm.jsx'
import ArticleEditCreateForm from '../article_edit_create_form/ArticleEditCreateForm.jsx'
import PrivateRoute from '../privet_route/PrivetRoute.jsx'
import SpinLoading from '../spin_loading/SpinLoading.jsx'
import { selectAuth, setAuthorized } from '../profile_forms/authSlice.js'

import classes from './app.module.scss'
import { theme } from './antTheme.js'

// eslint-disable-next-line import/no-unresolved
import { useGetUserQuery } from '@/redux/apiSlice.js'

function App() {
  const dispatch = useDispatch()
  const authStatus = useSelector(selectAuth)
  const jwtData = JSON.parse(localStorage.getItem('blogAuthTokenData'))
  const { isLoading } = useGetUserQuery({ jwt: jwtData?.authJwt })

  useEffect(() => {
    if (jwtData && Date.now() < jwtData.expiresAt) {
      dispatch(setAuthorized())
    }
  }, [jwtData])

  const mainContent = isLoading ? (
    <SpinLoading />
  ) : (
    <main className={classes['main']}>
      <Routes>
        <Route path="/articles/:slug" element={<Article authStatus={authStatus} />}></Route>
        <Route path="/sign-up" element={<RegisterForm />}></Route>
        <Route path="/sign-in" element={<LoginForm />}></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute authStatus={authStatus}>
              <EditProfileForm />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/new-article"
          element={
            <PrivateRoute authStatus={authStatus}>
              <ArticleEditCreateForm />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/" element={<ArticleList />}></Route>
      </Routes>
    </main>
  )

  return (
    <ConfigProvider theme={theme}>
      <Header authStatus={authStatus} />
      {mainContent}
    </ConfigProvider>
  )
}

export default App
