import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import feedSlice from './slices/feedSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    feed: feedSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
