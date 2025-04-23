import { Link } from 'react-router'
import { Flex } from 'antd'
import { useSelector } from 'react-redux'

import { selectAuth } from '../profile_forms/authSlice.js'

import classes from './header.module.scss'
import avatar from './image/avatar.jpg'

// eslint-disable-next-line import/no-unresolved
import { useGetUserQuery } from '@/redux/apiSlice.js'

function Header() {
  const authStatus = useSelector(selectAuth)
  const jwt = JSON.parse(localStorage.getItem('blogAuthToken'))
  const { data: curUser } = useGetUserQuery({ jwt })

  const signInLink = (
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

  const userActionsPanel = (
    <div className={classes['header__actions-panel']}>
      <Link
        to={'/'}
        className={`
            ${classes['header__link']}
            ${classes['header__link--article']}
          `}>
        Create article
      </Link>
      <Link to={'/profile'} className={classes['header__profile-link']}>
        <span>{ curUser ? curUser.user.username : null }</span>
        <img className={classes['header__profile-img']} src={curUser ? curUser.user.image ? curUser.user.image : avatar : null} alt="аватар"/>
      </Link>
    </div>
  )

  const authActionLink  = (
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
        { authStatus ? userActionsPanel : signInLink }
        { authActionLink }
      </Flex>
    </header>
  )
}

export default Header
