import Course from "../../../types/course-interface";

// Course state interface
interface CoursesState {
  courses: Course[];
  userCourses: Course[];
  loaded: boolean;
}

export default CoursesState;