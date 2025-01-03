import mongoose, { Schema } from 'mongoose';
import Course from '../types/course-interface';

// Course model
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
)

// CourseModel object
const CourseModel = mongoose.model<Course>('Course', courseSchema);

export { CourseModel };