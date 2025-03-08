import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US");
    const data = await response.json();
    return data.results;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    popularMovies: [],
  },
  reducers: {
    setMovies(state, action) {
      state.list = action.payload;
    },
    addMovie(state, action) {
      state.list.push(action.payload);
    },
    removeMovie(state, action) {
      state.list = state.list.filter(movie => movie.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMovies = action.payload;
    });
  },
});

export const { setMovies, addMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;
