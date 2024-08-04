import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    value: 0,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInsuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    getuser: (state, action) => {
      state.users = action.payload.map((user) => ({
        id: user._id,
        name: user.username,
        email: user.email,
      }));
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    increment:(state) =>{
      state.value +=1;
    },
    decrement:(state) =>{
      state.value -=1;
    }



  },
});

export const {
  signInStart,
  signInsuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut,
  getuser,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  increment,
  decrement,
} = userSlice.actions;

export default userSlice.reducer;
