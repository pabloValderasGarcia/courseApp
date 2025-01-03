import express from 'express';
import authenticate from '../middleware/auth-middleware';
import { CourseModel } from '../models/course-model';
import { UserModel } from '../models/user-model';
import { Student } from '../types/user-interface';
const router = express.Router();

// Get all courses
router.get('/', async (req: any, res: any) => {
  try {
    const courses = await CourseModel.find();
    return res.status(200).json({ courses });
  } catch (err) {
    console.error('Error fetching all courses:', err);
    return res.status(500).json({ message: 'An error occurred while fetching all courses' });
  }
});

// Get user courses
function isStudent(user: any): user is Student {
  return user.role === 'Student' && Array.isArray(user.courses);
}
router.get('/user', authenticate, async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).populate('courses');

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is a student
    if (isStudent(user)) {
      return res.status(200).json({ courses: user.courses });
    } else {
      return res.status(400).json({ message: 'User is not a student' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error...' });
  }
});

// Start a course
router.post('/start', authenticate, async (req: any, res: any) => {
  try {
    const courseId = req.body.courseId;
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is a student
    if (isStudent(user)) {
      if (user.courses.includes(courseId)) {
        return res.status(400).json({ message: 'Course is already in progress' });
      }
      user.courses.push(courseId);
      await user.save();
      return res.status(200).json({ message: 'Course started successfully!', user });
    } else {
      return res.status(400).json({ message: 'User is not a student' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error...' });
  }
});

// Delete a course
router.post('/delete', authenticate, async (req: any, res: any) => {
  try {
    const courseId = req.body.courseId;
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is a student
    if (isStudent(user)) {
      if (user.courses.includes(courseId)) {
        user.courses = user.courses.filter(course => course.toString() !== courseId);
        await user.save();
        return res.status(200).json({ message: 'Course removed successfully!', user });
      }
      return res.status(400).json({ message: 'Course is already removed...' });
    } else {
      return res.status(400).json({ message: 'User is not a student' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error...' });
  }
});

export default router;