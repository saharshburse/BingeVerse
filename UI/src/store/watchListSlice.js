// src/store/watchListSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("token");
// 🔁 Add to Watchlist
export const addToWatchlist = createAsyncThunk(
  "watchlist/add",
  async ({ movie, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/watchlist/add`,
        movie,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error adding to watchlist");
    }
  }
);

// 🔁 Get Watchlist
export const fetchWatchlist = createAsyncThunk(
  "watchlist",
  async () => {
    try {
      console.log("api")
      const res = await axios.get(
        `${BASE_URL}/watchlist`,
        {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch watchlist");
    }
  }
);
// 🔁 Remove from Watchlist
export const removeFromWatchlist = createAsyncThunk(
  "watchlist/remove",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/watchlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to remove from watchlist");
    }
  }
);

// 🧊 Slice
const watchListSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearWatchlistState: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const getwatchList = (state) => state.watchList.items;

export const { clearWatchlistState } = watchListSlice.actions;
export default watchListSlice.reducer;
