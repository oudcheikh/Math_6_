import { createSlice } from '@reduxjs/toolkit'

export const scoreTotalSlice = createSlice({
  name: 'scoreTotal',
  initialState: {
    value: 0,
  },
  reducers: {
    // Increment le score total par une valeur donnée
    increment: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators sont générés pour chaque cas de reducer
export const { increment } = scoreTotalSlice.actions;

export default scoreTotalSlice.reducer;