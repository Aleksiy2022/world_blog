import { Routes, Route } from 'react-router'
import { ConfigProvider } from 'antd'

import Header from '../header/Header.jsx'
import ArticleList from '../article_list/ArticleList.jsx'
import Article from '../article/Article.jsx'

import classes from './app.module.scss'
import { theme } from './antTheme.js'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Header />
      <main className={classes['main']}>
        <Routes>
          <Route path="/articles/:slug" element={<Article />}></Route>
          <Route path="/" element={<ArticleList />}></Route>
        </Routes>
      </main>
    </ConfigProvider>
  )
}

export default App
