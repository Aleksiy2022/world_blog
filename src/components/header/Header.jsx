import { Link, useNavigate } from 'react-router'
import { Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { selectAuth, setAuthorized, setUnauthorized } from '../profile_forms/authSlice.js'

import classes from './header.module.scss'
import avatar from './image/avatar.jpg'

// eslint-disable-next-line import/no-unresolved
import { useGetUserQuery } from '@/redux/apiSlice.js'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authStatus = useSelector(selectAuth)
  const jwtData = JSON.parse(localStorage.getItem('blogAuthTokenData'))
  const { data: curUser } = useGetUserQuery({ jwt: jwtData?.authJwt })

  useEffect(() => {
    if (jwtData && Date.now() < jwtData.expiresAt) {
      dispatch(setAuthorized())
    }
  }, [dispatch, jwtData])

  function handleLogout(evt) {
    evt.preventDefault()
    localStorage.removeItem('blogAuthTokenData')
    dispatch(setUnauthorized())
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
        to={'/'}
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
      <h1>
        <Link className={`link-reset ${classes['header__title']}`} to={'/'}>
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
