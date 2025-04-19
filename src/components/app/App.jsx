import Header from '../header/Header.jsx'
import ArticleList from '../article_list/ArticleList.jsx'
import { Router, Route } from "react-router";
import classes from './app.module.scss'

function App() {
  return (
    <>
      <Header />
      <main className={classes['main']}>
        <ArticleList />
      </main>
    </>
  )
}

export default App