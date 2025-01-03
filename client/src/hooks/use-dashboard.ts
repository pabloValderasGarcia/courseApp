import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../features/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../config/store';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Dashboard hook
const useDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState(state.user?.username || '');
  const [email, setEmail] = useState(state.user?.email || '');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await dispatch(logout());
      navigate('/signup');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Save profile changes handler
  const saveProfile = async () => {
    try {
      await axios.put('http://localhost:5000/api/users/profile', { username, email }, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch(updateUser({ username, email }));
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return { username, setUsername, email, setEmail, handleLogout, isLoggingOut, saveProfile, };
}

export default useDashboard;