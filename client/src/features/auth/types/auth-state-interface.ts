// Auth State interface
interface AuthState {
  user: { username: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

export default AuthState;