import PrimaryButton from "../components/buttons/primary-button";
import SecondaryButton from "../components/buttons/secondary-button";

// Sidebar component
const Sidebar = ({ activeSection, setActiveSection, onLogout, isLoggingOut }: { activeSection: string; setActiveSection: (section: string) => void; onLogout: () => void; isLoggingOut: boolean; }) => {
  return (
    <aside className="sm:min-w-64 sm:shadow-lg flex flex-col gap-6 sm:p-5">
      <h2 className="text-2xl font-semibold text-teal-600">Dashboard</h2>
      <nav className="flex flex-col gap-3">
        <PrimaryButton
          onClick={() => setActiveSection('profile')}
          className={`cursor-pointer text-left hover:!text-white ${activeSection !== 'profile' ? 'ring-2 ring-inset ring-teal-500 bg-white !text-black' : ''
            }`}
        >
          Profile
        </PrimaryButton>
        <PrimaryButton
          onClick={() => setActiveSection('courses')}
          className={`cursor-pointer text-left hover:!text-white ${activeSection !== 'courses' ? 'ring-2 ring-inset ring-teal-500 bg-white !text-black' : ''
            }`}
        >
          My Courses
        </PrimaryButton>
      </nav>
      <div className="mt-auto pt-6 border-t">
        <SecondaryButton onClick={onLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </SecondaryButton>
      </div>
    </aside>
  )
}

export default Sidebar;