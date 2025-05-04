import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { email, firstName, lastName, token } = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.token = token;
    },
    logout(state) {
      return initialState;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
// export const getUserEmail=getState().user.email;/
export const getUserEmail = (state) => state.user.email;

export default userSlice.reducer;
