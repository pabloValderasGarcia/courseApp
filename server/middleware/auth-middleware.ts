import jwt from 'jsonwebtoken';

// Middleware to authenticate user
const authenticate = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided, authorization denied.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

export default authenticate;