import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getuser: (state, action) => {
        state.users = action.payload.map((user) => ({
          id: user._id,
          name: user.username,
          email: user.email,
        }));
      },
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
    addUser: (state, action) => {
      state.users.push({
        name: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
      });
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
        };
      }
    },
    deleteUser:(state,action)=>{
        const id = action.payload.id
        state.users = state.users.filter(user=> user.id!==id )
    }
  },
});

export const { getUser, addUser, updateUser,deleteUser,signInStart,signInsuccess,signInFailure } = adminSlice.actions;
export default adminSlice.reducer;