import { useState } from "react";
import PrimaryButton from "../components/buttons/primary-button";
import useCourses from "../hooks/use-courses";

// Courses page
const Courses = () => {
  const { courses, userCourses, startCourse } = useCourses();
  const [inProgressCourses, setInProgressCourses] = useState<string[]>([]);
  
  // Start a course
  const handleStartCourse = async (courseId: string) => {
    startCourse(courseId);
    setInProgressCourses((prev) => {
      if (!prev.includes(courseId)) return [...prev, courseId];
      return prev;
    });
  };

  return (
    <div className="mx-auto max-w-screen-2xl my-10">
      <h2 className="text-4xl font-semibold text-teal-600 mb-4">Available Courses</h2>
      <p className="text-lg mb-6">
        We've got a lot of courses available for you. Choose the one that best suits your interests and start learning today!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {courses.map((course, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-6 flex flex-col gap-4">
              <p className="text-xl font-semibold text-teal-600">{course.title}</p>
              <p className="text-gray-700">{course.description}</p>
              {userCourses.some((userCourse) => userCourse._id === course._id) ? (
                <PrimaryButton disabled>
                  In Progress
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={() => handleStartCourse(course._id)} disabled={inProgressCourses.includes(course._id)}>
                  {inProgressCourses.includes(course._id) ? "In Progress" : "Start Now"}
                </PrimaryButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
