import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

import { selectAuth } from '@/components/profile_forms/authSlice.js'

function PrivateRoute({ children }) {
  const authStatus = useSelector(selectAuth)
  return authStatus ? children : <Navigate to={'/sign-in'} />
}

export default PrivateRoute
