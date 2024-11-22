import axios from 'axios';
import { AppDispatch } from '../store';
import {
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
} from '../slices/feedSlice';

export const fetchImages =
  (page: number = 1) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchImagesStart());
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      );
      dispatch(fetchImagesSuccess({ page, data: response.data }));
    } catch (error: any) {
      dispatch(fetchImagesFailure(error.message));
    }
  };
