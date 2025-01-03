import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../auth-slice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Login hook
const useLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // On change input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // On submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Login and save auth with token (React Redux)
      const response = await axios.post('http://localhost:5000/api/users/signin', formData);
      const { user, token } = response.data;

      dispatch(login({ user, token }));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      // Check error and show it
      if (err.response && err.response.data) {
        const message = err.response.data.message;
        if (message.toLowerCase().includes('email')) setErrors({ email: message });
        else if (message.toLowerCase().includes('password')) setErrors({ password: message });
        toast.error(message);
      } else {
        toast.error('Server error, please try again later...');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, errors, isSubmitting, handleChange, handleSubmit };
};

export default useLogin;