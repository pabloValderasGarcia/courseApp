import { Link } from 'react-router-dom';
import Input from '../../components/inputs/input';
import useSignUp from '../../features/auth/hooks/use-sign-up';
import PrimaryButton from '../../components/buttons/primary-button';

// Sign up page
const SignUp = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useSignUp();

  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-semibold text-teal-600 mb-4">Create Your Account</h2>
      <div className="sm:bg-white sm:p-8 sm:rounded-lg sm:shadow-md max-w-3xl mx-auto flex flex-col gap-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input id="Username" name="username" value={formData.username} onChange={handleChange} required error={!!errors.username} className={errors.username ? 'ring-2 ring-red-500 focus:ring-red-500' : ''} />
          </div>
          <div>
            <Input id="Email" name="email" value={formData.email} onChange={handleChange} required error={!!errors.email} className={errors.email ? 'ring-2 ring-red-500 focus:ring-red-500' : ''} />
          </div>
          <div>
            <Input id="Password" type="password" name="password" value={formData.password} onChange={handleChange} required error={!!errors.password} className={errors.password ? 'ring-2 ring-red-500 focus:ring-red-500' : ''} />
          </div>
          <PrimaryButton disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </PrimaryButton>
        </form>
        <p>
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp;