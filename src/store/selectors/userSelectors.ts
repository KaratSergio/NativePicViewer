import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectUser = (state: RootState) => state.user;

export const selectUserState = createSelector([selectUser], user => ({
  profile: user.profile,
  isLoading: user.isLoading,
  error: user.error,
}));
