import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import coursesReducer from '../features/courses/courses-slice';

// Store configuration (React Redux)
const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;