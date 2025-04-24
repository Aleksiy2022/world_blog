import { Navigate } from 'react-router'

function PrivateRoute({ children, authStatus }) {
  return authStatus ? children : <Navigate to={'/sign-in'} />
}

export default PrivateRoute