import { RootState } from '../config/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses, setUserCourses } from "../features/courses/courses-slice";
import axios from 'axios';
import toast from 'react-hot-toast';

// User courses hook
const useCourses = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const coursesState = useSelector((state: RootState) => state.courses);

  // Get courses
  const getCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      dispatch(setCourses(response.data.courses));
    } catch (err) {
      toast.error("Failed getting courses...");
    }
  };
  
  // Get user courses
  const getUserCourses = async () => {
    if (authState.token) {
      try {
        const response = await axios.get('http://localhost:5000/api/courses/user', {
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        dispatch(setUserCourses(response.data.courses));
      } catch (err: any) {
        toast.error('An error occurred while fetching courses');
      }
    }
  };
  useEffect(() => {
    if (!coursesState.loaded) {
      getCourses();
      getUserCourses();
    }
  }, []);
  
  // Start course
  const startCourse = async (courseId: string) => {
    try {
      await axios.post('http://localhost:5000/api/courses/start', { courseId }, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      const startedCourse = coursesState.courses.find(course => course._id === courseId);
      if (startedCourse) dispatch(setUserCourses([...coursesState.userCourses, startedCourse]));
      toast.success('Course started successfully!');
    } catch (err: any) {
      toast.error('An error occurred while starting the course');
    }
  };

  // Delete user course
  const deleteCourse = async (courseId: string) => {
    try {
      await axios.post('http://localhost:5000/api/courses/delete', { courseId }, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      dispatch(setUserCourses(coursesState.userCourses.filter(course => course._id !== courseId)));
      toast.success('Course deleted successfully!');
    } catch (err: any) {
      toast.error('An error occurred while deleting the course');
    }
  }

  return { courses: coursesState.courses, userCourses: coursesState.userCourses, startCourse, deleteCourse };
}

export default useCourses;