import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US");
    const data = await response.json();
    return data.results;
  }
);

export const addToWatchlist = createAsyncThunk(
  "watchlist/add",
  async (movie, thunkAPI) => {
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:8080/api/watchlist/add", movie, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetch",
  async (email) => {
    const response = await axios.get(`http://localhost:8080/api/watchlist/${email}`);
    return response.data;
  }
);


const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    popularMovies: [],
    items: [],
    loading: false,
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
