import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/use-auth';

// Public route to navigate to dashboard in case of non-authentication
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;