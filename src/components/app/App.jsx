import { Routes, Route } from 'react-router'
import { ConfigProvider } from 'antd'
import { useDispatch } from 'react-redux'
import { useEffect, useMemo } from 'react'

import { useGetUserQuery } from '@/redux/apiSlice.js'

import Header from '../header/Header.jsx'
import ArticleList from '../article_list/ArticleList.jsx'
import Article from '../article/Article.jsx'
import ArticleEditCreateForm from '../article_edit_create_form/ArticleEditCreateForm.jsx'
import RegisterForm from '../profile_forms/register_form/RegisterForm.jsx'
import LoginForm from '../profile_forms/login_form/LoginForm.jsx'
import EditProfileForm from '../profile_forms/edit_profile_form/EditProfileForm.jsx'
import PrivateRoute from '../privet_route/PrivetRoute.jsx'
import { setAuthorized } from '../profile_forms/authSlice.js'

import classes from './app.module.scss'
import { theme } from './antTheme.js'

function App() {
  const dispatch = useDispatch()
  const jwt = JSON.parse(localStorage.getItem('blogAuthTokenData'))?.jwt
  const { isSuccess } = useGetUserQuery(undefined, { skip: !jwt })

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthorized())
    }
  }, [isSuccess])

  const privateRoutes = useMemo(() => [
    { path: '/articles/:slug/edit', element: <ArticleEditCreateForm /> },
    { path: '/profile', element: <EditProfileForm /> },
    { path: '/new-article', element: <ArticleEditCreateForm /> }
  ], [])

  const privateRoutesComponents = useMemo(() =>
      privateRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute>
              {element}
            </PrivateRoute>
          }
        />
      )),
    [privateRoutes]
  )

  return (
    <ConfigProvider theme={theme}>
      <Header />
      <main className={classes['main']}>
        <Routes>
          <Route path="/articles/:slug" element={<Article />}></Route>
          <Route path="/sign-up" element={<RegisterForm />}></Route>
          <Route path="/sign-in" element={<LoginForm />}></Route>
          <Route path="/articles" element={<ArticleList />}></Route>
          <Route path="/" element={<ArticleList />}></Route>
          {privateRoutesComponents}
        </Routes>
      </main>
    </ConfigProvider>
  )
}

export default App
