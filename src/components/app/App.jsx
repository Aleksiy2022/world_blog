import Header from '../header/Header.jsx'
import ArticleList from '../article_list/ArticleList.jsx'
import { Router, Route } from "react-router";
import classes from './app.module.scss'
import { theme } from './antTheme.js'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Header />
      <main className={classes['main']}>
        <ArticleList />
      </main>
    </ConfigProvider>
  )
}

export default App