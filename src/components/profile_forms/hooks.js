import { useEffect } from 'react'

import { getJwtExpiration } from './utils.js'
import { setAuthorized } from './authSlice.js'

function useLogin({ user, dispatch, navigate, }) {
  useEffect(() => {
    if (user) {
      const jwt = user.user.token
      const expiresAt = getJwtExpiration(jwt)
      localStorage.setItem('blogAuthTokenData', JSON.stringify({ jwt: jwt, expiresAt: expiresAt, email: user.email }))
      dispatch(setAuthorized())
      navigate('/')
    }
  }, [user])
}

export { useLogin }
