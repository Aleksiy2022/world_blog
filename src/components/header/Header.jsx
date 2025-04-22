import { Link } from 'react-router'
import { Flex } from 'antd'
import { useSelector } from 'react-redux'

import { selectAuth } from '../profile_forms/authSlice.js'

import classes from './header.module.scss'


function Header() {
  const authStatus = useSelector(selectAuth)
  const signIn = (
    <Link
      to={'/sign-in'}
      className={`
            ${classes['header__link']}
            ${classes['header__link--sign-in']}
          `}
    >
      Sign In
    </Link>
  )

  const signUp = (
    <Link
      to={ authStatus ? '/' : '/sign-up'}
      className={`
            ${classes['header__link']}
            ${ authStatus ? classes['header__link--log-out'] : classes['header__link--sign-up']}
          `}
    >
      { authStatus ? 'Log Out' : 'Sign Up' }
    </Link>
  )

  return (
    <header className={classes['header']}>
      <h1>
        <Link className={`link-reset ${classes['header__title']}`} to={'/'}>
          Realworld Blog
        </Link>
      </h1>
      <Flex>
        { signIn }
        { signUp }
      </Flex>
    </header>
  )
}

export default Header
