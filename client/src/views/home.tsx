import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import PrimaryButton from "../components/buttons/primary-button";
import useCourses from "../hooks/use-courses";

// Home page
const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const { userCourses } = useCourses();
  
  return (
    <div className="text-center mt-10">
      {isAuthenticated && (
        <>
          <h2 className="text-4xl font-semibold text-teal-600 mb-4">Welcome back, {user?.username}!</h2>
          <p className="text-lg mb-6">
            Nowadays, you're involved in {userCourses.length} courses!
          </p>
          <PrimaryButton onClick={() => navigate('/dashboard')} className="!w-fit">Go to Dashboard</PrimaryButton>
        </>
      )}
      {!isAuthenticated && (
        <>
          <h2 className="text-4xl font-semibold text-teal-600 mb-4">Welcome to Personalized Learning Management</h2>
          <p className="text-lg mb-6">
            This app lets you personalize your learning. Sign up, choose courses, and track your progress through an interactive dashboard.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto flex flex-col gap-5">
            <p className="text-2xl font-medium text-teal-500">Main Features:</p>
            <ul className="list-disc list-inside text-left">
              <li>User registration with authentication.</li>
              <li>Choose courses according to your interests.</li>
              <li>Visually track your progress through an interactive dashboard.</li>
              <li>Possibility to manage and modify your profile.</li>
            </ul>
            <PrimaryButton onClick={() => navigate('/signup')}>Get Started</PrimaryButton>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;