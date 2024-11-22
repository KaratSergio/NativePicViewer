import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectFeed = (state: RootState) => state.feed;

export const selectFeedState = createSelector([selectFeed], feed => ({
  images: feed.images,
  isLoading: feed.isLoading,
  error: feed.error,
  page: feed.page,
}));
