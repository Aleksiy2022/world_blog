import { Link, useNavigate } from 'react-router'
import { Flex } from 'antd'
import { useDispatch } from 'react-redux'

import { setUnauthorized } from '../profile_forms/authSlice.js'

import classes from './header.module.scss'
import avatar from './image/avatar.jpg'

// eslint-disable-next-line import/no-unresolved
import apiSlice from '@/redux/apiSlice.js'

function Header({ authStatus }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jwtData = JSON.parse(localStorage.getItem('blogAuthTokenData'))
  const { data: curUser } = apiSlice.endpoints.getUser.useQueryState({ jwt: jwtData?.authJwt })

  function handleLogout(evt) {
    evt.preventDefault()
    localStorage.removeItem('blogAuthTokenData')
    dispatch(setUnauthorized())
    dispatch(apiSlice.util.invalidateTags(['Article']))
    navigate('/')
  }

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

  const logOut = (
    <Link
      to={'/'}
      className={`
            ${classes['header__link']}
            ${classes['header__link--log-out']}
          `}
      onClick={handleLogout}
    >
      Log Out
    </Link>
  )

  const signUp = (
    <Link
      to={'/sign-up'}
      className={`
            ${classes['header__link']}
            ${classes['header__link--sign-up']}
          `}
    >
      Sign Up
    </Link>
  )

  const userActionsPanel = (
    <div className={classes['header__actions-panel']}>
      <Link
        to={'/new-article'}
        className={`
            ${classes['header__link']}
            ${classes['header__link--article']}
          `}
      >
        Create article
      </Link>
      <Link to={'/profile'} className={classes['header__profile-link']}>
        <span>{curUser ? curUser.user.username : null}</span>
        <img
          className={classes['header__profile-img']}
          src={curUser ? (curUser.user.image ? curUser.user.image : avatar) : null}
          alt="аватар"
        />
      </Link>
    </div>
  )

  return (
    <header className={classes['header']}>
      <h1 className={classes['header__title']}>
        <Link className={`link-reset ${classes['header__title-link']}`} to={'/'}>
          Realworld Blog
        </Link>
      </h1>
      <Flex>
        {authStatus ? userActionsPanel : signIn}
        {authStatus ? logOut : signUp}
      </Flex>
    </header>
  )
}

export default Header
