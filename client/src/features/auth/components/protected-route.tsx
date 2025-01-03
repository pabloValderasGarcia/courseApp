import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../config/store';

// Protected route to navigate to sign up in case of non-authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;