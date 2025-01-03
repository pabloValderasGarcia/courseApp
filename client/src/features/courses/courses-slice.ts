import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CoursesState from './types/course-state-interface';
import Course from '../../types/course-interface';

// Course state interface
const initialState: CoursesState = {
  courses: [],
  userCourses: [],
  loaded: false,
};

// Course slice (React Redux)
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    // Save courses in the store for avoid fetching them again
    setCourses(state, action: PayloadAction<Course[]>) {
      state.courses = action.payload;
      state.loaded = true;
      localStorage.setItem('courses', JSON.stringify(action.payload));
    },
    setUserCourses(state, action: PayloadAction<Course[]>) {
      state.userCourses = action.payload;
      state.loaded = true;
      localStorage.setItem('userCourses', JSON.stringify(action.payload));
    },
  },
});

export const { setCourses, setUserCourses } = coursesSlice.actions;
export default coursesSlice.reducer;