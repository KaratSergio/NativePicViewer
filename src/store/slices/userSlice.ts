import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserProfileStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    fetchUserProfileFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchUserProfileStart,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
} = userSlice.actions;
export default userSlice.reducer;
