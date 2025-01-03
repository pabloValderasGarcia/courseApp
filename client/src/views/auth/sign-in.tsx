import { Link } from 'react-router-dom';
import Input from '../../components/inputs/input';
import useLogin from '../../features/auth/hooks/use-sign-in';
import PrimaryButton from '../../components/buttons/primary-button';

// Sign in page
const SignIn = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useLogin();

  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-semibold text-teal-600 mb-4">Welcome Back!</h2>
      <div className="sm:bg-white sm:p-8 sm:rounded-lg sm:shadow-md max-w-3xl mx-auto flex flex-col gap-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input id="Email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Input id="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <PrimaryButton disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Login'}
          </PrimaryButton>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn;