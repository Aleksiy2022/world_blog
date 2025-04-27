import { Link, useNavigate } from 'react-router'
import { Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'

import apiSlice, { useGetUserQuery } from '@/redux/apiSlice.js'

import { selectAuth, setUnauthorized } from '../profile_forms/authSlice.js'

import classes from './header.module.scss'
import avatar from './image/avatar.jpg'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authStatus = useSelector(selectAuth)
  const jwt = JSON.parse(localStorage.getItem('blogAuthTokenData'))?.jwt

  const { data: curUser } = useGetUserQuery(undefined, { skip: !jwt })
  const username = curUser?.user?.username || ''
  const userImage = curUser?.user?.image || avatar

  const handleLogout = useCallback((evt) => {
    evt.preventDefault()
    localStorage.setItem('blogAuthTokenData', JSON.stringify({ jwt: '', expiresAt: '', email: curUser?.user.email }))
    dispatch(setUnauthorized())
    dispatch(apiSlice.util.invalidateTags(['Article']))
    navigate('/')
  }, [curUser, dispatch, navigate])

  const signIn = useMemo(() =>(
    <Link
      to={'/sign-in'}
      className={`
            ${classes['header__link']}
            ${classes['header__link--sign-in']}
          `}
    >
      Sign In
    </Link>
  ),[])

  const logOut = useMemo(() => (
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
  ), [])

  const signUp = useMemo(() => (
    <Link
      to={'/sign-up'}
      className={`
            ${classes['header__link']}
            ${classes['header__link--sign-up']}
          `}
    >
      Sign Up
    </Link>
  ), [])

  const userActionsPanel = useMemo(() => (
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
        <span>{username}</span>
        <img className={classes['header__profile-img']} src={userImage} alt="аватар" />
      </Link>
    </div>
  ), [username, userImage])

  return (
    <header className={classes['header']}>
      <h1 className={classes['header__title']}>
        <Link className={`link-reset ${classes['header__title-link']}`} to={'/'}>
          Realworld Blog
        </Link>
      </h1>
      <Flex>
        {authStatus ? (
          <>
            {userActionsPanel}
            {logOut}
          </>
        ) : (
          <>
            {signIn}
            {signUp}
          </>
        )}
      </Flex>
    </header>
  )
}

export default Header
