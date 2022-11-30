import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  persons: [],
  amount: 0,
  loading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPersons: (state, { payload }) => {
      state.persons = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    calculateAmount: (state) => {
      state.amount = state.persons.length;
    },
  },
});

export const { setPersons, setLoading, calculateAmount } = cartSlice.actions;

export default cartSlice.reducer;
