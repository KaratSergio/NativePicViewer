import axios from 'axios';
import { AppDispatch } from '../store';
import {
  fetchUserProfileStart,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
} from '../slices/userSlice';

export const fetchUserProfile = () => async (dispatch: AppDispatch) => {
  dispatch(fetchUserProfileStart());
  try {
    const response = await axios.get('https://reqres.in/api/users/1');
    dispatch(fetchUserProfileSuccess(response.data.data));
  } catch (error: any) {
    dispatch(fetchUserProfileFailure('Failed to fetch profile'));
  }
};
