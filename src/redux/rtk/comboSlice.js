import { createAsyncThunk } from '@reduxjs/toolkit';
import { increment, getAPhoto } from './gallerySlice';

export const getNextPhotoDetails = createAsyncThunk(
  'gallery/getNextPhotoDetails',
  async (_, { dispatch, getState }) => {
    // Dispatch the increment action to update idX
    dispatch(increment());

    // Get the updated idX value from the state
    const idX = selectidX(getState());

    // Dispatch the getAPhoto async thunk to fetch the next photo details
    await dispatch(getAPhoto(idX));

    // Return the updated idX (if needed)
    return idX;
  }
);
const gallerySlice = createSlice({

    
    extraReducers: (builder) => {
      // ... other cases
  
      [getNextPhotoDetails.pending]: (state) => {
        state.loading = true;
      },
      [getNextPhotoDetails.fulfilled]: (state, action) => {
        state.loading = false;
        // You might handle the result here if needed (e.g., updated idX)
      },
      [getNextPhotoDetails.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  });
  