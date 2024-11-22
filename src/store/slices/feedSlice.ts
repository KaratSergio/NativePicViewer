import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedImage {
  id: string;
  author: string;
  download_url: string;
}

interface FeedState {
  images: FeedImage[];
  isLoading: boolean;
  error: string | null;
  page: number;
}

const initialState: FeedState = {
  images: [],
  isLoading: false,
  error: null,
  page: 1,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    fetchImagesStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchImagesSuccess: (
      state,
      action: PayloadAction<{ page: number; data: FeedImage[] }>
    ) => {
      const { page, data } = action.payload;
      state.page = page;
      state.images = page === 1 ? data : [...state.images, ...data];
      state.isLoading = false;
    },
    fetchImagesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchImagesStart, fetchImagesSuccess, fetchImagesFailure } =
  feedSlice.actions;
export default feedSlice.reducer;
