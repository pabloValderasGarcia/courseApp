// User interface
interface User extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  role: string;
}
export interface Student extends User {
  courses: string[];
}
export interface Instructor extends User {
  expertise: string[];
}

export default User;