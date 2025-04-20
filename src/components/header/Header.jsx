import { Link } from 'react-router'

import classes from './header.module.scss'

function Header() {
  return (
    <header className={classes['header']}>
      <h1>
        <Link className={`link-reset ${classes['header__title']}`} to={'/'}>
          Realworld Blog
        </Link>
      </h1>
    </header>
  )
}

export default Header
