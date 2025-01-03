import mongoose, { Schema } from 'mongoose';
import User from '../types/user-interface';
import bcrypt from 'bcrypt';

// User model
const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: [true, 'Username is required...'], 
      unique: [true, 'Username is already in use...'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required...'], 
      unique: [true, 'Email is already in use...'] 
    },
    password: {
      type: String,
      required: [true, 'Password is required...'],
      minlength: [8, 'Password must be at least 8 characters long...'],
    },
  },
  { discriminatorKey: 'role', timestamps: true }
)

// Compare password with ciphered password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Cipher password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// UserModel object
const UserModel = mongoose.model<User>('User', userSchema);

// Student discriminator
const Student = UserModel.discriminator('Student',
  new Schema({
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  })
);

// Instructor discriminator
const Instructor = UserModel.discriminator('Instructor',
  new Schema({
    expertise: { type: [String] },
  })
);

export { UserModel, Student, Instructor };