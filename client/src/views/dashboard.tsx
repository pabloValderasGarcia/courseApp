import { useState } from 'react';
import useDashboard from '../hooks/use-dashboard';
import PrimaryButton from '../components/buttons/primary-button';
import SecondaryButton from '../components/buttons/secondary-button';
import Input from '../components/inputs/input';
import Sidebar from '../layouts/sidebar';
import useCourses from '../hooks/use-courses';

// Dashboard component
const Dashboard = () => {
  const { username, setUsername, email, setEmail, handleLogout, isLoggingOut, saveProfile } = useDashboard();
  const { userCourses, deleteCourse } = useCourses();
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="flex flex-col lg:flex-row gap-8 sm:gap-0" style={{ height: 'calc(100vh - 101px)' }}>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} isLoggingOut={isLoggingOut} />
      <main className="flex-1 sm:p-8">
        {activeSection === 'profile' && (
          <div>
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">Profile</h2>
            <div className="sm:bg-white sm:p-5 sm:rounded-lg sm:shadow-lg">
              <div className="flex flex-col gap-6">
                <div><Input id="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
                <div><Input id="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                <PrimaryButton onClick={saveProfile}>Save Profile</PrimaryButton>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'courses' && (
          <div>
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">Your Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userCourses.length > 0 ? userCourses.map((userCourse, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-72">
                  <img src={userCourse.imageUrl} alt={userCourse.title} className="w-full h-40 object-cover" />
                  <div className="p-6 flex flex-col gap-4">
                    <p className="text-xl font-semibold text-teal-600">{userCourse.title}</p>
                    <p className="text-gray-700">{userCourse.description}</p>
                    <SecondaryButton onClick={() => deleteCourse(userCourse._id)}>Leave Course</SecondaryButton>
                  </div>
                </div>
              )) : 'You have not enrolled in any courses yet.'}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
