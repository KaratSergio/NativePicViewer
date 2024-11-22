import { RootState } from '../store';

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;

export const selectEmail = (state: RootState): string | null =>
  state.auth.email;
