import { createSlice } from '@reduxjs/toolkit';
import { StarWarsPerson } from '../services/starWarsApiClient';
// Define a type for the slice state
export type StarWarsState = {
  selectedItems: StarWarsPerson[];
};

// Define the initial state using that type
const initialState: StarWarsState = {
  selectedItems: [],
};

export const starWarsItems = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addItem: (state, action) => {
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    },
    removeItem: (state, action) => {
      console.log(
        state.selectedItems.filter((item) => item === action.payload)
      );
      return {
        ...state,
        selectedItems: [
          ...state.selectedItems.filter((item) => item.name !== action.payload),
        ],
      };
    },

    getItems: (state) => {
      return {
        ...state,
      };
    },

    clearItems: (state) => {
      return {
        ...state,
        selectedItems: [],
      };
    },
  },
});

export const { addItem, removeItem, getItems, clearItems } =
  starWarsItems.actions;

export default starWarsItems.reducer;
