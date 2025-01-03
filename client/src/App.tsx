import { Route, Routes } from 'react-router-dom';
import './assets/css/index.css';
import ProtectedRoute from './features/auth/components/protected-route';
import PublicRoute from './features/auth/components/public-route';
import Nav from './layouts/nav';
import Home from './views/home';
import Courses from './views/courses';
import SignUp from './views/auth/sign-up';
import SignIn from './views/auth/sign-in';
import Dashboard from './views/dashboard';

function App() {
  return (
    <div>
      <Nav />
      <div className='p-5'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="signin" element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          } />
          <Route path="signup" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App;