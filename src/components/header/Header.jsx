import { Link } from 'react-router'
import { Flex } from 'antd'

import classes from './header.module.scss'

function Header() {
  return (
    <header className={classes['header']}>
      <h1>
        <Link className={`link-reset ${classes['header__title']}`} to={'/'}>
          Realworld Blog
        </Link>
      </h1>
      <Flex>
        <Link
          to={'/sign-in'}
          className={`
            ${classes['header__link']}
            ${classes['header__link--sign-in']}
          `}
        >
          Sign In
        </Link>
        <Link
          to={'/sign-up'}
          className={`
            ${classes['header__link']}
            ${classes['header__link--sign-up']}
          `}
        >
          Sign Up
        </Link>
      </Flex>
    </header>
  )
}

export default Header
