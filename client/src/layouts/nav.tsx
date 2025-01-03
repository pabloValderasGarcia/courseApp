import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

// Nav component
const Nav = () => {
  const location = useLocation();
  const isAuthenticated = useAuth();
  
  return (
    <nav className="bg-gray-900 shadow-lg p-5">
      <ul className="flex items-center justify-center gap-10">
        {['/', '/courses'].map((path, index) => (
          <li key={index}>
            <Link to={path} className={`text-white font-medium transition-colors duration-200 hover:text-teal-500 ${
                location.pathname === path ? '!text-teal-500' : ''
              }`}>
              {['Home', 'Courses'][index]}
            </Link>
          </li>
        ))}
        <li>
          <Link to={isAuthenticated ? '/dashboard' : '/signup'}
            className={`text-white font-medium transition-colors duration-200 hover:text-teal-500 ${
              location.pathname === (isAuthenticated ? '/dashboard' : '/signup') ? '!text-teal-500' : ''
            }`}>
            {isAuthenticated ? 'Dashboard' : 'Sign Up'}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;