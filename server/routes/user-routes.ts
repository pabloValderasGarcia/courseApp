import express from 'express';
import { UserModel, Student, Instructor } from '../models/user-model';
import authenticate from '../middleware/auth-middleware';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Get user
router.get('/', async (req: any, res: any) => {
  return res.status(202).json({ message: 'Working!' });
})

// Sign in user
router.post('/signin', async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Incorrect email or password, please try again...' });
    }

    // Validate password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect email or password, please try again...' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id }, // Payload
      process.env.JWT_KEY as string,
      { expiresIn: '24h' } // Expiration time
    );

    // Return user and token
    return res.status(200).json({ message: 'Logged successfully!', user, token });
  } catch (err: any) {
    // Handle errors
    return res.status(500).json({ message: 'Server error:', error: err.message });
  }
})

// Sign up user
router.post('/signup', async (req: any, res: any) => {
  const { username, email, password, role } = req.body;

  try {
    // Create the correct user model based on the role
    let user;
    if (role === 'student') {
      user = new Student({ username, email, password });
    } else if (role === 'instructor') {
      user = new Instructor({ username, email, password });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Save user
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id }, // Payload
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '24h' } // Expiration time
    );

    return res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (err: any) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errorMessages: string[] = [];
      for (let field in err.errors) {
        errorMessages.push(err.errors[field].message);
      }
      return res.status(400).json({ message: errorMessages.join(' ') });
    }

    // Handle other errors
    return res.status(400).json({ message: err.message });
  }
})

// Update user profile
router.put('/profile', authenticate, async (req: any, res: any) => {
  const { username, email } = req.body;
  const userId = req.user._id;
  
  try {
    // Find user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );
    
    // Verify user
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err: any) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;