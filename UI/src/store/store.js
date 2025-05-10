import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import userReducer from './userSlice';
import watchListReducer from './watchListSlice'
const store = configureStore({
  reducer: {
    movies: movieReducer,
    user:userReducer,
    watchList:watchListReducer
  },
});

export default store;
