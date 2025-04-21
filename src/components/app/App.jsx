import { Routes, Route } from 'react-router'
import { ConfigProvider } from 'antd'

import Header from '../header/Header.jsx'
import ArticleList from '../article_list/ArticleList.jsx'
import Article from '../article/Article.jsx'
import RegisterForm from '../profile_forms/register_form/RegisterForm.jsx'
import LoginForm from '../profile_forms/login_form/LoginForm.jsx'
import EditProfileForm from '../profile_forms/edit_profile_form/EditProfileForm.jsx'

import classes from './app.module.scss'
import { theme } from './antTheme.js'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Header />
      <main className={classes['main']}>
        <Routes>
          <Route path="/articles/:slug" element={<Article />}></Route>
          <Route path="/sign-up" element={<RegisterForm />}></Route>
          <Route path="/sign-in" element={<LoginForm />}></Route>
          <Route path="/profile" element={<EditProfileForm />}></Route>
          <Route path="/" element={<ArticleList />}></Route>
        </Routes>
      </main>
    </ConfigProvider>
  )
}

export default App
