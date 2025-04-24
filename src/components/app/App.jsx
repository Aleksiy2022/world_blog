import { Routes, Route } from 'react-router'
import { ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'

import Header from '../header/Header.jsx'
import ArticleList from '../article_list/ArticleList.jsx'
import Article from '../article/Article.jsx'
import RegisterForm from '../profile_forms/register_form/RegisterForm.jsx'
import LoginForm from '../profile_forms/login_form/LoginForm.jsx'
import EditProfileForm from '../profile_forms/edit_profile_form/EditProfileForm.jsx'
import CreateArticle from '../create_article/CreateArticle.jsx'
import PrivateRoute from '../privet_route/PrivetRoute.jsx'
import { selectAuth } from '../profile_forms/authSlice.js'

import classes from './app.module.scss'
import { theme } from './antTheme.js'


function App() {
  const authStatus = useSelector(selectAuth)
  return (
    <ConfigProvider theme={theme}>
      <Header authStatus={authStatus}/>
      <main className={classes['main']}>
        <Routes>
          <Route path="/articles/:slug" element={<Article authStatus={authStatus}/>}></Route>
          <Route path="/sign-up" element={<RegisterForm />}></Route>
          <Route path="/sign-in" element={<LoginForm />}></Route>
          <Route path="/profile" element={<PrivateRoute authStatus={authStatus}><EditProfileForm /></PrivateRoute>}></Route>
          <Route path="/new-article"></Route>
          <Route path="/" element={<ArticleList />}></Route>
        </Routes>
      </main>
    </ConfigProvider>
  )
}

export default App
