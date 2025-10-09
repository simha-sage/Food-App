import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    update: (state, action) => {
      return action.payload;
    },
  },
});

export const { update } = cartSlice.actions;
export default cartSlice.reducer;
